import React from "react";
import { Button, MantineProvider, Text } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
    return (
        <MantineProvider theme={{ colorScheme: "light" }} withGlobalStyles withNormalizeCSS>
            <RouterProvider router={router} />
        </MantineProvider>
    );
}

export default App;
