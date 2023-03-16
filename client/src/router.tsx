import { createBrowserRouter } from "react-router-dom";
import { AuthPage, MainPage } from "./routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/auth",
        element: <AuthPage />,
    },
]);

export default router;
