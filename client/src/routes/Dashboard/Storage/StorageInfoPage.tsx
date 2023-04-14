import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Card, Container, Grid, Group, LoadingOverlay, Title, createStyles, Text, ScrollArea } from "@mantine/core";
import {
    StorageInfoCard,
    BalanceHistoryChartCard,
    SmallInfoCard,
    ChangeBalanceModal,
    ChangeStorageNameModal,
} from "../../../components";
import { storageService } from "../../../services";
import { modals } from "@mantine/modals";
import { IChangeBalanceFormValues } from "../../../components/Modals/ChangeBalanceModal";
import { useQueryClient } from "@tanstack/react-query";

const useStyles = createStyles((theme) => ({
    column: {
        display: "flex",
        flexDirection: "column",
    },
}));

function DashboardInfoPage() {
    const { classes } = useStyles();
    const { id: storageId } = useParams();

    const queryClient = useQueryClient();

    const {
        isLoading,
        isSuccess,
        data: storageStats,
        refetch: loadStats,
    } = storageService.useGetStats({ id: storageId! });
    const balanceMutation = storageService.useSetStats({ id: storageId! });

    const setNameMutation = storageService.useSetName({ id: storageId! });

    const currentUserId = localStorage.getItem("currentUserId");
    const isAdmin = currentUserId === storageStats?.adminId;

    const onBalanceActionChange = () => {
        modals.open({
            title: "Change balance",
            children: <ChangeBalanceModal onFormSubmit={onChangeFormSubmit} defaultValue={storageStats?.totalMoney} />,
        });
    };

    const onBalanceActionReload = () => {
        loadStats();
    };

    const onStorageNameActionChange = () => {
        modals.open({
            title: "Change storage name",
            children: <ChangeStorageNameModal onFormSubmit={onChangeNameFormSubmit} data={storageStats!} />,
        });
    };

    const onChangeNameFormSubmit = (values: { name: string }) => {
        modals.closeAll();
        setNameMutation.mutate(values.name);
    };

    const onChangeFormSubmit = (values: IChangeBalanceFormValues) => {
        modals.closeAll();
        balanceMutation.mutate(values.balance);
    };

    return (
        <Container size="lg" h="100%" pos="relative">
            <LoadingOverlay visible={isLoading} overlayBlur={2} />

            <Title order={3} mb="md" align="center">
                Storage Info
            </Title>

            {isSuccess && (
                <ScrollArea offsetScrollbars>
                    <Grid mih={isAdmin ? 140 : 120} align="stretch" mb="lg">
                        <Grid.Col span={3}>
                            <SmallInfoCard
                                title="Balance"
                                data={storageStats?.totalMoney}
                                controls={isAdmin}
                                onActionChange={onBalanceActionChange}
                                onActionReload={onBalanceActionReload}
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <SmallInfoCard title="Total products" data={storageStats?.productsCount} />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <SmallInfoCard title="Total products bought" data={storageStats.operationsCount.buying} />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <SmallInfoCard title="Total products sold" data={storageStats.operationsCount.selling} />
                        </Grid.Col>
                    </Grid>

                    <Grid align="stretch">
                        <Grid.Col span={8} className={classes.column}>
                            <BalanceHistoryChartCard data={storageStats?.totalMoneyHistory} />
                        </Grid.Col>
                        <Grid.Col span={4} className={classes.column}>
                            <StorageInfoCard
                                data={storageStats!}
                                isAdmin={isAdmin}
                                onActionChangeName={onStorageNameActionChange}
                            />
                        </Grid.Col>
                    </Grid>
                </ScrollArea>
            )}
        </Container>
    );
}

export default DashboardInfoPage;
