import { Container } from "react-bootstrap";
import Header from "@/components/Common/Header";
import LoginForm from "./LoginForm";

export default function index() {
  return (
    <Container>
      <Header title="Welcome" className="text-center py-5">
        Welcome to N
      </Header>

      <LoginForm />
    </Container>
  );
}
