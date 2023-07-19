import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Home() {
    const { userId } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <HomeWrapper>
            <h1>Welcome to the Grocery Store Inventory System.</h1>
            {!userId===0?
                <h3>{`You are logged in as user: ${userId}`}</h3>
                :<>
                    <h3>Please log in or choose continue as guest to view inventory.</h3>
                    <ButtonContainer>
                        <Button onClick={()=>navigate("/login")}>Login</Button>
                        <Button onClick={()=>navigate("/inventory")}>Continue As Guest</Button>
                    </ButtonContainer>
                </>
            }
        </HomeWrapper>
    )
}
const HomeWrapper = styled.div`
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
const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: center;
align-items: center;
gap: 10%;
`
const Button = styled.button`
height: 15vw;
width: 25vw;
border: 2px solid red;
border-radius: 3vw;
`