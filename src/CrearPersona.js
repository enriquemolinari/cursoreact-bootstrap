import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

export default class CrearPersona extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      errors: {},
      form: {
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        localidad: "",
      },
      resultado: false,
      show: false,
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
            errors: json.errors,
            resultado: json.result,
            show: false,
          });
          return;
        }
        this.setState({
          errors: {},
          show: true,
          resultado: json.result,
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
        {this.state.resultado === "success" && (
          <Alert
            variant="success"
            dismissible={true}
            show={this.state.show}
            onClose={() => this.setState({ show: false })}
          >
            Persona creada con éxito !
          </Alert>
        )}
        <Form>
          <Form.Group controlId="forLocalidades">
            <Form.Label>Localidades</Form.Label>
            <Form.Control as="select" onChange={this.handleChange}>
              {this.state.localidades.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.localidad}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="forNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              isInvalid={this.state.errors.nombre}
              onChange={this.handleChange}
              value={this.state.form.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="forApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              isInvalid={this.state.errors.apellido}
              onChange={this.handleChange}
              value={this.state.form.apellido}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.apellido}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="forDireccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              isInvalid={this.state.errors.direccion}
              onChange={this.handleChange}
              value={this.state.form.direccion}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.direccion}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="forTelefonos">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              isInvalid={this.state.errors.telefonos}
              onChange={this.handleChange}
              value={this.state.form.telefono}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.telefonos}
            </Form.Control.Feedback>
          </Form.Group>
          <Button onClick={this.handleSubmit} type="submit">
            Enviar
          </Button>
        </Form>
      </>
    );
  }
}
