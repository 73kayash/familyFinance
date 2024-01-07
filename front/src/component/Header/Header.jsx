import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export function Header() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="dark" bg={"dark"}>
                <Container>
                    <Navbar.Brand href="/">Календарь расходов</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link><Link to="/">Домой</Link></Nav.Link>
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