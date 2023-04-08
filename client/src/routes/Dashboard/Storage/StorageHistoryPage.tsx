import apiClient from "../../../common/api";
import { IStorageOperation } from "@/types";
import { Container, LoadingOverlay, ScrollArea, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";

function DashboardHistoryPage() {
    const [operations, setOperations] = useState<IStorageOperation[]>([]);
    const { id: storageId } = useParams();

    const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);

    const rows = operations.map((operation, index) => (
        <tr key={index}>
            <td>{operation.name}</td>
            <td>{operation.operationName}</td>
            <td>{(operation?.amount || "").toString()}</td>
            <td>{new Date(operation.operationDate).toUTCString()}</td>
        </tr>
    ));

    useEffect(() => {
        (async () => {
            try {
                openOverlay();
                const historyRes = await apiClient.get(`/storages/${storageId}/getOperationsHistory`);

                setOperations(historyRes.data.data);
            } catch (error) {
                console.log({ error });
            } finally {
                closeOverlay();
            }
        })();
    }, []);

    return (
        <Container size="lg" h="100%" pos="relative">
            <LoadingOverlay visible={visible} overlayBlur={2} />

            <Title order={3} mb="md" align="center">
                Operations History
            </Title>

            <ScrollArea>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Operation</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </Container>
    );
}

export default DashboardHistoryPage;
