import { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Login() {
    const { userId, setUserId } = useContext(AppContext);

    return (
        <LoginWrapper>
            <h1>Welcome to the Grocery Store Inventory System.</h1>
            {userId===0?
                <>
                    <h3>{`Please log in.`}</h3>
                    <Button onClick={()=>setUserId(1)}>Login as user 1</Button>
                </>
                :<>
                    <h3>{`You are logged in as user: ${userId}`}</h3>
                        <Button onClick={()=>setUserId(0)}>Logout</Button>
                </>
            }
        </LoginWrapper>
    )
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