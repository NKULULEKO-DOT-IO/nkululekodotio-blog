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
                <div className="post md:px-56 px-2 md:pt-12 pt-6 pb-4">
                    <h2 className="text-3xl pb-2">{postData.title}</h2>

                    <div className="post-specs py-2">
                        <div className="flex">
                            <p className="mr-6 uppercase md:text-sm text-xs italic">Posted: <span className="date text-blue-800">{new Date(postData.publishedAt).toLocaleDateString()}</span></p>
                            <div className="flex">
                                <p className="md:mr-6 mr-2 md:text-sm text-xs">Tags:</p>
                                <div id="tags" className="flex gap-1.5 text-gray-800">
                                    {
                                        postData.categories.map((item, key) => {
                                            return <p key={key} className="border border-gray-500 py-0.5 px-2 text-xs rounded-md">{item.title}</p>
                                        })
                                    }
                                </div> 
                            </div>
                        </div>
                        <p className="text-sm pt-2">Written by: <span className="capitalize font-semibold" style={{textTransform: "capitalize"}}>{postData.name}</span></p>
                    </div>
                    <img className="w-full h-96 object-cover my-4" src={urlFor(postData.mainImage).url()} alt="" />
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