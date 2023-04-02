import { Logo } from "../components";
import { AppShell, Button, Container, createStyles, Group, Header } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },
}));

function MainPage() {
    const [isLogged, setIsLogged] = useState<boolean>();
    const { classes } = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId");

        setIsLogged(!!currentUserId);
    }, []);

    return (
        <AppShell
            header={
                <Header height={70} p="xs">
                    <Container size="xl" className={classes.header}>
                        <Logo hideVer size={2} />
                        <Group>
                            {!isLogged ? (
                                <>
                                    <Button variant="default">Login</Button>
                                    <Button>Sign up</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="default" onClick={() => navigate("/dashboard")}>
                                        Dashboards
                                    </Button>
                                    <Button>Log out</Button>
                                </>
                            )}
                        </Group>
                    </Container>
                </Header>
            }
        >
            <Container size="lg">Main Page</Container>
        </AppShell>
    );
}

export default MainPage;
