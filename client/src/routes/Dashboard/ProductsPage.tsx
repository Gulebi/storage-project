import apiClient from "../../common/api";
import {
    Card,
    Image,
    Text,
    Button,
    Container,
    Pagination,
    Center,
    Flex,
    createStyles,
    Grid,
    NumberInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import { IProduct } from "@/types";
import { ProductCard } from "../../components";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
    cardImage: {
        background: "#ffffff",
        borderRadius: theme.radius.md,
    },
}));

function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>();

    const { classes, theme } = useStyles();

    useEffect(() => {
        (async () => {
            try {
                const productsRes = await apiClient.get("/products");

                setProducts(productsRes.data.data);
            } catch (error) {
                console.log({ error });
            } finally {
            }
        })();
    }, []);

    const form = useForm({
        initialValues: {
            amount: 1,
        },
    });

    const BuyModal = (data: IProduct) => {
        return {
            title: "Buy Product",
            size: "auto",
            children: (
                <Card key={data._id} padding="lg" radius="md" w={300}>
                    <Card.Section p="md">
                        <Image
                            src={data.image}
                            className={classes.cardImage}
                            p="xs"
                            height={160}
                            alt={data?.name}
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

                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
                        <Grid align="end">
                            <Grid.Col span={8}>
                                <NumberInput defaultValue={1} min={1} placeholder="Amount" label="Amount" />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Button type="submit" fullWidth>
                                    Buy
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>
                </Card>
            ),
        };
    };

    const onOpenModal = (data: IProduct) => {
        modals.open(BuyModal(data));
    };

    return (
        <Container size="lg" my="md">
            <Flex m="md" gap="md" justify="space-between">
                {products && products.map((product) => <ProductCard data={product} onOpenModal={onOpenModal} />)}
            </Flex>

            <Center>{products && <Pagination total={1}></Pagination>}</Center>
        </Container>
    );
}

export default ProductsPage;
