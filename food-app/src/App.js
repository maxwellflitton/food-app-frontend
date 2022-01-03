import React, { Component } from 'react';
import axios from 'axios';
import ChoiceList from "./components/ChoiceList";

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
            <div className="App">
              <p>Food app</p>
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
              <p>Food app</p>
              <React.Fragment>
                {this.state.shoppingList.map((ingredient) =>
                    <p>{ingredient}</p>
                )}
              </React.Fragment>
            </div>
          </BrowserRouter>
      );
    }
  }
}

export default App;