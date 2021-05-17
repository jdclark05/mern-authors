import { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { navigate, Link } from '@reach/router';


const Display = (props) => {
    const { onEditNavigate, id } = props;
    const [author, setAuthor] = useState("")

    const onEditHandler = (e, id) => {
        onEditNavigate(id);
    }

    const onDeleteHandler = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/form/${id}/delete`)
            .then(res => {
                navigate('/')
            })
    }


    useEffect(() => {
        axios.get(`http://localhost:8000/form/${props.id}`)
            .then(res=> {
                setAuthor(res.data.authors)
            })
            .catch(err=>console.log("Error: ", err))
    }, []);
    console.log(author);

    if (!author){
        return(
            <div>
                <h1>Sorry, That author doesn't exist in the database</h1>
                <p><Link to="/form">Click Here</Link> if you would like to add them.</p>
            </div>  
        )
    } else {
    return(
            <div className="displayMain">
                <div className="displaySecondary">
                    {author.map((author, index) => {
                        return(
                            <div key={index}>
                                <div>
                                    <h1>'{author.name}' </h1>
                                </div>
                                <div>
                                    <div>
                                        <button onClick={ (e) => onEditHandler(e, author._id)}>Edit</button>
                                    </div>
                                    <div>
                                    <button onClick={ (e) => onDeleteHandler(e, author._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })} 
                </div>
            </div>
        );
    }
}

export default Display;