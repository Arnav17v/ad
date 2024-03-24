"use client";

import Link from "next/link";
import { useState } from "react";
import { auth, googleprovider } from "./firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase/config";

const Test = () => {
  const usercollectionRef = collection(db, "users");
  console.log(auth?.currentUser?.email);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [Name, setName] = useState("");
  const router = useRouter();
  const [reg, setreg] = useState("");
  const [Interest, setInterest] = useState<string[]>([]);

  const signin = async () => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(usercollectionRef, {
        email: email,
        name: name,
        Reg: reg,
        Name: Name,
        Interest: Interest,
      });
      router.push("./home");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        console.log("email already in use");
        alert("email already in use");
      }
      console.log(err);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex h-[100vh] justify-center items-center">
        <div className="flex flex-col border-2 border-red-950 p-5 rounded-[9px] shadow-2xl shadow-red-900 ">
          <label htmlFor="Name">Name</label>
          <input
            className="p-2 mb-5 min-w-[400px] bg-black border-2 border-gray-400 rounded-[9px] focus:outline-none"
            type="text"
            onChange={(e) => {
              setname(e.target.value);
              setName(e.target.value);
            }}
          />
          <label htmlFor="Reg">Reg</label>
          <input
            className="p-2 mb-5 min-w-[400px] bg-black border-2 border-gray-400 rounded-[9px] focus:outline-none"
            type="text"
            onChange={(e) => {
              setreg(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            className="p-2 mb-5 min-w-[400px] bg-black border-2 border-gray-400 rounded-[9px] focus:outline-none"
            type="email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <label htmlFor="Password">Password</label>
          <input
            className="p-2 mb-5 min-w-[400px] bg-black border-2 border-gray-400 rounded-[9px] focus:outline-none"
            type="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button className="btn-shine " onClick={signin}>
            Signup
          </button>
          <Link href="./">
            <button className="min-w-[400px] bg-red-500 m-2 " onClick={logout}>
              X
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Test;
