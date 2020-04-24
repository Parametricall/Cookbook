import React, {useState} from 'react';

import {postData} from "./utilities";

function EditRecipeForm(props) {
    let data = props.data;
    console.log("Data: ", data);
    const [recipeName, setRecipeName] = useState(data.recipeName)
    const [ingredients, setIngredients] = useState(data.ingredients)
    const [method, setMethod] = useState(data.method)
    const [editMode, setEditMode] = useState(false)

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
        let value = methodCount + ". " + method[i];
        methodRows[i] = <input
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
            <input
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
        )
    }

    let FAB;
    if (editMode) {
        FAB = "save";
    } else {
        FAB = "mode_edit";
    }

    return (
        <React.Fragment>
            <div className="container">
                <form>
                    <input
                        style={{
                            width: "100%",
                            height: "9rem",
                            lineHeight: "110%",
                            fontSize: "4.2rem",
                            borderBottom: "none",
                            color: "black",
                        }}
                        onChange={handleRecipeNameChange}
                        value={recipeName}
                        disabled={!editMode}
                    />
                    <br/>
                    <label>
                        <h4>Ingredients</h4>
                        {recipeRows}
                    </label>
                    <br/>
                    <label>
                        <h4>Method</h4>
                        {methodRows}
                    </label>
                </form>

            </div>
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red" onClick={toggleEditMode}>
                    <i className="large material-icons">{FAB}</i>
                </a>
            </div>
        </React.Fragment>
    )
}

export default EditRecipeForm