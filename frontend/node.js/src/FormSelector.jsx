import React from 'react';
import ReactDOM from 'react-dom';
import "materialize-css/dist/css/materialize.min.css";

import CreateRecipeForm from "./CreateRecipeForm";
import EditRecipeForm from "./EditRecipeForm";

require("regenerator-runtime/runtime");

function FormSelector(app, data) {
    let components = {
        "CreateRecipeForm": <CreateRecipeForm data={data}/>,
        "EditRecipeForm": <EditRecipeForm data={data}/>
    };

    let component = components[app];


    ReactDOM.render(
        component,
        document.getElementById('root')
    );
}


export {FormSelector}