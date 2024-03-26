import { AppShellMain } from "@mantine/core";
import AppShell from "./_components/app-shell";
import AppShellHeader from "./_components/app-shell-header";
import AppShellSidebar from "./_components/app-shell-sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const loggedIn = isLoggedIn(); // FIXME: User should always be logged in inside /app route anyways
  return (
    <AppShell>
      <AppShellHeader />
      <AppShellSidebar />
      <AppShellMain className="flex flex-col">{children}</AppShellMain>
    </AppShell>
  );
}
