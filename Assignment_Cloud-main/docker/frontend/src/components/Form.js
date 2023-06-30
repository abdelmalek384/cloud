import React, { useState, useEffect } from 'react'
import APIService from './APIService'

function Form(props) {
    
    const [username , setUsername] = useState(props.user.username)
    const [age , setAge] = useState(props.user.age)
    const [gender , setGender] = useState(props.user.gender)
    const [email , setEmail] = useState(props.user.email)

    useEffect(()=> {
        setUsername(props.user.username)
        setAge(props.user.age)
        setGender(props.user.gender)
        setEmail(props.user.email)
    },[props.user])

    const updateUser = () =>{
        APIService.UpdateUser(props.user.id,username,age,gender,email)
        .then(resp => props.updatedData(resp))
        .catch(error => console.log(error))
    }

    const addUser = () =>{
        APIService.addUser(username,age,gender,email)
        .then(resp => props.addeduser(resp))
        .catch(error => console.log(error))
    }



  return (
    <div>
        {props.user ?
            (
        
            <div className = "mb-3">
                <label htmlFor="username" className="form-lable">User Name</label>
                <input type="text" className="form-control"
                value={username}
                placeholder="Please Enter Your Name"
                onChange = {(e)=> setUsername(e.target.value)}
                />
                

                <label htmlFor="username" className="form-lable">Age</label>
                <input type="number" className="form-control"
                value={age}
                placeholder="Please Enter Your Age"
                onChange = {(e)=> setAge(e.target.value)}
                />
                

                <label htmlFor="username" className="form-lable">Gender</label>
                <input type="text" className="form-control"
                value={gender}
                onChange = {(e)=> setGender(e.target.value)}
                placeholder="Please Enter Your Genedr"
                />

                <label htmlFor="username" className="form-lable">Email</label>
                <input type="text" className="form-control"
                value={email}
                onChange = {(e)=> setEmail(e.target.value)}
                placeholder="Please Enter Your Email"
                />

                {
                    props.user.id ? 
                    <button
                    onClick={updateUser}
                    className="btn btn-success mt-3"
                    >Update</button>
                    :
                    <button
                onClick={addUser}
                className="btn btn-success mt-3"
                >Submit</button>
                }

                

            </div>
        
            ):null}
                    
        
    </div>
  )
}

export default Form
