import { SearchUsers } from "./_search-users";
import { clerkClient } from "@clerk/nextjs/server";
import { setRole } from "./_actions";
import Header from "@/app/components/header";

export default async function AdminDashboard() {
   

    return (
        <>
            <Header />
            <div className="flex min-h-screen flex-col p-10">
                
                    <div className='col-span-5'>
                        <div style={{ "color": "#000000" }}>
                            <h1 className="font-bold text-2xl">Change User Roles</h1>
                            <p style={{ marginBottom: "10px" }}>This page is restricted to users with the super-admin role.</p>

                        </div>
                    </div>
       
                    <SearchUsers />
                
            </div >
        </>
    );
}