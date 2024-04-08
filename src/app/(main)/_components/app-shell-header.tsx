import { AppShellHeader as AppShellHeaderMantine, Button } from "@mantine/core";
import Link from "next/link";
import Logo from "../../../components/logo";
import BurgerMenu from "./_components/burger-menu";
import ExpandedMenu from "./_components/expanded-menu";
import LogoutButton from "./_components/logout-button";

export default function AppShellHeader({ loggedIn }: { loggedIn: boolean }) {
  // TODO
  // Decide menu items here
  // Then pass down to components
  return (
    <AppShellHeaderMantine className="flex justify-center border-transparent">
      <div className="flex max-w-screen-lg flex-1 items-center px-4">
        <Logo />

        <BurgerMenu />
        <ExpandedMenu />

        <div className="hidden flex-1 flex-wrap items-center justify-end gap-2 xs:flex">
          {loggedIn ? (
            <>
              <LogoutButton />
              <Button component={Link} href="/app">
                My Notes
              </Button>

              {/* <Menu position="top-end">
                <MenuTarget>
                  <Button
                    variant="filled"
                    className="p-1 block h-auto text-2xl text-white  !transform-none border-none "
                  >
                    <Avatar
                      radius="xl"
                      size="lg"
                      classNames={{
                        root: 'h-auto w-auto min-w-0 min-h-0',
                        placeholder: 'bg-transparent text-white',
                        image: 'h-[2.375rem] w-[2.375rem]',
                      }}
                      src={null}
                    >
                      <RxAvatar size={28} />
                    </Avatar>
                    <IoChevronDown />
                  </Button>
                </MenuTarget>
                <MenuDropdown>
                  <MenuItem className="text-lg" component={Link} href="/app">
                    App
                  </MenuItem>
                  <LogoutButton menuItem />
                </MenuDropdown>
              </Menu> */}
            </>
          ) : (
            <>
              <Button component={Link} href="/login" variant="default">
                Log In
              </Button>
              <Button component={Link} href="/register">
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </AppShellHeaderMantine>
  );
}
