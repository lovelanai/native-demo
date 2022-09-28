import { Route, Routes } from "react-router-dom";
import "./App.sass";
import Header from "./components/Header";
import AddServices from "./pages/AddServices";
import Frontpage from "./pages/Frontpage";
import Service from "./pages/Service";
import TestCard from "./pages/TestCard";
import UpdateService from "./pages/UpdateService";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/add" element={<AddServices />} />
        <Route path="/edit" element={<UpdateService />} />
        <Route path="/service/:id" element={<Service />} />
        <Route path="/test" element={<TestCard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
