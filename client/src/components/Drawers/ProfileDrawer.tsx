import { modals } from "@mantine/modals";
import { IUser } from "../../types";
import {
    ActionIcon,
    Avatar,
    Button,
    Center,
    Drawer,
    Group,
    Skeleton,
    Stack,
    Text,
    TextInput,
    Title,
    createStyles,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ChangeUserInfoModal } from "..";

const useStyles = createStyles((theme) => ({
    image: {
        borderWidth: 3,
        borderStyle: "solid",
        borderColor: theme.colors.blue[6],
        borderRadius: "100%",
    },
}));

interface IProfileDrawerProps {
    opened: boolean;
    close: () => void;
    data: IUser;
}

function ProfileDrawer({ opened, close, data }: IProfileDrawerProps) {
    const { classes } = useStyles();

    const openChangeUserInfoModal = (field: "username" | "email") => {
        modals.open({
            title: `Change ${field}`,
            children: (
                <Center>
                    <ChangeUserInfoModal onFormSubmit={onChangeUserInfoFormSubmit} field={field} />
                </Center>
            ),
        });
    };

    const onChangeUserInfoFormSubmit = ({ value, field }: { value: string; field: "username" | "email" }) => {
        console.log(value, field); // add request
    };

    return (
        <Drawer opened={opened} onClose={close} title="User info" size={400} position="right">
            <Center>
                <Stack spacing="sm" align="center">
                    <LazyLoadImage
                        src={`${data.imageURL}&s=256`}
                        width={200}
                        height={200}
                        effect="blur"
                        className={classes.image}
                    />

                    <Stack spacing={0} align="center">
                        <Group position="apart">
                            <Title order={3}>{data.username}</Title>
                            <ActionIcon
                                variant="filled"
                                size="sm"
                                color="blue"
                                onClick={() => openChangeUserInfoModal("username")}
                            >
                                <IconEdit size="1rem" />
                            </ActionIcon>
                        </Group>

                        <Group position="apart">
                            <Text>{data.email}</Text>
                            <ActionIcon
                                variant="filled"
                                size="sm"
                                color="blue"
                                onClick={() => openChangeUserInfoModal("email")}
                            >
                                <IconEdit size="1rem" />
                            </ActionIcon>
                        </Group>
                    </Stack>
                </Stack>
            </Center>
        </Drawer>
    );
}

export default ProfileDrawer;
