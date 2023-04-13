import { Container, ScrollArea, Title } from "@mantine/core";
import { useState } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useDebouncedState } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { storageService } from "../../../services";

function DashboardHistoryPage() {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<string | null>("10");
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: "name", direction: "asc" });
    const [searchValue, setSearchValue] = useDebouncedState("", 200);
    const { id: storageId } = useParams();

    const { isLoading, data } = storageService.useGetHistory({
        id: storageId!,
        page,
        limit: itemsPerPage,
        sortStatus,
        searchValue,
    });

    return (
        <Container size="lg" h="100%" pos="relative">
            <Title order={3} mb="md" align="center">
                Operations History
            </Title>

            <ScrollArea>
                <DataTable
                    withBorder
                    borderRadius="sm"
                    withColumnBorders
                    highlightOnHover
                    fetching={isLoading}
                    mih={150}
                    records={data?.operations}
                    columns={[
                        { accessor: "name", width: "50%", sortable: true },
                        { accessor: "operationName", width: "20%", sortable: true },
                        { accessor: "amount", width: "10%", sortable: true },
                        { accessor: "operationDate", width: "20%", sortable: true },
                    ]}
                    noRecordsText="No operations to show"
                    onRowClick={(operation) => {
                        // onOpenModal(operation);
                    }}
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

export default DashboardHistoryPage;
