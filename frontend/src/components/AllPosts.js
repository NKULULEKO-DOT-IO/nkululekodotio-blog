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
                <div className="px-4 pt-4 post lg:px-56 md:px-36 md:pt-12">

            <h2 className="mb-8 text-4xl font-light">Blog Posts</h2>
                <div>
                    {allPostsData &&
                        allPostsData.map((post, index) => (
                            <Link to={"/" + post.slug.current} key={post.slug.current}>
                                <div key={index} className="flex flex-col pt-2 pb-8 md:flex-row ">
                                    <img className="object-cover w-full rounded-md md:w-52 md:h-52 h-60" src={post.mainImage.asset.url} alt="" />
                                    <div className="pt-4 md:ml-6 md:py-0">
                                        <h2 className="text-3xl">{post.title}</h2>
                                        <div className="py-2 post-specs">
                                            <div className="flex">
                                                <p className="mr-6 italic uppercase">Posted: <span className="text-blue-800 date">{new Date(post.publishedAt).toLocaleDateString()}</span></p>
                                                <div className="flex">
                                                    <p className="mr-6">Tags:</p>
                                                    <div id="tags" className="flex items-start gap-1.5 text-gray-800">
                                                        {
                                                            post.categories.map((item, key) => {
                                                                return <p key={key} className="border grow border-gray-500 py-0.5 flex-1 px-2 md:text-xs text-xs rounded-md">{item.title}</p>
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            <p className="pt-2 text-sm">Written by: <span className="font-semibold capitalize" style={{ textTransform: "capitalize" }}>{post.name}</span></p>
                                            <p className="w-full pt-4" >{`${post.body[0].children[0].text}`}</p>
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