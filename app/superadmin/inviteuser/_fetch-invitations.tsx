'use client'
import { useEffect, useState } from "react";
import {  getInvitionsList, inviteuser, setRevoke } from "./_actions"; // Assuming this is a utility function to send invitation
import { useRouter } from "next/navigation";

export const FetchInvitations = () => {
    const [email, setEmail] = useState("");
    const [invitation_list, setInvitationList] = useState([]);
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
        <div className="text-2xl  font-sans font-semibold text-slate-900 mb-4">Pending Invitations List</div>
                        {invitation_list?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-6" style={{ gap: '0.5rem', paddingTop: "10px" }}>
                                {invitation_list.map(invitation => (
                                    <div key={invitation['id']} className="col-span-6 bg-white p-4 border border-sky-600 rounded-lg shadow" style={{ background: '#ffffff' }}>
                                        <div>
                                            <p className="mb-2 text-md font-bold tracking-tight" style={{ color: '#03adfc' }}>{invitation['id']}</p>
                                            <p className="font-normal text-gray-700 dark:text-gray-400 text-sm" style={{ color: '#03adfc' }}>{
                                                invitation['emailAddress']
                                            }</p>
                                            <div style={{ color: "gray" }}>Status: {invitation['status']}</div>
                                        </div>
                                        <div className='mt-4 pb-1'>
                                            <hr className="my-4 border-gray-200" />
                                        </div>
                                        <div className='grid grid-cols-1 sm:grid-cols-12'>
                                            <div key={invitation['id']} className="col-span-4 pt-1">
                                                <div>
                                                    <form action={setRevoke}>
                                                        <input type="hidden" value={invitation['id']} name="id" />
                                                        <button type="submit" className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" style={{ backgroundColor: "blue", marginLeft: "5px", width: "150px" }}>Revoke</button>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h6 className=' text-sm text-zinc-800 pb-1'>Sorry. No any pending invitation.</h6>
                        )}

        </div>
    );
};
