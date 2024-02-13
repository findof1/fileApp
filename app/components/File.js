"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../firebase-config";
import { storage } from "../firebase-config";
import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { FaThumbsUp } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import Button from "./Button";
import { validateUser } from "../functions/validateUser";

const File = ({ file, userdata }) => {
  const searchParams = useSearchParams();
  const filename = searchParams.get("id");
  const [fileData, setFileData] = useState({});
  const [url, setUrl] = useState("");
  const [liked, setLiked] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errDisp, setErrDisp] = useState();

  const getFileData = useCallback(async () => {
    const q = query(
      collection(db, "files"),
      where("name", "==", decodeURIComponent(file)),
      where("filename", "==", filename)
    );

    const fileSnapshot = await getDocs(q).catch((err) => {
      setErrDisp(
        "Database has reached its limit for the day. Please wait until 3AM EST."
      );
    });
    const fileDoc = fileSnapshot.docs[0].data();
    const fileRef = ref(storage, `files/${fileDoc.filename}`);
    const fileURL = await getDownloadURL(fileRef);
    const response = await fetch(fileURL);
    const blob = await response.blob();
    fileDoc.fileData = blob;
    setFileData(fileDoc);
  }, [file, filename, setFileData]);

  const getLikeData = useCallback(() => {
    if (fileData.likes.includes(userdata.username)) {
      setLiked(true);
    }
  }, [setLiked, userdata, fileData]);

  useEffect(() => {
    getFileData();
  }, [getFileData]);

  useEffect(() => {
    if (fileData.fileData) {
      getLikeData();
      if (typeof window !== "undefined") {
        setUrl(window.URL.createObjectURL(fileData.fileData));
        setDataLoaded(true);
      }
    }
  }, [fileData, getLikeData, setUrl, setDataLoaded, setErrDisp]);

  const like = async () => {
    if(await validateUser(userdata)){
    const q = query(
      collection(db, "files"),
      where("name", "==", decodeURIComponent(file)),
      where("filename", "==", filename)
    );

    getDocs(q).then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const docRef = docSnapshot.ref;

        if (!fileData.likes.includes(userdata.username)) {
          const newLikes = [...fileData.likes, userdata.username];

          updateDoc(docRef, {
            likes: newLikes,
            likeCount: fileData.likeCount + 1,
          })
            .then(() => {
              getFileData();
              setLiked(true);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          const newLikes = fileData.likes.filter(
            (like) => like !== userdata.username
          );

          updateDoc(docRef, {
            likes: newLikes,
            likeCount: fileData.likeCount - 1,
          })
            .then(() => {
              setLiked(false);
              getFileData();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    });
  }
  };

  const download = () => {
    const q = query(
      collection(db, "files"),
      where("name", "==", decodeURIComponent(file)),
      where("filename", "==", filename)
    );

    getDocs(q).then(async (querySnapshot) => {
      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0];
        const docRef = docSnapshot.ref;

        if (!fileData.downloads.includes(userdata.username)) {
          if(await validateUser(userdata)){
          const newDownloads = [...fileData.downloads, userdata.username];

          updateDoc(docRef, {
            downloads: newDownloads,
            downloadCount: fileData.downloadCount + 1,
          })
            .then(() => {
              getFileData();
            })
            .catch((error) => {
              console.error(error);
            });
          }
        }
      }
    });
  };
  if (
    errDisp ==
    "Database has reached its limit for the day. Please wait until 3AM EST."
  ) {
    return <div>{errDisp}</div>;
  }
  if (!dataLoaded) {
    return <div>Loading</div>;
  }
  return (
    <div className="h-[75%] w-full flex flex-col items-center">
      <h1
        className={`${
          fileData.name?.length < 20
            ? `text-xl sm:text-2xl md:text-5xl lg:text-8xl`
            : `text-md sm:text-lg md:text-2xl lg:text-3xl`
        } underline`}
      >
        {fileData.name}
      </h1>
      <p className="text-sm sm:text-md md:text-xl lg:text-2xl w-[50%] h-[50%] bg-gray-700 border-8 mt-5 border-gray-900 text-white text-wrap overflow-auto">
        Description: {fileData.description}
      </p>
      <p className="text-xs">Original Filename: {fileData.filename}</p>
      <p className="flex flex-row items-center mt-5">
        <Button style="none" onClick={like}>
          <FaThumbsUp color={liked ? "blue" : ""} />
        </Button>
        <p className="mr-3">{fileData.likeCount}</p>
        <FaDownload />
        <p className="mr-3">{fileData.downloadCount}</p>
      </p>
      <a
        download={fileData.name}
        onClick={download}
        href={url}
        className=" px-4 py-2 text-white bg-blue-500 rounded-full hover:scale-110 transition-all cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-3 w-32 text-center"
      >
        Download
      </a>
    </div>
  );
};

export default File;
