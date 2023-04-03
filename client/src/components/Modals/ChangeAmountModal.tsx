import { IChangeFormProps } from "@/routes/Dashboard/Storage/StorageProductsPage";
import { IStorageProduct } from "../../types";
import { Button, Grid, Group, NumberInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IChangeAmountFormValues {
    amount: number;
}

interface IChangeAmountModalProps {
    onFormSubmit: ({ value, id }: IChangeFormProps) => void;
    data: IStorageProduct;
}

function ChangeAmountModal({ onFormSubmit, data }: IChangeAmountModalProps) {
    const form = useForm<IChangeAmountFormValues>({
        initialValues: {
            amount: +data.totalAmount,
        },

        validate: {
            amount: (val) => (val < 0 ? "Price must be greater than or equal to zero" : null),
        },
    });

    return (
        <>
            <form
                onSubmit={form.onSubmit(({ amount: value }) =>
                    onFormSubmit({ value, id: data._id, field: "totalAmount" })
                )}
            >
                <Stack spacing="sm" align="center">
                    <Text>{data.name}</Text>
                    <Grid align="end">
                        <Grid.Col span={8}>
                            <NumberInput
                                required
                                label="New amount"
                                placeholder="New amount"
                                min={0}
                                {...form.getInputProps("amount")}
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

export default ChangeAmountModal;
