import React, { useState } from 'react'
import axios from 'axios';
import '../App.css';
import { navigate, Link } from '@reach/router';

const Form = (props) => {
    const { onRender  } = props;
    const [errors, setErrors] = useState("")
    const [name, setName] = useState(""); 

    const onSubmitHandler = (e) => {
        console.log("reached", )
        e.preventDefault();
        axios.post('http://localhost:8000/form/authors', {
            name
        })
        .then(res=> {
            if(res.data.error) {
                setErrors(res.data.error.errors.name.message);
            }
            if (!res.data.error) {
                onRender();
                navigate('/');
            }
            console.log(res)
        })
        .catch(err=>console.log(err))
    }

    const onCancelHandler = (e) => {
        navigate("/");
    }


    return (
        <div>
            <div className="formPageHeaders">
                <h1 className="FavAuthorsText">Favorite authors</h1>
                <p className="homeLink"><Link to="/">Home</Link></p>
                <p className="addSubText">Add a new author:</p>
            </div>
            <form onSubmit={onSubmitHandler}className="formMain">
                <p className="formAttributes">
                    <label className="formLabel" >Name:</label><br/>
                    <input className="formInput" type="text" onChange={(e)=>setName(e.target.value)} value={name}/><br></br>
                    <span style={{fontSize: '1rem', color: 'red'}}>{errors ? errors: "" }</span>
                </p>
                <div className="formButtons">
                    <button className="cancelButton" onClick={onCancelHandler}>Cancel</button>
                    <button className="submitButton" onClick={onSubmitHandler}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;