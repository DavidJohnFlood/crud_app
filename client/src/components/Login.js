import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Login() {
    const { userId, setUserId } = useContext(AppContext);
    const [ createMode, setCreateMode ] = useState(false);
    const navigate = useNavigate();

    return (
        <LoginWrapper>
            <h1>Welcome to the Grocery Store Inventory System.</h1>
            {!(userId===0)?
                <>
                    <h3>{`You are logged in as user: ${userId}`}</h3>
                    <Button onClick={()=>setUserId(0)}>Logout</Button>
                </>
                :<>{!createMode?
                        <>
                            <h3>{`Please log in.`}</h3>
                            Username:<Field id="username"/>
                            Password:<Field id="password" type={"password"}/>
                            <Button onClick={()=>HandleLogin()}>Login</Button>
                            <Button onClick={()=>setCreateMode(true)}>New User</Button>
                        </>
                        :<>
                            <h3>{`Create User`}</h3>
                            Username:<Field id="username"/>
                            Password:<Field id="password" type={"password"}/>
                            First Name:<Field id="first_name"/>
                            Last Name:<Field id="last_name"/>
                            <Button onClick={()=>HandleCreate()}>Create</Button>
                            <Button onClick={()=>setCreateMode(false)}>Cancel</Button>
                        </>
                }</>
            }
        </LoginWrapper>
    )

    function HandleLogin() {
        let data = {
            username: document.getElementById(`username`).value,
            password: document.getElementById(`password`).value}
        fetch("http://localhost:8080/login", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
        .then(response => response.json())
        .then(data=>{
            console.log(data);
            if(Array.isArray(data))
            {setUserId(data[0].id)
            navigate("/my_inventory")}
            else
            {alert("User/password not found.")}
        })
        .catch(error => console.error('Error:', error));
    }

    function HandleCreate() {
        let data = {
            first_name: document.getElementById(`first_name`).value,
            last_name: document.getElementById(`last_name`).value,
            username: document.getElementById(`username`).value,
            password: document.getElementById(`password`).value}
        console.log("Create!", data)
        fetch("http://localhost:8080/user", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
        .then(response => response.json())
        .then(data=>{
            console.log(data);
            if(data.created===false)
            {alert("Username taken. Please try a different username.")}
            else
            {alert("User Created!")
             setUserId(data.id)
             navigate("/my_inventory")}
        })
        .catch(error => console.error('Error:', error));
    }
}
const LoginWrapper = styled.div`
background-color: #7C4747;
height: 100%;
width: 90%;
padding-left: 5%;
padding-right: 5%;

display: flex;
flex-direction: column;
flex-wrap: nowrap;
justify-content: flex-start;
align-items: center;
font-size: large;
overflow-y: auto;
`
const Button = styled.button`
height: 15vw;
width: 25vw;
border: 2px solid red;
border-radius: 3vw;
`
const Field = styled.input`

`