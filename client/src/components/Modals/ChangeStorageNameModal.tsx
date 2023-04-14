import { IChangeFormProps } from "../../routes/Dashboard/Storage/StorageProductsPage";
import { IStorage, IStorageProduct, IStorageStats } from "../../types";
import { Button, Grid, Group, NumberInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IChangeStorageNameModalProps {
    onFormSubmit: ({ name }: { name: string }) => void;
    data: IStorageStats;
}

function ChangeStorageNameModal({ onFormSubmit, data }: IChangeStorageNameModalProps) {
    const form = useForm({
        initialValues: {
            name: data.name || "",
        },
    });

    return (
        <>
            <form onSubmit={form.onSubmit(({ name }) => onFormSubmit({ name }))}>
                <Stack spacing="sm" align="center">
                    <Grid align="end">
                        <Grid.Col span={8}>
                            <TextInput
                                required
                                label="New name"
                                placeholder="New name"
                                {...form.getInputProps("name")}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Button type="submit">Change</Button>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </form>
        </>
    );
}

export default ChangeStorageNameModal;
