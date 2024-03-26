import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import ApiProvider from "../api/context";
import CookiesWarning from "../components/cookies-warning";
import QueryClientProvider from "../contexts/query-client-provider";
import { theme } from "../theme";
import "./globals.css";

export const metadata = {
  title: "MyDiary",
  description: "Open source note-taking app",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <QueryClientProvider>
          <MantineProvider theme={theme}>
            <ApiProvider>
              <CookiesWarning />
              {children}
            </ApiProvider>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
