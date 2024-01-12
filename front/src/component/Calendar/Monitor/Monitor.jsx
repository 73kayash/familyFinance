import {Button, Col, Container, Navbar} from "react-bootstrap";

export function Monitor({today, prevHandler, todayHandler, nextHandler}) {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" bg={"dark"}>
            <Container className="justify-content-start ps-5">
                <Navbar.Brand className="mr-1">{today.locale('ru').format('MMMM')}</Navbar.Brand>
                <Navbar.Brand className="mr-1">{today.format('YYYY')}</Navbar.Brand>
            </Container>
            <Container className="justify-content-end">
                <Col className={"col-8 d-flex justify-content-end"}>
                    <Button variant={"outline-secondary"} size="small" onClick={prevHandler}
                            className="m-1">&lt;</Button>
                    <Button variant={"outline-secondary"} size="small" onClick={todayHandler}
                            className="m-1">Сегодня</Button>
                    <Button variant={"outline-secondary"} size="small" onClick={nextHandler}
                            className="m-1">&gt;</Button>
                </Col>
            </Container>
        </Navbar>
    )
}