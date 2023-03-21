import { useEffect, useState } from "react";
import {
    Table,
    ScrollArea,
    Group,
    Text,
    Container,
    Button,
    Title,
    LoadingOverlay,
    NumberInput,
    Stack,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IStorageProduct } from "../../../types";
import apiClient from "../../../common/api";
import { upperFirst, useDisclosure } from "@mantine/hooks";

function DashboardProductsPage() {
    const [products, setProducts] = useState<IStorageProduct[]>([]);

    const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);

    const ChangeModal = (data: IStorageProduct, field: keyof IStorageProduct) => {
        return {
            title: `Change ${upperFirst(field)} field`,
            children: (
                <>
                    <Stack spacing="sm" align="center">
                        <Text>{data.name}</Text>
                        <Group>
                            <NumberInput placeholder="Change field" min={0} defaultValue={+data[field]} />
                            <Button
                                onClick={() => {
                                    modals.closeAll();
                                    onChange(data, field);
                                }}
                            >
                                Change
                            </Button>
                        </Group>
                    </Stack>
                </>
            ),
        };
    };

    const ConfirmModal = (data: IStorageProduct) => {
        return {
            title: `Delete ${data.name} product`,
            children: (
                <>
                    <Stack spacing="sm" align="center">
                        <Text align="center">Are you sure you want to delete this product?</Text>
                        <Button
                            color="red"
                            onClick={() => {
                                modals.closeAll();
                                onDelete(data._id);
                            }}
                        >
                            Delete
                        </Button>
                    </Stack>
                </>
            ),
        };
    };

    const rows = products.map((product) => (
        <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.buyingPrice}</td>
            <td>
                <Group spacing="xs">
                    {product.sellingPrice}
                    <Button
                        size="xs"
                        compact
                        onClick={() => {
                            modals.open(ChangeModal(product, "sellingPrice"));
                        }}
                    >
                        Change
                    </Button>
                </Group>
            </td>
            <td>
                <Group spacing="xs">
                    {product.totalAmount}
                    <Button
                        size="xs"
                        compact
                        onClick={() => {
                            modals.open(ChangeModal(product, "totalAmount"));
                        }}
                    >
                        Change
                    </Button>
                </Group>
            </td>
            <td>
                <Button
                    compact
                    onClick={() => {
                        modals.open(ConfirmModal(product));
                    }}
                >
                    Delete
                </Button>
            </td>
        </tr>
    ));

    const loadProducts = async () => {
        try {
            openOverlay();
            const productsRes = await apiClient.get("/storages/641364bf9cb7c37fab3b1f8f/getProducts");
            setProducts(productsRes.data.data);
        } catch (error) {
            console.log({ error });
        } finally {
            closeOverlay();
        }
    };

    const onDelete = (id: IStorageProduct["_id"]) => {
        apiClient.post("/storages/641364bf9cb7c37fab3b1f8f/deleteProduct", { productId: id });
        loadProducts();
    };

    const onChange = (data: IStorageProduct, field: string) => {
        // apiClient.post("/storages/641364bf9cb7c37fab3b1f8f/deleteProduct", { productId: data._id });
        loadProducts();
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <LoadingOverlay visible={visible} overlayBlur={2} />

            <Container size="lg">
                <Title order={3} mb="md" align="center">
                    Products
                </Title>

                <ScrollArea>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Buying Price</th>
                                <th>Selling Price</th>
                                <th>Total Amount</th>
                                <th>Control</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </ScrollArea>
            </Container>
        </>
    );
}

export default DashboardProductsPage;
