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
                <div className="footer">
                    <p></p>
                    <button className="submitButton" onClick={this.sendChoicesBack}>submit</button>
                </div>
            </div>
            );
    }

}


export default ChoiceList;
