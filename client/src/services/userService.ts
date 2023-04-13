import { useQuery } from "@tanstack/react-query";
import apiClient from "../common/api";
import { IUser } from "../types";

interface IUseGetUserInfoProps {
    id: string;
    enabled?: boolean;
}

function useGetUserInfo({ id, enabled }: IUseGetUserInfoProps) {
    return useQuery({
        queryKey: ["userData", id],
        queryFn: () => apiClient.get(`/users/${id}/info`),
        select: (data) => data.data.data as IUser,
        enabled,
    });
}

export default { useGetUserInfo };
