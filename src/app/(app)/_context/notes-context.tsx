"use client";

import {
  Context,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type OrderByOption =
  | "Latest First"
  | "Oldest First"
  | "Title A-Z"
  | "Title Z-A";

interface INotesContext {
  searchFilter: string;
  setSearchFilter: Dispatch<SetStateAction<string>>;
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  orderBy: OrderByOption;
  setOrderBy: Dispatch<SetStateAction<OrderByOption>>;
}

const defaultValue: INotesContext = {
  searchFilter: "",
  setSearchFilter: (action: SetStateAction<string>) => "",
  menuOpen: false,
  setMenuOpen: (action: SetStateAction<boolean>) => false,
  orderBy: "Latest First",
  setOrderBy: (action: SetStateAction<OrderByOption>) => false,
};

export const NotesContext: Context<INotesContext> = createContext(defaultValue);

export default function NotesContextProvider(props: {
  children: Readonly<ReactNode>;
}) {
  const [searchFilter, setSearchFilter] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderBy, setOrderBy] = useState<OrderByOption>("Latest First");

  return (
    <NotesContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        orderBy,
        setOrderBy,
        searchFilter,
        setSearchFilter,
      }}
    >
      {props.children}
    </NotesContext.Provider>
  );
}
