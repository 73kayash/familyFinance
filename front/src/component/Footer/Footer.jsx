import {Container, Navbar} from "react-bootstrap";

export function Footer() {
    return (
            <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark" fixed="bottom" className="container">
                <Container className="justify-content-center">
                    <Navbar.Text>@ 2023-2024</Navbar.Text>
                </Container>
            </Navbar>
    )
}