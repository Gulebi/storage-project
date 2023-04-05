import { Card, Title } from "@mantine/core";
import { LineChart, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
    {
        Balance: 4000,
    },
    {
        Balance: 3000,
    },
    {
        Balance: 2000,
    },
    {
        Balance: 2780,
    },
    {
        Balance: 1890,
    },
    {
        Balance: 2390,
    },
    {
        Balance: 3490,
    },
];

function BalanceHistoryChartCard() {
    return (
        <Card w="100%" shadow="sm" padding="xl" radius="md" withBorder>
            <Title order={4} align="center" mb={15}>
                Balance History Chart
            </Title>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" strokeWidth={2} dataKey="Balance" stroke="#339af0" />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
}

export default BalanceHistoryChartCard;
