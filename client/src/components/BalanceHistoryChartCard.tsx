import { IStorageStats } from "@/types";
import { Card, Title } from "@mantine/core";
import { LineChart, CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface IBalanceHistoryChartCardProps {
    data: IStorageStats["totalMoneyHistory"];
}

function BalanceHistoryChartCard({ data }: IBalanceHistoryChartCardProps) {
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
