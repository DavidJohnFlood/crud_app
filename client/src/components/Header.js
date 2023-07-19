import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Header() {
    const { userId } = useContext(AppContext);

    return (
        <HeaderWrapper id="Header">
            <Counter/>
            <Link to="/">Home</Link>
            <Link to="/inventory">Inventory</Link>
            {userId===0 ?
                <Link to="/login" id={userId}>Login</Link>
                :<>
                <Link to="/my_inventory" id={userId}>My Inventory</Link>
                <Link to="/login" id={userId}>Logout</Link>
                </>
            }
        </HeaderWrapper>
    )
}
export const Counter = props => {
    const renderCounter  = useRef(0);
    renderCounter.current = renderCounter.current + 1;
    return <Count>Renders: {renderCounter.current}, {props.message}</Count>;
};
const Count = styled.div`
position: absolute;
top: 0;
left: 0;
`
const HeaderWrapper = styled.div`
background-color: #7C4747;
height: 100%;
width: 90%;
padding-left: 5%;
padding-right: 5%;

display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-between;
align-items: center;
font-size: large;
`
