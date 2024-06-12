import Header from "@/app/components/header";
import { InviteUsers } from "./_invite-users";
import { clerkClient, Invitation } from "@clerk/nextjs/server";
import { FetchInvitations } from "./_fetch-invitations";


export default async function AdminDashboard() {
    

    return (
        <>
            <Header />
            <div className="flex min-h-screen flex-col p-10">
                <div className="grid grid-cols-1 sm:grid-cols-12">
                    <div className='col-span-5'>
                        <div style={{ "color": "#000000" }}>
                            <h1 className="font-bold text-2xl">Invite Users</h1>
                            <p style={{ marginBottom: "10px" }}>This page is restricted to users with the super-admin role.</p>
                            <InviteUsers />
                        </div>
                    </div>

                    <div className='col-span-6' style={{ "color": "#000000" }}>
                       <FetchInvitations/>
                    </div>
                </div>
            </div>
        </>
    );
}

