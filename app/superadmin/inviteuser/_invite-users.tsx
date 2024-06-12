'use client'
import { useEffect, useState } from "react";
import {  getInvitionsList, inviteuser } from "./_actions"; // Assuming this is a utility function to send invitation
import { useRouter } from "next/navigation";

export const InviteUsers = () => {
    const [email, setEmail] = useState("");
    const [invitationList, setInvitationList] = useState([]);
    const router = useRouter();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await inviteuser(email);
            if(response){
                alert(response);
            }
            else{
                alert("Success: Sent invitation !");
                router.push("/dashboard")
                
            }
             
        } catch (error) {
            console.error("Error :", error);
             alert("Error :"+ error);
            // Handle error gracefully
        }
    };


    useEffect(() => {
      async function fetchInvitations() {
        console.log("Fetching invitations")
        try {
            const invitations:any = await getInvitionsList();
            setInvitationList(JSON.parse(invitations));
            console.log(invitations)
           
          } catch (error:any) {
              if(error){
                  console.error("Error:", error);
              }
            
          }
         
      }
      fetchInvitations();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount in class components
  

    return (
        <div style={{ "color": "#000000" }}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="invite" style={{ marginTop: "5px" }}>Enter user email</label>
                <div>
                    <input
                        id="invite"
                        name="invite"
                        type="text"
                        style={{ "border": "1px solid #000000", "width":"50%" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                        style={{ backgroundColor: "blue", marginLeft: "5px" }}
                    >
                        invite
                    </button>
                </div>
            </form>
            <div>
        
   
      </div>
        </div>
    );
};
