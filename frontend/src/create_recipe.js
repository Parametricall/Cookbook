import React from 'react';
import ReactDOM from 'react-dom';

const regeneratorRuntime = require("regenerator-runtime");
import Cookies from 'js-cookie'
import "materialize-css/dist/css/materialize.min.css";


class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        console.log("NAME: " + this.state.name);
        return (
            <div className="bounding-box">
                <input type="text" value={this.state.name} onChange={this.handleChange}/>
            </div>
        )
    }
}

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
        let ingredients = this.state.ingredients;
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
        let method = this.state.method;
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
            </label>
        )
    }
}

class CreateRecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: [],
            method: [],
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
        ret_data.ingredients.pop();
        ret_data.method.pop();
        const data = await postData('', ret_data);
        window.location.href = data.url;
    };

    getData(name, value) {
        this.setState({
            [name]: value
        })
    }

    render() {
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
                    <br />
                    <Ingredients get_data={this.getData}/>
                    <Method get_data={this.getData}/>

                    <button className="btn waves-effect waves-light" type="submit" name="action">
                        Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}

async function postData(url = '', data = {}) {

    var csrftoken = Cookies('csrftoken');
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(response);
    return await response; // parses JSON response into native JavaScript objects
}


ReactDOM.render(
    <CreateRecipeForm/>,
    document.getElementById('root')
);
