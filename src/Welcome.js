import React, { Component } from "react";

export default class Welcome extends Component {
  render() {
    return (
      <>
        <h3>Bienvenido al Curso de React</h3>
        <p>
          En esta clase aprenderemos a dividir una aplicación en componentes.
          Además estudiaremos como utilizar conditional rendering, cómo
          comunicarnos con componentes de hijo a padres.
        </p>
      </>
    );
  }
}
