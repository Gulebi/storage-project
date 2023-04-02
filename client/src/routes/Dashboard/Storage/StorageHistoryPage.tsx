import apiClient from "../../../common/api";
import { IStorageOperation } from "@/types";
import { Container, LoadingOverlay, ScrollArea, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";

function DashboardHistoryPage() {
    const [products, setProducts] = useState<IStorageOperation[]>([]);
    const navigate = useNavigate();
    const { id: storageId } = useParams();

    const [visible, { toggle }] = useDisclosure(true);

    const rows = products.map((product, index) => (
        <tr key={index}>
            <td>{product.name}</td>
            <td>{product.operationName}</td>
            <td>{(product?.amount || "").toString()}</td>
            <td>{new Date(product.operationDate).toUTCString()}</td>
        </tr>
    ));

    useEffect(() => {
        (async () => {
            try {
                const existsRes = await apiClient.get(`/storages/${storageId}/exists`);

                if (!existsRes.data.data) {
                    navigate("/dashboard");
                } else {
                    const historyRes = await apiClient.get(`/storages/${storageId}/getOperationsHistory`);

                    setProducts(historyRes.data.data);
                }
            } catch (error) {
                console.log({ error });
            } finally {
                toggle();
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
