import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
// import {dbForChat as db } from '../../config';
// import { query, collection, orderBy, onSnapshot } from 'firebase/firebase-firestore';
import AdminHeading from '../Admin/AdminHeading/AdminHeading';

const style = {
  main: `flex flex-col p-[10px]`,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

//   useEffect(() => {
//     const q = query(collection(db, 'messages'), orderBy('timestamp'));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       let messages = [];
//       querySnapshot.forEach((doc) => {
//         messages.push({ ...doc.data(), id: doc.id });
//       });
//       setMessages(messages);
//     });
//     return () => unsubscribe();
//   }, []);

  return (
    <>
      <main >
        {/* {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))} */}

<AdminHeading/>

<h4 className="font-bold text-2xl flex justify-center  uppercase text-green-800" style={{marginTop:"50px", marginLeft:"20px"}}>Chat With Owner</h4>

      </main>
      {/* <SendMessage scroll={scroll} />
      <span ref={scroll}></span> */}
    </>
  );
};

export default Chat;