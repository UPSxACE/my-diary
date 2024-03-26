import { ReactNode } from "react";

export default function SidebarBody({
  children,
}: {
  children?: Readonly<ReactNode>;
}) {
  return <div className="flex-1 border-0 flex flex-col">{children}</div>;
}
