import { useState } from "react";
import  UserContext from "./UserContext.jsx";

export default function UserContextProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [jobs, setJobs]= useState([])
  const [AllJobs, setAllJobs]= useState([])

  const [recommendation, setRecommendation]=useState([])

  return (
    <UserContext.Provider value={{ user, setUser ,jobs ,setJobs , AllJobs, setAllJobs,recommendation, setRecommendation}}>
      {children}
    </UserContext.Provider>
  );
}