import { Route, Routes } from "react-router-dom";
import Startpaged from "./pages/Startpage";
import CreateRoomd from "./pages/CreateRoom";
import GameRoom from "./pages/GameRoom";
import SelectingRoom from "./pages/SelectingRoom";
import WaitRoom from "./pages/WaitRoom";

function App() {
  return (
    <Routes>
      <Route index element={<Startpaged></Startpaged>}></Route>
      <Route path="/createRoom" element={<CreateRoomd></CreateRoomd>}></Route>
      <Route path="/game" element={<GameRoom></GameRoom>}></Route>
      <Route
        path="/selection"
        element={<SelectingRoom></SelectingRoom>}
      ></Route>
      <Route path="/wait" element={<WaitRoom></WaitRoom>}></Route>
    </Routes>
  );
}

export default App;
