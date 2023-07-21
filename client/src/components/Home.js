import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Home() {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <HomeWrapper>
            <Header>Welcome to our Grocery Store Inventory System.</Header>
            {!(user.id===0)?
                <Tile>
                    <TileHead>{`Welcome ${user.first_name} ${user.last_name}.`}</TileHead>
                    <TileHead>{`You are logged in as:`}</TileHead>
                    <TileHead>{user.username}</TileHead>
                    <ButtonContainer>
                        <Button onClick={()=>navigate("/inventory")}>Inventory</Button>
                        <Button onClick={()=>navigate("/my_inventory")}>My Inventory</Button>
                    </ButtonContainer>
                </Tile>
                :<Tile>
                    <TileHead>Please log in or continue as guest to view inventory.</TileHead>
                    <ButtonContainer>
                        <Button onClick={()=>navigate("/login")}>Login</Button>
                        <Button onClick={()=>navigate("/inventory")}>Continue As Guest</Button>
                    </ButtonContainer>
                </Tile>
            }
        </HomeWrapper>
    )
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
const HomeWrapper = styled.div`
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
font-size: large;
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
font-size: 3vh;
font-weight: bold;
color: #0D1B2A;
text-align: center;
text-justify: center;
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