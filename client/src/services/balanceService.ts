import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../common/api";
import { IStorageStats } from "../types";

function useGetBalance({ id, enabled }: { id: string; enabled?: boolean }) {
    return useQuery({
        queryKey: ["balance", id],
        queryFn: () => apiClient.get(`/storages/${id}/getBalance`).then((res) => res.data.data.totalMoney),
        select: (data) => data as number,
        enabled,
    });
}

function useSetBalance({ id }: { id: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (balance: number) => apiClient.post(`/storages/${id}/setBalance`, { balance }),
        onMutate: async (balance) => {
            await queryClient.cancelQueries({ queryKey: ["balance", id] });

            queryClient.setQueryData(["balance", id], balance);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["balance", id] });
        },
    });
}

export default { useGetBalance, useSetBalance };
