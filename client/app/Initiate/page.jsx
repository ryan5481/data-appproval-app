import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Member = async () => {
  const session = await getServerSession(options);
  //REDIRECT to DENIED if userRole is NOT SUPER-ADMIN or ADMIN or INITIATOR
  session?.user?.role !== "initiator" ? redirect("/Denied") : null;

  return (
    <div>
      <h1>Initiator Page</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
      {/* <p>{session?.user}</p> */}
    </div>
  );
};

export default Member;

// import { useSession } from "next-auth/react";

// const { data: session } = useSession({
//   required: true,
//   onUnauthenticated() {
//     redirect("/api/auth/signin?callbackUrl=/Initiate");
//   },
// });