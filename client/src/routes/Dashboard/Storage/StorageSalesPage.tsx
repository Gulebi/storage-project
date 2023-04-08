import { IStorageProduct, IStorageSaleProduct } from "@/types";
import {
    Button,
    Container,
    Grid,
    Group,
    NumberInput,
    Popover,
    ScrollArea,
    Table,
    Title,
    Text,
    Card,
    Stack,
    TextInput,
    LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import apiClient from "../../../common/api";
import { useNavigate, useParams } from "react-router-dom";

function DashboardSalesPage() {
    const [foundData, setFoundData] = useState<IStorageProduct>();
    const [sales, setSales] = useState<IStorageSaleProduct[]>([]);
    const [opened, { close, open }] = useDisclosure(false);
    const { id: storageId } = useParams();

    const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);

    const ref = useClickOutside(() => close());

    const findForm = useForm({
        initialValues: {
            code: "",
        },
    });

    const addForm = useForm({
        initialValues: {
            amount: 1,
        },

        validate: {
            amount: (val) => (val > (foundData?.totalAmount || 1) ? `amount <= ${foundData?.totalAmount}` : null),
        },
    });

    const onFind = async ({ code }: { code: string }) => {
        if (foundData?.code !== code) {
            const res = await apiClient.post(`/storages/${storageId}/findProduct`, { productCode: code });

            if (res.data.data) {
                setFoundData(res.data.data);

                addForm.values.amount = 1;
                open();
            }
        } else {
            addForm.values.amount = 1;
            open();
        }
    };

    const onAdd = ({ amount }: { amount: number }) => {
        setSales([...sales, { ...foundData, amount } as IStorageSaleProduct]);
        findForm.values.code = "";
        close();
    };

    const onSellOne = async (product: IStorageSaleProduct) => {
        await apiClient.post(`/storages/${storageId}/sellProduct`, {
            productId: product._id,
            amount: product.amount,
        });
        setSales(sales.filter((item) => item._id !== product._id));
    };

    const onSellAll = () => {
        sales.forEach((item) => {
            apiClient.post(`/storages/${storageId}/sellProduct`, {
                productId: item._id,
                amount: item.amount,
            });
        });
        setSales([]);
    };

    const rows = sales.map((product: IStorageSaleProduct) => (
        <tr key={product._id}>
            <td>{product.code}</td>
            <td>{product.name}</td>
            <td>{product.amount}</td>
            <td>
                <Group>
                    <Button
                        color="red"
                        compact
                        onClick={() => {
                            setSales(sales.filter((item) => item._id !== product._id));
                        }}
                    >
                        Remove
                    </Button>
                    <Button compact onClick={() => onSellOne(product)}>
                        Sell One
                    </Button>
                </Group>
            </td>
        </tr>
    ));

    const ConfirmModal = () => {
        return {
            title: "Sell all products",
            children: (
                <>
                    <Stack spacing="sm" align="center">
                        <Text align="center">Are you sure you want to sell all products?</Text>
                        <Button
                            color="red"
                            onClick={() => {
                                modals.closeAll();
                                onSellAll();
                            }}
                        >
                            Sell All
                        </Button>
                    </Stack>
                </>
            ),
        };
    };

    return (
        <Container size="sm" h="100%" pos="relative">
            <LoadingOverlay visible={visible} overlayBlur={2} />
            <Title order={3} mb="md" align="center">
                Sales
            </Title>
            <Popover width="target" position="bottom" shadow="md" opened={opened}>
                <Popover.Target>
                    <form onSubmit={findForm.onSubmit((values) => onFind(values))}>
                        <Grid align="end">
                            <Grid.Col span={9}>
                                <TextInput
                                    required
                                    label="Product code"
                                    placeholder="Product code"
                                    value={findForm.values.code}
                                    onChange={(event) => findForm.setFieldValue("code", event.currentTarget.value)}
                                />
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <Button type="submit" fullWidth>
                                    Find
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>
                </Popover.Target>
                <Popover.Dropdown>
                    <Table ref={ref}>
                        <thead>
                            <tr>
                                <th style={{ width: "10%" }}>Code</th>
                                <th style={{ width: "35%" }}>Name</th>
                                <th style={{ width: "20%" }}>Total Amount</th>
                                <th style={{ width: "35%" }}>Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{foundData?.code}</td>
                                <td>{foundData?.name}</td>
                                <td>{foundData?.totalAmount}</td>
                                <td>
                                    <form onSubmit={addForm.onSubmit((values) => onAdd(values))}>
                                        <Grid>
                                            <Grid.Col span={8}>
                                                <NumberInput
                                                    required
                                                    placeholder="Amount"
                                                    min={1}
                                                    max={foundData?.totalAmount}
                                                    value={addForm.values.amount}
                                                    onChange={(value) => addForm.setFieldValue("amount", value || 1)}
                                                    error={addForm.errors.amount}
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={4}>
                                                <Button type="submit">Add</Button>
                                            </Grid.Col>
                                        </Grid>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Popover.Dropdown>
            </Popover>
            <ScrollArea>
                <Table>
                    <thead>
                        <tr>
                            <th style={{ width: "10%" }}>Code</th>
                            <th style={{ width: "35%" }}>Name</th>
                            <th style={{ width: "20%" }}>Amount</th>
                            <th style={{ width: "35%" }}>Control</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
            <Group position="center" mt="md">
                <Button size="md" onClick={() => modals.open(ConfirmModal())}>
                    Sell All
                </Button>
            </Group>
        </Container>
    );
}

export default DashboardSalesPage;
