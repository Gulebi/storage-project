import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../common/api";
import { IStorageStats } from "../types";

function useGetBalance({ id, enabled }: { id: string; enabled?: boolean }) {
    return useQuery({
        queryKey: ["balance", id],
        queryFn: () => apiClient.get(`/storages/${id}/getBalance`),
        select: (data) => data.data.data.totalMoney as number,
        enabled,
    });
}

function useSetBalance({ id }: { id: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (balance: number) => apiClient.post(`/storages/${id}/setBalance`, { balance }),
        onMutate: async (balance) => {
            await queryClient.cancelQueries({ queryKey: ["balance", id] });

            queryClient.setQueryData(["balance", id], { data: { data: { totalMoney: balance } } });
        },
    });
}

export default { useGetBalance, useSetBalance };
