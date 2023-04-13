import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../common/api";
import { IStorageSaleProduct, IStorageStats } from "../types";

function useStorageExists({
    id,
    enabled,
    onLoad,
}: {
    id: string;
    enabled?: boolean;
    onLoad?: (data: boolean) => void;
}) {
    return useQuery({
        queryKey: ["exists", id],
        queryFn: () => apiClient.get(`/storages/${id}/exists`),
        select: (data) => data.data.data as boolean,
        enabled,
        onSuccess: (data) => {
            onLoad && onLoad(data);
        },
    });
}

function useGetStats({ id, enabled }: { id: string; enabled?: boolean }) {
    return useQuery({
        queryKey: ["stats", id],
        queryFn: () => apiClient.get(`/storages/${id}/stats`).then((res) => res.data.data),
        select: (data) => data as IStorageStats,
        enabled,
    });
}

function useSetStats({ id }: { id: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (balance: number) => apiClient.post(`/storages/${id}/setBalance`, { balance }),
        onMutate: async (balance) => {
            await queryClient.cancelQueries({ queryKey: ["stats", id] });

            queryClient.setQueryData(["stats", id], (old: any) => ({ ...old, totalMoney: balance }));
        },
    });
}

export default { useStorageExists, useGetStats, useSetStats };
