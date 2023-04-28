import React, { useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import emailjs from '@emailjs/browser';
import AdminNavigationBar from '../navbar'
import "../../feedback/Feedback.css";
import { database, storage } from '../../../config'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddAdvertisement = () => {
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [companyName,setCompanyName] = useState("")



  const submitData = (e) => {
    e.preventDefault();
    console.log('inside the sendEma')

    database.ref("advertisement").push({
      title:title,
      email: email,
      description:description,
      imageURL: imageURL,
      number:number,
      companyName:companyName
    });



    toast.success('Advertisement Added !!')      

      setEmail('')
      setDescription('')
      setImageURL('')
      setTitle('')
      setNumber('');
};

console.log('inside adds')
  return (
    <div>
     <AdminNavigationBar/>
      <div class=" mt-16 flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-6">
          <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-green-800">
              Post Advertisement
            </h2>
          </div>

          <div class="rounded  max-w-md overflow-hidden shadow-xl p-5 bg-green-200">
            <form class="space-y-4" onSubmit={submitData} >
              <input type="hidden" name="remember" value="True" />
              <div class="rounded-md shadow-sm -space-y-px">
                <div class="grid gap-6">
                <div class="col-span-12">
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <input
                      onChange={(e) => setCompanyName(e.target.value)}
                      value={companyName}
                      type="text"
                      name="name"
                      id="name"
                      autocomplete="given-name"
                      class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div class="col-span-12">
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      type="text"
                      name="title"
                      id="name"
                      autocomplete="given-name"
                      class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-12 mt-3">
                    <label
                      for="email_address"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      rows={6}
                      cols={10}
                      type="text"
                      name="description"
                      id="description"
                      autocomplete="description"
                      class="mt-1 p-2 focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div class="col-span-12 mt-3">
                    <label
                      for="email_address"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      {" "}
                      Product URL
                    </label>
                    <input
                      onChange={(e) => setImageURL(e.target.value)}
                      value={imageURL}
                      type="text"
                      name="url"
                      id="phone_number"
                      autocomplete="given-number"
                      class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {/* <p  class=" mb-8 text-sm font-medium text-gray-700 w-full ">Contact Details</p> */}
                  <div class="col-span-12 mt-3">
                    <label
                      for="email_address"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Contact Number
                    </label>
                    <input
                      onChange={(e) => setNumber(e.target.value)}
                      value={number}
                      type="text"
                      name="number"
                      id="phone_number"
                      autocomplete="given-number"
                      class="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div class="col-span-12 mt-3">
                    <label
                      for="email_address"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Contact Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="text"
                      name="email"
                      id="phone_number"
                      autocomplete="given-number"
                      class="mt-1 p-2 focus:ring-indigo-500  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                type="submit"
                onClick={submitData}
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#68AC5D] hover:bg-[#69a360] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>

            {// setTimeout(() => {
            success && (
              <h1 className="text-md flex justify-center mt-6  text-darkgreen font-semibold">
                Thanks for your feedback
              </h1>
            )
            // }, 3000)
            }
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AddAdvertisement ;
