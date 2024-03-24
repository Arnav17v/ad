"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Addreq from "./Addreq";
import Interested from "./Interested";
import Header from "../Header";
import Footer from "../Footer";

const Home = () => {
  type AdReqType = {
    wteach: string;
    hslot: string;
    hteach: string;
    cc: string;
    id: string;
    wslot: string;
    CN: string;
    Name: string;
  };
  const router = useRouter();
  const adreqref = collection(db, "adreq");
  const [Name, setName] = useState("");
  const [varr, setvar] = useState(false);
  const [isRequestsVisible, setRequestsVisible] = useState(true);
  const [req, setreq] = useState<AdReqType[]>([]);
  const removereq = async (id: string | undefined) => {
    await deleteDoc(doc(adreqref, id));
    window.location.reload();
  };

  const usercollectionRef = collection(db, "users");
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
  useEffect(() => {
    const getadreq = async () => {
      if (Name) {
        const userRequestsQuery = query(adreqref, where("Name", "==", Name));
        const userRequestsSnapshot = await getDocs(userRequestsQuery);
        const userRequests = userRequestsSnapshot.docs.map((doc) => {
          const { cc, hslot, hteach, wslot, wteach, Name, CN } = doc.data();
          return {
            cc,
            hslot,
            hteach,
            id: doc.id,
            wslot,
            wteach,
            Name,
            CN,
          };
        });
        setreq(userRequests);
      }
    };
    getadreq();
  }, [Name]);

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        router.push("./");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <Header />
      <div className="max-w-[66rem] m-auto min-h-[70vh]">
        <div className="flex justify-between items-center">
          <div className="p-11 text-4xl">Hi {Name ? Name : "User"}! 👋</div>
          <Addreq />
        </div>
        <div className="bg-[#111111] p-2 rounded-xl ">
          <div className="p-4 text-4xl flex justify-between items-center">
            <div>My Requests</div>
            <button
              className="text-lg border-none"
              onClick={() => setRequestsVisible(!isRequestsVisible)}
            >
              {isRequestsVisible ? "Close" : "Open"}
            </button>
          </div>
          {isRequestsVisible && (
            <div
              className={`slide-down${
                isRequestsVisible ? ".show sm:flex gap-3 flex-wrap" : ""
              }`}
            >
              {req.map((reqq) => (
                <div
                  key={reqq.id}
                  className=" rounded-xl m-2 w-fit p-4 bg-[#200] "
                >
                  <div>Course code:{reqq.cc}</div>
                  <div>Name:{reqq.Name}</div>
                  <div>My slot:{reqq.hslot}</div>
                  <div>My teacher:{reqq.hteach}</div>
                  <div>Slot wanted:{reqq.wslot}</div>
                  <div>Teahcers wanted:{reqq.wteach}</div>
                  <div>Course Name: {reqq.CN}</div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        removereq(reqq.id);
                      }}
                      className="bg-red-700 p-3"
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <Interested />
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
