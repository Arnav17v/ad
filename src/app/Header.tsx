"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { auth } from "./firebase/config";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const Router = useRouter();
  const logout = async () => {
    try {
      await signOut(auth);
      Router.push("./");
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  });
  return (
    <header className="px-4 sm:px-8 md:px-16 lg:px-36 m-auto bg-[#000]">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between">
        <Link className="w-full sm:w-fit flex justify-center" href="./">
          <Image src="/logo2.png" alt="CDA Logo" width={100} height={100} />
        </Link>
        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          <Link href={loggedIn ? "./home" : "./"}>
            <div className="p-2 text">
              <button>Home</button>
            </div>
          </Link>
          <div className={loggedIn ? "hidden" : "flex gap-5 flex-wrap"}>
            <button>
              <a href={"./signup"}>Signup</a>
            </button>
            <button>
              <a href={"./signin"}>Signin</a>
            </button>
          </div>
          <div className={loggedIn ? "flex gap-5 flex-wrap" : "hidden"}>
            <button
              onClick={async () => {
                logout();
              }}
            >
              Logout
            </button>
            <button>
              <a href={"./dashboard"}>Dashboard</a>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
