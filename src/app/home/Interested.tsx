import {
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";

const thisinter = () => {
  const [Interested, setInterested] = useState<DocumentData[]>([]);
  const [adreqs, setAdreqs] = useState<DocumentData[]>([]); // state to store the adreqs
  const [showInterested, setShowInterested] = useState(false); // state to control the visibility of the interested requests
  const userCollectionRef = collection(db, "users");
  const adreqref = collection(db, "adreq");

  const getInterested = async () => {
    const q = query(
      userCollectionRef,
      where("email", "==", auth.currentUser?.email)
    );
    const interestedSnapshot = await getDocs(q);
    const interestedDocs: DocumentData[] = interestedSnapshot.docs.map((doc) =>
      doc.data()
    );

    setInterested(interestedDocs);
  };

  const getAdreqs = async (interestArray: string[]) => {
    const adreqSnapshot = await getDocs(adreqref);
    const adreqDocs: DocumentData[] = [];

    adreqSnapshot.docs.forEach((doc) => {
      if (interestArray.includes(doc.id)) {
        adreqDocs.push(doc.data());
      }
    });

    setAdreqs(adreqDocs);
  };

  useEffect(() => {
    getInterested(); // call getInterested when the component mounts
  }, []);

  useEffect(() => {
    if (Interested.length > 0) {
      const interestArray = Interested[0].Interest;
      getAdreqs(interestArray); // call getAdreqs when interestArray is available
    }
  }, [Interested]); // add Interested as a dependency

  const removeInterest = async (id: string) => {
    // remove the interest from the user document
    // this will trigger the useEffect to call getAdreqs again
    await updateDoc(doc(userCollectionRef, id), {
      Interest: [],
    });
    window.location.reload();
  };

  return (
    <div className="p-4 bg-[#111111] rounded-xl m-2">
      <div className="flex justify-between w-full">
        <h1 className="text-[40px]">Interested</h1>
        <button
          className="border-none"
          onClick={() => setShowInterested(!showInterested)}
        >
          {showInterested ? "Close" : "Open"}
        </button>
      </div>
      {showInterested && (
        <div className="flex flex-wrap">
          {adreqs.map((adreq, index) => (
            <div key={adreq.id} className="p-4 bg-[#200] w-fit rounded-xl m-2">
              <div>Course code:{adreq.cc}</div>
              <div>My slot:{adreq.hslot}</div>
              <div>My teacher:{adreq.hteach}</div>
              <div>Slot wanted:{adreq.wslot}</div>
              <div>Teahcers wanted:{adreq.wteach}</div>
              <div>Course Name: {adreq.CN}</div>
              <button
                className="bg-red-700 p-3"
                onClick={async () => {
                  removeInterest(adreq.id);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default thisinter;
