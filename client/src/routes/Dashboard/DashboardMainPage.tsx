import apiClient from "../../common/api";
import { modals } from "@mantine/modals";
import { ChangeBalanceModal, DashboardNavbar } from "../../components";
import { AppShell } from "@mantine/core";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { IChangeBalanceFormValues } from "@/components/Modals/ChangeBalanceModal";

const hideNavbarPages = ["/dashboard", "/dashboard/storage/create"];

function DashboardMainPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id: storageId } = useParams();
    const [balance, setBalance] = useState<number>(0);

    useEffect(() => {
        (async () => {
            try {
                const currentUserId = localStorage.getItem("currentUserId");

                if (!currentUserId) {
                    navigate("/login");
                } else {
                    if (!hideNavbarPages.includes(location.pathname)) {
                        const balanceRes = await apiClient.get(`/storages/${storageId}/getBalance`);
                        setBalance(balanceRes.data.data.totalMoney);
                    }
                }
            } catch (error) {
                console.log({ error });
            } finally {
            }
        })();
    }, []);

    const openChangeBalanceModal = () => {
        modals.open({
            title: "Change balance",
            children: <ChangeBalanceModal onFormSubmit={onChangeFormSubmit} />,
        });
    };

    const onLogOut = () => {
        console.log("Log out");
        localStorage.removeItem("currentUserId");
        navigate("/login");
    };

    const onChangeFormSubmit = (values: IChangeBalanceFormValues) => {
        setBalance(values.balance);
        modals.closeAll();
    };

    return (
        <AppShell
            padding="md"
            navbar={
                !hideNavbarPages.includes(location.pathname) ? (
                    <DashboardNavbar balance={balance} onLogOut={onLogOut} onChangeBalance={openChangeBalanceModal} />
                ) : (
                    <div></div>
                )
            }
        >
            <Outlet />
        </AppShell>
    );
}

export default DashboardMainPage;
