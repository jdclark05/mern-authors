import React from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from '@reach/router';


const List = (props) => {
    const { authors, AuthorNavigate, onRender  } = props;

    const onEditHandler = (e, id) => {
        AuthorNavigate(id);
    }

    const onDeleteHandler = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/form/${id}/delete`)
            .then(res => {
                onRender();
            })
    }

    return(
        <div className="listMain">
             <div className="listHeader">
                 <h1>Favorite authors</h1>
             </div>
            <div>
                <p className="listSubHeader1" ><Link to="/form">Add an author</Link></p>
            </div>
            <div>
                <p className="listSubHeader2">We have quotes by:</p>
            </div>
             <div className="tableMain" >
                 <div className="tableHeaders">
                    <h3 className="header1">Author</h3>
                    <h3 className="header2">Actions available</h3> 
                 </div>

                <div className="tableSub">
                    {props.authors.map((author, index) => {
                        return(
                            <div className="tableRow" key={index}>
                                <p className="authorName" >{author.name}</p>
                                <div className="buttonsED">
                                    <button className="editButton" onClick={ (e) => onEditHandler(e, author._id)}>Edit</button>
                                    <button className="deleteButton" onClick={ (e) => onDeleteHandler(e, author._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })} 
                </div>
            </div>
        </div>
    );
}

export default List;