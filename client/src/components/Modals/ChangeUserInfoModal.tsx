import { Card, Button, Container, TextInput, Grid, Center, Title, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";

interface IChangeUserInfoModalProps {
    onFormSubmit: ({ value, field }: { value: string; field: "username" | "email" }) => void;
    field: "username" | "email";
}

function ChangeUserInfoModal({ onFormSubmit, field }: IChangeUserInfoModalProps) {
    const form = useForm({
        initialValues: {
            value: "",
        },

        validate: {
            value: (val) =>
                field === "username"
                    ? val.length > 25
                        ? "Username must be shorter than 25 characters"
                        : null
                    : /^\S+@\S+$/.test(val)
                    ? null
                    : "Invalid email",
        },
    });

    return (
        <form onSubmit={form.onSubmit(({ value }) => onFormSubmit({ value, field }))}>
            <Grid align="end">
                <Grid.Col span={8}>
                    <TextInput
                        required
                        placeholder={`New ${upperFirst(field)}`}
                        label={`New ${upperFirst(field)}`}
                        {...form.getInputProps("value")}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Button type="submit">Create</Button>
                </Grid.Col>
            </Grid>
        </form>
    );
}

export default ChangeUserInfoModal;
