import Link from "next/link";
import Image from 'next/image';
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
   const session = await getServerSession(options);
   return (
      <header className="sticky w-full bg-gray-600 text-gray-100">
         <nav className="flex justify-between items-center w-full px-10 py-2">
            <div className='relative flex mb-2 h-14 w-80'>
               <Image
                  src={`/uploads/logo/1.jpeg`}
                  height={1000}
                  width={1000}
                  alt='logo'
                  className='absolute rounded-lg h-full w-full object-contain'
               />
            </div>
            <div className="flex items-center gap-10">
               <Link href="/"> Home</Link>

               {session?.user?.role == "admin" || session?.user?.role == "superAdmin" ?
               <Link href="/CreateUser">Create User</Link>: null}


               {/* Display SUBMISSIONS tab for ALL LOGGED IN USERS */}
               {session && (
                  <Link href="/Submissions">Submissions</Link>)}


               {/* Display INITIATE tab for initiator userRole */}
               {session?.user?.role === "initiator" ?
                  <Link href="/Initiate">Initiate</Link> : null}


               {/* LOGIN & LOGOUT */}
               {session ? (
                  <div className="flex felx-row gap-3 bg-blue-100 p-1 pl-3 text-blue-600 rounded-md">
                     <div className="flex flex-col gap-1" >
                        <a className="font-normal" >{session?.user?.name}</a>
                        <a>{session?.user?.role}</a>
                     </div>
                  <Link href="/api/auth/signout?callbackUrl=/" 
                  className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</Link>
                  </div>
               ) : (
                  <Link href="/api/auth/signin" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</Link>
               )}
            </div>
         </nav>
      </header>
   );
};

export default Nav;
