import Container from "../ui/Container";
import Logo from "../ui/Logo";
import SearchBox from "../ui/SearchBox";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <Container className="flex items-center justify-between py-6">

        <Logo />

        <SearchBox />

      </Container>
    </header>
  );
}