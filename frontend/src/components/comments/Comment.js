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
        <div>Post A Comment</div>
        <form action="" onSubmit={handleSubmit}></form>
    </section>
    </>
  )
}
export default Comment;