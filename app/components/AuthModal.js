"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";
import TextInput from "./TextInput";
import { useRouter } from "next/navigation";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where
} from "firebase/firestore";
import { isUsernameAvailable } from "../functions/usernameAvalible";
import { isEmailAvailable } from "../functions/emailAvalible";
import { setUserdata } from "../functions/setUserData";

export const AuthModal = ({
  registerStyles,
  loginStyles,
  loginStyle = "sm",
}) => {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [visible, setVisible] = useState('')
  const [modalData, setModalData] = useState({
    visible: true,
    type: "log in",
    username: "",
    email: "",
    pass: "",
    cpass: "",
  });

  useEffect(() => {
    const savedVisibility = sessionStorage.getItem("modalVisibility");
    if (savedVisibility !== null) {
      setModalData(JSON.parse(savedVisibility));
    }
  }, []);

  const handleLogin = async () => {
    if (
      modalData.username &&
      modalData.email &&
      modalData.pass 
    ) {
    const q = query(
      collection(db, 'users'),
      where('username', '==', modalData.username),
      where('password', '==', modalData.pass),
      where('email', '==', modalData.email)
    );
    const userDoc = await getDocs(q);
    const user = userDoc.docs[0]
    
    if(user){
      const data = user.data();
      const userId = user.id;
      data.id = userId;
      setUserdata(data)

    sessionStorage.setItem(
      "modalVisibility",
      JSON.stringify({
        visible: false,
        type: "log in",
        username: modalData.username,
        email: modalData.email,
        pass: modalData.pass,
        cpass: modalData.cpass,
      })
    );

    router.push("/home");
    }else{
      setErrMsg('User not found')
    }
    }else{
      setErrMsg('Please enter in all fields')
    }
  };

  const handleRegister = async () => {
    if (
      modalData.username &&
      modalData.email &&
      modalData.pass &&
      modalData.cpass
    ) {
      if (modalData.pass == modalData.cpass) {
        if (modalData.pass.length >= 5) {
          if (await isUsernameAvailable(modalData.username)) {
            if (await isEmailAvailable(modalData.email)) {
              const docRef = await addDoc(collection(db, "users"), {
                username: modalData.username,
                password: modalData.pass,
                email: modalData.email,
              });

              setUserdata({
                username: modalData.username,
                password: modalData.pass,
                email: modalData.email,
                id: docRef.id,
              });

              sessionStorage.setItem(
                "modalVisibility",
                JSON.stringify({
                  visible: false,
                  type: "log in",
                  username: modalData.username,
                  email: modalData.email,
                  pass: modalData.pass,
                  cpass: modalData.cpass,
                })
              );

              router.push("/home");
            } else {
              setErrMsg("Email taken");
            }
          } else {
            setErrMsg("Username taken");
          }
        } else {
          setErrMsg("Your password must be 5 characters or longer");
        }
      } else {
        setErrMsg("Password and confirm password are the same");
      }
    } else {
      setErrMsg("Please fill out all fields");
    }
  };
  useEffect(()=>{
  
    if (typeof window !== 'undefined') {
      if(window.location.href == 'http://localhost:3000/'){
        setVisible('')
      }else{

        setVisible('hidden')
      }
    }else{
      setVisible('')
    }
  }, [])

  return (
    <div className={visible}>
      <Button
        style={loginStyle}
        extraStyles={loginStyles}
        onClick={() => {
          setModalData({
            visible: true,
            type: "log in",
            username: modalData.username,
            email: modalData.email,
            pass: modalData.pass,
            cpass: modalData.cpass,
          });
          sessionStorage.setItem(
            "modalVisibility",
            JSON.stringify({
              visible: true,
              type: "log in",
              username: modalData.username,
              email: modalData.email,
              pass: modalData.pass,
              cpass: modalData.cpass,
            })
          );
          setErrMsg('')
        }}
      >
        Log In
      </Button>
      <Button
        style="sm"
        extraStyles={registerStyles}
        onClick={() => {
          setModalData({
            visible: true,
            type: "register",
            username: modalData.username,
            email: modalData.email,
            pass: modalData.pass,
            cpass: modalData.cpass,
          });
          sessionStorage.setItem(
            "modalVisibility",
            JSON.stringify({
              visible: true,
              type: "register",
              username: modalData.username,
              email: modalData.email,
              pass: modalData.pass,
              cpass: modalData.cpass,
            })
          );
          setErrMsg('')
        }}
      >
        Register
      </Button>
      {modalData.type == "log in" ? (
        <Modal
          visible={modalData.visible}
          close={() => {
            setModalData({ visible: false });
            sessionStorage.setItem(
              "modalVisibility",
              JSON.stringify({ visible: false })
            );
          }}
        >
          <h1 className="text-4xl text-white underline self-center">Log In</h1>
          <TextInput
            value={modalData.username}
            label={"Username: "}
            extraStyles="mt-10"
            style="sm"
            onChange={(e) => {
              setModalData({
                visible: true,
                type: "log in",
                username: e.target.value,
                email: modalData.email,
                pass: modalData.pass,
                cpass: modalData.cpass,
              });
              sessionStorage.setItem(
                "modalVisibility",
                JSON.stringify({
                  visible: true,
                  type: "log in",
                  username: e.target.value,
                  email: modalData.email,
                  pass: modalData.pass,
                  cpass: modalData.cpass,
                })
              );
            }}
          ></TextInput>
          <TextInput
            value={modalData.email}
            label={"Email: "}
            extraStyles="mt-10"
            style="sm"
            type="email"
            onChange={(e) => {
              setModalData({
                visible: true,
                type: "log in",
                username: modalData.username,
                email: e.target.value,
                pass: modalData.pass,
                cpass: modalData.cpass,
              });
              sessionStorage.setItem(
                "modalVisibility",
                JSON.stringify({
                  visible: true,
                  type: "log in",
                  username: modalData.username,
                  email: e.target.value,
                  pass: modalData.pass,
                  cpass: modalData.cpass,
                })
              );
            }}
          ></TextInput>
          <TextInput
            value={modalData.pass}
            label={"Password: "}
            extraStyles="mt-10"
            style="sm"
            type="password"
            onChange={(e) => {
              setModalData({
                visible: true,
                type: "log in",
                username: modalData.username,
                email: modalData.email,
                pass: e.target.value,
                cpass: modalData.cpass,
              });
              sessionStorage.setItem(
                "modalVisibility",
                JSON.stringify({
                  visible: true,
                  type: "log in",
                  username: modalData.username,
                  email: modalData.email,
                  pass: e.target.value,
                  cpass: modalData.cpass,
                })
              );
            }}
          ></TextInput>
          <Button
            style="submit"
            extraStyles="w-32 h-12 mt-5 self-center"
            onClick={handleLogin}
          >
            Log In
          </Button>
          <p>{errMsg}</p>
          <Button
            extraStyles="w-[25%] text-sm h-12 mt-auto self-center"
            onClick={() => {
              setModalData({
                visible: true,
                type: "register",
                username: modalData.username,
                email: modalData.email,
                pass: modalData.pass,
                cpass: modalData.cpass,
              });
              sessionStorage.setItem(
                "modalVisibility",
                JSON.stringify({
                  visible: true,
                  type: "register",
                  username: modalData.username,
                  email: modalData.email,
                  pass: modalData.pass,
                  cpass: modalData.cpass,
                })
              );
              setErrMsg("");
            }}
          >
            Create an Account
          </Button>
        </Modal>
      ) : (
        <Modal
          visible={modalData.visible}
          extraStyles="min-h-[90%] top-[5%]"
          close={() => {
            setModalData({ visible: false });
            sessionStorage.setItem(
              "modalVisibility",
              JSON.stringify({ visible: false })
            );
          }}
        >
          <h1 className="text-4xl text-white underline self-center">
            Register
          </h1>
          <TextInput
            value={modalData.username}
            label={"Username: "}
            extraStyles="mt-10"
            style="sm"
            onChange={(e) => {
              setModalData({
                visible: true,
                type: "register",
                username: e.target.value,
                email: modalData.email,
                pass: modalData.pass,
                cpass: modalData.cpass,
              });
              sessionStorage.setItem(
                "modalVisibility",
                JSON.stringify({
                  visible: true,
                  type: "register",
                  username: e.target.value,
                  email: modalData.email,
                  pass: modalData.pass,
                  cpass: modalData.cpass,
                })
              );
            }}
          ></TextInput>
          <TextInput
            value={modalData.email}
            label={"Email: "}
            extraStyles="mt-10"
            style="sm"
            type="email"
            onChange={(e) => {
              setModalData({
                visible: true,
                type: "register",
                username: modalData.username,
                email: e.target.value,
                pass: modalData.pass,
                cpass: modalData.cpass,
              });
              sessionStorage.setItem(
                "modalVisibility",
                JSON.stringify({
                  visible: true,
                  type: "register",
                  username: modalData.username,
                  email: e.target.value,
                  pass: modalData.pass,
                  cpass: modalData.cpass,
                })
              );
            }}
          ></TextInput>
          <TextInput
            value={modalData.pass}
            label={"Password: "}
            extraStyles="mt-10"
            style="sm"
            type="password"
            onChange={(e) => {
              setModalData({
                visible: true,
                type: "register",
                username: modalData.username,
                email: modalData.email,
                pass: e.target.value,
                cpass: modalData.cpass,
              });
              sessionStorage.setItem(
                "modalVisibility",
                JSON.stringify({
                  visible: true,
                  type: "register",
                  username: modalData.username,
                  email: modalData.email,
                  pass: e.target.value,
                  cpass: modalData.cpass,
                })
              );
            }}
          ></TextInput>
          <TextInput
            value={modalData.cpass}
            label={"Confirm Password: "}
            extraStyles="mt-10"
            style="sm"
            type="password"
            onChange={(e) => {
              setModalData({
                visible: true,
                type: "register",
                username: modalData.username,
                email: modalData.email,
                pass: modalData.pass,
                cpass: e.target.value,
              });
              sessionStorage.setItem(
                "modalVisibility",
                JSON.stringify({
                  visible: true,
                  type: "register",
                  username: modalData.username,
                  email: modalData.email,
                  pass: modalData.pass,
                  cpass: e.target.value,
                })
              );
            }}
          ></TextInput>
          <Button
            style="submit"
            extraStyles="w-32 h-12 mt-5 self-center"
            onClick={handleRegister}
          >
            Register
          </Button>
          <p>{errMsg}</p>
          <Button
            extraStyles="w-[25%] text-xs h-12 mt-auto self-center"
            onClick={() => {
              setModalData({
                visible: true,
                type: "log in",
                username: modalData.username,
                email: modalData.email,
                pass: modalData.pass,
                cpass: modalData.cpass,
              });
              sessionStorage.setItem(
                "modalVisibility",
                JSON.stringify({
                  visible: true,
                  type: "log in",
                  username: modalData.username,
                  email: modalData.email,
                  pass: modalData.pass,
                  cpass: modalData.cpass,
                })
              );
              setErrMsg("");
            }}
          >
            Log Into Your Account
          </Button>
        </Modal>
      )}
    </div>
  );
};
