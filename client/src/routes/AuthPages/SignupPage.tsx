import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Text, Paper, Group, Button, Anchor, Stack, Box, rem } from "@mantine/core";
import { IAuthValues } from "@/types";
import { useNavigate } from "react-router-dom";
import apiClient from "../../common/api";

function SignupPage() {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: "",
            username: "",
            password: "",
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) => (val.length < 8 ? "Password should include at least 8 characters" : null),
        },
    });

    const onFormSubmit = async (values: IAuthValues) => {
        const authRes = await apiClient.post("/auth/signup", values);

        localStorage.setItem("currentUserId", authRes?.data.data);

        navigate("/dashboard");
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
                    Sign up
                </Text>

                <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>
                    <Stack>
                        <TextInput
                            required
                            label="Username"
                            placeholder="Your username"
                            value={form.values.username}
                            onChange={(event) => form.setFieldValue("username", event.currentTarget.value)}
                            radius="md"
                        />

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
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => navigate("/login")}
                            size="xs"
                        >
                            Already have an account? Log in
                        </Anchor>

                        <Button type="submit" radius="xl">
                            Sign up
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Box>
    );
}

export default SignupPage;
