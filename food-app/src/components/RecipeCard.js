import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/ChoiceList.css';


class RecipeCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: props.Number,
            title: props.Title
        }
        this.innerHandleMinus = this.innerHandleMinus.bind(this);
        this.innerHandlePlus = this.innerHandlePlus.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            count: nextProps.Number,
            title: nextProps.Title
        })
    }

    innerHandlePlus = () => {
        this.props.HandlePlus(this.props.Title);
    }
    innerHandleMinus = () => {
        this.props.HandleMinus(this.props.Title);
    }

    render() {
        return (
            <div>
                <p>{this.props.Title}</p>
                <button onClick={this.innerHandlePlus}>+</button>
                <button onClick={this.innerHandleMinus}>-</button>
                <p>{this.props.Number}</p>
            </div>
        );
    }

}


export default RecipeCard;
