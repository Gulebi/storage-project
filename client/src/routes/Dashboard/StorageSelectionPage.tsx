import { StorageCard, StorageCreateModal } from "../../components";
import { Button, Center, Container, Divider, Flex, Group, Text, Title } from "@mantine/core";
import apiClient from "../../common/api";
import { modals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import { storageService, userService } from "../../services";
import { useQueryClient } from "@tanstack/react-query";

function StorageSelectionPage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createMutation = storageService.useCreate();

    const currentUserId = localStorage.getItem("currentUserId");

    const { data: storages } = userService.useGetStorages({ id: currentUserId! });

    const onStorageCreate = async ({ name }: { name: string }) => {
        modals.closeAll();
        createMutation.mutate(
            { name, adminId: currentUserId! },
            {
                onSuccess: (data) => {
                    apiClient
                        .put(`/users/${currentUserId}/addStorage`, {
                            storageId: data.data.data._id,
                            status: "admin",
                        })
                        .then(() => {
                            queryClient.invalidateQueries({ queryKey: ["userStorages", currentUserId] });
                        });
                },
            }
        );
    };

    const onStorageSelect = async (id: string) => {
        navigate(`/dashboard/${id}/storage/info`);
    };

    const CreateModal = () => {
        return {
            title: "Create Storage",

            children: (
                <Center>
                    <StorageCreateModal onFormSubmit={onStorageCreate} />
                </Center>
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
