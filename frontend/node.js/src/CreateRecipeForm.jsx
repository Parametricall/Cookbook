import React from 'react';
import ReactDOM from 'react-dom';
import "materialize-css/dist/css/materialize.min.css";

require("regenerator-runtime/runtime");

import {postData, getData} from './utilities';


class Ingredients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [
                ""
            ],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        let row_id = parseInt(e.target.id);
        let name = e.target.name;

        let ingredients = this.state.ingredients;
        ingredients[row_id] = value;

        if (row_id === ingredients.length -1) {
            ingredients.push("")
        }
        this.props.get_data(name, ingredients);
        this.setState({
            ingredients: ingredients
        });

    }

    render() {
        let ingredients = this.props.ingredients;
        if (ingredients.length === 0) {
            ingredients = [""];
        }

        let rows = [];
        for (let i = 0; i < ingredients.length; i++) {
            rows[i] = <input
                key={i}
                name="ingredients"
                type="text"
                value={ingredients[i]}
                onChange={this.handleChange}
                placeholder={"Add ingredient #" + (i+1)}
                id={i}/>
        }

        return (
            <label>
                Ingredients:
                {rows}
                <span style={{color: "red"}}>
                    errors: {this.props.errors}
                </span>
            </label>
        )
    }
}

class Method extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            method: [
                ""
            ],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        let row_id = parseInt(e.target.id);
        let name = e.target.name;

        let method = this.state.method;
        method[row_id] = value;

        if (row_id === method.length -1) {
            method.push("")
        }
        this.props.get_data(name, method);
        this.setState({
            method: method
        });

    }

    render() {
        let method = this.props.method;
        if (method.length === 0){
            method = [""];
        }
        let rows = [];
        for (let i = 0; i < method.length; i++) {
            rows[i] = <input
                key={i}
                name="method"
                type="text"
                value={method[i]}
                onChange={this.handleChange}
                placeholder={"Add method #" + (i+1)}
                id={i}/>
        }

        return (
            <label>
                Method:
                {rows}
                <span style={{color: "red"}}>
                    errors: {this.props.errors}
                </span>
            </label>
        )
    }
}

class CreateRecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: [""],
            method: [""],
            errors: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getData = this.getData.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.handlePostData();
    }

    async handlePostData() {
        let ret_data = {
            name: this.state.name,
            ingredients: this.state.ingredients,
            method: this.state.method,
        };
        // ret_data.ingredients.pop();
        // ret_data.method.pop();
        await postData('', ret_data)
            .then((response) => {
                if (response.status > 400) {
                    return {placeholder: "Something went wrong!"}
                } else if (response.url) {
                    window.location.href = response.url
                } else {
                    return response.json();
                }

            })
            .then((data) => {
                    if ("errors" in data) {
                        let errors = data["errors"];
                        this.setState({
                            errors: errors,
                        })
                    }
                }
            )
    };

    getData(name, value) {
        this.setState({
            [name]: value
        })
    }

    render() {
        let ingredient_errors, method_errors;
        if (this.state.errors) {
            let errors = this.state.errors;
            ingredient_errors = errors["ingredients"];
            method_errors = errors["method"];
        }


        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} method="POST">
                    <label>
                        Name:
                        <input
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <Ingredients ingredients={this.state.ingredients} get_data={this.getData}
                                 errors={ingredient_errors}/>
                    <br/>
                    <Method method={this.state.method} get_data={this.getData}
                            errors={method_errors}/>
                    <br/>
                    <br/>

                    <button className="btn waves-effect waves-light" type="submit" name="action">
                        Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}


export default CreateRecipeForm
