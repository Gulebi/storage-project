import { IModalProps, IProduct } from "@/types";
import {
    Card,
    Flex,
    Modal,
    Image,
    Text,
    Group,
    Button,
    createStyles,
    Center,
    NumberInput,
    SimpleGrid,
    Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface IBuyProductModalProps extends IModalProps {
    data: IProduct;
}

const useStyles = createStyles((theme) => ({
    cardImage: {
        background: "#ffffff",
        borderRadius: theme.radius.md,
    },
}));

function BuyProductModal({ opened, close, data }: IBuyProductModalProps) {
    const { classes, theme } = useStyles();

    const form = useForm({
        initialValues: {
            amount: 1,
        },
    });

    return (
        <Modal opened={opened} onClose={close} title={"Buy Product"}>
            <Center>
                <Card key={data?._id} padding="lg" radius="md" w={300}>
                    <Card.Section p="md">
                        <Image
                            src={data?.image}
                            className={classes.cardImage}
                            p="xs"
                            height={160}
                            alt={data?.name}
                            fit="contain"
                        />
                    </Card.Section>

                    <Flex justify="space-between" gap={50} mt="md">
                        <Text weight={500}>{data?.name}</Text>
                        <Text weight={500}>{data?.manufacturerPrice + "$"}</Text>
                    </Flex>
                    <Text size="sm" mb="xs" color="dimmed">
                        {data?.category}
                    </Text>
                    <Text size="sm" mb="sm">
                        {data?.manufacturer}
                    </Text>

                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
                        <Grid align="end">
                            <Grid.Col span={8}>
                                <NumberInput defaultValue={1} min={1} placeholder="Amount" label="Amount" />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Button type="submit" fullWidth>
                                    Buy
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </form>
                </Card>
            </Center>
        </Modal>
    );
}

export default BuyProductModal;
