import React, { useState, createContext } from "react";

export const AdminContext = createContext();

export default function AdminProvider(props) {
  const { children } = props;
  const [banks, setBanks] = useState();
  const [services, setServices] = useState();
  const [interests, setInterests] = useState();
  const [tmp, setTmp] = useState();

  return (
    <AdminContext.Provider
      value={{
        banks,
        setBanks,
        services,
        setServices,
        interests,
        setInterests,
        tmp,
        setTmp,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
