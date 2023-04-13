import { Stack, Grid, NumberInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";

export interface IChangeBalanceFormValues {
    balance: number;
}

function ChangeBalanceModal({
    onFormSubmit,
    defaultValue,
}: {
    onFormSubmit: (values: IChangeBalanceFormValues) => void;
    defaultValue?: number;
}) {
    const form = useForm<IChangeBalanceFormValues>({
        initialValues: {
            balance: defaultValue || 1,
        },

        validate: {
            balance: (val) => (val < 0 ? "Balance must be greater than or equal to zero" : null),
        },
    });

    return (
        <>
            <Group position="center">
                <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>
                    <Grid align="end">
                        <Grid.Col span={8}>
                            <NumberInput
                                required
                                label="New balance"
                                placeholder="New balance"
                                min={1}
                                {...form.getInputProps("balance")}
                            />
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Button type="submit">Change</Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Group>
        </>
    );
}

export default ChangeBalanceModal;
