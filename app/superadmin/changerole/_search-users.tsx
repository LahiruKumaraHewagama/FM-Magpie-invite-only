"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUsersList, setRole } from "./_actions";


export const SearchUsers = () => {
    const pathname = usePathname();
    const [users, setUsersList] = useState([]); 
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.log("Fetching users list")
        try {
            if(query){
                const users: any = await getUsersList(query);
                setUsersList(JSON.parse(users));
                console.log(users)
            }

        } catch (error: any) {
           
        }// Handle error gracefully
    }


return (
    <div style={{ "color": "#000000" }}>
        <div className="grid grid-cols-1 sm:grid-cols-12">
            <div className='col-span-5' >
                <form
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="search" style={{ marginTop: "5px" }}>Search Users</label>
                    <div>
                        <input id="search" name="search" type="text" style={{ "border": "1px solid #000000" }} value={query}
                            onChange={(e) => setQuery(e.target.value)} />
                        <button type="submit" className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" style={{ backgroundColor: "blue", marginLeft: "5px" }}>
                            Search
                        </button>
                    </div>

                </form>
            </div>
            <div className='col-span-6' >
                {users?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-6" style={{ gap: '0.5rem', paddingTop: "10px" }}>
                        {users.map(user => (
                            <div key={user["id"]} className="col-span-6 bg-white p-4 border border-sky-600 rounded-lg shadow" style={{ background: '#ffffff' }}>
                                <div>
                                    <p className="mb-2 text-md font-bold tracking-tight" style={{ color: '#03adfc' }}>{user["username"]}</p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400 text-sm" style={{ color: '#03adfc' }}>{
                                        user["emailAddresses"][0]["emailAddress"]
                                    }</p>
                                    <div style={{ color: "gray" }}>Role: {user["publicMetadata"]["role"] ? (user["publicMetadata"]["role"] as string) : ("moderator")}</div>
                                </div>
                                <div className='mt-4 pb-1'>
                                    <hr className="my-4 border-gray-200" />
                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-12' key={user["id"]}>
                                    <div className="col-span-4 pt-1">
                                        <div>
                                            <form action={setRole}>
                                                <input type="hidden" value={user["id"]} name="id" />
                                                <input type="hidden" value="super_admin" name="role" />
                                                <button type="submit" className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" style={{ backgroundColor: "blue", marginLeft: "5px", width: "150px" }}>Super Admin</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div  className="col-span-4 pt-1">
                                        <div>
                                            <form action={setRole}>
                                                <input type="hidden" value={user["id"]} name="id" />
                                                <input type="hidden" value="admin" name="role" />
                                                <button type="submit" className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" style={{ backgroundColor: "blue", marginLeft: "5px", width: "150px" }}>Admin</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div  className="col-span-4 pt-1">
                                        <div>
                                            <form action={setRole}>
                                                <input type="hidden" value={user["id"]} name="id" />
                                                <input type="hidden" value="moderator" name="role" />
                                                <button type="submit" className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded" style={{ backgroundColor: "blue", marginLeft: "5px", width: "150px" }}> Moderator</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h6 className=' text-sm text-zinc-800 pb-1 hidden'>Sorry.Users Not Found.</h6>
                )}
            </div>
        </div>
    </div>
);
};