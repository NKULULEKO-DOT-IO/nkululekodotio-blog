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
    <section className="flex flex-col items-center justify-center w-screen pt-8 pb-2 mt-10 bg-gray-100">
          <div className="flex flex-col items-center justify-center w-full news">
              <h3 className="text-xl uppercase font-ligh">join our email list</h3>
            <form action="" onSubmit={handleSubmit}>
              <div className="mt-2 mb- w-72">
                <label className="block mb-2 text-sm text-center text-gray-700">
                Name
                <input onChange={(e) => setUser({...user, name: e.target.value})} placeholder="Name" type="text" className="block w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow form-textarea focus:outline-none focus:shadow-outline" />
                </label>
            </div>
            <div className="mb-2 w-72">
                  <label className="block mb-2 text-sm text-center text-gray-700">
                Email
                      <input required onChange={(e) => setUser({ ...user, email: e.target.value })} name="email" placeholder="Email" type="email" className="block w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow form-textarea focus:outline-none focus:shadow-outline" />
                </label>
            </div>
              <input value="SEND" className="px-4 py-2 font-semibold text-gray-900 duration-500 bg-yellow-400 rounded cursor-pointer hover:bg-yellow-500 w-72 focus:outline-none focus:shadow-outline" type="submit" />
              </form>
        </div>
        <div className="flex flex-col items-center py-6 social">
            <h3 className="text-xl font-light uppercase">Connect With Us</h3>
            <div className="flex gap-5 pt-2 ">
                <a className="duration-300 hover:text-yellow-200" href="https://www.facebook.com/nkululeko.io" >
                <FontAwesomeIcon className="text-2xl" icon={faFacebook} />
                </a>
                  <a className="duration-300 hover:text-yellow-200" href="https://www.instagram.com/nkululeko.io/" >
                <FontAwesomeIcon className="text-2xl" icon={faInstagram} />
                </a>
                  <a className="duration-300 hover:text-yellow-200" href="https://www.linkedin.com/company/nkululeko-dot-io" >
                <FontAwesomeIcon className="text-2xl" icon={faLinkedin} />
                </a>
                  <a className="duration-300 hover:text-yellow-200" href="https://www.youtube.com/channel/UCctr3zgUNRnH9VQoux-Qc1w" >
                <FontAwesomeIcon className="text-2xl" icon={faYoutube} />
                </a>
            </div>
        </div>
          <p className="text-xs text-gray-900">© Copyright {new Date().getFullYear()} | NKULULEKO DOT IO (PTY) LTD</p>
    </section>
  )
}
export default Footer