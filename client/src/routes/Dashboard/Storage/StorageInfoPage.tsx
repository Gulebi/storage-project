import { useEffect } from "react";
import apiClient from "../../../common/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Card, Container, Grid, Group, LoadingOverlay, Title, createStyles, Text, ScrollArea } from "@mantine/core";
import { StorageInfoCard, BalanceHistoryChartCard, SmallInfoCard } from "../../../components";
import { useQuery } from "@tanstack/react-query";
import { IStorage, IStorageStats } from "../../../types";

const useStyles = createStyles((theme) => ({
    column: {
        display: "flex",
        flexDirection: "column",
    },
}));

function DashboardInfoPage() {
    const { classes } = useStyles();
    const { id: storageId } = useParams();

    // const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);

    const {
        isLoading,
        isSuccess,
        error,
        data: storageStats,
    } = useQuery({
        queryKey: ["storageData"],
        queryFn: () => apiClient.get(`/storages/${storageId}/stats`),
        select: (data) => data.data.data as IStorageStats,
    });

    const currentUserId = localStorage.getItem("currentUserId");
    const isAdmin = currentUserId === storageStats?.adminId;

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
                            <SmallInfoCard title="Balance" data={storageStats?.totalMoney} controls={isAdmin} />
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
                            <StorageInfoCard data={storageStats!} isAdmin={isAdmin} />
                        </Grid.Col>
                    </Grid>
                </ScrollArea>
            )}
        </Container>
    );
}

export default DashboardInfoPage;
