import { IStorage } from "../types";
import { Button, Card, Title, createStyles } from "@mantine/core";

interface IStorageCardProps {
    data: IStorage;
    onSelect: (id: string) => void;
}

const useStyles = createStyles((theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: theme.spacing.sm,
    },
}));

function StorageCard({ data, onSelect }: IStorageCardProps) {
    const { classes } = useStyles();

    return (
        <Card shadow="sm" padding="lg" radius="md" w={250} className={classes.card} withBorder>
            <Title order={3} align="center">
                {data.name}
            </Title>
            <Button onClick={() => onSelect(data._id)}>Go</Button>
        </Card>
    );
}

export default StorageCard;
