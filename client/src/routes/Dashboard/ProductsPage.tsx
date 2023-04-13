import apiClient from "../../common/api";
import { Container, Title, TextInput, Grid, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { modals } from "@mantine/modals";
import { IProduct } from "../../types";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { BuyProductModal } from "../../components";
import { useDebouncedState } from "@mantine/hooks";
import { useParams } from "react-router-dom";

export interface IBuyFormProps {
    id: string;
    price: number;
    amount: number;
}

function ProductsPage() {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<string | null>("10");
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: "name", direction: "asc" });
    const [searchValue, setSearchValue] = useDebouncedState("", 200);
    const { id: storageId } = useParams();

    const { isLoading, error, data } = useQuery({
        queryKey: ["data", page, itemsPerPage, sortStatus, searchValue],
        queryFn: () =>
            apiClient.get(
                `/products/?page=${page}&limit=${itemsPerPage}&sortField=${sortStatus.columnAccessor}&dir=${sortStatus.direction}&search=${searchValue}`
            ),
        select: (data) => data.data.data as { products: IProduct[]; count: number },
    });

    const onBuyFormSubmit = ({ id, price, amount }: IBuyFormProps) => {
        modals.closeAll();
        apiClient.post(`/storages/${storageId}/buyProduct`, { productId: id, buyingPrice: price, amount });
    };

    const onOpenModal = (data: IProduct) => {
        modals.open({
            title: "Buy Product",
            size: "auto",
            children: <BuyProductModal data={data} onFormSubmit={onBuyFormSubmit} />,
        });
    };

    return (
        <Container size="lg" my="md">
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
                        defaultValue={searchValue}
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

            <DataTable
                withBorder
                borderRadius="sm"
                withColumnBorders
                highlightOnHover
                fetching={isLoading}
                mih={150}
                records={data?.products}
                columns={[
                    { accessor: "name", width: "50%", sortable: true },
                    { accessor: "manufacturerPrice", width: "10%", title: "Price", sortable: true },
                    { accessor: "category", width: "20%", sortable: true },
                    { accessor: "manufacturer", width: "20%", sortable: true },
                ]}
                noRecordsText="No products to show"
                onRowClick={(product) => {
                    onOpenModal(product);
                }}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                page={page}
                onPageChange={setPage}
                totalRecords={data?.count}
                recordsPerPage={parseInt(itemsPerPage || "10")}
                idAccessor="_id"
            />
        </Container>
    );
}

export default ProductsPage;
