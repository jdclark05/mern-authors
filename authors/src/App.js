import { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import './App.css';
import Display from './components/Display';
import Form from './components/Form';
import Edit from './components/Edit';
import List from './components/List';
import axios from 'axios';

function App() {
  const [id, setId] = useState("");
  const [authors, setAuthors] = useState([]);

  const AuthorNavigate = ( data ) => {
    let id = data;
    setId(id);
    navigate(`/${id}/edit`);
  }

  const editNavigate = ( data ) => {
    let id = data;
    setId(id);
    navigate(`/${id}/edit`);
  }

  const domUpdate = () => {
    axios.get('http://localhost:8000/form/allauthors')
    .then(res=> {
        setAuthors(res.data.allAuthors)
    })
    .catch(err=>console.log("Error: ", err))
  }

  useEffect(() => {
    axios.get('http://localhost:8000/form/allauthors')
        .then(res=> {
            setAuthors(res.data.allAuthors)
        })
        .catch(err=>console.log("Error: ", err))
  }, [])
  return (
    <div className="appContainer">
      <Router>
              <List path = "/" authors={ authors } AuthorNavigate = { AuthorNavigate } onRender={ domUpdate }/>
              <Form path= "/form" onRender={ domUpdate }/>
              <Display path="/:id" id={ id } onEditNavigate={ editNavigate } />
              <Edit path="/:id/edit" onRender={ domUpdate } id={ id }/>
      </Router>
    </div>
  );
}

export default App;
