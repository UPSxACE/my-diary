import { Avatar, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { IoPerson } from "react-icons/io5";
import getProfileFromToken from "../../../../actions/get-profile-from-token";
export default async function SidebarHeader() {
  const userProfile = await getProfileFromToken();

  if (userProfile === null) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-col border-0 border-b border-solid border-mantine-gray-3 pb-4 dark:border-mantine-dark-4">
      <UnstyledButton
        className={"flex gap-4 rounded-sm"}
        component={Link}
        href="/app"
      >
        <Avatar
          radius="md"
          size="lg"
          classNames={{
            root: "h-auto w-auto min-w-0 min-h-0",
            placeholder: "bg-mantine-gray-5 text-white p-2", //"bg-transparent",
            image: "h-[2.375rem] w-[2.375rem]",
          }}
          src={null}
        >
          <IoPerson size={22} />
        </Avatar>
        <div className="flex h-full flex-col justify-between">
          <span className="text-lg font-semibold leading-[1]">
            {userProfile.username}
          </span>
          <span className="text-sm leading-[1] text-mantine-dimmed">
            {userProfile.role}
          </span>
        </div>
      </UnstyledButton>
    </div>
  );
}
