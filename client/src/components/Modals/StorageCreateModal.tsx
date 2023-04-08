import { Card, Button, Container, TextInput, createStyles, Grid, Center, Title, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: theme.spacing.sm,
    },
}));

interface IStorageCreateCardProps {
    onFormSubmit: (values: { name: string }) => void;
}

function StorageCreateModal({ onFormSubmit }: IStorageCreateCardProps) {
    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            name: "",
        },
    });

    return (
        <Stack spacing="sm" align="center">
            {/* <Title order={3}>Create Storage</Title> */}
            <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>
                <Grid align="end">
                    <Grid.Col span={8}>
                        <TextInput
                            required
                            placeholder="Storage name"
                            label="Storage name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button type="submit">Create</Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Stack>
    );
}

export default StorageCreateModal;
