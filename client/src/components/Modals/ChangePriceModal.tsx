import { IChangeFormProps } from "@/routes/Dashboard/Storage/StorageProductsPage";
import { IStorageProduct } from "../../types";
import { Button, Grid, Group, NumberInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IChangePriceFormValues {
    price: number;
}

interface IChangePriceModalProps {
    onFormSubmit: ({ value, id }: IChangeFormProps) => void;
    data: IStorageProduct;
}

function ChangePriceModal({ onFormSubmit, data }: IChangePriceModalProps) {
    const form = useForm<IChangePriceFormValues>({
        initialValues: {
            price: +data.sellingPrice,
        },

        validate: {
            price: (val) => (val < 0 ? "Price must be greater than or equal to zero" : null),
        },
    });

    return (
        <>
            <form
                onSubmit={form.onSubmit(({ price: value }) =>
                    onFormSubmit({ value, id: data._id, field: "sellingPrice" })
                )}
            >
                <Stack spacing="sm" align="center">
                    <Text>{data.name}</Text>
                    <Grid align="end">
                        <Grid.Col span={8}>
                            <NumberInput
                                required
                                label="New price"
                                placeholder="New price"
                                min={0}
                                {...form.getInputProps("price")}
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

export default ChangePriceModal;
