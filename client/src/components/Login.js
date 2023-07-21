import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Login() {
    const { user, setUser } = useContext(AppContext);
    const [ createMode, setCreateMode ] = useState(false);
    const navigate = useNavigate();

    return (
        <LoginWrapper>
            <Header>Grocery Store Inventory System Login.</Header>
            {!(user.id===0)?
                <Tile>
                    <TileHead>You are logged in as:</TileHead>
                    <TileHead>{user.username}</TileHead>
                    <ButtonContainer>
                        <Button onClick={()=>setUser({id: 0, first_name: '', last_name: '', username: ''})}>Logout</Button>
                    </ButtonContainer>
                </Tile>
                :<>{!createMode?
                    <Tile>
                        <TileHead>{`Please log in.`}</TileHead>
                        <EntryContiner>
                            <Entry>Username:<Field id="username"/></Entry>
                            <Entry>Password:<Field id="password" type={"password"}/></Entry>
                        </EntryContiner>
                        <ButtonContainer>
                            <Button onClick={()=>HandleLogin()}>Login</Button>
                            <Button onClick={()=>setCreateMode(true)}>New User</Button>
                        </ButtonContainer>
                    </Tile>
                    :<Tile>
                        <TileHead>{`Create User`}</TileHead>
                        <EntryContiner>
                            <Entry>Username:<Field id="username"/></Entry>
                            <Entry>Password:<Field id="password" type={"password"}/></Entry>
                            <Entry>First Name:<Field id="first_name"/></Entry>
                            <Entry>Last Name:<Field id="last_name"/></Entry>
                        </EntryContiner>
                        <ButtonContainer>
                            <Button onClick={()=>HandleCreate()}>Create</Button>
                            <Button onClick={()=>setCreateMode(false)}>Cancel</Button>
                        </ButtonContainer>
                    </Tile>
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
            {setUser({id: data[0].id, first_name: data[0].first_name, last_name: data[0].last_name, username: data[0].username})
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
        if(data.first_name==='' || data.last_name==='' || data.username==='' || data.password==='')
        {alert("All fields are required.");return}
        console.log("Create!", data)
        fetch("http://localhost:8080/user", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
        .then(response => response.json())
        .then(resData=>{
            console.log(resData);
            if(resData.created===false)
            {alert("Username taken. Please try a different username.")}
            else
            {alert("User Created!")
             setUser({id: resData.id, first_name: data.first_name, last_name: data.last_name, username: data.username})
             navigate("/my_inventory")}
        })
        .catch(error => console.error('Error:', error));
    }
}
const Header = styled.div`
font-size: 5vh;
font-weight: bold;
color: #0D1B2A;
margin-top: 1vh;
margin-bottom: 3vh;
text-align: center;
text-justify: center;
`
const LoginWrapper = styled.div`
background-color: #6A8D92;
height: 100%;
width: 90%;
padding-left: 5%;
padding-right: 5%;
display: flex;
flex-direction: column;
flex-wrap: nowrap;
justify-content: flex-start;
align-items: center;
overflow-y: auto;
`
const Tile = styled.div`
border: 4px solid #0D1B2A;
background-color: #EFEFEF;
height: 50%;
width: 50%;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
border-radius: 5vw;
box-shadow: 0px 10px 20px 10px rgba(0,0,0,0.5);
`
const TileHead = styled.div`
font-size: 4vh;
font-weight: bold;
color: #0D1B2A;
text-align: center;
text-justify: center;
`
const EntryContiner = styled.div`
width: 80%;
padding: 0% 10%;
display: flex;
flex-direction: column;
gap: 10px;
`
const Entry = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
font-size: 2vh;
font-weight: bold;
color: #0D1B2A;
`
const Field = styled.input`
width: 30%;
font-size: 2vh;
font-weight: bold;
color: #0D1B2A;
`
const ButtonContainer = styled.div`
width: 100%;
height: 20%;
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-evenly;
align-items: center;
`
const Button = styled.button`
width: 30%;
height: 100%;
border-radius: 1vw;
background-color: #0D1B2A;
font-size: 2vh;
font-weight: bold;
color: #EFEFEF;
`