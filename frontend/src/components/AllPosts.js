import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import Footer from './Footer'
import useDocumentTitle from "./useDocumentTitle.js";


export default function AllPosts() {
    useDocumentTitle("HOME")
    const [allPostsData, setAllPosts] = useState(null);
    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "post"]{
        title,
        slug,
        categories[]->{title},
        publishedAt,
        body,
        "name": author->name,
        "authorImage": author->image,
        mainImage{
          asset->{
          _id,
          url
        }
      }
    }`
            )
            .then((data) => setAllPosts(data))
            .catch(console.error);
    }, []);

    return (
        <>
            <section className="w-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-400">
            <Navbar link="https://nkululeko.io" />
                <div className="post md:px-56 px-2 md:pt-12 pt-4">

            <h2 className="text-4xl font-light mb-8">Blog Posts</h2>
                <div>
                    {allPostsData &&
                        allPostsData.map((post, index) => (
                            <Link to={"/" + post.slug.current} key={post.slug.current}>
                                <div key={index} className="flex flex-col md:flex-row pt-2 pb-8  md:h-60">
                                    <img className="md:w-52 md:h-52 w-full h-60 object-cover rounded-md" src={post.mainImage.asset.url} alt="" />
                                    <div className="md:ml-6 md:py-0 pt-4">
                                        <h2 className="text-3xl">{post.title}</h2>
                                        <div className="post-specs py-2">
                                            <div className="flex">
                                                <p className="mr-6 uppercase italic">Posted: <span className="date text-blue-800">{new Date(post.publishedAt).toLocaleDateString()}</span></p>
                                                <div className="flex">
                                                    <p className="mr-6">Tags:</p>
                                                    <div id="tags" className="flex gap-1.5 text-gray-800">
                                                        {
                                                            post.categories.map((item, key) => {
                                                                return <p key={key} className="border border-gray-500 py-0.5 px-2 text-xs rounded-md">{item.title}</p>
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm pt-2">Written by: <span className="capitalize font-semibold" style={{ textTransform: "capitalize" }}>{post.name}</span></p>
                                            <p className="pt-4 w-full" >{`${post.body[0].children[0].text}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
            <Footer />
            </section>
        </>
    );
}