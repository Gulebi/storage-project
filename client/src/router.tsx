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
                path: "/dashboard/storage/:id/info",
                element: <StorageInfoPage />,
            },
            {
                path: "/dashboard/storage/:id/sales",
                element: <StorageSalesPage />,
            },
            {
                path: "/dashboard/storage/:id/products",
                element: <StorageProductsPage />,
            },
            {
                path: "/dashboard/storage/:id/history",
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
