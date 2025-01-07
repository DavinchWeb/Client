import { Route, Routes, BrowserRouter } from "react-router-dom";
import Startpaged from "./pages/Startpage";
import CreateRoomd from "./pages/CreateRoom";
import GameRoom from "./pages/GameRoom";
import SelectingRoom from "./pages/SelectingRoom";
import WaitRoom from "./pages/WaitRoom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route index element={<Startpaged />} />
      <Route path="/createRoom" element={<CreateRoomd />} />
      <Route path="/game" element={<GameRoom />} />
      <Route path="/selection" element={<SelectingRoom />} />
      <Route path="/room" element={<WaitRoom />} />
      <Route path="*" element={<NotFound></NotFound>}></Route>;
    </Routes>
  );
}

export default App;
