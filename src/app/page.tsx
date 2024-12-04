import { Suspense } from "react";

import { Container } from "@mui/material";
import { Search } from "@/components/Search";
import { ListSearch } from "@/components/ListSearch";
import { SearchProvider } from "@/context/SearchContext";
import { AppNavBar } from "@/components/AppNavBar/AppNavBar";
import Loadding from "./loading";

export default async function Home() {
  return (
    <Suspense fallback={<Loadding />}>
      <Container maxWidth="lg">
        <SearchProvider>
          <AppNavBar>
            <Search />
            <ListSearch />
          </AppNavBar>
        </SearchProvider>
      </Container>
    </Suspense>
  );
}
