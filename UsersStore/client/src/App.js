import React, { Component } from "react";
import AddUser from "./AddUser";
import "./App.css";
import NavBar from '../src/NavBar';
import User from "./User";
import { withRouter } from 'react-router'
import { Link} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiResponse: "",
      Users: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:9000/users")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          Users: data,
        });
      });
  }
  async deleteHandler(id){
    await fetch(`http://localhost:9000/users/${id}`,{
        method:'DELETE',
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'}
        ,
    }).then(()=>{
        let updatedUsers=[...this.state.Users].filter(i => i.id !== id)
        this.setState({
            Users:updatedUsers              })
    })
}

  render() {
    return (
      <div className="container">
        
         
          <NavBar />
         
          <h1>Users List</h1>
      <div className="container"> 
        
        <ul >
          {this.state.Users.map((user) => (
            <li >
              Name : {user.name}
              <br/>
              Course: {user.course}
              <div>
                <Link to={`/edit/${user.id}`}>
                <button  className="btn btn-secondary " >Edit</button>
                </Link>
              
              <button className="btn btn-secondary "  onClick={()=>this.deleteHandler(user.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
        
        
        </div>
       
        
        

       
      </div>
    );
  }
}

export default withRouter(App);
