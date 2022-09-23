import { createContext, useState, useContext } from "react";

export const ServiceContext = createContext({});

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
    status: "",
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

  // Gets all services
  async function createService() {
    try {
      let result = await fetch("http://localhost:4000/service", {
        method: "post",
        body: JSON.stringify(service),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (result.ok) {
        result = await result.json();
        services.push(service);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Deletes a service by id

  async function deleteService(id, service) {
    try {
      let result = await fetch(`http://localhost:4000/service/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (result.ok) {
        result = await result.json();
        services.push(service);
      }
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
        createService,
        deleteService,
      }}
    >
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;

export const useService = () => useContext(ServiceContext);
