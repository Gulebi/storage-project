import { Icon123, IconCoin } from "@tabler/icons-react";
import { IBuyFormProps } from "../../routes/Dashboard/ProductsPage";
import { IProduct } from "../../types";
import { Card, Grid, NumberInput, Button, Image, Text, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
    cardImage: {
        background: "#ffffff",
        borderRadius: theme.radius.md,
    },
}));

interface IBuyProductModalProps {
    onFormSubmit: ({ id, amount }: IBuyFormProps) => void;
    balance: number;
    data: IProduct;
}

function BuyProductModal({ data, balance, onFormSubmit }: IBuyProductModalProps) {
    const { classes } = useStyles();

    const [amount, setAmount] = useState(1);

    const getPrice = () => {
        return data.manufacturerPrice * amount;
    };

    const showErrorNotification = () => {
        notifications.show({
            title: "Error!",
            message: "You don't have enough money!",
            autoClose: 3000,
            color: "red",
        });
    };

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

            <Grid align="end">
                <Grid.Col span={5}>
                    <NumberInput
                        min={1}
                        max={100}
                        placeholder="Amount"
                        label="Amount"
                        value={amount}
                        onChange={(value) => setAmount(value || 1)}
                        icon={<Icon123 size="1.3rem" />}
                        stepHoldDelay={500}
                        stepHoldInterval={100}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <NumberInput
                        label="Total Price"
                        value={getPrice()}
                        precision={2}
                        sx={{ pointerEvents: "none" }}
                        icon={<IconCoin size="1.3rem" />}
                        hideControls
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Button
                        fullWidth
                        onClick={() => {
                            getPrice() > balance
                                ? showErrorNotification()
                                : onFormSubmit({ amount, price: data.manufacturerPrice, id: data._id });
                        }}
                    >
                        Buy
                    </Button>
                </Grid.Col>
            </Grid>
        </Card>
    );
}

export default BuyProductModal;
