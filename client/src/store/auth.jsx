import { createContext, useEffect,useContext,useState} from "react";
export const AuthContext=createContext();



export const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token"));

    const [services,setservices]=useState();

    const [isLoading,setIsLoading]=useState(true);

    const [user,setUser]=useState("");
const authorizationToken=`Bearer ${token}`;

     const storeTokenInLS=(serverToken)=>{
            setToken(serverToken);
             return localStorage.setItem("token",serverToken);
     };

     let isLoggedIn=!!token;
//tackling the logout functionality...
     const LogoutUser=()=>{
           setToken("");
           return localStorage.removeItem("token");
     };

     //JWT AUTHENTICATION-to get the currently loggedin user data....

      const userAuthentication=async()=>{
        setIsLoading(true);
              try{
                  const response=await fetch("http://localhost:5000/api/auth/user",{
                        method:"GET",
                        headers:{
                          Authorization:authorizationToken,
                        },
                  });
                 if(response.ok){
                  const data=await response.json();
                  console.log("user data",data);
                  setUser(data.userData);
                  setIsLoading(false);
                 } 

                  else{
                    console.log("Error fetching user data");
                     setIsLoading(false);
                  }

              }catch(error){
                   console.error("Error fetching user data");
              }
      };

       const getServices=async()=>{
           try{
                const response=await fetch("http://localhost:5000/api/data/service",{
                  method:"GET",
                });

                if(response.ok){
                  const data=await response.json();
                  console.log(data.msg);
                  setservices(data.msg);
                }
           }catch(error){
                console.log(`services frontend error:${error}`);
           }
       }

      useEffect(()=>{
        getServices();
        userAuthentication();
      },[]);

     return (
      <AuthContext.Provider value={{isLoggedIn,storeTokenInLS,LogoutUser,user,services,authorizationToken,isLoading}}>
          {children}
      </AuthContext.Provider>
     );
};


export const useAuth=()=>{
  const AuthContextValue=useContext(AuthContext);
  return AuthContextValue;
};