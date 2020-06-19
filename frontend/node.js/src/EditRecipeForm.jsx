import React, {useState} from 'react';

import {postData} from "./utilities";

function EditRecipeForm(props) {
    let data = props.data;
    console.log("Data: ", data);
    const photo_url = data["photo_url"]
    const [recipeName, setRecipeName] = useState(data.recipeName)
    const [ingredients, setIngredients] = useState(data.ingredients)
    const [method, setMethod] = useState(data.method)
    const [editMode, setEditMode] = useState(false)
    const [image, newImage] = useState(null);

    function handleRecipeNameChange(event) {
        const newName = event.target.value;
        setRecipeName(newName);
    }

    function handleIngredientChange(event) {
        const {id, value} = event.target;
        let myID = id.replace("ingredient-", "")

        let newID;
        if (id === "new_ingredient") {
            newID = ingredients.length
        }
        setIngredients((original) => {
            let newState = [...original];
            myID = newID || myID
            newState[myID] = value;
            return newState;
        })
    }

    function addNewIngredient(event) {
        const {id, value} = event.target;
        setIngredients((original) => {
            let newState = [...original];
            let myID = id.replace("ingredient-", "")
            newState[myID] = value;
            return newState;
        })
    }

    function handleMethodChange(event) {
        const {id, value} = event.target;
        let newID;
        if (id === "new_method") {
            newID = ingredients.length;
        }
        setMethod((original) => {
            let newState = [...original];
            let myID = newID || id.replace("method-", "")
            newState[myID] = value;
            return newState;
        })
    }

    function addNewMethod(event) {
        const {id, value} = event.target;
        setMethod((original) => {
            let newState = [...original];
            let myID = id.replace("method-", "")
            newState[myID] = value;
            return newState;
        })
    }

    function handleSubmit() {
        handlePostData();
    }

    async function handlePostData() {
        let ret_data = {
            name: recipeName,
            ingredients: ingredients,
            method: method,
            image: image,
        };
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
    }

    function uploadNewPhoto(e) {
        let image = e.target.value;
        newImage(image)
    }

    function toggleEditMode() {
        if (editMode) {
            handleSubmit();
        }

        setEditMode(!editMode)
    }

    let ingredientCount = 1;
    let methodCount = 1;

    let recipeRows = [];
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i] === "") {
            continue;
        }
        let id = "ingredient-" + i;
        recipeRows[i] = <input
            key={id}
            name="ingredients"
            type="text"
            value={ingredients[i]}
            onChange={handleIngredientChange}
            id={id}
            disabled={!editMode}
            style={{
                color: "black",
                borderBottom: "1px solid black"
            }}
        />
        ingredientCount++;
    }

    let methodRows = [];
    for (let i = 0; i < method.length; i++) {
        if (method[i] === "") {
            continue;
        }
        let id = "method-" + i;
        let value = method[i];
        methodRows[i] = (<li key={id}><input
                key={id}
                name="method"
                type="text"
                value={value}
                onChange={handleMethodChange}
                id={id}
                disabled={!editMode}
                style={{
                    color: "black",
                    borderBottom: "1px solid black"
                }}
            />
            </li>
        )
        methodCount++;
    }

    if (editMode) {
        let methodId = "method-" + method.length;
        let ingredientId = "ingredient-" + ingredients.length;


        recipeRows.push(
            <input
                key={ingredientId}
                name="ingredients"
                type="text"
                value=""
                onChange={addNewIngredient}
                id={ingredientId}
                style={{
                    color: "black",
                    borderBottom: "1px solid black"
                }}
                placeholder={"Add ingredient #" + (ingredientCount)}
            />
        )
        methodRows.push(
            <li key={methodId}><input
                key={methodId}
                name="method"
                type="text"
                value=""
                onChange={addNewMethod}
                id={methodId}
                style={{
                    color: "black",
                    borderBottom: "1px solid black"
                }}
                placeholder={"Add method #" + (methodCount)}
            />
            </li>
        )
    }

    let FAB, header, imageEdit;
    if (editMode) {
        FAB = "save";
        header = <label>header<input
            onChange={handleRecipeNameChange}
            value={recipeName}
        />
        </label>
        imageEdit = (
            <div className="input-field">
                {/*<i className="material-icons left prefix">edit</i>*/}
                <input onChange={uploadNewPhoto} type="file" id="image"/>
            </div>);
    } else {
        FAB = "mode_edit";
        header = <h4>{recipeName}</h4>
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col s12 m2">
                    <div className="container">
                    <img src={photo_url} alt={recipeName} style={{"maxWidth": "250px", "paddingTop": "25px"}}/>
                        {imageEdit}
                    </div>
                </div>
                <div className="col s12 m8">
                    <div className="container">
                        <form>
                            {header}
                            <br/>
                            <label>
                                <h4>Ingredients</h4>
                                {recipeRows}
                            </label>
                            <br/>
                            <label>
                                <h4>Method</h4>
                                <ol style={{paddingLeft: "0px"}}>
                                    {methodRows}
                                </ol>
                            </label>
                        </form>

                    </div>
                    <div className="fixed-action-btn">
                        <a className="btn-floating btn-large red" onClick={toggleEditMode}>
                            <i className="large material-icons">{FAB}</i>
                        </a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EditRecipeForm