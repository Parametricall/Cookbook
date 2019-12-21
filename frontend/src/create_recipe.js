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
    }

    render() {
        return (
            <div className="bounding-box">
                <input/>
            </div>
        )
    }
}

class Method extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bounding-box">
                <input/>
            </div>
        )
    }
}

class CreateRecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: "",
            method: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const data = await postData('', ret_data);
        window.location.href = data.url;
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} method="POST">
                    <label>
                        <input
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>
                        <input
                            name="ingredients"
                            type="text"
                            value={this.state.ingredients}
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        <input
                            name="method"
                            type="text"
                            value={this.state.method}
                            onChange={this.handleChange} />
                    </label>

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
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    let response2 = await response;
    console.log(response);
    return await response; // parses JSON response into native JavaScript objects
}


ReactDOM.render(
    <CreateRecipeForm/>,
    document.getElementById('root')
);
