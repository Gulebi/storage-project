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
    Grid,
    Select,
    TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IStorageProduct } from "../../../types";
import apiClient from "../../../common/api";
import { upperFirst, useDebouncedState, useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeAmountModal, ChangePriceModal } from "../../../components";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { productsService, storageService } from "../../../services";

export interface IChangeFormProps {
    value: number;
    id: string;
    field: string;
}

function DashboardProductsPage() {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<string | null>("10");
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: "name", direction: "asc" });
    const [searchValue, setSearchValue] = useDebouncedState("", 200);
    const { id: storageId } = useParams();

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

    const openConfirmModal = (data: IStorageProduct) => {
        modals.openConfirmModal({
            title: `Delete ${data.name} product`,
            children: <Text align="center">Are you sure you want to delete this product?</Text>,
            labels: { confirm: "Delete", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onConfirm: () => onDelete(data._id),
        });
    };

    const deleteProductMutation = productsService.useDeleteStorageProduct({ id: storageId! });

    const changeProductMutation = productsService.useChangeStorageProduct({ id: storageId! });

    const onDelete = (id: string) => {
        deleteProductMutation.mutate(id);
    };

    const onChangeFormSubmit = ({ value, id, field }: IChangeFormProps) => {
        modals.closeAll();
        changeProductMutation.mutate({ value, id, field });
    };

    const { isLoading, data } = productsService.useGetStorageProducts({
        id: storageId!,
        page,
        limit: itemsPerPage,
        sortStatus,
        searchValue,
    });

    return (
        <Container size="lg" h="100%" pos="relative">
            <Title order={3} mb="md" align="center">
                Products
            </Title>

            <Grid>
                <Grid.Col span={10}>
                    <TextInput
                        label="Search products"
                        placeholder="Search products "
                        icon={<IconSearch size="1rem" />}
                        mb="md"
                        onChange={(event) => setSearchValue(event.currentTarget.value)}
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Select
                        label="Items per page"
                        placeholder="Items per page"
                        value={itemsPerPage}
                        onChange={setItemsPerPage}
                        data={[
                            { value: "5", label: "5" },
                            { value: "10", label: "10" },
                            { value: "15", label: "15" },
                            { value: "20", label: "20" },
                        ]}
                    />
                </Grid.Col>
            </Grid>

            <ScrollArea>
                <DataTable
                    withBorder
                    borderRadius="sm"
                    withColumnBorders
                    highlightOnHover
                    fetching={isLoading}
                    mih={data?.products.length === 0 ? 150 : "auto"}
                    records={data?.products}
                    columns={[
                        { accessor: "code", width: "10%", sortable: true },
                        { accessor: "name", width: "35%", sortable: true },
                        { accessor: "buyingPrice", width: "15%", sortable: true },
                        {
                            accessor: "sellingPrice",
                            width: "15%",
                            sortable: true,
                            render: (product) => (
                                <Group spacing="xs" position="apart" w="60%">
                                    {product.sellingPrice}
                                    <ActionIcon
                                        color="blue"
                                        size="sm"
                                        variant="filled"
                                        onClick={() => openChangePriceModal(product)}
                                    >
                                        <IconEdit size="1rem" />
                                    </ActionIcon>
                                </Group>
                            ),
                        },
                        {
                            accessor: "totalAmount",
                            width: "15%",
                            sortable: true,
                            render: (product) => (
                                <Group spacing="xs" position="apart" w="50%">
                                    {product.totalAmount}
                                    <ActionIcon
                                        color="blue"
                                        size="sm"
                                        variant="filled"
                                        onClick={() => openChangeAmountModal(product)}
                                    >
                                        <IconEdit size="1rem" />
                                    </ActionIcon>
                                </Group>
                            ),
                        },
                        {
                            accessor: "control",
                            width: "10%",
                            render: (product) => (
                                <ActionIcon color="blue" variant="filled" onClick={() => openConfirmModal(product)}>
                                    <IconTrash size="1.3rem" />
                                </ActionIcon>
                            ),
                        },
                    ]}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    page={page}
                    onPageChange={setPage}
                    totalRecords={data?.count}
                    recordsPerPage={parseInt(itemsPerPage || "10")}
                    idAccessor="_id"
                />
            </ScrollArea>
        </Container>
    );
}

export default DashboardProductsPage;
