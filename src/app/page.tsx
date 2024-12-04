import { Suspense } from "react";

import { Container } from "@mui/material";
import { Search } from "@/components";
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
          </AppNavBar>
        </SearchProvider>
      </Container>
    </Suspense>
  );
}
