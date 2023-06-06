import { Container, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";
import appLogo from "@/assets/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "@/contexts/AuthContext";

export default function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <Navbar expand="md">
      <Container>
        <Link to={auth ? "/posts" : "/"} className="navbar-brand">
          <Image src={appLogo} className="h-10 w-10" alt="Logo" />
        </Link>
        {auth && (
          <>
            <Navbar.Toggle aria-controls="main-navigation" />
            <Navbar.Collapse id="main-navigation">
              <Nav className="me-auto gap-md-4">
                <NavLink className="nav-link" to="/posts">
                  Posts
                </NavLink>
                <NavLink className="nav-link" to="/profiles">
                  Profiles
                </NavLink>
              </Nav>
              <Nav className="ms-auto">
                <NavDropdown title={auth.name} id="user-info-dropdown">
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setAuth(null);
                      navigate("/login");
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}
