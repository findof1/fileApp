import Files from "../components/Files"
import NavbarAuth from "../components/NavbarAuth"
import { getUserData } from "../functions/getUserData"

const page = () => {  
  const userdata = getUserData()

  return (
    <div className="h-full w-full">
      <NavbarAuth registerStyles="absolute top-[50%] left-[70%] text-3xl w-48" userdata={userdata}></NavbarAuth>
      <Files></Files>
    </div>
  )
}

export default page