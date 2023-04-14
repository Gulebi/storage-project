import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../common/api";
import { IStorageOperation, IStorageSaleProduct, IStorageStats } from "../types";
import { DataTableSortStatus } from "mantine-datatable";
import userService from "./userService";

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

interface IUseGetHistoryProps {
    id: string;
    page: number;
    limit: string | null;
    sortStatus: DataTableSortStatus;
    searchValue: string;
    enabled?: boolean;
}
function useGetHistory({ id, page, limit, sortStatus, searchValue, enabled = true }: IUseGetHistoryProps) {
    return useQuery({
        queryKey: ["history", id, page, limit, sortStatus, searchValue],
        queryFn: () =>
            apiClient
                .get(
                    `/storages/${id}/getOperationsHistory/?page=${page}&limit=${limit}&sortField=${sortStatus.columnAccessor}&dir=${sortStatus.direction}&search=${searchValue}`
                )
                .then((res) => res.data.data),
        select: (data) => data as { operations: IStorageOperation[]; count: number },
        enabled,
    });
}

function useSetName({ id }: { id: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (name: string) => apiClient.post(`/storages/${id}/setName`, { name }),
        onMutate: async (name) => {
            await queryClient.cancelQueries({ queryKey: ["stats", id] });

            queryClient.setQueryData(["stats", id], (old: any) => ({ ...old, name }));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stats", id] });
        },
    });
}

function useCreate() {
    return useMutation({
        mutationFn: ({ name, adminId }: { name: string; adminId: string }) =>
            apiClient.post(`/storages/create`, { name, adminId }),
    });
}

export default { useStorageExists, useGetStats, useSetStats, useGetHistory, useSetName, useCreate };
