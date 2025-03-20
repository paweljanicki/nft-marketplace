import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import { ConnectKitProvider } from "connectkit";
import { MantineProvider } from "@mantine/core";
import { Kitchensink } from "./Kitchensink/Kitchensink.tsx";
import { CreateCollection } from "./CreateCollection/CreateCollection.tsx";
import { Collections } from "./Collections/Collections.tsx";
import { CollectionDetails } from "./CollectionDetails/CollectionDetails.tsx";
import { Mint } from "./Mint/Mint.tsx";
import { NFTDetails } from "./NFTDetails/NFTDetails.tsx";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <div>Main</div> },
      {
        path: "/create-collection",
        element: <CreateCollection />,
      },
      {
        path: "/collections",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <Collections />,
          },
          {
            path: ":address",
            element: <Outlet />,
            children: [
              {
                path: "",
                element: <CollectionDetails />,
              },
              {
                path: "mint",
                element: <Mint />,
              },
              {
                path: "nft/:tokenId",
                element: <NFTDetails />,
              },
            ],
          },
        ],
      },
      {
        path: "/kitchensink",
        element: <Kitchensink />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <MantineProvider>
            <RouterProvider router={router} />
          </MantineProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
