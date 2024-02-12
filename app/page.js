import NavbarAuth from "./components/NavbarAuth";
import { getUserData } from "./functions/getUserData";
import Button from "./components/Button";
import { backup } from "./firebase-config";

export default function Home() {
  const userdata = getUserData();
  return (
    <div className="flex flex-col">
      <div className="absolute left-[50%] w-[50%] h-[90%] top-[10%] bg-gray-400 z-10">
        <h1 className="absolute top-[20%] left-[21%] text-6xl text-center">
          {!userdata ? (
            <p>
              Join our website <br></br> today
            </p>
          ) : (
            <p>
              Search our library <br></br> of files today
            </p>
          )}
        </h1>
        {userdata ? (
          <Button
            route="/home"
            style="sm"
            extraStyles="absolute top-[45%] left-[40%] text-xl w-48"
          >
            Start Searching
          </Button>
        ) : (
          <></>
        )}
      </div>
      <NavbarAuth
        registerStyles="absolute top-[50%] left-[70%] text-3xl w-48"
        userdata={userdata}
      ></NavbarAuth>

      <div className="absolute h-[100%] z-10">
        <h1 className="text-7xl text-left mt-36 ml-20 underline">File Share</h1>
        <p className="text-3xl text-left mt-16 ml-24">
          This website is a place <br></br>
          <br></br> where you can upload your files <br></br>
          <br></br> to share with others, or you can search <br></br>
          <br></br> other peoples files for yourself.
        </p>
      </div>
      {backup === true ? (
        <p className="absolute z-40 bottom-0 text-2xl">
          Note: Backup database is enabled, if you can&apos;t log in you may
          have to create a new account
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
