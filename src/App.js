import { Route, Routes } from "react-router-dom";
import Startpaged from "./pages/Startpage";
import CreateRoomd from "./pages/CreateRoom";
import GameRoom from "./pages/GameRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Startpaged></Startpaged>}></Route>
      <Route path="/createRoom" element={<CreateRoomd></CreateRoomd>}></Route>
      <Route path="/game" element={<GameRoom></GameRoom>}></Route>
    </Routes>
  );
}

export default App;
