"use server"
import { clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function inviteuser(email:string) {
  console.log("Inviting user.")
  // Update role in Clerk
  try {
    await clerkClient.invitations.createInvitation({
      emailAddress: email,
      redirectUrl: process.env.PUBLIC_SIGN_UP_URL ,
      publicMetadata: {
          "role": "moderator"
      }
    });
   
   
  } catch (error:any) {
      console.log("Error :" +error?.errors[0].message)
      return  JSON.stringify("Error :" +error?.errors[0].message)
 
  }
}

export async function getInvitionsList() {
  console.log("Get invitions list.")
  try {
    const response = await clerkClient.invitations.getInvitationList({ status: 'pending' });
    return JSON.stringify(response.data);
    
    // console.log(invitation_list)
} catch (error) {
    console.error("Error fetching invitations:", error);
}
}

export async function setRevoke(formData: FormData) {

  // Update role in Clerk
  try {
    const clerkRes = await clerkClient.invitations.revokeInvitation(formData.get("id") as string);
  }  catch (error:any) {
    console.log("Error :" +error?.errors[0].message)

}
  
  redirect("/dashboard")

}