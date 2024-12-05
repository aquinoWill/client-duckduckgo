import { Container } from "@mui/material";
import { Search } from "@/components";
import { SearchProvider } from "@/context/SearchContext";
import { AppNavBar } from "@/components/AppNavBar/AppNavBar";

export default function Home() {
  return (
    <Container>
      <SearchProvider>
        <AppNavBar>
          <Search />
        </AppNavBar>
      </SearchProvider>
    </Container>
  );
}
