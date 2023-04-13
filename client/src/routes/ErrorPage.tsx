import { createStyles, Title, Text, Button, Container, Group, rem } from "@mantine/core";
import { IRouteError } from "../types";
import { useNavigate, useRouteError } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError() as IRouteError;

    return (
        <Container>
            <Text fz={rem(100)} fw="900" align="center">
                {error.status}
            </Text>
            <Title order={1} align="center">
                An error has occurred
            </Title>
            <Text color="dimmed" size="lg" align="center">
                {error.error.message}
            </Text>
            {error.status === 404 && (
                <Group position="center">
                    <Button variant="subtle" size="md" onClick={() => navigate("/")}>
                        Take me back to home page
                    </Button>
                </Group>
            )}
        </Container>
    );
}

export default ErrorPage;
