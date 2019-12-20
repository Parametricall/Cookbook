import React from 'react';
import ReactDOM from 'react-dom';
const regeneratorRuntime = require("regenerator-runtime");
import Cookies from 'js-cookie'
import "materialize-css/dist/css/materialize.min.css";


class Name extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="bounding-box">
                <input/>
            </div>
        )
    }
}

class Ingredients extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
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
        return(
            <div className="bounding-box">
                <input/>
            </div>
        )
    }
}

class CreateRecipeForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="container">
                <Name/>
                <Ingredients/>
                <Method/>
            </div>
        )
    }
}



ReactDOM.render(
  <CreateRecipeForm />,
  document.getElementById('root')
);
