import { modals } from "@mantine/modals";
import { IUser } from "../../types";
import { ActionIcon, Button, Center, Drawer, Group, Stack, Text, Title, createStyles } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ChangeUserInfoModal } from "..";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { userService } from "../../services";
import md5 from "md5";

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
    const [isChanging, setIsChanging] = useState(false);
    const [changedData, setChangedData] = useState<{ value: string; field: "username" | "email" }[]>([]);
    const queryClient = useQueryClient();
    const { classes } = useStyles();

    const setUserInfoMutation = userService.useSetUserInfo({ id: data._id });

    const imageURL = `https://www.gravatar.com/avatar/${md5(data.email.trim().toLowerCase())}/?d=mp`;

    const openChangeUserInfoModal = (defaultData: string, field: "username" | "email") => {
        modals.open({
            title: `Change ${field}`,
            children: (
                <Center>
                    <ChangeUserInfoModal
                        onFormSubmit={onChangeUserInfoFormSubmit}
                        defaultData={defaultData}
                        field={field}
                    />
                </Center>
            ),
        });
    };

    const onChangeUserInfoFormSubmit = async ({ value, field }: { value: string; field: "username" | "email" }) => {
        modals.closeAll();
        setChangedData((state) => [...state, { value, field }]);

        await queryClient.cancelQueries({ queryKey: ["userData", data._id] });

        queryClient.setQueryData(["userData", data._id], (old: any) => ({ ...old, [field]: value }));
    };

    const onChangeClick = () => {
        if (!isChanging) setIsChanging(!isChanging);
        else {
            if (changedData.length !== 0) {
                changedData.forEach((item) => {
                    setUserInfoMutation.mutate(item);
                });
            }
            setIsChanging(!isChanging);
        }
    };

    return (
        <Drawer opened={opened} onClose={close} title="User info" size={400} position="right">
            <Center>
                <Stack spacing="sm" align="center">
                    <LazyLoadImage
                        src={`${imageURL}&s=256`}
                        width={200}
                        height={200}
                        effect="blur"
                        className={classes.image}
                    />

                    <Stack spacing={0} align="center">
                        <Group position="apart">
                            <Title order={3}>{data.username}</Title>
                            {isChanging && (
                                <ActionIcon
                                    variant="filled"
                                    size="sm"
                                    color="blue"
                                    onClick={() => openChangeUserInfoModal(data.username, "username")}
                                >
                                    <IconEdit size="1rem" />
                                </ActionIcon>
                            )}
                        </Group>

                        <Group position="apart">
                            <Text>{data.email}</Text>
                            {isChanging && (
                                <ActionIcon
                                    variant="filled"
                                    size="sm"
                                    color="blue"
                                    onClick={() => openChangeUserInfoModal(data.email, "email")}
                                >
                                    <IconEdit size="1rem" />
                                </ActionIcon>
                            )}
                        </Group>
                    </Stack>
                    <Button onClick={onChangeClick}>{!isChanging ? "Change" : "Save"}</Button>
                </Stack>
            </Center>
        </Drawer>
    );
}

export default ProfileDrawer;
