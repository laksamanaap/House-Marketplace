import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const [landlord, setLandLord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const listingName = searchParams.get("listingName");
  const subject = `${listingName} - Roemah House Marketplace`;

  const params = useParams();

  const onChangeData = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", params.landlordId);
      const docSnap = await getDoc(docRef);
      if (docSnap) {
        setLandLord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
        console.error("Cant get landlord data!");
      }
    };
    fetchUser();
  }, [params.landlordId]);

  console.log(landlord);

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className="contantLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                <textarea
                  name="message"
                  id="message"
                  className="textarea"
                  value={message}
                  onChange={onChangeData}
                ></textarea>
              </label>
            </div>

            <a
              href={`mailto:${landlord.email}?Subject=${encodeURIComponent(
                subject
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
