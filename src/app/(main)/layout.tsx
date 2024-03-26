import { AppShellMain } from "@mantine/core";
import isLoggedIn from "../../utils/is-logged-in";
import AppShell from "./_components/app-shell";
import AppShellHeader from "./_components/app-shell-header";
import AppShellSidebar from "./_components/app-shell-sidebar";
import HeaderBorder from "./_components/header-border";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO possible change
  // light -> bg-mantine-gray-0

  const loggedIn = isLoggedIn();
  return (
    <AppShell>
      <AppShellHeader loggedIn={loggedIn} />
      <HeaderBorder />
      <AppShellSidebar loggedIn={loggedIn} />
      <AppShellMain className="flex flex-col">{children}</AppShellMain>
    </AppShell>
  );
}
