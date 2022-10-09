import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import Navbar from './Navbar'
import Footer from './Footer'
import Loader from "./Loader.js";
import useDocumentTitle from './useDocumentTitle'
import Comments from "./comments/Comments.js";
import Comment from "./comments/Comment.js";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}

export default function OnePost() {
    const [postData, setPostData] = useState(null);
    const { slug } = useParams();
    let title = slug.replace(/-/g, " ").toUpperCase() 
    useDocumentTitle(title)
    useEffect(() => {
        sanityClient
            .fetch(
                `*[slug.current == $slug]{
          title,
          slug,
          categories[]->{title},
          publishedAt,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
        "name": author->name,
        "authorImage": author->image
       }`,
                { slug }
            )
            .then((data) => {setPostData(data[0]); console.log(data[0].body[0].children[0].text)})
            .catch(console.error);
    }, [slug]);

    if (!postData) return <Loader />;
    return (
        <>
        <section className="w-screen min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-400">
            <Navbar link="/" />
                <div className="px-2 pt-6 pb-4 post md:px-56 md:pt-12">
                    <h2 className="pb-2 text-3xl">{postData.title}</h2>

                    <div className="py-2 post-specs">
                        <div className="flex">
                            <p className="mr-6 text-xs italic uppercase md:text-sm">Posted: <span className="text-blue-800 date">{new Date(postData.publishedAt).toLocaleDateString()}</span></p>
                            <div className="flex">
                                <p className="mr-2 text-xs md:mr-6 md:text-sm">Tags:</p>
                                <div id="tags" className="flex gap-1.5 text-gray-800">
                                    {
                                        postData.categories.map((item, key) => {
                                            return <p key={key} className="border border-gray-500 py-0.5 px-2 text-xs rounded-md">{item.title}</p>
                                        })
                                    }
                                </div> 
                            </div>
                        </div>
                        <p className="pt-2 text-sm">Written by: <span className="font-semibold capitalize" style={{textTransform: "capitalize"}}>{postData.name}</span></p>
                    </div>
                    <img className="object-cover w-full my-4 h-96" src={urlFor(postData.mainImage).url()} alt="" />
                    <div>
                        <BlockContent
                            blocks={postData.body}
                            projectId={sanityClient.clientConfig.projectId}
                            dataset={sanityClient.clientConfig.dataset}
                        />
                    </div>
                </div>
                <Comments />
                <Comment />
                <Footer />
            </section>
        </>
    );
}