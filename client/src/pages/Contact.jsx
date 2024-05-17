import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData={
  username:"",
  email:"",
  message:"",
}
const Contact=()=>{
    const [contact,setContact]=useState(defaultContactFormData);

    const URL="http://localhost:5000/api/form/contact";
    const [userData,setUserData]=useState(true);

    const {user}=useAuth();
    console.log(user);
    if(userData && user){
       setContact({
        username:user.username,
        email:user.email,
        message:"",
       });
       setUserData(false);
    }

    const handleInput=(e)=>{
      let name = e.target.name;
      let value = e.target.value;
     setContact({
         ...contact,
         [name]:value,
      });
    };

    const handleSubmit=async(e)=> {
      e.preventDefault();
      try{
         const response=await fetch(URL,{
              method: "POST",
              headers: {
                "Content-Type":"application/json"
              },
             body:JSON.stringify(contact)
         })

         if(response.ok){
            setContact(defaultContactFormData);
            const data=await response.json();
            console.log(data);
            alert("message successfully has been sent");
         }
      }catch(error){
          alert("Meassage not send");
          console.log(error);
      }
    };

  return <>
   <section className="section-contact">
            <div className="conatct-content container">
              <h1 className="main-heading">contact us</h1>
            </div>
            <div className="container grid grid-two-cols">
              <div className="contact-image">
                <img
                  src="/images/support.png"
                  alt="let's fill the contact form"
                  width="500"
                  height="500"
                />
              </div>
              {/* let tackle contact form */}
              <section className="section-form">
                 <form onSubmit={handleSubmit}>

                  <div>
                    <label htmlFor="username">username</label>
                    <input 
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    required
                    value={contact.username}
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
                    value={contact.email}
                    onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="message">message</label>
                    <textarea name="message" id="message" autoComplete="off" value={contact.message}
                    onChange={handleInput} cols="30" rows="10">
                    </textarea>
                    </div>

                    <div>
                      <button type="submit">Submit</button>
                      </div>                 
                 </form>
              </section>
          </div>

          <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

      </section>
  </>
};

export default Contact;