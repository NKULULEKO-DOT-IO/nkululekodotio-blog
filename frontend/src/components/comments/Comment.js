import React, {useEffect, useState} from 'react'
import { doc, setDoc, updateDoc, getDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase"

const Comment = ({slug}) => {
    const [comment, setComment] = useState({
        name: "",
        comment: "",
        postedAt: serverTimestamp()
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const docRef = doc(db, "blog-comments", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            await updateDoc(docRef, {
                comments: arrayUnion(comment)
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            await setDoc(doc(db, "blog-comments", slug), {comments: [comment]});
        }
        setComment({
            name: "",
            comment: "",
            postedAt: serverTimestamp()
        })
    }
  return (
    <>
          <section className="px-2 pt-6 pb-4 comment md:px-56 md:pt-12">
        <h1 className="py-4 text-2xl font-semibold">Post A Comment</h1>
        <form action="" onSubmit={handleSubmit}>
                  <div className="w-9/12 py-2 md:w-1/3">
                    <label htmlFor="comment">Name</label>
                      <input className="w-full p-2 border rounded focus:outline-none focus:shadow-outline" placeholder="Your Name"/>
                </div>
                  <div className="w-11/12 py-2 md:w-full">
                    <label htmlFor="comment">Comment</label>
                      <textarea rows="3" id className="w-full p-2 border rounded bg-none focus:outline-none focus:shadow-outline" placeholder="Write something..."></textarea>
                </div>
                  <button className="px-6 py-2 font-semibold tracking-wide duration-500 bg-yellow-400 rounded cursor-pointer hover:bg-yellow-500">COMMENT</button>
         </form>
    </section>
    </>
  )
}
export default Comment;