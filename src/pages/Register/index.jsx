import { Container } from "react-bootstrap";
import Header from "@/components/Common/Header";
import RegisterForm from "./RegisterForm";

export default function index() {
  return (
    <Container>
      <Header title="Register" className="text-center py-5">
        Welcome
      </Header>

      <RegisterForm />
    </Container>
  );
}
