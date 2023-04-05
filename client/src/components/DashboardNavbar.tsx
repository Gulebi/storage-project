import { useEffect, useState } from "react";
import { Navbar, Group, Divider, NavLink, Code, Title, Button, ActionIcon } from "@mantine/core";
import { IconLogout, IconBuildingStore, IconBuildingWarehouse, IconReload, IconEdit } from "@tabler/icons-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Logo, ProfileDrawer, UserButton } from "../components";
import { useDisclosure } from "@mantine/hooks";

interface IDashboardNavbarProps {
    onLogOut: () => void;
    onLoadBalance: () => void;
    onChangeBalance: () => void;
    balance: number;
}

function DashboardNavbar({ onLogOut, onLoadBalance, onChangeBalance, balance }: IDashboardNavbarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(location.pathname.split("/").at(2)!);
    const { id: storageId } = useParams();

    const [drawerOpened, { open: drawerOpen, close: drawerClose }] = useDisclosure(false);

    const data = [
        {
            label: "Storage",
            codename: "storage",
            children: [
                { link: `/dashboard/storage/${storageId}/info`, label: "Info" },
                { link: `/dashboard/storage/${storageId}/sales`, label: "Sales" },
                { link: `/dashboard/storage/${storageId}/history`, label: "History" },
                { link: `/dashboard/storage/${storageId}/products`, label: "Products" },
            ],
            icon: IconBuildingWarehouse,
        },
        { link: "/dashboard/products", codename: "products", label: "Browse Products", icon: IconBuildingStore },
        // { link: "/dashboard/profile", codename: "profile", label: "Profile", icon: IconUserCircle },
    ];

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
        <>
            <ProfileDrawer opened={drawerOpened} close={drawerClose} />

            <Navbar width={{ sm: 300 }} p="md">
                <Navbar.Section>
                    <Logo />
                </Navbar.Section>

                <Divider my="sm" />

                <Navbar.Section grow>{links}</Navbar.Section>

                <Divider my="sm" />

                <UserButton
                    image="https://avatars.githubusercontent.com/u/75713653"
                    name="Guleb"
                    email="asd@mail.ru"
                    onButtonClick={drawerOpen}
                />

                <Divider my="sm" />

                {location.pathname !== `/dashboard/storage/${storageId}/info` && (
                    <>
                        <Navbar.Section>
                            <Group position="apart">
                                <Title order={5}>{`Balance: ${balance}`}</Title>
                                <Group spacing="xs">
                                    <ActionIcon variant="filled" color="blue" onClick={onChangeBalance}>
                                        <IconEdit size="1.3rem" />
                                    </ActionIcon>
                                    <ActionIcon variant="filled" color="blue" onClick={onLoadBalance}>
                                        <IconReload size="1.3rem" />
                                    </ActionIcon>
                                </Group>
                            </Group>
                        </Navbar.Section>

                        <Divider my="sm" />
                    </>
                )}

                <Navbar.Section>
                    <NavLink label="Log out" icon={<IconLogout stroke={1.5} />} onClick={onLogOut} />
                </Navbar.Section>
            </Navbar>
        </>
    );
}

export default DashboardNavbar;
