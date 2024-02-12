import React from "react";
import Navbar from "./Navbar";
import { AuthModal } from "./AuthModal";
import Dropdown from "./Dropdown";
import LogOutButton from "./LogOutButton";
import Link from 'next/link'

const NavbarAuth = ({ registerStyles, userdata }) => {
  return (
    <Navbar homeRedirect={!userdata ? "/" : "/home"}>
      {userdata ? (
        <>
          <Link className="text-2xl mr-5" href={`/profile/${userdata.username}`}>{userdata.username}</Link>
          <Dropdown extraStyles="self-align mt-2">
            <LogOutButton />
          </Dropdown>
        </>
      ) : (
        <AuthModal
          registerStyles={registerStyles}
          loginStyles="text-2xl"
          loginStyle="none"
        ></AuthModal>
      )}
    </Navbar>
  );
};

export default NavbarAuth;
