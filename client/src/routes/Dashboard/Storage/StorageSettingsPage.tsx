import { useEffect } from "react";
import apiClient from "../../../common/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Container, LoadingOverlay } from "@mantine/core";

function DashboardSettingPage() {
    const navigate = useNavigate();
    const { id: storageId } = useParams();

    const [visible, { toggle }] = useDisclosure(true);

    useEffect(() => {
        (async () => {
            try {
                const existsRes = await apiClient.get(`/storages/${storageId}/exists`);

                if (!existsRes.data.data) {
                    navigate("/dashboard");
                } else {
                }
            } catch (error) {
                console.log({ error });
            } finally {
                toggle();
            }
        })();
    }, []);

    return (
        <Container size="lg" h="100%" pos="relative">
            <LoadingOverlay visible={visible} overlayBlur={2} />
            DashboardSettingPage
        </Container>
    );
}

export default DashboardSettingPage;
