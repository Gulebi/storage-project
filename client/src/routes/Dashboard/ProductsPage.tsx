import apiClient from "../../common/api";
import { Card, Image, Group, Text, Button, Container, Pagination, Center, Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { IProduct } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import { BuyProductModal, ProductCard } from "../../components";

function ProductsPage() {
    const [currentlyChosen, setCurrentlyChosen] = useState<IProduct>();
    const [products, setProducts] = useState<IProduct[]>();

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

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <BuyProductModal opened={opened} close={close} data={currentlyChosen!} />

            <Container size="lg" my="md">
                <Flex m="md" gap="md" justify="space-between">
                    {products &&
                        products.map((product) => (
                            <ProductCard data={product} open={open} setCurrentlyChosen={setCurrentlyChosen} />
                        ))}
                </Flex>

                <Center>{products && <Pagination total={1}></Pagination>}</Center>
            </Container>
        </>
    );
}

export default ProductsPage;
