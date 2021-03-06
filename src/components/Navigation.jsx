import React from "react";
import { userStore } from "../stores/userinfo";
import { searchStore } from "../stores/search";
import { observer } from "mobx-react";
import styles from "../styling/Nav.module.css";
import "../styling/Navigation.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "@reach/router";
import { darkStore } from "../stores/darkMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSearch,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = observer(() => {
  return (
    <Navbar
      expand="sm"
      bg={darkStore.darkMode ? "dark" : "primary"}
      variant={"dark"}
      id="navbar"
      className={styles.navBar}
    >
      <Navbar.Brand as={Link} to="/" className={styles.brand}>
        NC{" "}
        <FontAwesomeIcon icon={faNewspaper} className={styles.newsPaperIcon} />
      </Navbar.Brand>
      <Form className={styles.form}>
        <FormControl
          aria-label="Search box"
          type="text"
          placeholder="Search"
          size="sm"
          className={styles.searchBar}
          value={searchStore.search}
          onChange={searchStore.handleChange}
        />
        <button
          className={styles.searchButton}
          onClick={searchStore.handleSubmit}
          disabled={searchStore.search.length === 0}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </Form>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        className={styles.toggle}
      />
      <Navbar.Collapse id="responsive-navbar-nav" className={styles.collapse}>
        <Nav className={styles.links}>
          <Nav.Link as={Link} to="/" className={styles.link}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/articles" className={styles.link}>
            Articles
          </Nav.Link>
          <Nav.Link as={Link} to="/topics" className={styles.link}>
            Topics
          </Nav.Link>
        </Nav>
        <Nav className={styles.profile}>
          {userStore.username ? (
            <NavDropdown
              title={userStore.username}
              id="collapsible-nav-dropdown"
              alignRight
            >
              <NavDropdown.Item as={Link} to={`/${userStore.username}`}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={userStore.logOut}>
                Log out
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={darkStore.handleDarkMode}>
                <Form>
                  <Form.Group controlId="darkModeToggleForm">
                    <Form.Label>
                      <FontAwesomeIcon icon={faMoon} className="darkModeIcon" />
                    </Form.Label>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label=""
                      className="nightModeSwitch"
                      checked={darkStore.darkMode}
                      readOnly={true}
                    />
                  </Form.Group>
                </Form>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavDropdown
              title="Log in"
              id="collapsible-nav-dropdown"
              alignRight
            >
              <NavDropdown.Item as={Link} to="/login">
                Log in
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/signup">
                Sign up
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={darkStore.handleDarkMode}>
                <Form>
                  <Form.Group controlId="darkModeToggleForm">
                    <Form.Label>
                      <FontAwesomeIcon icon={faMoon} className="darkModeIcon" />
                    </Form.Label>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label=""
                      checked={darkStore.darkMode}
                      className="nightModeSwitch"
                      readOnly={true}
                    />
                  </Form.Group>
                </Form>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default Navigation;
