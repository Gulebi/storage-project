import { useEffect, useState } from "react";
import { StorageCard, StorageCreateModal } from "../../components";
import { Button, Center, Container, Divider, Flex, Group, Text, Title } from "@mantine/core";
import apiClient from "../../common/api";
import { modals } from "@mantine/modals";
import { IStorage } from "@/types";
import { useNavigate } from "react-router-dom";

function StorageSelectionPage() {
    const navigate = useNavigate();
    const [storages, setStorages] = useState<IStorage[]>();

    useEffect(() => {
        (async () => {
            try {
                const currentUserId = localStorage.getItem("currentUserId");

                const storagesRes = await apiClient.get(`/users/${currentUserId}/getStorages`);

                setStorages(storagesRes.data.data);
            } catch (error) {
                console.log({ error });
            } finally {
            }
        })();
    }, []);

    const onStorageCreate = async (values: { name: string }) => {
        modals.closeAll();
        console.log(values);
    };

    const onStorageSelect = async (id: string) => {
        navigate(`/dashboard/${id}/storage/info`);
    };

    const CreateModal = () => {
        return {
            title: "Create Storage",

            children: (
                <>
                    <Center>
                        <StorageCreateModal onFormSubmit={onStorageCreate} />
                    </Center>
                </>
            ),
        };
    };

    return (
        <Container size="lg" my="md">
            <Title order={3} mb="md" align="center">
                Create
            </Title>
            <Group position="center" m="md">
                <Button onClick={() => modals.open(CreateModal())}>Create Storage</Button>
            </Group>
            <Divider my="xs" label="Or" labelProps={{ fz: "lg", fw: 700 }} labelPosition="center" />
            <Title order={3} mb="md" align="center">
                Select
            </Title>
            <Flex m="md" gap="md" justify="space-evenly">
                {storages &&
                    storages.map((item) => <StorageCard key={item._id} data={item} onSelect={onStorageSelect} />)}
            </Flex>
        </Container>
    );
}

export default StorageSelectionPage;
