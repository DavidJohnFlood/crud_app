import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Header() {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <HeaderWrapper id="Header">
            <NavButton onClick={()=>{navigate("/")}}>Home</NavButton>
            <NavButton onClick={()=>{navigate("/inventory")}}>Inventory</NavButton>
            {user.id===0 ?
                <NavButton onClick={()=>{navigate("/login")}}>Login</NavButton>
                :<>
                <NavButton onClick={()=>{navigate("/my_inventory")}}>My Inventory</NavButton>
                <NavButton onClick={()=>{navigate("/login")}}>Logout</NavButton>
                </>
            }
        </HeaderWrapper>
    )
}
const HeaderWrapper = styled.div`
background-color: #6A8D92;
border-bottom: 6px solid #0D1B2A;
box-sizing: border-box;
height: 100%;
width: 100%;
padding-left: 15%;
padding-right: 15%;
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-around;
align-items: center;
`
const NavButton = styled.button`
background-color: #0D1B2A;
padding: 10px 40px;
border-radius: 10px;
font-size: 2vh;
font-weight: bold;
color: #EFEFEF;
`