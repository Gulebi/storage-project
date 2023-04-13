import { modals } from "@mantine/modals";
import { ChangeBalanceModal, DashboardNavbar } from "../../components";
import { AppShell, LoadingOverlay } from "@mantine/core";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { IChangeBalanceFormValues } from "../../components/Modals/ChangeBalanceModal";
import { useDisclosure } from "@mantine/hooks";
import { storageService, balanceService, userService } from "../../services";

const hideNavbarPages = ["/dashboard", "/dashboard/storage/create"];

function DashboardMainPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id: storageId } = useParams();

    const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);

    const currentUserId = localStorage.getItem("currentUserId");

    const { data: userInfo, refetch: loadUserInfo } = userService.useGetUserInfo({
        id: currentUserId!,
        enabled: false,
    });

    const { data: balance, refetch: loadBalance } = balanceService.useGetBalance({ id: storageId!, enabled: false });
    const balanceMutation = balanceService.useSetBalance({ id: storageId! });

    const onLoadExists = (exists: boolean) => {
        try {
            openOverlay();

            if (!currentUserId) {
                navigate("/login");
            } else {
                if (!exists) {
                    navigate("/dashboard");
                }
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
    };

    const { data: exists } = storageService.useStorageExists({ id: storageId!, onLoad: onLoadExists });

    const openChangeBalanceModal = () => {
        modals.open({
            title: "Change balance",
            children: <ChangeBalanceModal onFormSubmit={onChangeFormSubmit} defaultValue={balance} />,
        });
    };

    const onLogOut = () => {
        console.log("Log out");
        localStorage.removeItem("currentUserId");
        navigate("/login");
    };

    const onChangeFormSubmit = async (values: IChangeBalanceFormValues) => {
        modals.closeAll();
        balanceMutation.mutate(values.balance);
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
