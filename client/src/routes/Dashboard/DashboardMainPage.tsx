import { DashboardNavbar } from "../../components";
import { AppShell, Code, Group, Header, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardMainPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId");

        if (!currentUserId) {
            navigate("/login");
        }
    }, []);

    return (
        <AppShell padding="md" navbar={<DashboardNavbar />}>
            <Outlet />
        </AppShell>
    );
}

export default DashboardMainPage;
