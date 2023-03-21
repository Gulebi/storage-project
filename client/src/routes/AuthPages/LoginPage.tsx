import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Text, Paper, Group, Button, Checkbox, Anchor, Stack, Box, rem } from "@mantine/core";
import { IAuthValues } from "@/types";
import { useNavigate } from "react-router-dom";
import apiClient from "../../common/api";

function LoginPage() {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) => (val.length < 8 ? "Password should include at least 8 characters" : null),
        },
    });

    const onFormSubmit = async (values: IAuthValues) => {
        const authRes = await apiClient.post("/auth/login", values);

        localStorage.setItem("currentUserId", authRes?.data.data);

        navigate("/");
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
                    Welcome back to Storage
                </Text>

                <Text size="lg" weight={500} ta="center">
                    Log in
                </Text>

                <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>
                    <Stack>
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

                        <Checkbox
                            label="Remember me"
                            checked={form.values.remember}
                            onChange={(event) => form.setFieldValue("remember", event.currentTarget.checked)}
                        />
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => navigate("/signup")}
                            size="xs"
                        >
                            Don't have an account? Sign up
                        </Anchor>
                        <Button type="submit" radius="xl">
                            Log in
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Box>
    );
}

export default LoginPage;
