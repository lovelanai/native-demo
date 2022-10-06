import { createContext, useState, useContext, useEffect } from "react";

export const ServiceContext = createContext({});

const storedServices = JSON.parse(localStorage.getItem("services"));

export const makeReq = async (url, method, body) => {
  let response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$OQ3ce1lt6KMSL.WQvFVYBOOpe5a8Itq2VL6o73aDcT7AqZ/UaD1HK",
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
  const [errorMessage, setErrorMessage] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [language, setLanguage] = useState("ENG");

  console.log(language);

  console.log("error?", errorMessage);
  // Gets all services
  const getAllServices = async () => {
    try {
      const response = await makeReq(
        "https://api.jsonbin.io/v3/b/633e70cd2b3499323bd4c7de",
        "GET"
      );
      setServices(response);
    } catch (err) {
      setServices(storedServices);
      setErrorMessage(true);
      setFormDisabled(true);
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
      setErrorMessage(true);
    }
  };

  // Updates service
  const updateService = async () => {
    try {
      const response = await makeReq(
        `http://localhost:4000/service/${service.id}`,
        "PUT",
        service
      );
      services.push(response);
      getAllServices();
    } catch (err) {
      console.log(err);
      setErrorMessage(true);
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
      setErrorMessage(true);
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
      setErrorMessage(true);
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
        errorMessage,
        setFormDisabled,
        formDisabled,
        language,
        setLanguage,
      }}
    >
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;

export const useService = () => useContext(ServiceContext);
