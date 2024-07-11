import React, { createContext, useState } from "react";

export const UserContext = createContext({
  user: {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  },
  updateUser: (data) => {}
});

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });

  const updateUser = (id, val) => {
    setUserInfo(prevUserInfo => ({ ...prevUserInfo, [id]: val }));
  };

  const value = {
    user: userInfo,
    updateUser: updateUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;