import apiClient from "../../common/api";
import { modals } from "@mantine/modals";
import { ChangeBalanceModal, DashboardNavbar } from "../../components";
import { AppShell, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { IChangeBalanceFormValues } from "@/components/Modals/ChangeBalanceModal";
import { useDisclosure } from "@mantine/hooks";
import { IUser } from "../../types";

const hideNavbarPages = ["/dashboard", "/dashboard/storage/create"];

function DashboardMainPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id: storageId } = useParams();
    const [balance, setBalance] = useState<number>(0);
    const [userInfo, setUserInfo] = useState<IUser>();
    const [exists, setExists] = useState<boolean>();

    const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(true);

    const currentUserId = localStorage.getItem("currentUserId");

    useEffect(() => {
        (async () => {
            try {
                if (!currentUserId) {
                    navigate("/login");
                } else {
                    if (!hideNavbarPages.includes(location.pathname)) {
                        loadBalance();
                        loadUserInfo();
                    }
                }
            } catch (error) {
                console.log({ error });
            } finally {
                closeOverlay();
            }
        })();
    }, [exists]);

    useEffect(() => {
        (async () => {
            try {
                const existsRes = await apiClient.get(`/storages/${storageId}/exists`);

                if (!existsRes.data.data) {
                    navigate("/dashboard");
                } else {
                    setExists(existsRes.data.data);
                }
            } catch (error) {
                console.log({ error });
            } finally {
            }
        })();
    }, [storageId]);

    const openChangeBalanceModal = () => {
        modals.open({
            title: "Change balance",
            children: <ChangeBalanceModal onFormSubmit={onChangeFormSubmit} />,
        });
    };

    const loadBalance = async () => {
        const balanceRes = await apiClient.get(`/storages/${storageId}/getBalance`);
        setBalance(balanceRes.data.data.totalMoney);
    };

    const loadUserInfo = async () => {
        const userInfoRes = await apiClient.get(`/users/${currentUserId}/info`);
        setUserInfo(userInfoRes.data.data);
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
        <>
            <LoadingOverlay visible={visible} overlayBlur={2} />

            {!visible && (
                <AppShell
                    padding="md"
                    navbar={
                        !hideNavbarPages.includes(location.pathname) ? (
                            <DashboardNavbar
                                balance={balance}
                                onLogOut={onLogOut}
                                onLoadBalance={loadBalance}
                                onChangeBalance={openChangeBalanceModal}
                                userInfo={userInfo}
                            />
                        ) : (
                            <div></div>
                        )
                    }
                >
                    <Outlet />
                </AppShell>
            )}
        </>
    );
}

export default DashboardMainPage;
