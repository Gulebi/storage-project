import apiClient from "../../../common/api";
import { IStorageOperation } from "@/types";
import { Container, LoadingOverlay, ScrollArea, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function DashboardHistoryPage() {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<string | null>("10");
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: "name", direction: "asc" });
    const [searchValue, setSearchValue] = useDebouncedState("", 200);
    const { id: storageId } = useParams();

    // const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);

    // const rows = operations.map((operation, index) => (
    //     <tr key={index}>
    //         <td>{operation.name}</td>
    //         <td>{operation.operationName}</td>
    //         <td>{(operation?.amount || "").toString()}</td>
    //         <td>{new Date(operation.operationDate).toUTCString()}</td>
    //     </tr>
    // ));

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             // openOverlay();
    //             const historyRes = await apiClient.get(`/storages/${storageId}/getOperationsHistory`);

    //             setOperations(historyRes.data.data);
    //         } catch (error) {
    //             console.log({ error });
    //         } finally {
    //             // closeOverlay();
    //         }
    //     })();
    // }, []);

    const { isLoading, error, data } = useQuery({
        queryKey: ["data", page, itemsPerPage, sortStatus, searchValue],
        queryFn: () =>
            apiClient.get(
                `/storages/${storageId}/getOperationsHistory/?page=${page}&limit=${itemsPerPage}&sortField=${sortStatus.columnAccessor}&dir=${sortStatus.direction}&search=${searchValue}`
            ),
        select: (data) => data.data.data as { operations: IStorageOperation[]; count: number },
    });

    return (
        <Container size="lg" h="100%" pos="relative">
            {/* <LoadingOverlay visible={visible} overlayBlur={2} /> */}

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
                />
            </ScrollArea>
        </Container>
    );
}

export default DashboardHistoryPage;
