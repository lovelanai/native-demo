import { Route, Routes } from "react-router-dom";
import "./App.sass";
import ErrorMessage from "./components/ErrorMessage";
import Header from "./components/Header";
import AddServices from "./pages/AddServices";
import Frontpage from "./pages/Frontpage";
 import Service from "./pages/Service";

import UpdateService from "./pages/UpdateService";



function App() {

  return (
    <div className="App">
      <Header />
      <ErrorMessage />
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/add" element={<AddServices />} />
        <Route path="/edit/:id" element={<UpdateService />} />
         <Route path="/service/:id" element={<Service />} />
    
      </Routes>
    </div>
  );
}

export default App;
