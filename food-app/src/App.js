import React, { Component } from 'react';
import axios from 'axios';
import ChoiceList from "./components/ChoiceList";
import "./css/home.css"

import {
  BrowserRouter,
} from 'react-router-dom';
import './App.css';


class App extends Component {

  state = {
    loginStatus : false,
    recipesAvailable: [],
    recipesChosen: [],
    shoppingList: [],
    calculated: false
  };

  getRecipesAvailable() {
    axios.get("http://localhost:8000/get/all/",
        {headers: {"Access-Control-Allow-Origin": "*"}}).then(response => {
        this.setState({recipesAvailable: response.data["recipes"]});
    })
  }

  getShoppingList(recipeList) {
    axios.post("http://localhost:8000/create/shopping",
        {
          recipes: recipeList}).then(response => {
      this.setState({shoppingList: response.data["recipes"], calculated: true});
    })
  }

  componentWillMount() {
    this.getRecipesAvailable();
  }

  handlePassChoices = (recipeList) => {
    this.getShoppingList(recipeList);
  }

  render() {
    if (this.state.calculated === false) {
      return (
          <BrowserRouter>
            {/*<head>*/}
            {/*  <meta charSet="UTF-8"/>*/}
            {/*  <meta name="viewpoint" content="width=device-width, initial-scale=1.0"/>*/}
            {/*  <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>*/}
            {/*</head>*/}
            <div className="App">
              <p className="title">Food Choices</p>
              <ChoiceList
                  Choices={this.state.recipesAvailable}
                  HandleChoices={this.handlePassChoices}
                  PassChoices={this.handlePassChoices}
              />
            </div>
          </BrowserRouter>
      );
    } else {
      return (
          <BrowserRouter>
            <div className="App">
              <p className="title">Shopping List</p>
              <React.Fragment>
                {this.state.shoppingList.map((ingredient) =>
                    <p className="card">{ingredient}</p>
                )}
              </React.Fragment>
            </div>
          </BrowserRouter>
      );
    }
  }
}

export default App;