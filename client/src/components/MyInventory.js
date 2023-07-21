import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Inventory() {
    const { allItems, user, refresh, setRefresh } = useContext(AppContext);
    const [ selectedItem, setSelectedItem ] = useState({})
    const [ popUpVisible, setPopUpVisible ] = useState(false)
    const [ editMode, setEditMode ] = useState(false)
    const navigate = useNavigate();

    if(user.id===0){navigate("/inventory")}

    return (
        <MyInventoryWrapper>
            {popUpVisible?<PopUp/>:<></>}
            <InventoryTile>
                <TileHead>My Inventory Items <Button onClick={()=>handleNew()}>Add New</Button></TileHead>
                <Table>
                    <thead><Tr><Th>Id</Th><Th>Qty</Th><Th>Name</Th><Th>Description</Th></Tr></thead>
                    <tbody>
                        {allItems.filter(item=>item.user_id===user.id)?.map(item=>
                            <Tr key={item.id} onClick={()=>{setSelectedItem(item);setPopUpVisible(true)}}>
                                <Td>{item.id}</Td>
                                <Td>{item.quantity}</Td>
                                <Td>{item.item_name}</Td>
                                <Td>{(item.description.length>100)?
                                        item.description.substring(0,100).concat('','...')
                                        :item.description}</Td>
                            </Tr>)}
                    </tbody>
                </Table>
            </InventoryTile>
        </MyInventoryWrapper>
    )

    function PopUp() {
        return(
            <PopUpWrapper>
                <TileTopWrap>
                    <TilePart>Item Id:
                        <Edit id="tile_id">
                            {selectedItem.id}</Edit></TilePart>
                    <TilePart>Name:
                        <Edit id="tile_name" $editMode={editMode} contentEditable={editMode} suppressContentEditableWarning={true}>
                            {selectedItem.item_name}</Edit></TilePart>
                    <TilePart>Quantity:
                        <Edit id="tile_qty" $editMode={editMode} contentEditable={editMode} suppressContentEditableWarning={true}>
                            {selectedItem.quantity}</Edit></TilePart>
                </TileTopWrap>
                <TilePart>Description:
                    <Edit id="tile_description" $editMode={editMode} contentEditable={editMode} suppressContentEditableWarning={true}>
                        {selectedItem.description}</Edit></TilePart>
                <ButtonContainer>
                    <Button onClick={()=>setEditMode(true)} disabled={editMode}>Edit</Button>
                    <Button onClick={()=>handleDelete()} disabled={!editMode||selectedItem.id==="NEW"}>Delete</Button>
                    <Button onClick={()=>handleSave()} disabled={!editMode}>Save</Button>
                    <Button onClick={()=>{setPopUpVisible(false);setEditMode(false)}}>Close</Button>
                </ButtonContainer>
            </PopUpWrapper>
        )

        function handleDelete() {
            if(!window.confirm("Are you sure you want to delete this item?"))
            {return null}
            else{
                fetch(`http://localhost:8080/items/${selectedItem.id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data=> console.log(data.message, `Item Id: ${selectedItem.id}`))
                .then(()=>{setPopUpVisible(false);setEditMode(false);setRefresh(!refresh)})
                .catch(error => console.error('Error:', error));
            }
        }

        function handleSave() {
            let item_id = document.getElementById(`tile_id`).textContent
            let data = {
                user_id: user.id,
                quantity: Number(document.getElementById(`tile_qty`).textContent),
                item_name: document.getElementById(`tile_name`).textContent,
                description: document.getElementById(`tile_description`).textContent
            }
            console.log(data.quantity)
            if(isNaN(data.quantity))
            {window.alert("Quantity must be a number");return null}

            if(selectedItem.id === 'NEW')
            {
                fetch("http://localhost:8080/items", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data=> console.log(data.message, `Item Id: ${data.item_id}`))
                .then(()=>{setPopUpVisible(false);setEditMode(false);setRefresh(!refresh)})
                .catch(error => console.error('Error:', error));
            }
            else
            {
                fetch(`http://localhost:8080/items/${item_id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data=> console.log(data.message))
                .then(()=>{setPopUpVisible(false);setEditMode(false);setRefresh(!refresh)})
                .catch(error => console.error('Error:', error));
            }
        }
    }

    function handleNew(){
        setSelectedItem({
            id: "NEW",
            user_id: user.id,
            quantity: 0,
            item_name: "Name",
            description: "Description"
            })
        setPopUpVisible(true);
        setEditMode(true);
    }

}
const MyInventoryWrapper = styled.div`
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
justify-content: center;
gap: 5%;
align-items: center;
padding: 5%;
`
const Button = styled.button`
background-color: ${props=> props.disabled?'#888888':'#0D1B2A'};
padding: 10px 40px;
border-radius: 10px;
font-size: 2vh;
font-weight: bold;
color: #EFEFEF;
`
const ButtonContainer = styled.div`
display: flex;
width: 100%;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-around;
align-items: center;
gap: 10px;
`
const TilePart = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-size: 2vh;
font-weight: bold;
color: #0D1B2A;
`
const TileTopWrap = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
`
const Edit = styled.div`
padding: 15px;
border-radius: 15px;
text-align: center;
background-color: ${props=> props.$editMode?'#DDDDDD':'#EFEFEF'};
border: ${props=> props.$editMode?'1px solid black':''};
`