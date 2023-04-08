import { Code, Group, Title, TitleOrder } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function Logo({ hideVer, size = 3 }: { hideVer?: boolean; size?: TitleOrder }) {
    const navigate = useNavigate();

    return (
        <Group position="apart" align="end">
            <Title order={size} sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                StorageMaster
            </Title>
            {!hideVer && <Code sx={{ fontWeight: 700 }}>v0.0.1</Code>}
        </Group>
    );
}

export default Logo;
