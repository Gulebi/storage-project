import { Icon123, IconCoin } from "@tabler/icons-react";
import { IBuyFormProps } from "../../routes/Dashboard/ProductsPage";
import { IProduct } from "../../types";
import { Card, Flex, Grid, NumberInput, Button, Image, Text, createStyles, TextInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
    cardImage: {
        background: "#ffffff",
        borderRadius: theme.radius.md,
    },
}));

interface IBuyProductModalProps {
    onFormSubmit: ({ id, amount }: IBuyFormProps) => void;
    data: IProduct;
}

function BuyProductModal({ data, onFormSubmit }: IBuyProductModalProps) {
    const { classes } = useStyles();

    const form = useForm({
        initialValues: {
            amount: 1,
        },
    });

    return (
        <Card key={data._id} padding="lg" radius="md" w={380}>
            <Card.Section p="md">
                <Image
                    src={data.image}
                    className={classes.cardImage}
                    p="xs"
                    height={160}
                    alt={data.name}
                    fit="contain"
                />
            </Card.Section>

            <Grid gutter={0}>
                <Grid.Col span={9}>
                    <Text weight={500}>{data.name}</Text>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Text weight={500} align="end">
                        ${data.manufacturerPrice}
                    </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Text size="sm" mb="xs" color="dimmed">
                        {data.category}
                    </Text>
                </Grid.Col>
                <Grid.Col span={12}>
                    <Text size="sm" mb="sm">
                        {data.manufacturer}
                    </Text>
                </Grid.Col>
            </Grid>

            <form
                onSubmit={form.onSubmit(({ amount }) =>
                    onFormSubmit({ amount, price: data.manufacturerPrice, id: data._id })
                )}
            >
                <Grid align="end">
                    <Grid.Col span={5}>
                        <NumberInput
                            min={1}
                            max={100}
                            placeholder="Amount"
                            label="Amount"
                            {...form.getInputProps("amount")}
                            icon={<Icon123 size="1.3rem" />}
                            stepHoldDelay={500}
                            stepHoldInterval={100}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <NumberInput
                            label="Total Price"
                            value={data.manufacturerPrice * form.values.amount}
                            sx={{ pointerEvents: "none" }}
                            icon={<IconCoin size="1.3rem" />}
                            hideControls
                        />
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Button type="submit" fullWidth>
                            Buy
                        </Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Card>
    );
}

export default BuyProductModal;
