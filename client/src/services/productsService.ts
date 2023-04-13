import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../common/api";
import { IStorageProduct, IStorageSaleProduct, IStorageStats } from "../types";
import { DataTableSortStatus } from "mantine-datatable";
import { upperFirst } from "@mantine/hooks";

function useFindProduct({
    id,
    code,
    enabled,
    onLoad,
}: {
    id: string;
    code: string;
    enabled?: boolean;
    onLoad?: (data: IStorageProduct) => void;
}) {
    return useQuery({
        queryKey: ["findProduct", id, code],
        queryFn: () =>
            apiClient.post(`/storages/${id}/findProduct`, { productCode: code }).then((res) => res.data.data),
        select: (data) => data as IStorageProduct,
        onSuccess: (data) => {
            onLoad && onLoad(data);
        },
        enabled,
    });
}

function useSellProduct({ id }: { id: string }) {
    return useMutation({
        mutationFn: (product: IStorageSaleProduct) =>
            apiClient.post(`/storages/${id}/sellProduct`, {
                productId: product._id,
                amount: product.amount,
            }),
    });
}

interface IUseGetStorageProductsProps {
    id: string;
    page: number;
    limit: string | null;
    sortStatus: DataTableSortStatus;
    searchValue: string;
}
function useGetStorageProducts({ id, page, limit, sortStatus, searchValue }: IUseGetStorageProductsProps) {
    return useQuery({
        queryKey: ["getProducts", id, page, limit, sortStatus, searchValue],
        queryFn: () =>
            apiClient
                .get(
                    `/storages/${id}/getProducts/?page=${page}&limit=${limit}&sortField=${sortStatus.columnAccessor}&dir=${sortStatus.direction}&search=${searchValue}`
                )
                .then((res) => res.data.data),
        select: (data) => data as { products: IStorageProduct[]; count: number },
    });
}

function useDeleteStorageProduct({ id }: { id: string }) {
    return useMutation({
        mutationFn: (productId: string) => apiClient.post(`/storages/${id}/deleteProduct`, { productId }),
    });
}

function useChangeStorageProduct({ id }: { id: string }) {
    return useMutation({
        mutationFn: ({ value, id: productId, field }: { value: number; id: string; field: string }) =>
            apiClient.post(`/storages/${id}/changeProduct${upperFirst(field)}`, { productId, newValue: value }),
    });
}

export default {
    useSellProduct,
    useFindProduct,
    useGetStorageProducts,
    useDeleteStorageProduct,
    useChangeStorageProduct,
};
