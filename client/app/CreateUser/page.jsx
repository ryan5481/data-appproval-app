import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

import UserForm from "../(components)/UserForm";

const CreateUser = async () => {
  const session = await getServerSession(options);
  //REDIRECT to DENIED if userRole is NOT SUPER-ADMIN or ADMIN
  session?.user?.role !== "admin" && redirect("/Denied") 

  console.log(session?.user?.role)


  return (
    <div>
      <UserForm />
    </div>
  );
};

export default CreateUser;
