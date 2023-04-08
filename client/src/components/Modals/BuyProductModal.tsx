import { IBuyFormProps } from "../../routes/Dashboard/ProductsPage";
import { IProduct } from "../../types";
import { Card, Flex, Grid, NumberInput, Button, Image, Text, createStyles } from "@mantine/core";
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
        <Card key={data._id} padding="lg" radius="md" w={300}>
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

            <Flex justify="space-between" gap={50} mt="md">
                <Text weight={500}>{data.name}</Text>
                <Text weight={500}>{data.manufacturerPrice + "$"}</Text>
            </Flex>
            <Text size="sm" mb="xs" color="dimmed">
                {data.category}
            </Text>
            <Text size="sm" mb="sm">
                {data.manufacturer}
            </Text>

            <form
                onSubmit={form.onSubmit(({ amount }) =>
                    onFormSubmit({ amount, price: data.manufacturerPrice, id: data._id })
                )}
            >
                <Grid align="end">
                    <Grid.Col span={8}>
                        <NumberInput min={1} placeholder="Amount" label="Amount" {...form.getInputProps("amount")} />
                    </Grid.Col>
                    <Grid.Col span={4}>
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
