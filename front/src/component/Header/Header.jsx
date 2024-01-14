import {Container, Nav, Navbar} from "react-bootstrap";

export function Header() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg={"dark"}>
                <Container>
                    <Navbar.Brand href="/">Календарь расходов</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href={"/"}>Домой</Nav.Link>
                            <Nav.Link href="/createEvent">Мультисобытие</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login">Войти</Nav.Link>
                            <Nav.Link href="/registration">Регистрация</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}