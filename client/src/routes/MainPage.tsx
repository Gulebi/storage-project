import { Logo } from "../components";
import {
    AppShell,
    Button,
    Container,
    createStyles,
    Group,
    Header,
    Highlight,
    Title,
    Text,
    List,
    ThemeIcon,
    rem,
    Image,
    Stack,
    Grid,
} from "@mantine/core";
import { IconCheck, IconExternalLink } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/image.jpg";

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
            <Container size="lg" mt="xl">
                <Grid gutter="md" align="center">
                    <Grid.Col span={6}>
                        <Stack align="flex-start">
                            <Title>
                                <Highlight
                                    highlight="best"
                                    highlightStyles={(theme) => ({
                                        backgroundImage: theme.fn.linearGradient(
                                            45,
                                            theme.colors.cyan[5],
                                            theme.colors.indigo[5]
                                        ),
                                        fontWeight: 900,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    })}
                                >
                                    The best open-source storage management system
                                </Highlight>
                            </Title>
                            <Text color="dimmed">
                                StorageMaster is a state-of-the-art product storage management system that efficiently
                                tracks inventory and simplifies the management of storage operations. Its intuitive user
                                interface and powerful analytics make it an ideal solution for businesses of all sizes.
                            </Text>
                            <List
                                spacing="sm"
                                size="sm"
                                icon={
                                    <ThemeIcon size="sm" radius="xl">
                                        <IconCheck size="1rem" stroke={1.5} />
                                    </ThemeIcon>
                                }
                            >
                                <List.Item>
                                    <b>Efficient inventory management</b> – StorageMaster allows for accurate tracking
                                    of inventory levels and movements, enabling businesses to optimize their stock
                                    levels and reduce the risk of stockouts.
                                </List.Item>
                                <List.Item>
                                    <b>Simplified operations</b> – With its intuitive user interface and streamlined
                                    workflows, StorageMaster simplifies storage operations, reducing the time and effort
                                    required for tasks such as stocktaking and order fulfillment.
                                </List.Item>
                                <List.Item>
                                    <b>Scalability</b> – StorageMaster is highly scalable, making it suitable for
                                    businesses of all sizes, from small startups to large enterprises.
                                </List.Item>
                            </List>

                            <Group mt="sm">
                                <Button radius="xl" size="md" onClick={() => navigate("/dashboard")}>
                                    Get started
                                </Button>
                                <Button
                                    variant="default"
                                    radius="xl"
                                    size="md"
                                    leftIcon={<IconExternalLink size="1rem" />}
                                    component="a"
                                    href="https://github.com/Gulebi/storage-project"
                                >
                                    Source code
                                </Button>
                            </Group>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Image src={image}></Image>
                    </Grid.Col>
                </Grid>
            </Container>
        </AppShell>
    );
}

export default MainPage;
