import {
  createContext,

  useState,

  useContext,
} from "react";


export const ServiceContext = createContext(/* {
  id: "",
  service: {},
  services: [],
  getAllServices: () => undefined,
  getServiceById: () => undefined,
} */);

const ServiceProvider = (props) => {


  const [id, setId] = useState("");
  const [service, setService] = useState({
    title: "",
    type: "",
    start: "",
    done: "",
    customer: "",
    country: "",
    city: "",
    status: Boolean,
    id: "",
  });

  const [services, setServices] = useState([service]);

  // Gets all services
  async function getAllServices() {
    try {
      const response = await fetch("http://localhost:4000/service");
      const result = await response.json();
      localStorage.setItem("services", JSON.stringify(result));
      setServices(result);

    } catch (err) {
      console.log(err);
    }
  }

  // Fetches service by id
  async function getServiceById(id) {
    try {
      const response = await fetch(`http://localhost:4000/service/${id}`);
      const result = await response.json();
      setService(result);
    } catch (err) {
      console.log(err);
    }
  }
  



  return (
    <ServiceContext.Provider
      value={{
        getAllServices,
        getServiceById,
        id,
        setId,
        setService,
        service,
        services,
    
      }}
    >
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;

export const useService = () => useContext(ServiceContext);
