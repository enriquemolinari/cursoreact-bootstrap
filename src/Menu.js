import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      searchTxt: "",
    };
  }

  handleClick(e, clicked) {
    e.preventDefault();
    this.props.handler(clicked);
  }

  handleSearch() {
    this.props.search(this.state.searchTxt);
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#" onClick={(e) => this.handleClick(e, 0)}>
          Curso de React
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" onClick={(e) => this.handleClick(e, 2)}>
              Crear Persona
            </Nav.Link>
            <Nav.Link href="#" onClick={(e) => this.handleClick(e, 1)}>
              Personas
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Ingrese un apellido..."
              className="mr-sm-2"
              name="searchTxt"
              onChange={(e) =>
                this.setState({
                  [e.target.name]: e.target.value,
                })
              }
              // disabling Enter key
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
            <Button variant="outline-success" onClick={this.handleSearch}>
              Buscar
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
