import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../common/api";
import { IUser } from "../types";

function useGetUserInfo({ id, enabled }: { id: string; enabled?: boolean }) {
    return useQuery({
        queryKey: ["userData", id],
        queryFn: () => apiClient.get(`/users/${id}/info`).then((res) => res.data.data),
        select: (data) => data as IUser,
        enabled,
    });
}

function useSetUserInfo({ id }: { id: string }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ value, field }: { value: string; field: "username" | "email" }) =>
            apiClient.post(`/users/${id}/setInfo`, { value, field }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userData", id] });
        },
    });
}

export default { useGetUserInfo, useSetUserInfo };
