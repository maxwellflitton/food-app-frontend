import React, {Component} from 'react';
import '../css/RecipeCard.css';


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
            <div className="card">
                <p>{this.props.Title}</p>
                {/*<div className="counterSection">*/}
                    <button className="pushButton" onClick={this.innerHandlePlus}>+</button>
                    <p className="counterNumber">{this.props.Number}</p>
                    <button className="pushButton" onClick={this.innerHandleMinus}>-</button>
                {/*</div>*/}
            </div>
        );
    }

}


export default RecipeCard;
