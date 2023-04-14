import { IStorage, IStorageStats } from "../types";
import { Card, Divider, Title, Text, Group, Button, Stack, createStyles, ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

interface IStorageInfoCardProps {
    data: IStorageStats;
    isAdmin: boolean;
    onActionChangeName: () => void;
}

function StorageInfoCard({ data, isAdmin, onActionChangeName }: IStorageInfoCardProps) {
    return (
        <Card w="100%" shadow="sm" padding="xl" radius="md" withBorder>
            <Title order={4} align="center">
                Basic Info
            </Title>
            <Divider my="sm" />
            <Stack spacing={0} ml={10} mr={15}>
                <Group position="apart">
                    <div>
                        <Title order={5} fz="lg">
                            Name
                        </Title>
                        <Text fw={500}>{data.name}</Text>
                    </div>
                    {isAdmin && (
                        <ActionIcon variant="filled" color="blue" onClick={onActionChangeName}>
                            <IconEdit size="1.3rem" />
                        </ActionIcon>
                    )}
                </Group>
            </Stack>
            <Divider my="sm" />
            <Stack spacing={0} ml={10} mr={10}>
                <Title order={5} fz="lg">
                    Creation Date
                </Title>
                <Text fw={500}>{new Date(data.creationDate).toUTCString()}</Text>
            </Stack>
            {/* {isAdmin && (
                <>
                    <Divider my="sm" />
                    <Stack spacing={0} ml={10}>
                        <Title order={5} fz="lg">
                            Controls
                        </Title>
                        <Group mt={10}>
                            <Button color="red">Change Admin</Button>
                            <Button color="red">Delete</Button>
                        </Group>
                    </Stack>
                </>
            )} */}
        </Card>
    );
}

export default StorageInfoCard;
