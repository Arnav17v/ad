"use client";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { use, useEffect, useState } from "react";
import { set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Addreq = () => {
  type AdReqType = {
    wteach: string;
    hslot: string;
    hteach: string;
    cc: string;
    id: string;
    wslot: string;
    CN: string;
    Name: string;
    email: string;
  };
  const [cc, setcc] = useState("");
  const [CN, setCN] = useState(""); //this will be the course Name
  const [hslot, sethslot] = useState("");
  const [hteach, sethteach] = useState("");
  const [wslot, setwslot] = useState("");
  const [wteach, setwteach] = useState("");
  const [Name, setName] = useState("");
  const [variable, setvariable] = useState(false);
  const [adreq, setadreq] = useState<AdReqType[]>([]);
  const usercollectionRef = collection(db, "users");
  const adreqref = collection(db, "adreq");
  const getuserdoc = async () => {
    if (auth.currentUser) {
      const userSnapshot = await getDocs(
        query(usercollectionRef, where("email", "==", auth.currentUser.email))
      );
      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        setName(userData.Name);
      }
    }
  };
  getuserdoc();
  const makerequest = async () => {
    try {
      await addDoc(adreqref, {
        cc: cc,
        hslot: hslot,
        hteach: hteach,
        wslot: wslot,
        wteach: wteach,
        Name: Name,
        CN: CN,
        email: auth.currentUser?.email,
      });
      window.location.reload();
    } catch (err: any) {
      console.log("this is the error ---------->>>>>>>" + err);
    }
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger
          className="bg-[#111111] border-none"
          onClick={() => setvariable(true)}
        >
          Post ADR
        </DialogTrigger>
        <DialogContent className="bg-[#111] border-none">
          <DialogHeader>
            <DialogTitle>AD-request</DialogTitle>
            <DialogDescription>
              <div>
                <div className={variable ? "" : "hidden"}>
                  <div>
                    <div className="flex flex-col">
                      <label htmlFor="cc">My CourseCode</label>
                      <input
                        className="p-2 min-w-[400px]"
                        type="text"
                        onChange={(e) => {
                          setcc(e.target.value);
                        }}
                      />
                      <label htmlFor="CN">Course Name</label>
                      <input
                        className="p-2 min-w-[400px]"
                        type="text"
                        onChange={(e) => {
                          setCN(e.target.value);
                        }}
                      />
                      <label htmlFor="hslot">My Slot</label>
                      <input
                        className="p-2 min-w-[400px]"
                        type="text"
                        onChange={(e) => {
                          sethslot(e.target.value);
                        }}
                      />
                      <label htmlFor="hteach">My Teacher</label>
                      <input
                        className="p-2 min-w-[400px]"
                        type="text"
                        onChange={(e) => {
                          sethteach(e.target.value);
                        }}
                      />
                      <label htmlFor="wslot">Wanted Slot</label>
                      <input
                        className="p-2 min-w-[400px]"
                        type="text"
                        onChange={(e) => {
                          setwslot(e.target.value);
                        }}
                      />
                      <label htmlFor="wteach">Wanted Teacher</label>
                      <input
                        className="p-2 min-w-[400px]"
                        type="text"
                        onChange={(e) => {
                          setwteach(e.target.value);
                        }}
                      />
                      <button
                        className="p-4 m-4 bg-red-500"
                        onClick={() => {
                          makerequest();
                        }}
                      >
                        Make request
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-center"></div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Addreq;
