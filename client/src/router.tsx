import { createBrowserRouter } from "react-router-dom";
import {
    MainPage,
    LoginPage,
    SignupPage,
    ProductsPage,
    ProfilePage,
    ErrorPage,
    DashboardMainPage,
    StorageProductsPage,
    StorageHistoryPage,
    StorageSalesPage,
    StorageSettingsPage,
    StorageInfoPage,
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
            {
                path: "/dashboard/storage/info",
                element: <StorageInfoPage />,
            },
            {
                path: "/dashboard/storage/sales",
                element: <StorageSalesPage />,
            },
            {
                path: "/dashboard/storage/products",
                element: <StorageProductsPage />,
            },
            {
                path: "/dashboard/storage/settings",
                element: <StorageSettingsPage />,
            },
            {
                path: "/dashboard/storage/history",
                element: <StorageHistoryPage />,
            },
            {
                path: "/dashboard/products",
                element: <ProductsPage />,
            },
            {
                path: "/dashboard/profile",
                element: <ProfilePage />,
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
