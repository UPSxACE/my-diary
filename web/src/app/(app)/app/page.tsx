import AppPageContainer from "../../../components/page-containers/app-page-container";
import NotesContextProvider from "../_context/notes-context";
import FilterMenu from "./_components/filter-menu";
import Notes from "./_components/notes";
import SearchInput from "./_components/search-input";

export default function AppPage() {
  return (
    <AppPageContainer secondary className="">
      <NotesContextProvider>
        <header className="sticky top-0 z-10 flex w-full gap-4 bg-mantine-gray-0 p-4 dark:bg-mantine-dark-7">
          <SearchInput />
          <FilterMenu />
        </header>
        <Notes />
      </NotesContextProvider>
    </AppPageContainer>
  );
}
