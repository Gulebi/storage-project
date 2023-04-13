import { IProduct, IStorageProduct, IStorageSaleProduct } from "../../../types";
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
    Stack,
    TextInput,
    LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import apiClient from "../../../common/api";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useNavigate, useParams } from "react-router-dom";
import { storageService, productsService } from "../../../services";

function DashboardSalesPage() {
    const [searchCode, setSearchCode] = useState<string>("");
    const [sales, setSales] = useState<IStorageSaleProduct[]>([]);
    const { id: storageId } = useParams();

    const [opened, { open: openPopover, close: closePopover }] = useDisclosure(false);
    const [visible, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);

    const { data: foundData, refetch: loadSearch } = productsService.useFindProduct({
        id: storageId!,
        code: searchCode,
        enabled: false,
        onLoad: () => {
            addForm.values.amount = 1;
            openPopover();
        },
    });

    const sellProductMutation = productsService.useSellProduct({ id: storageId! });

    const ref = useClickOutside(() => closePopover());

    const addForm = useForm({
        initialValues: {
            amount: 1,
        },

        validate: {
            amount: (val) => (val > (foundData?.totalAmount || 1) ? `amount <= ${foundData?.totalAmount}` : null),
        },
    });

    const onAddOne = ({ amount }: { amount: number }) => {
        setSales([...sales, { ...foundData, amount } as IStorageSaleProduct]);
        setSearchCode("");
        closePopover();
    };

    const onSellOne = async (product: IStorageSaleProduct) => {
        setSales(sales.filter((item) => item._id !== product._id));
        sellProductMutation.mutate(product);
    };

    const onSellAll = () => {
        modals.closeAll();
        setSales([]);
        sales.forEach((item) => {
            sellProductMutation.mutate(item);
        });
    };

    const openConfirmModal = () => {
        modals.openConfirmModal({
            title: "Sell all products",
            children: <Text align="center">Are you sure you want to sell all products?</Text>,
            labels: { confirm: "Sell All", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onConfirm: onSellAll,
        });
    };

    return (
        <Container size="sm" h="100%" pos="relative">
            <LoadingOverlay visible={visible} overlayBlur={2} />

            <Title order={3} mb="md" align="center">
                Sales
            </Title>

            <Popover width="target" position="bottom" shadow="md" opened={opened}>
                <Popover.Target>
                    <Grid align="end">
                        <Grid.Col span={9}>
                            <TextInput
                                required
                                label="Product code"
                                placeholder="Product code"
                                value={searchCode}
                                onChange={(event) => setSearchCode(event.currentTarget.value)}
                            />
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Button fullWidth onClick={() => loadSearch()}>
                                Find
                            </Button>
                        </Grid.Col>
                    </Grid>
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
                                    <form onSubmit={addForm.onSubmit((values) => onAddOne(values))}>
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

            <ScrollArea mt="md">
                <DataTable
                    withBorder
                    borderRadius="sm"
                    withColumnBorders
                    striped
                    mih={sales.length === 0 ? 150 : "auto"}
                    records={sales}
                    columns={[
                        { accessor: "code", width: "10%" },
                        { accessor: "name", width: "35%" },
                        { accessor: "amount", width: "20%" },
                        {
                            accessor: "control",
                            width: "35%",
                            render: (product: IStorageSaleProduct) => (
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
                            ),
                        },
                    ]}
                    noRecordsText="No products to show"
                    idAccessor="_id"
                />
            </ScrollArea>

            <Group position="center" mt="md">
                <Button size="md" disabled={sales.length === 0} onClick={openConfirmModal}>
                    Sell All
                </Button>
            </Group>
        </Container>
    );
}

export default DashboardSalesPage;
