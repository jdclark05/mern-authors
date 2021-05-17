import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { navigate, Link } from '@reach/router';

const Edit = ( props ) => {
    const { id, onRender } = props;
    const[author, setAuthor] = useState('')
    const [name, setName] = useState('');
    const [errors, setErrors] = useState("")

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/form/${props.id}/update`, {
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

    useEffect(() => {
        axios.get(`http://localhost:8000/form/${id}`)
            .then(res=> {
                setAuthor(res.data.authors)
            })
            .catch(err=>console.log("Error: ", err))
    }, [])
    if(!author){
        return(
            <div>
            <h1>Loading...</h1>
        </div>
        );
    } else {
        return (
            <div>
                <div className="formPageHeaders">
                    <h1 className="FavAuthorsText">Favorite authors</h1>
                    <p className="homeLink"><Link to="/">Home</Link></p>
                    <p className="addSubText">Edit this author:</p>
                </div>
                {author.map((author, index) => {
                    return(
                        <form className="formMain" key={index} onSubmit={onSubmitHandler}>
                            <p className="formAttributes">
                                <label className="formLabel" >Name:</label><br/>
                                <input className="formInput" type="text" placeholder={author.name} type="text" onChange={(e)=>setName(e.target.value)} value={name}/><br></br>
                                <span style={{fontSize: '1rem', color: 'red'}}>{errors ? errors: "" }</span>
                            </p>
                            <div className="formButtons">
                                <button className="cancelButton" onClick={onCancelHandler}>Cancel</button>
                                <button className="submitButton" onClick={onSubmitHandler}>Submit</button>
                            </div>
                        </form>
                    )
                })}     
            </div>
        );
    }
}

export default Edit;