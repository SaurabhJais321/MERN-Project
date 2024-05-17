import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";


const AdminUserUpdate = () => {
  const { authorizationToken } = useAuth();
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleInput = (e) => {
      let name=e.target.name;
      let value=e.target.value;
     
      setData({
        ...data,
        [name]:value,
      })
  };

  

  const params = useParams();

  const getSingleUserById = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const responseData = await response.json();
     
      setData({
        username:responseData.username,
        email:responseData.email,
        phone:responseData.phone

      });
      
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubmit=async(e)=>{
    e.preventDefault();

      try {
        const response=await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
          method:"PATCH",
          headers:{
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body:JSON.stringify(data),
        });
           if(response.ok){
            toast.success("Updated successfully");
           }else{
              toast.error("Not Updated");
           }
      } catch (error) {
           console.log(error)
      }
  }

  useEffect(() => {
    getSingleUserById();
  }, []);

  return (
    <>
      <section className="section-contact">
        <div className="conatct-content container">
          <h1 className="main-heading">Update User data</h1>
        </div>
        <div className="container grid grid-two-cols">
          {/* let tackle contact form */}
          <section className="section-form">
            <form onSubmit={handlesubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  required
                  value={data.username}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  required
                  value={data.email}
                  onChange={handleInput}
                />
              </div>

              <div>
                <label htmlFor="phone">phone</label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  required
                  value={data.phone}
                  onChange={handleInput}
                />
              </div>

              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default AdminUserUpdate;
