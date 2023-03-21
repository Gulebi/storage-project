import apiClient from "../../../common/api";
import { IStorageOperation } from "@/types";
import { Container, LoadingOverlay, ScrollArea, Table, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

function DashboardHistoryPage() {
    const [products, setProducts] = useState<IStorageOperation[]>([]);

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
                const historyRes = await apiClient.get("/storages/641364bf9cb7c37fab3b1f8f/getOperationsHistory");

                setProducts(historyRes.data.data);
            } catch (error) {
                console.log({ error });
            } finally {
                toggle();
            }
        })();
    }, []);

    return (
        <>
            <LoadingOverlay visible={visible} overlayBlur={2} />

            <Container size="lg">
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
        </>
    );
}

export default DashboardHistoryPage;
