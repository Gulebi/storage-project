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
    Stack,
    ActionIcon,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IStorageProduct } from "../../../types";
import apiClient from "../../../common/api";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeAmountModal, ChangePriceModal } from "../../../components";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export interface IChangeFormProps {
    value: number;
    id: string;
    field: string;
}

function DashboardProductsPage() {
    const [products, setProducts] = useState<IStorageProduct[]>([]);
    const navigate = useNavigate();
    const { id: storageId } = useParams();

    const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);

    const openChangePriceModal = (data: IStorageProduct) => {
        modals.open({
            title: "Change product price",
            children: <ChangePriceModal onFormSubmit={onChangeFormSubmit} data={data} />,
        });
    };

    const openChangeAmountModal = (data: IStorageProduct) => {
        modals.open({
            title: "Change product amount",
            children: <ChangeAmountModal onFormSubmit={onChangeFormSubmit} data={data} />,
        });
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

    const rows = products.map((product: IStorageProduct) => (
        <tr key={product._id}>
            <td>{product.code}</td>
            <td>{product.name}</td>
            <td>{product.buyingPrice}</td>
            <td>
                <Group spacing="xs">
                    {product.sellingPrice}
                    <ActionIcon color="blue" size="sm" variant="filled" onClick={() => openChangePriceModal(product)}>
                        <IconEdit size="1rem" />
                    </ActionIcon>
                </Group>
            </td>
            <td>
                <Group spacing="xs">
                    {product.totalAmount}
                    <ActionIcon color="blue" size="sm" variant="filled" onClick={() => openChangeAmountModal(product)}>
                        <IconEdit size="1rem" />
                    </ActionIcon>
                </Group>
            </td>
            <td>
                <ActionIcon
                    color="blue"
                    variant="filled"
                    onClick={() => {
                        modals.open(ConfirmModal(product));
                    }}
                >
                    <IconTrash size="1.3rem" />
                </ActionIcon>
            </td>
        </tr>
    ));

    const loadProducts = async () => {
        try {
            openOverlay();
            const productsRes = await apiClient.get(`/storages/${storageId}/getProducts`);
            setProducts(productsRes.data.data);
        } catch (error) {
            console.log({ error });
        } finally {
            closeOverlay();
        }
    };

    const onDelete = (id: IStorageProduct["_id"]) => {
        apiClient.post(`/storages/${storageId}/deleteProduct`, { productId: id });
        loadProducts();
    };

    const onChangeFormSubmit = ({ value, id, field }: IChangeFormProps) => {
        console.log(value);

        modals.closeAll();
        apiClient.post(`/storages/${storageId}/changeProduct${upperFirst(field)}`, { productId: id, newValue: value });
        loadProducts();
    };

    useEffect(() => {
        (async () => {
            const existsRes = await apiClient.get(`/storages/${storageId}/exists`);

            if (!existsRes.data.data) {
                navigate("/dashboard");
            } else {
                loadProducts();
            }
        })();
    }, []);

    return (
        <Container size="lg" h="100%" pos="relative">
            <LoadingOverlay visible={visible} overlayBlur={2} />

            <Title order={3} mb="md" align="center">
                Products
            </Title>

            <ScrollArea>
                <Table>
                    <thead>
                        <tr>
                            <th>Code</th>
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
    );
}

export default DashboardProductsPage;
