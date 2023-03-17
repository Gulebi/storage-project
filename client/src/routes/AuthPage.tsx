import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Checkbox,
    Anchor,
    Stack,
    Box,
    rem,
} from "@mantine/core";
import { IAuthValues } from "@/types";

function AuthPage() {
    const [type, toggle] = useToggle(["login", "register"]);

    const form = useForm({
        initialValues: {
            email: "",
            username: "",
            password: "",
            remember: false,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) => (val.length < 8 ? "Password should include at least 8 characters" : null),
        },
    });

    const onFormSubmit = (values: IAuthValues) => {
        console.log(values);
    };

    return (
        <Box
            sx={{
                paddingTop: rem(40),
                maxWidth: rem(420),
                marginLeft: "auto",
                marginRight: "auto",
            }}
        >
            <Paper radius="md" p="xl" withBorder>
                <Text size="xl" weight={500} ta="center">
                    Welcome to Storage
                </Text>

                <Text size="lg" weight={500} ta="center">
                    {upperFirst(type)}
                </Text>

                <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>
                    <Stack>
                        {type === "register" && (
                            <TextInput
                                required
                                label="Username"
                                placeholder="Your username"
                                value={form.values.username}
                                onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="Your email"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                            error={form.errors.email && "Invalid email"}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
                            error={form.errors.password && "Password should include at least 8 characters"}
                            radius="md"
                        />

                        {type === "login" && (
                            <Checkbox
                                label="Remember me"
                                checked={form.values.remember}
                                onChange={(event) => form.setFieldValue("remember", event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor component="button" type="button" color="dimmed" onClick={() => toggle()} size="xs">
                            {type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Box>
    );
}

export default AuthPage;
