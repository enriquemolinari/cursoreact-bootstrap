import "./App.css";
import Menu from "./Menu";
import Body from "./Body";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: 0,
      searchTxt: "",
    };
    this.handleChangeItemMenu = this.handleChangeItemMenu.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChangeItemMenu(item) {
    this.setState({
      item: item,
      searchTxt: "",
    });
  }

  handleSearch(txt) {
    this.setState({
      item: 1,
      searchTxt: txt,
    });
  }

  render() {
    return (
      <>
        <Menu search={this.handleSearch} handler={this.handleChangeItemMenu} />
        <Body itemMenu={this.state.item} searchText={this.state.searchTxt} />
      </>
    );
  }
}

export default App;
