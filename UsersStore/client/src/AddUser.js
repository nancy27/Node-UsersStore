import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../src/addUser.css';
import NavBar from './NavBar';
import { withRouter } from 'react-router'

class AddUser extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             User : {
                 name : '',
                 course:'',
                 email:'',
                 id :''
             }
        }
    }

        
    componentDidMount() {
      console.log(this.props.match.params.id);
      fetch(`http://localhost:9000/users/${this.props.match.params.id}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            User: data,
          });
          console.log(`${this.props.match.params.id}`);
        });
    }

    handleChange = (event)=>{
        const name= event.target.name;
        const value= event.target.value;
        let User ={...this.state.User};
        User[name]=value;
      this.setState({
        User 
      });
        console.log(this.state.User);
    }

    addHandler = (event)=>{
        event.preventDefault();
        const {User} = this.state
        try{
          let result= fetch('http://localhost:9000/users/add'+ (User.id ? '/' + User.id : ''),{
            method: (User.id) ? 'PUT' : 'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(this.state.User),
          });
          console.log(result);
          
        }catch(e){
            console.log(e);
        }
      
        this.props.history.push('/edit');
      }

    render() {
       
        return (
        <div className="container">
             <NavBar />
            <h1>Form to add new User</h1>
        <form >
        <div className="wrapper">
        <label>Name</label>
        <input type="text" name="name" value={this.state.User.name} onChange={this.handleChange}></input>
        </div>
        <div className="wrapper">
        <label >email</label>
        <input type="email" name="email" value={this.state.User.email} onChange={this.handleChange}></input>
        </div>
        <div className="wrapper">
        <label>course</label>
        <input type="text" name="course" value={this.state.User.course} onChange={this.handleChange}></input>
        </div>
        <div className="wrapper">
        <label>id</label>
        <input type="number" name="id" value={this.state.User.id} onChange={this.handleChange}></input>
        </div >
        <div className="buttonwrapper">
          <button className="btn" type="submit" onClick={this.addHandler}>Add</button>
          <Link to="/users">
          <button className="btn" type="submit">cancel</button>
          </Link>
          
          </div>
          </form>
 </div>
        )
    }
}


export default withRouter(AddUser);
