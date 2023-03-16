import { AppShell, Header, Navbar } from "@mantine/core";

function MainPage() {
    return (
        <AppShell
            padding="md"
            navbar={
                <Navbar width={{ base: 300 }} p="xs">
                    Navbar
                </Navbar>
            }
        >
            Rest App
        </AppShell>
    );
}

export default MainPage;
