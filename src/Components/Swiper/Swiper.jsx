import React,{useState,useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import firebase from "firebase";
import { auth, database } from "../../config";

const SwiperCrousel = () => {


  const [userUid, setUserUid] = useState(null);
  const [authState, setAuthState] = useState(null);
  const [addList,setAddList] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        setAuthState(false);
      } else {
        setAuthState(true);
        setUserUid(user.uid);
      }
    });
  }, []);
  
 

  useEffect(() => {
    database
      .ref("advertisement")
      .on("value", (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var data = childSnapshot.val();
          items.push({
            key: childKey,
            title: data.title,
            imageURL: data.imageURL,
            description: data.description,
            email: data.email,
            companyName: data.companyName,
            number: data.number,
          });
        });
        setAddList(items);
      });
  }, [userUid]);

  console.log(addList,'add ka data');

  return (

    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className="object-fill w-full h-96"
            src="https://www.goodfreephotos.com/albums/other-photos/tractor-on-farm.jpg"
            alt="image slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-fill w-full h-96"
            src="https://www.agroinfomart.com/images/og-subcategory/pesticides.jpg"
            alt="image slide 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-fill w-full h-96"
            src="https://i.pinimg.com/originals/2b/e8/0a/2be80a17e74f0abe0dd1499cd1105648.png"
            alt="image slide 3"
          />
        </SwiperSlide>

        {addList.map((add)=>{
          return <SwiperSlide>
          <img
            className="object-fill w-full h-96"
            src={add.imageURL}
            alt="image slide 2"
          />
        </SwiperSlide>
        })}
      </Swiper>
    </>
  );
};

export default SwiperCrousel;
