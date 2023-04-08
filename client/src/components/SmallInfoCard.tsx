import { Card, Title, Group, ActionIcon, Text, createStyles, Stack } from "@mantine/core";
import { IconEdit, IconReload } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    dataTitle: {
        fontSize: "1.2rem",
    },
    dataText: {
        fontWeight: 900,
        fontSize: "1.5rem",
    },
}));

interface ISmallInfoCardProps {
    title: string;
    data: string | number;
    controls?: boolean;
}

function SmallInfoCard({ title, data, controls }: ISmallInfoCardProps) {
    const { classes } = useStyles();

    return (
        <Card h="100%" shadow="sm" padding="lg" radius="md" withBorder>
            <Stack justify="space-between" h="100%" spacing={0}>
                <Stack spacing={0}>
                    <Title order={4} className={classes.dataTitle}>
                        {title}
                    </Title>
                    <Text className={classes.dataText}>{data}</Text>
                </Stack>
                {controls && (
                    <Group spacing="sm">
                        <ActionIcon variant="filled" color="blue">
                            <IconEdit size="1.3rem" />
                        </ActionIcon>
                        <ActionIcon variant="filled" color="blue">
                            <IconReload size="1.3rem" />
                        </ActionIcon>
                    </Group>
                )}
            </Stack>
        </Card>
    );
}

export default SmallInfoCard;
