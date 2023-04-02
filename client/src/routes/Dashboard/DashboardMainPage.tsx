import apiClient from "../../common/api";
import { modals } from "@mantine/modals";
import { DashboardNavbar } from "../../components";
import { AppShell, Button, Grid, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "@mantine/form";

const hideNavbarPages = ["/dashboard", "/dashboard/storage/create"];

function ChangeBalanceModal({ onFormSubmit }: { onFormSubmit: (values: { balance: number }) => void }) {
    const changeForm = useForm({
        initialValues: {
            balance: 1,
        },

        validate: {
            balance: (val) => (val < 0 ? `balance >= 0` : null),
        },
    });

    return (
        <>
            <Stack spacing="sm" align="center">
                <form onSubmit={changeForm.onSubmit((values) => onFormSubmit(values))}>
                    <Grid align="end">
                        <Grid.Col span={8}>
                            <NumberInput
                                required
                                placeholder="Amount"
                                min={1}
                                value={changeForm.values.balance}
                                onChange={(value) => changeForm.setFieldValue("balance", value || 1)} // not working
                                error={changeForm.errors.balance}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Button type="submit">Change</Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Stack>
        </>
    );
}

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
                    const balanceRes = await apiClient.get(`/storages/${storageId}/getBalance`);
                    setBalance(balanceRes.data.data.totalMoney);
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

    const onChangeFormSubmit = (values: { balance: any }) => {
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
