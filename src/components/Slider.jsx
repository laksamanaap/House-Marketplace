import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import SwiperCore from "swiper";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Pagination, EffectFade]);
import "swiper/css";
import "swiper/swiper-bundle.css";

function Slider() {
  const [loading, setIsLoading] = useState(true);
  const [listing, setListing] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListing(listings);
      setIsLoading(false);
    };

    fetchListing();
  }, []);

  // console.log(listing);

  if (loading) {
    return <Spinner />;
  }

  return (
    listing && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[EffectFade, Pagination]}
          effect={"fade"}
        >
          {listing.map(({ data, id }, index) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <img
                className="swiperSlideDiv swiperSlideDiv--explore"
                alt={`image-${data.imgUrls[0]}-${index}`}
                src={data.imgUrls[0]}
              ></img>
              <p className="swiperSlideText">{data.name}</p>
              <p className="swiperSlidePrice">
                $ {data.discountedPrice ?? data.regularPrice}{" "}
                {data.type === "rent" && " / Month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
