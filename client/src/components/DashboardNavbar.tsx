import { useEffect, useState } from "react";
import { Navbar, Group, Divider, NavLink, Code, Title, Button, ActionIcon } from "@mantine/core";
import { IconLogout, IconBuildingStore, IconBuildingWarehouse, IconReload, IconEdit } from "@tabler/icons-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Logo, ProfileDrawer, UserButton } from "../components";
import { useDisclosure } from "@mantine/hooks";
import { IUser } from "../types";

interface IDashboardNavbarProps {
    onLogOut: () => void;
    onLoadBalance: () => void;
    onChangeBalance: () => void;
    balance: number | undefined;
    userInfo: IUser | undefined;
}

function DashboardNavbar({ onLogOut, onLoadBalance, onChangeBalance, balance, userInfo }: IDashboardNavbarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(location.pathname.split("/").at(3)!);
    const { id: storageId } = useParams();

    const [drawerOpened, { open: drawerOpen, close: drawerClose }] = useDisclosure(false);

    const data = [
        {
            label: "Storage",
            codename: "storage",
            children: [
                { link: `/dashboard/${storageId}/storage/info`, label: "Storage Info" },
                { link: `/dashboard/${storageId}/storage/sales`, label: "Storage Sales" },
                { link: `/dashboard/${storageId}/storage/history`, label: "Storage History" },
                { link: `/dashboard/${storageId}/storage/products`, label: "Storage Products" },
            ],
            icon: IconBuildingWarehouse,
        },
        {
            link: `/dashboard/${storageId}/products`,
            codename: "products",
            label: "Browse Products",
            icon: IconBuildingStore,
        },
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
            {userInfo && <ProfileDrawer opened={drawerOpened} close={drawerClose} data={userInfo} />}

            <Navbar width={{ sm: 300 }} p="md">
                <Navbar.Section>
                    <Logo />
                </Navbar.Section>

                <Divider my="sm" />

                <Navbar.Section grow>{links}</Navbar.Section>

                {userInfo && (
                    <>
                        <Divider my="sm" />

                        <UserButton
                            image={userInfo.imageURL}
                            name={userInfo.username}
                            email={userInfo.email}
                            onButtonClick={drawerOpen}
                        />
                    </>
                )}

                <Divider my="sm" />

                {location.pathname !== `/dashboard/${storageId}/storage/info` && balance && (
                    <>
                        <Navbar.Section>
                            <Group position="apart">
                                <Title order={5}>{`Balance: $${balance}`}</Title>
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
