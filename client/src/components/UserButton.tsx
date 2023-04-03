import { UnstyledButton, Group, Avatar, UnstyledButtonProps, Text, createStyles, Stack } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    user: {
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },
}));

interface UserButtonProps extends UnstyledButtonProps {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
    onButtonClick?: () => void;
}

function UserButton({ image, name, email, icon, onButtonClick, ...others }: UserButtonProps) {
    const { classes } = useStyles();

    return (
        <UnstyledButton className={classes.user} {...others} onClick={onButtonClick}>
            <Group>
                <Avatar src={image} radius="xl" />

                <Stack spacing={0} mr="auto">
                    <Text size="sm" weight={500}>
                        {name}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {email}
                    </Text>
                </Stack>

                {icon || <IconChevronRight size="1rem" stroke={1.5} />}
            </Group>
        </UnstyledButton>
    );
}

export default UserButton;
