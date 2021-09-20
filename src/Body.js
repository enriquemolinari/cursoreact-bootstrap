import React, { Component } from "react";
import Welcome from "./Welcome";
import Container from "react-bootstrap/Container";
import ListarPersonas from "./ListarPersonas";
import CrearPersona from "./CrearPersona";

export default class Body extends Component {
  render() {
    return (
      <Container fluid className="mainBody">
        {/*         <Welcome /> */}
        {/*         <ListarPersonas /> */}
        {/*<CrearPersona />*/}
      </Container>
    );
  }
}
