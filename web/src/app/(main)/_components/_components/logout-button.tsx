"use client";

import { Button, MenuItem } from "@mantine/core";
import logout from "../../../../actions/logout";

export default function LogoutButton({ menuItem }: { menuItem?: Boolean }) {
  async function onClick() {
    await logout();
  }

  if (menuItem) {
    return (
      <MenuItem className="text-lg" onClick={onClick}>
        Log Out
      </MenuItem>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant="transparent"
      className="text-mantine-text"
    >
      Log Out
    </Button>
  );
}
