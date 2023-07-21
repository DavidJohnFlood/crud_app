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
            <InventoryTile>
                <TileHead>Current Grocery Store Inventory</TileHead>
                <Table>
                    <thead><Tr><Th>Qty</Th><Th>Name</Th><Th>Description</Th></Tr></thead>
                    <tbody>
                        {allItems.map(item=>
                            <Tr key={item.id} onClick={()=>{setSelectedItem(item);setPopUpVisible(true)}}>
                                <Td>{item.quantity}</Td>
                                <Td>{item.item_name}</Td>
                                <Td>{(item.description.length>100)?
                                        item.description.substring(0,100).concat('','...')
                                        :item.description}</Td>
                            </Tr>)}
                    </tbody>
                </Table>
            </InventoryTile>
        </InventoryWrapper>
    )

    function PopUp() {
        return(
            <PopUpWrapper>
                <PopHead>{selectedItem.item_name}</PopHead>
                <PopText>{`Quantity: ${selectedItem.quantity}`}</PopText>
                <PopText>{selectedItem.description}</PopText>
                <Button onClick={()=>setPopUpVisible(false)}>Close</Button>
            </PopUpWrapper>
        )
    }
}
const InventoryWrapper = styled.div`
background-color: #6A8D92;
height: 97%;
width: 90%;
padding-left: 5%;
padding-right: 5%;
padding-top: 1%;
padding-bottom: 2%;
color: #0D1B2A;
`
const InventoryTile = styled.div`
height: 100%;
width: 100%;
box-sizing: border-box;
border: 4px solid #0D1B2A;
background-color: #EFEFEF;
display: flex;
flex-direction: column;
flex-wrap: nowrap;
justify-content: flex-start;
align-items: center;
font-size: large;
border-radius: 5vw;
box-shadow: 0px 10px 20px 10px rgba(0,0,0,0.5);
`
const TileHead = styled.div`
font-size: 4vh;
font-weight: bold;
color: #0D1B2A;
margin-top: 1vh;
margin-bottom: 2vh;
display: flex;
flex-direction: row;
align-items: center;
gap:20px;
`
const Table = styled.table`
display:block;
overflow:auto;
height: 85%;
text-align: center;
margin: 0% 3%;
&::-webkit-scrollbar {
width: 3vh;}

&::-webkit-scrollbar-track {
margin-top: 4vh;
margin-bottom: 0vh;
border-radius: 1.5vh;
border: 2px solid #804E49;
box-shadow: inset 0 0 1.5vh #804E4980;}

&::-webkit-scrollbar-thumb {
border-radius: 1.5vh;
box-shadow: inset 0 0 1.5vh #0D1B2A;
background-color: #804E49;}
`
const Th = styled.th`
position: sticky;
top: 0;
z-index: 2;
background-color: #0D1B2A;
color: #EFEFEF;
padding: 10px;
border-radius: 5px;
`
const Tr = styled.tr`
&:hover{ background-color: #DB9D47; }
`
const Td = styled.td`
border-radius: 5px;
border: 2px solid #804E49;
padding: 4px 10px;
`
const PopUpWrapper = styled.div`
z-index: 3;
position: absolute; inset: 30% 25% 20% 25%;
border: 8px solid #0D1B2A;
background-color: #EFEFEF;
border-radius: 80px;
box-shadow: 0px 15px 60px 30px rgba(0,0,0,.6);
display: flex;
flex-direction: column;
flex-wrap: nowrap;
justify-content: space-between;
gap: 5%;
align-items: center;
padding: 3% 5%;
`
const PopHead = styled.div`
font-size: 4vh;
font-weight: bold;
color: #0D1B2A;
text-align: center;
text-justify: center;
`
const PopText = styled.div`
font-size: 2.2vh;
font-weight: bold;
color: #0D1B2A;
text-align: center;
text-justify: center;
`
const Button = styled.button`
background-color: #0D1B2A;
padding: 10px 40px;
border-radius: 10px;
font-size: 2vh;
font-weight: bold;
color: #EFEFEF;
`