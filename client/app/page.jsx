import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";

const Home = async () => {
 

  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Initiate");
  }

  return (
    <div>
      <h1>Initiator Page</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Home;
