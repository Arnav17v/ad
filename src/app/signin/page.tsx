"use client";
import { auth, googleprovider } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("./home");
    } catch (err: any) {
      if (err.code === "auth/email-not-found") {
        console.log("email DNE");
        alert("email DNE");
        router.push("./signup");
      } else if (err.code === "auth/invalid-credential") {
        console.log("Invalid creds");
        alert("Invalid creds");
        router.push("./signup");
      }
      console.log(err);
    }
  };
  return (
    <div>
      <Header />
      <div className="flex h-[100vh] items-center justify-center">
        <div className="flex flex-col border-2 border-red-950 p-5 rounded-[9px] shadow-2xl shadow-red-900 ">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 mb-5 min-w-[400px] bg-black border-2 border-gray-400 rounded-[9px] focus:outline-none"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="Password">Password</label>
          <input
            className="p-2 min-w-[400px] bg-black border-2 border-gray-400 rounded-[9px] focus:outline-none"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="m-4 btn-shine" onClick={signin}>
            Signin
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
