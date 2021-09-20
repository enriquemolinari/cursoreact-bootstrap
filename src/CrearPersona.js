import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class CrearPersona extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      form: {
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        localidad: "",
      },
      resultado: "",
      localidades: [],
    };
  }

  handleChange(e) {
    let nombre = e.target.name;
    let valor = e.target.value;

    this.setState((state) => ({
      form: {
        ...state.form,
        [nombre]: valor,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:1234/personas", {
      method: "POST",
      body: JSON.stringify({
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        direccion: this.state.form.direccion,
        telefonos: [this.state.form.telefono],
        localidad: this.state.form.localidad,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          this.setState({
            resultado: json.message,
          });
          return;
        }
        this.setState({
          resultado: "La persona fue creada con éxito!",
        });
      });
  }

  componentDidMount() {
    fetch("http://localhost:1234/localidades")
      .then((r) => r.json())
      .then((json) => {
        this.setState({
          localidades: json.localidades,
        });
      });
  }

  render() {
    return (
      <>
        <Form>
          <Form.Group controlId="forLocalidades">
            <Form.Label>Localidades</Form.Label>
            <Form.Control
              //isInvalid={true}
              as="select"
              onChange={this.handleChange}
            >
              {this.state.localidades.map((l) => (
                <option value={l.id}>{l.localidad}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="forNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              onChange={this.handleChange}
              value={this.state.form.nombre}
            />
          </Form.Group>
          <Form.Group controlId="forApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              onChange={this.handleChange}
              value={this.state.form.apellido}
            />
          </Form.Group>
          <Form.Group controlId="forDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              onChange={this.handleChange}
              value={this.state.form.direccion}
            />
          </Form.Group>
          <Form.Group controlId="forTelefonos">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              onChange={this.handleChange}
              value={this.state.form.telefono}
            />
          </Form.Group>
          <Button onClick={this.handleSubmit} type="submit">
            Enviar
          </Button>
        </Form>
        <p>{this.state.resultado}</p>
      </>
    );
  }
}
