import React, { Component } from "react";
import Welcome from "./Welcome";
import Container from "react-bootstrap/Container";
import ListarPersonas from "./ListarPersonas";
import CrearPersona from "./CrearPersona";

export default class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container fluid className="mainBody">
        {this.props.itemMenu === 0 && <Welcome />}
        {this.props.itemMenu === 1 && (
          <ListarPersonas searchedTxt={this.props.searchText} />
        )}
        {this.props.itemMenu === 2 && <CrearPersona />}
      </Container>
    );
  }
}
