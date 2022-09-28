import { Route, Routes } from "react-router-dom";
import "./App.sass";
import Header from "./components/Header";
import AddServices from "./pages/AddServices";
import Frontpage from "./pages/Frontpage";
import Service from "./pages/Service";
import UpdateService from "./pages/UpdateService";
import {useTranslation} from "react-i18next"

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/add" element={<AddServices />} />
        <Route path="/edit" element={<UpdateService />} />
        <Route path="/service/:id" element={<Service />} />
      </Routes>
    </div>
  );
}

export default App;
