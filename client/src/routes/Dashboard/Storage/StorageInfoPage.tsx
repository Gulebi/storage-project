import { useEffect } from "react";
import apiClient from "../../../common/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Card, Container, Grid, Group, LoadingOverlay, Title, createStyles, Text, ScrollArea } from "@mantine/core";
import { StorageInfoCard, BalanceHistoryChartCard, SmallInfoCard } from "../../../components";

const useStyles = createStyles((theme) => ({
    column: {
        display: "flex",
        flexDirection: "column",
    },
}));

function DashboardInfoPage() {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { id: storageId } = useParams();

    const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);

    useEffect(() => {
        (async () => {
            try {
                openOverlay();
                const existsRes = await apiClient.get(`/storages/${storageId}/exists`);

                if (!existsRes.data.data) {
                    navigate("/dashboard");
                } else {
                }
            } catch (error) {
                console.log({ error });
            } finally {
                closeOverlay();
            }
        })();
    }, []);

    return (
        <Container size="lg" h="100%" pos="relative">
            <LoadingOverlay visible={visible} overlayBlur={2} />

            <Title order={3} mb="md" align="center">
                Storage Info
            </Title>

            <ScrollArea offsetScrollbars>
                <Grid align="stretch" mb="lg">
                    <Grid.Col span={3}>
                        <SmallInfoCard title="Balance" data={125} controls />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <SmallInfoCard title="Total products" data={12} />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <SmallInfoCard title="Total products bought" data={125} />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <SmallInfoCard title="Total products sold" data={125} />
                    </Grid.Col>
                </Grid>

                <Grid align="stretch">
                    <Grid.Col span={8} className={classes.column}>
                        <BalanceHistoryChartCard />
                    </Grid.Col>
                    <Grid.Col span={4} className={classes.column}>
                        <StorageInfoCard />
                    </Grid.Col>
                </Grid>
            </ScrollArea>
        </Container>
    );
}

export default DashboardInfoPage;
