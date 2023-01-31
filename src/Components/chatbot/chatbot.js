import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';

import logo from "../../img/logo1.png"

const steps = [
    {
      id: '1',
      options: [
        { value: 'Option 1', label: 'Option 1', trigger: '3' },
        { value: 'Option 2', label: 'Option 2', trigger: '4' },
      ]
    },
    {
      id: '2',
      options: [
        { value: 'Option 1', label: 'Option 1', trigger: '3' },
        { value: 'Option 2', label: 'Option 2', trigger: '4' },
      ],
    },
    {
      id: '3',
      message: 'You chose option 1!',
    },
    {
      id: '4',
      message: 'You chose option 2!',
      end: true,
    },
  ];
  

const App = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      {/* Your other components */}
      <div
        style={{
          display: showChatbot ? 'block' : 'none',
          position: 'fixed',

          bottom:"0px",
          width: '300px',
          height: '400px',
          right:"50px"
        }}
      >
        <ChatBot steps={steps} />
      </div>
      <button
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
        onClick={() => setShowChatbot(!showChatbot)}
      >
               <div style={{background:"rgb(33, 150, 83)",borderRadius:"50%", padding:"10px"}}>
        <img  width={"75px"} height={"75px"} src={logo}/>
        </div>
      </button>
    </>
  );
};

export default App;