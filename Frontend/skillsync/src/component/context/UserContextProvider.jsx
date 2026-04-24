import { useState } from "react";
import  UserContext from "./UserContext.jsx";

export default function UserContextProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [jobs, setJobs]= useState([])

  return (
    <UserContext.Provider value={{ user, setUser ,jobs ,setJobs}}>
      {children}
    </UserContext.Provider>
  );
}