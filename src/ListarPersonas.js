import React, { Component } from "react";
import Table from "react-bootstrap/Table";

export default class ListarPersonas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personas: [],
    };
  }

  componentDidMount() {
    this.listarPersonas(this.props.searchedTxt);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchedTxt !== this.props.searchedTxt)
      this.listarPersonas(this.props.searchedTxt);
  }

  listarPersonas(searchedTxt) {
    fetch("http://localhost:1234/personas?apellido=" + searchedTxt)
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          personas: json.personas,
          resultado: json.result,
        });
      });
  }

  render() {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>nombre</th>
              <th>apellido</th>
              <th>direccion</th>
              <th>telefonos</th>
            </tr>
          </thead>
          <tbody>
            {this.state.personas.map((p, index) => (
              <tr key={index}>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.direccion && p.direccion.direccion}</td>
                <td>{p.telefonos && p.telefonos[0].numero}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
}
