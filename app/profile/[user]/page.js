import NavbarAuth from "@/app/components/NavbarAuth";
import { getUserData } from "@/app/functions/getUserData";
import Files from "@/app/components/Files";

const page = ({ params }) => {
  const userdata = getUserData();

  return (
    <div className="h-full w-full flex flex-col items-center">
      <NavbarAuth
        registerStyles="absolute top-[50%] left-[70%] text-3xl w-48"
        userdata={userdata}
      ></NavbarAuth>
      <h1 className="text-4xl underline">{params.user}&apos;s uploads</h1>
      <Files user={params.user}></Files>
    </div>
  );
};

export default page;
