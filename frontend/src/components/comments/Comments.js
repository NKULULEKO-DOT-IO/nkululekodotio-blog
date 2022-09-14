import React, {useEffect, useState} from 'react'
import { doc, getDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"

const Comments = ({slug}) => {
 const [comments, setComments] = useState([]);
 const fetchComments = async () => {
     const docRef = doc(db, "blog-comments", slug);
     const docSnap = await getDoc(docRef);

     if (docSnap.exists()) {
         console.log("Document data:", docSnap.data());
         const unsub = onSnapshot(doc(db, "blog-comments", slug), (doc) => {
             console.log("Current data: ", doc.data());
            });
    }
    else {
         // doc.data() will be undefined in this case
         console.log("No such document!");
     }
    }
 useEffect(() => {
    fetchComments()
 })
  return (
    <>
        <section className="comments">
            <h1 className="Comments text-3xl">Comments</h1>
            {
                comments && 
                comments.map(() => {
                    return <div className="comment">
                        <p>Comment</p>
                        <div className="name">
                            <h1 className="name">Name</h1>
                            <span>Posted</span>
                        </div>
                    </div>
                })
            }
        </section>
    </>

  )
}

export default Comments