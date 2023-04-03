import { Drawer } from "@mantine/core";

interface IProfileDrawerProps {
    opened: boolean;
    close: () => void;
}

function ProfileDrawer({ opened, close }: IProfileDrawerProps) {
    return (
        <Drawer opened={opened} onClose={close} title="User info" size={400} position="right">
            {/* Drawer content */}
        </Drawer>
    );
}

export default ProfileDrawer;
