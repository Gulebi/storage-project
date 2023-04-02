import { IProduct } from "@/types";
import { Card, Image, Flex, Text, Group, Button, createStyles, Stack } from "@mantine/core";

interface IProductCardProps {
    data: IProduct;
    onOpenModal: (product: IProduct) => void;
}

const useStyles = createStyles((theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: theme.spacing.sm,
    },

    cardImage: {
        background: "#ffffff",
        borderRadius: theme.radius.md,
    },
}));

function ProductCard({ data, onOpenModal }: IProductCardProps) {
    const { classes } = useStyles();

    return (
        <Card shadow="sm" padding="lg" radius="md" w={300} className={classes.card} withBorder>
            <Stack spacing={0}>
                <Card.Section pl="md" pr="md">
                    <Image src={data.image} className={classes.cardImage} height={160} alt={data.name} fit="contain" />
                </Card.Section>
                <Flex justify="space-between" gap={50} mt="md">
                    <Text weight={500}>{data.name}</Text>
                    <Text weight={500}>{data.manufacturerPrice + "$"}</Text>
                </Flex>
                <Text size="sm" mb="xs" color="dimmed">
                    {data.category}
                </Text>
                <Text size="sm">{data.manufacturer}</Text>
            </Stack>

            <Group position="center">
                <Button
                    mt="auto"
                    onClick={() => {
                        onOpenModal(data);
                    }}
                >
                    Buy Product
                </Button>
            </Group>
        </Card>
    );
}

export default ProductCard;
