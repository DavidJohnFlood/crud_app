import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Home, Login, Inventory, MyInventory } from './components';
export const AppContext = createContext();

export default function App() {
  const [allItems, setAllItems] = useState([]);
  const [user, setUser] = useState({id: 0, first_name: '', last_name: '', username: ''});
  const [refresh, setRefresh] = useState(false);

  const ContextObject = { allItems, setAllItems,
                          user, setUser,
                          refresh, setRefresh}

  useEffect(() => {
    fetch(`http://localhost:8080/all_items`)
        .then(res=>{console.log(res);
                    return res.json();})
        .then(data=>setAllItems(data))
        .catch(err=>console.log(`Fetch failed. Error: ${err}`))
  }, [refresh]);

  return (
    <AppWrapper id="App">
      <AppContext.Provider value={ContextObject}>
        <BrowserRouter>
          <HeaderContainer><Header /></HeaderContainer>
          <BodyContainer>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login/*' element={<Login />} />
              <Route path='/inventory/*' element={<Inventory />} />
              <Route path='/my_inventory/*' element={<MyInventory />} />
              <Route path='/*' element={<Home />} /> {/*catch all*/}
            </Routes>
          </BodyContainer>
        </BrowserRouter>
      </AppContext.Provider>
    </AppWrapper>
  );
}
const AppWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow-y: hidden;
  display: grid;
  grid-template-rows: 10% 90%;
  background-color: #857272;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;
const HeaderContainer = styled.div`
grid-row: 1 / 2;
`
const BodyContainer = styled.div`
grid-row: 2 / 3;
`
//Color Palette:
//#EFEFEF Anti-Flash White
//#0D1B2A Rich Black
//#6A8D92 Air Force Blue
//#DB9D47 Earth Yellow
//#804E49 Bole (Redish Grey)