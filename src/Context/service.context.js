import { createContext, useState, useContext, useEffect } from "react";

export const ServiceContext = createContext({});

const storedServices = JSON.parse(localStorage.getItem("services"));

export const makeReq = async (url, method, body) => {
  let response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

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
  const getAllServices = async () => {
    try {
      const response = await makeReq("http://localhost:4000/service", "GET");
      setServices(response);
    } catch (err) {
      setServices(storedServices);
      console.log(err);
    }
  };

  // Fetches service by id
  const getServiceById = async (id) => {
    try {
      const response = await makeReq(
        `http://localhost:4000/service/${id}`,
        "GET"
      );
      setService(response);
    } catch (err) {
      console.log(err);
      setService(storedServices[id - 1]);
    }
  };

  // Updates service
  const updateService = async () => {
    try {
      const response = await makeReq(
        `http://localhost:4000/service/${service.id}`,
        "PUT"
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Create new service
  const createService = async () => {
    try {
      const response = await makeReq(
        "http://localhost:4000/service",
        "POST",
        service
      );
      services.push(response);
    } catch (err) {
      console.log(err);
    }
  };

  // Deletes a service by id

  const deleteService = async () => {
    try {
      const response = await makeReq(
        `http://localhost:4000/service/${service.id}`,
        "DELETE",
        service
      );
      services.push(response);
      getAllServices();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <ServiceContext.Provider
      value={{
        getAllServices,
        getServiceById,
        updateService,
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
