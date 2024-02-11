import NavbarAuth from "../components/NavbarAuth"
import Uploader from "../components/Uploader"
import { getUserData } from "../functions/getUserData"

const page = () => {  
  const userdata = getUserData()

  return (
    <div className="h-full w-full">
      <NavbarAuth registerStyles="absolute top-[50%] left-[70%] text-3xl w-48" userdata={userdata}></NavbarAuth>
      <Uploader userdata={userdata}></Uploader>

    </div>
  )
}

export default page