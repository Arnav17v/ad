"use client";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { use, useEffect, useState } from "react";
import { set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Addreq from "../home/Addreq";
import Header from "../Header";
import Footer from "../Footer";

const DashboardPage = () => {
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

  //collection references
  const adreqref = collection(db, "adreq");
  const usercollectionRef = collection(db, "users");
  const [isinter, setisinter] = useState(false);
  const [Interest, setInterest] = useState<string[]>([]);
  const [cc, setcc] = useState("");
  const [CN, setCN] = useState(""); //this will be the course Name
  const [hslot, sethslot] = useState("");
  const [hteach, sethteach] = useState("");
  const [wslot, setwslot] = useState("");
  const [wteach, setwteach] = useState("");
  const [Name, setName] = useState("");
  const [variable, setvariable] = useState(false);
  const [adreq, setadreq] = useState<AdReqType[]>([]);
  const router = useRouter();
  const [isAdded, setIsAdded] = useState<{ [key: string]: boolean }>({});
  // const [email, setEmail] = useState("");

  const [userId, setUserId] = useState<string | null>(null);

  const getuserdoc = async () => {
    if (auth.currentUser) {
      const userSnapshot = await getDocs(
        query(usercollectionRef, where("email", "==", auth.currentUser.email))
      );
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        setUserId(userDoc.id); // Set the user's document ID
        setName(userData.Name);
      }
    }
  };
  getuserdoc();
  console.log("loll--->" + userId + "Interest--->" + Interest);
  useEffect(() => {
    if (userId) {
      const userDocRef = doc(db, "users", userId);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setInterest(doc.data().Interest || []);
        }
      });

      // Clean up the subscription
      return () => unsubscribe();
    }
  }, [userId]);

  const addInterest = async (adreqid: string) => {
    if (userId) {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        if (userData) {
          if (!userData.Interest.includes(adreqid)) {
            await updateDoc(userRef, {
              Interest: arrayUnion(adreqid),
            });
            return true; // Interest was added
          }
        }
      } catch (err: any) {
        console.log("this is the error ---------->>>>>>>" + err);
      }
    } else {
      console.log("userId is null");
    }
    return false; // Interest was not added
  };

  async function getInterestedCount(adreqId: string): Promise<number> {
    const usersSnapshot = await getDocs(collection(db, "users"));
    let count = 0;
    usersSnapshot.docs.forEach((doc) => {
      const user = doc.data();
      if (user.Interest?.includes(adreqId)) {
        count++;
      }
    });
    return count;
  }

  const [interestedCount, setInterestedCount] = useState(0);

  useEffect(() => {
    if (adreq) {
      let totalInterestedCount = 0;
      adreq.forEach(async (req) => {
        const count = await getInterestedCount(req.id);
        totalInterestedCount += count;
      });
      setInterestedCount(totalInterestedCount);
    }
  }, [adreq]);

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
    } catch (err: any) {
      console.log("this is the error ---------->>>>>>>" + err);
    }
  };

  useEffect(() => {
    const getadreq = async () => {
      const data = await getDocs(adreqref);
      const filteredata = data.docs.map((doc) => {
        const { cc, hslot, hteach, wslot, wteach, Name, CN, email } =
          doc.data();
        return {
          cc,
          hslot,
          hteach,
          id: doc.id,
          wslot,
          wteach,
          Name,
          CN,
          email,
        };
      });
      // console.log(filteredata);
      console.log(Name);
      setadreq(filteredata);
    };
    getadreq();
  }, []);

  console.log(auth.currentUser?.email);
  console.log("this is the name " + Name);
  return (
    <div className="">
      <Header />
      <div className="max-w-[66rem] m-auto min-h-[70vh]">
        <div className="flex justify-between items-center">
          <div className="p-11 text-6xl">Requests</div>
          <div>
            <Addreq />
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          {adreq.map((adreq) => (
            <div key={adreq.id} className="p-4 rounded-xl bg-[#200] ">
              <div>Course code:{adreq.cc}</div>
              <div>My slot:{adreq.hslot}</div>
              <div>My teacher:{adreq.hteach}</div>
              <div>Slot wanted:{adreq.wslot}</div>
              <div>Teahcers wanted:{adreq.wteach}</div>
              <div>Course Name: {adreq.CN}</div>
              {/* <div>Interested Count: {interestedCount}</div> */}
              <div className="element">
                <Sheet>
                  <SheetTrigger className="border-none bg-[#111] p-2 mt-4">
                    Contact
                  </SheetTrigger>
                  <SheetContent className="bg-[#200] border-none">
                    <SheetHeader>
                      <SheetTitle>Contact details:</SheetTitle>
                      <SheetDescription>Email:{adreq.email}</SheetDescription>
                      <SheetDescription>Name:{adreq.Name}</SheetDescription>
                      <Button
                        className="bg-[#111] border-none p-2 rounded-xl m-2"
                        variant="secondary"
                        disabled={isAdded[adreq.id]} // Disable the button if the interest is already added
                        onClick={async () => {
                          const wasAdded = await addInterest(adreq.id);
                          setIsAdded((prevState) => ({
                            ...prevState,
                            [adreq.id]: wasAdded,
                          }));
                        }}
                      >
                        {isAdded[adreq.id] ? "Added" : "Add to Interest List"}{" "}
                      </Button>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="sm:hidden">
                <Drawer>
                  <DrawerTrigger className="border-none bg-[#111] p-2 mt-4">
                    Contact
                  </DrawerTrigger>
                  <DrawerContent className="border-none bg-[#200]">
                    <DrawerHeader>
                      <DrawerTitle>CONTACT DETAILS</DrawerTitle>
                      <DrawerDescription>Email:{adreq.email}</DrawerDescription>
                      <DrawerDescription>Name:{adreq.Name}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button
                        className="bg-[#111] border-none p-2 rounded-xl m-2"
                        variant="secondary"
                        onClick={async () => {
                          setInterest((prevInterest: any) => [
                            ...prevInterest,
                            adreq.id,
                          ]);
                        }}
                      >
                        Add to Interest List
                      </Button>
                      <DrawerClose className="bg-[#111] border-none p-2 rounded-xl m-2">
                        Close
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default DashboardPage;
