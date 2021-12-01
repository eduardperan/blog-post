import { ReactElement } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { HomePage } from "./pages";

function App(): ReactElement {
  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>BLOG POST</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <main>
        <Container>
          <HomePage />
        </Container>
      </main>
    </div>
  );
}

export default App;
