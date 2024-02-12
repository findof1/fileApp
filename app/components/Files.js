"use client";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  endBefore,
  limitToLast,
  endAt,
  where,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { FaThumbsUp } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import Button from "./Button";
import Link from "next/link";
import TextInput from "./TextInput";

const Files = ({ user = null }) => {
  const [files, setFiles] = useState();
  const [firstVisible, setFirstVisible] = useState();
  const [lastVisible, setLastVisible] = useState();
  const [endVisible, setEndVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [errDisp, setErrDisp] = useState();
  const [end, setEnd] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(
    async (direction) => {
      let q;
      if (!user) {
        if (direction === "forward") {
          q = query(
            collection(db, "files"),
            orderBy("name"),
            where("name", ">=", searchText),
            where("name", "<=", searchText + "\uf8ff"),
            startAfter(lastVisible),
            limit(12)
          );
          setPage(page + 1);
        } else if (direction === "backward") {
          if (end) {
            q = query(
              collection(db, "files"),
              orderBy("name"),
              where("name", ">=", searchText),
              where("name", "<=", searchText + "\uf8ff"),
              endAt(firstVisible),
              limitToLast(12)
            );
          } else {
            q = query(
              collection(db, "files"),
              orderBy("name"),
              where("name", ">=", searchText),
              where("name", "<=", searchText + "\uf8ff"),
              endBefore(firstVisible),
              limitToLast(12)
            );
          }
          setPage(page - 1);
        } else {
          q = query(
            collection(db, "files"),
            orderBy("name"),
            where("name", ">=", searchText),
            where("name", "<=", searchText + "\uf8ff"),
            limit(12)
          );
          setPage(1);
        }
      } else {
        if (direction === "forward") {
          q = query(
            collection(db, "files"),
            where("user", "==", user),
            startAfter(lastVisible),
            limit(12)
          );
          setPage(page + 1);
        } else if (direction === "backward") {
          if (end) {
            q = query(
              collection(db, "files"),
              where("user", "==", user),
              endAt(firstVisible),
              limitToLast(12)
            );
          } else {
            q = query(
              collection(db, "files"),
              where("user", "==", user),
              endBefore(firstVisible),
              limitToLast(12)
            );
          }
          setPage(page - 1);
        } else {
          q = query(
            collection(db, "files"),
            where("user", "==", user),
            limit(12)
          );
          setPage(1);
        }
      }

      const filesSnapshot = await getDocs(q).catch((err) => {
        setErrDisp(
          "Database has reached its limit for the day. Please wait until 3AM EST."
        );
      });

      const filesList = filesSnapshot.docs.map((doc) => doc.data());

      setFiles(filesList);

      if (filesSnapshot.docs[0]) {
        setFirstVisible(filesSnapshot.docs[0]);
        setEnd(false);
      } else {
        setFirstVisible(lastVisible);
        setEnd(true);
      }

      setLastVisible(filesSnapshot.docs[filesSnapshot.docs.length - 1]);
      if (filesSnapshot.docs.length < 12) {
        setEndVisible(true);
      } else {
        setEndVisible(false);
      }
    },
    [
      searchText,
      lastVisible,
      firstVisible,
      setPage,
      setFiles,
      setFirstVisible,
      setEnd,
      setLastVisible,
      setEndVisible,
      end,
      page,
      setErrDisp,
    ]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    console.log(page);
  }, [page]);

  if (
    errDisp ==
    "Database has reached its limit for the day. Please wait until 3AM EST."
  ) {
    return <div>{errDisp}</div>;
  }

  return (
    <div className={`h-[70%]  ${!user ? "mt-[8%]" : "mt-[4%]"} w-full`}>
      {!endVisible ? (
        <Button
          onClick={() => {
            fetchData("forward");
          }}
          style="square"
          extraStyles="h-10 absolute top-[45%] right-[2%]"
        >
          Forward
        </Button>
      ) : (
        <></>
      )}
      {page > 1 ? (
        <Button
          onClick={() => {
            fetchData("backward");
          }}
          style="square"
          extraStyles="h-10 absolute top-[45%] left-[1%]"
        >
          Backward
        </Button>
      ) : (
        <></>
      )}
      {user ? (
        <></>
      ) : (
        <Button
          route="/upload"
          style="md"
          extraStyles="absolute top-[12%] left-[10%]"
        >
          Upload A File
        </Button>
      )}
      {user ? (
        <></>
      ) : (
        <TextInput
          label="Search: "
          value={searchText}
          onEnter={() => {
            fetchData();
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          style="sm"
          extraStyles="text-white text-2xl absolute top-[1.5%] left-[20%]"
        ></TextInput>
      )}
      <div className="h-full ml-[7%] w-[90%] grid grid-cols-4 grid-rows-3">
        {files?.map((file, index) => (
          <div
            key={index}
            className="bg-gray-700 border-4 border-black w-[70%] h-[90%] text-white pt-2 pl-2 relative"
          >
            <Link
              href={`/home/${file.name}?id=${file.filename}`}
              className="text-[8px] sm:text-sm md:text:md lg:text-xl overflow-clip text-wrap"
            >
              {file.name.length < 15
                ? file.name
                : file.name.slice(0, 15) + "..."}
            </Link>
            <p className="text-[6px] sm:text-[8px] md:text-[12px] lg:text-[14px] overflow-clip text-wrap">
              {file.description.length < 25
                ? file.description
                : file.description.slice(0, 25) + "..."}
            </p>
            <Link className="mt-auto" href={`/profile/${file.user}`}>
              By: {file.user}
            </Link>
            <p className="flex flex-row mt-auto align-bottom items-center absolute bottom-0">
              <FaThumbsUp />
              {file.likeCount}{" "}
              <p className="flex flex-row items-center ml-2 sm:ml-2 md:ml-6 lg:ml-20"></p>
              <FaDownload />
              {file.downloadCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;
