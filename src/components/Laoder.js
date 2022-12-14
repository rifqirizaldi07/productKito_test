import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <Container fluid className="min-vh-100 vh-100 h-100 text-center" style={{position: "relative"}}>
        <div style={{position: "absolute", top: "50%", left: "40%", transform: "translateY(-50%)"}}>
        <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
        </div>
    </Container>
    )
}

export default Loader