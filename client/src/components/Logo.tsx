import { Code, Group, Title, TitleOrder } from "@mantine/core";

function Logo({ hideVer, size = 3 }: { hideVer?: boolean; size?: TitleOrder }) {
    return (
        <Group position="apart" align="end">
            <Title order={size}>StorageMaster</Title>
            {!hideVer && <Code sx={{ fontWeight: 700 }}>v0.0.1</Code>}
        </Group>
    );
}

export default Logo;
