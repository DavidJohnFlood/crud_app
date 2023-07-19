import { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Inventory() {
    const { allItems } = useContext(AppContext);
    const [ selectedItem, setSelectedItem ] = useState({})
    const [ popUpVisible, setPopUpVisible ] = useState(false)

    return (
        <InventoryWrapper>
            {popUpVisible?<PopUp/>:<></>}
            <h1>This is the Inventory Component!</h1>
            <table>
                <thead>
                    <tr>
                        <th>Qty</th><th>Name</th><th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {allItems.map(item=>
                        <Tr key={item.id} onClick={()=>{setSelectedItem(item);setPopUpVisible(true)}}>
                            <td>{item.quantity}</td>
                            <td>{item.item_name}</td>
                            <td>{(item.description.length>100)?
                                    item.description.substring(0,100).concat('','...')
                                    :item.description}</td>
                        </Tr>)}
                </tbody>
            </table>
        </InventoryWrapper>
    )

    function PopUp() {
        return(
            <PopUpWrapper>
                <h2>{selectedItem.item_name}</h2>
                <h3>{`Quantity: ${selectedItem.quantity}`}</h3>
                <h3>{selectedItem.description}</h3>
                <div onClick={()=>setPopUpVisible(false)}>Close</div>
            </PopUpWrapper>
        )
    }
}
const InventoryWrapper = styled.div`
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
const Tr = styled.tr`
&:hover{
    background-color: yellow;
}
`
const PopUpWrapper = styled.div`
position: absolute; inset: 25%;
border: 8px solid #333333;
background-color: #EEEEEE;
border-radius: 80px;
box-shadow: 0px 15px 60px 30px rgba(0,0,0,.6);
display: flex;
flex-direction: column;
flex-wrap: nowrap;
justify-content: center;
gap: 5%;
align-items: center;
padding: 5%;
`