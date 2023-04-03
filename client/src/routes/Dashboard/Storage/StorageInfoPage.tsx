import { useEffect } from "react";
import apiClient from "../../../common/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Container, Grid, LoadingOverlay, Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    grid: {},
    column: {
        border: "1px solid gray",
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

            <Grid align="stretch">
                <Grid.Col className={classes.column} span={8}></Grid.Col>
                <Grid.Col className={classes.column} span={4}></Grid.Col>
                <Grid.Col className={classes.column} span={8}></Grid.Col>
                <Grid.Col className={classes.column} span={4}></Grid.Col>
            </Grid>
        </Container>
    );
}

export default DashboardInfoPage;
