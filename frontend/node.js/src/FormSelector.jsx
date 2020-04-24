import React from 'react';
import ReactDOM from 'react-dom';
import "materialize-css/dist/css/materialize.min.css";

import CreateRecipeForm from "./CreateRecipeForm";
import EditRecipeForm from "./EditRecipeForm";

require("regenerator-runtime/runtime");

function FormSelector(app, data) {
    window.csrdToken = data.csrf_token || undefined;

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