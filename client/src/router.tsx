import { createBrowserRouter } from "react-router-dom";
import {
    MainPage,
    LoginPage,
    SignupPage,
    ProductsPage,
    ErrorPage,
    DashboardMainPage,
    StorageProductsPage,
    StorageHistoryPage,
    StorageSalesPage,
    StorageInfoPage,
    StorageSelectionPage,
} from "./routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/dashboard",
        element: <DashboardMainPage />,
        children: [
            { index: true, element: <StorageSelectionPage /> },
            {
                path: "/dashboard/:id/storage/info",
                element: <StorageInfoPage />,
            },
            {
                path: "/dashboard/:id/storage/sales",
                element: <StorageSalesPage />,
            },
            {
                path: "/dashboard/:id/storage/products",
                element: <StorageProductsPage />,
            },
            {
                path: "/dashboard/:id/storage/history",
                element: <StorageHistoryPage />,
            },
            {
                path: "/dashboard/:id/products",
                element: <ProductsPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
]);

export default router;
