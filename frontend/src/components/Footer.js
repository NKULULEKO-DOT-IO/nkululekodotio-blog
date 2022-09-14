import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin,  faYoutube} from '@fortawesome/free-brands-svg-icons'
import { doc, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore"; 
import {db} from "../firebase"
import { confirmPasswordReset } from 'firebase/auth';

const Footer = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        // createdAt: serverTimestamp()
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const ref = doc(db, "blog-newsletter", "email-list");
        await updateDoc(ref, {
            list: arrayUnion(user)
        })
        setUser({
            name: "",
            email: "",
            // createdAt: serverTimestamp()
        })
        console.log("Updated")
    }
  return (
    <section className="bg-gray-100 w-screen flex flex-col items-center justify-center pt-8 pb-2">
          <div className="news flex flex-col items-center justify-center w-full">
              <h3 className="uppercase font-ligh text-xl">join our email list</h3>
            <form action="" onSubmit={handleSubmit}>
              <div className="mb- w-72 mt-2">
                <label className="block text-gray-700 text-center text-sm mb-2">
                Name
                <input onChange={(e) => setUser({...user, name: e.target.value})} placeholder="Name" type="text" className="shadow form-textarea mt-1 block w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="mb-2 w-72">
                  <label className="block text-gray-700 text-center text-sm mb-2">
                Email
                      <input required onChange={(e) => setUser({ ...user, email: e.target.value })} name="email" placeholder="Email" type="email" className="shadow form-textarea mt-1 block w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </label>
            </div>
              <input value="SEND" className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 duration-500 w-72 text-gray-900 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" />
              </form>
        </div>
        <div className="social py-6 flex flex-col items-center">
            <h3 className="uppercase text-xl font-light">Connect With Us</h3>
            <div className="flex gap-5 pt-2 ">
                <a className="hover:text-yellow-200 duration-300" href="https://www.facebook.com/nkululeko.io" >
                <FontAwesomeIcon className="text-2xl" icon={faFacebook} />
                </a>
                  <a className="hover:text-yellow-200 duration-300" href="https://www.instagram.com/nkululeko.io/" >
                <FontAwesomeIcon className="text-2xl" icon={faInstagram} />
                </a>
                  <a className="hover:text-yellow-200 duration-300" href="https://www.linkedin.com/company/nkululeko-dot-io" >
                <FontAwesomeIcon className="text-2xl" icon={faLinkedin} />
                </a>
                  <a className="hover:text-yellow-200 duration-300" href="https://www.youtube.com/channel/UCctr3zgUNRnH9VQoux-Qc1w" >
                <FontAwesomeIcon className="text-2xl" icon={faYoutube} />
                </a>
            </div>
        </div>
          <p className="text-gray-900 text-xs">© Copyright {new Date().getFullYear()} | NKULULEKO DOT IO (PTY) LTD</p>
    </section>
  )
}
export default Footer