import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signOutUser } from "../util/firebase/firebaseServices";

export const AuthContext = createContext({
  token: '',
  isAuth: false,
  authenticate: (token) => {},
  logout: () => {}
})

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState()

  const authenticate = (token) => {
    setAuthToken(token)
    // // store in device
    AsyncStorage.setItem('token', token)
  }

  const logout = async() => {
    await signOutUser()
    setAuthToken(null)
    AsyncStorage.removeItem('token')
  }

  const value = {
    token: authToken,
    isAuth: !!authToken,
    authenticate: authenticate,
    logout: logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider