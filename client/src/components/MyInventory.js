import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Inventory() {
    const { allItems, userId, refresh, setRefresh } = useContext(AppContext);
    const [ selectedItem, setSelectedItem ] = useState({})
    const [ popUpVisible, setPopUpVisible ] = useState(false)
    const [ editMode, setEditMode ] = useState(false)
    const navigate = useNavigate();

    if(userId===0){navigate("/inventory")}

    return (
        <MyInventoryWrapper>
            {popUpVisible?<PopUp/>:<></>}
            <h1>This is the My Inventory Component!</h1>
            <button onClick={()=>handleNew()}>Add New</button>
            <table>
                <thead>
                    <tr>
                        <th>Id</th><th>Qty</th><th>Name</th><th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {allItems.filter(item=>item.user_id===userId).map(item=>
                        <Tr key={item.id} onClick={()=>{setSelectedItem(item);setPopUpVisible(true)}}>
                            <td>{item.id}</td>
                            <td>{item.quantity}</td>
                            <td>{item.item_name}</td>
                            <td>{(item.description.length>100)?
                                    item.description.substring(0,100).concat('','...')
                                    :item.description}</td>
                        </Tr>)}
                </tbody>
            </table>
        </MyInventoryWrapper>
    )

    function PopUp() {
        return(
            <PopUpWrapper>
                <TileId>Item Id: <span id="tile_id">{selectedItem.id}</span></TileId>
                <NameQtyWrap>
                    <TileName>
                        Name:
                        <EditColor id="tile_name" $editMode={editMode} contentEditable={editMode} suppressContentEditableWarning={true}>
                            {selectedItem.item_name}
                        </EditColor>
                    </TileName>
                    <TileQty>
                        Quantity:
                        <EditColor id="tile_qty" $editMode={editMode} contentEditable={editMode} suppressContentEditableWarning={true}>
                            {selectedItem.quantity}
                        </EditColor>
                    </TileQty>
                </NameQtyWrap>
                <TileDescription>
                    Description:
                    <EditColor id="tile_description" $editMode={editMode} contentEditable={editMode} suppressContentEditableWarning={true}>
                        {selectedItem.description}
                    </EditColor>
                </TileDescription>
                <ButtonContainer>
                    <Button onClick={()=>setEditMode(true)} disabled={editMode}>Edit</Button>
                    <Button onClick={()=>handleSave()} disabled={!editMode}>Save</Button>
                    <Button onClick={()=>{setPopUpVisible(false);setEditMode(false)}}>Close</Button>
                </ButtonContainer>
            </PopUpWrapper>
        )

        function handleSave() {
            let item_id = document.getElementById(`tile_id`).textContent
            let data = {
                user_id: userId,
                quantity: Number(document.getElementById(`tile_qty`).textContent),
                item_name: document.getElementById(`tile_name`).textContent,
                description: document.getElementById(`tile_description`).textContent
            }
            console.log(data.quantity)
            if(isNaN(data.quantity))
            {alert("Quantity must be a number");return null}

            if(selectedItem.id === 'NEW')
            {
                console.log("NEW")
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
                console.log("NOT NEW")
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
            user_id: userId,
            quantity: 0,
            item_name: "Name",
            description: "Description"
            })
        setPopUpVisible(true);
        setEditMode(true);
    }

}
const MyInventoryWrapper = styled.div`
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
box-shadow: 0px 15px 60px 10px rgba(0,0,0,.6);
display: flex;
flex-direction: column;
flex-wrap: nowrap;
justify-content: center;
gap: 5%;
align-items: center;
padding: 5%;
`
const ButtonContainer = styled.div`
display: flex;
width: 100%;
flex-direction: row;
flex-wrap: nowrap;
justify-content: center;
align-items: center;
gap: 10%;
`
const Button = styled.button`
height: 200%;
width: 100%;
border: 2px solid red;
border-radius: 3vw;
`
const TileId = styled.div`

`
const TileName = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const TileQty = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const TileDescription = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const NameQtyWrap = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
`
const EditColor = styled.div`
    padding: 15px;
    border-radius: 15px;
    text-align: center;
    background-color: ${props=> props.$editMode?'#DDDDDD':'#EEEEEE'};
    border: ${props=> props.$editMode?'1px solid black':''};
`