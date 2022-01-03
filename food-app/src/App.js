import React, { Component } from 'react';
import axios from 'axios';
// import Header from './components/Header';
// import LoginForm from './components/LoginForm';
// import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Quizes from "./components/Quiz";
// import QuizDetail from "./components/QuizDetail"
// import Question from "./components/Question"
import ChoiceList from "./components/ChoiceList";

import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import './App.css';


class App extends Component {

  state = {
    loginStatus : false,
    recipesAvailable: [],
    recipesChosen: []
  };

  getRecipesAvailable() {
    axios.get("http://localhost:8000/get/all/",
        {headers: {"Access-Control-Allow-Origin": "*"}}).then(response => {
        this.setState({recipesAvailable: response.data["recipes"]});
    })
  }

  componentWillMount() {
    this.getRecipesAvailable();
  }

  handlePassChoices = (data) => {
    this.setState({
      recipesChosen : data,
    })
  }

  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <p>Food app</p>
            {/*<Header*/}
            {/*    LoginStatus={this.state.loginStatus}*/}
            {/*    ActionButtonMessage={this.state.actionButtonMessage}*/}
            {/*    SecondButton={this.state.secondButton}*/}
            {/*    ThirdButton={this.state.thirdButton} />*/}
            <ChoiceList Choices={this.state.recipesAvailable} HandleChoices={this.handlePassChoices}/>
            {/*<Route exact path="/" component={Home}/>*/}
            {/*<Route path="/login" component={() => <LoginForm passLoginDetails={this.handlePassLoginDetails}*/}
            {/*                                                 LoginStatus={this.state.loginStatus} UserProfile = {this.state.userProfile}*/}
            {/*                                                 QuizList={this.state.quizes} />} />*/}
            {/*<Route path="/about" component={About} />*/}
            {/*<Route path="/contact" component={Contact} />*/}
            {/*<Route path="/quizes" component={() => <Quizes QuizList={this.state.quizes} />} />*/}

            {/*<Route exact path="/QuizDetail" component={QuizDetail}/>*/}


          </div>
        </BrowserRouter>
    );
  }
}

export default App;