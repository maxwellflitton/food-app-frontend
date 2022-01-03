import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/ChoiceList.css';
import RecipeCard from "./RecipeCard";


class ChoiceList extends Component {

    constructor(props) {
      super(props);
      this.state = {
          recipes: props.Choices,
          choices: {}
      }
      this.sendChoicesBack = this.sendChoicesBack.bind(this);
    }

    handleMinus = (data) => {
        if (this.state.choices.hasOwnProperty(data) === true) {
            let newValue = this.state.choices[data] - 1;
            if (newValue > -1) {
                let newMap = this.state.choices;
                newMap[data] = newValue;
                this.setState({choices: newMap});
            }
        } else {
            let newMap = this.state.choices;
            newMap[data] = 1;
            this.setState({choices: newMap});
        }
    }
    handlePlus = (data) => {
        if (this.state.choices.hasOwnProperty(data) === true) {
            let newValue = this.state.choices[data] + 1;
            let newMap = this.state.choices;
            newMap[data] = newValue;
            this.setState({choices: newMap});
        } else {
            let newMap = this.state.choices;
            newMap[data] = 1;
            this.setState({choices: newMap});
        }
    }

    processChoiceCount(data) {
        if (data === undefined) {
            return 0
        } else {
            return data
        }
    }

    // the constructor only fires once so this is used to pass in updated props
    componentWillReceiveProps(nextProps) {
        this.setState({
            recipes: nextProps.Choices,
        })
    }

    sendChoicesBack() {
        let buffer = [];
        for (const [key, value] of Object.entries(this.state.choices)) {
            let recipe_label = key.split(' ').join('_');

            for (var i = 0; i < value; i++) {
                buffer.push(recipe_label);
            }
        }
        this.props.PassChoices(buffer);
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    {this.state.recipes.map( (recipe) =>
                        <RecipeCard
                            Title={recipe}
                            Number={this.processChoiceCount(this.state.choices[recipe])}
                            HandlePlus={this.handlePlus}
                            HandleMinus={this.handleMinus}
                        />
                    )}
                </React.Fragment>
                <div>
                    <button onClick={this.sendChoicesBack}>submit</button>
                </div>
            </div>
            );
        // if (this.props.LoginStatus == false && this.state.loadingStatus == false &&
        //     this.state.loginError === false) {
        //     return (
        //         <form className="login" onSubmit={this.submitLogin}>
        //             <h1 className="login-title">Login</h1>
        //             <input type="text" className="login-input" placeholder="Email Address" autoFocus onChange={this.handleEmailChange}
        //                    value={this.state.email} />
        //             <input type="password" className="login-input" placeholder="Password" onChange={this.handlePasswordChange}
        //                    value={this.state.password} />
        //             <input type="submit" value="Lets Go" className="login-button" />
        //         </form>
        //     );
        // }
        // else if (this.props.LoginStatus === false && this.state.loadingStatus === true &&
        //     this.state.loginError === false) {
        //
        //     return (
        //         <form className="login" onSubmit={this.submitLogin}>
        //             <h1 className="login-title">Logging in</h1>
        //             <img src={logo} />
        //         </form>
        //     );
        // } else if (this.props.LoginStatus === false && this.state.loadingStatus === false &&
        //     this.state.loginError === true) {
        //     return (
        //         <form className="login" onSubmit={this.submitLogin}>
        //             <h1 className="login-title">There's an error with the login! Please refresh to try again</h1>
        //             <h1 className="login-title">{this.loginErrorMessage}</h1>
        //         </form>
        //     )
        // } else {
        //     return (
        //         <React.Fragment>
        //             <h1 className="loggedInTitle">Welcome!</h1>
        //             <h1 className="loggedInTitle">{this.props.UserProfile["firstName"] + " " + this.props.UserProfile["secondName"]}</h1>
        //             <Link className="quizesEnterButton" to={"/quizes"}>Check Out Your Tests!</Link>
        //         </React.Fragment>
        //     )
        // }
    }

}


export default ChoiceList;
