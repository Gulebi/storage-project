import { useState } from "react";
import { Navbar, Group, Divider, NavLink, Code, Title, Button } from "@mantine/core";
import { IconLogout, IconBuildingStore, IconUserCircle, IconBuildingWarehouse } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

const data = [
    {
        label: "Storage",
        codename: "storage",
        children: [
            { link: "/dashboard/storage/info", label: "Info" },
            { link: "/dashboard/storage/sales", label: "Sales" },
            { link: "/dashboard/storage/history", label: "History" },
            { link: "/dashboard/storage/products", label: "Products" },
            { link: "/dashboard/storage/settings", label: "Setting" },
        ],
        icon: IconBuildingWarehouse,
    },
    { link: "/dashboard/products", codename: "products", label: "Browse Products", icon: IconBuildingStore },
    { link: "/dashboard/profile", codename: "profile", label: "Profile", icon: IconUserCircle },
];

function DashboardNavbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(location.pathname.split("/").at(2)!);

    console.log(location.pathname.split("/").at(-1));

    const links = data.map((item) => (
        <NavLink
            label={item.label}
            key={item.label}
            icon={<item.icon stroke={1.5} />}
            childrenOffset={36}
            onClick={() => {
                setActive(item.codename);
                if (item.link) navigate(item.link);
            }}
            active={item.codename === active}
            defaultOpened={item.codename === active}
        >
            {item.children?.map((child) => (
                <NavLink
                    label={child.label}
                    key={child.label}
                    onClick={() => {
                        navigate(child.link);
                    }}
                />
            ))}
        </NavLink>
    ));

    return (
        <Navbar width={{ sm: 300 }} p="md">
            <Navbar.Section>
                <Group position="apart">
                    <Title order={3}>StorageMaster</Title>
                    <Code sx={{ fontWeight: 700 }}>v0.0.1</Code>
                </Group>
            </Navbar.Section>

            <Divider my="sm" />

            <Navbar.Section grow>{links}</Navbar.Section>

            <Divider my="sm" />

            <Navbar.Section>
                <Group position="apart">
                    <Title order={5}>Money: 1000</Title>
                    <Button compact>Change</Button>
                </Group>
            </Navbar.Section>

            <Divider my="sm" />

            <Navbar.Section>
                <NavLink label="Log out" icon={<IconLogout stroke={1.5} />} />
            </Navbar.Section>
        </Navbar>
    );
}

export default DashboardNavbar;
