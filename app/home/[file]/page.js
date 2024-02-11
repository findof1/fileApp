import NavbarAuth from "@/app/components/NavbarAuth"
import { getUserData } from "@/app/functions/getUserData"
import File from "@/app/components/File"

const page = ({params}) => {  
  const userdata = getUserData()


  return (
    <div className="h-full w-full">
      <NavbarAuth registerStyles="absolute top-[50%] left-[70%] text-3xl w-48" userdata={userdata}></NavbarAuth>
      <File file={params.file} userdata={userdata} />
    </div>
  )
}

export default page