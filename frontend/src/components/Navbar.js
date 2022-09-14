import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'


const Navbar = (props) => {
  return (
    <>
          <nav className="flex w-full justify-between md:px-24 sm:px-12 px-4 h-16 items-center">
            <div className="flex h-full items-center">
                  <img className="w-8 mr-4" src="https://firebasestorage.googleapis.com/v0/b/nkululekodotio-2b22e.appspot.com/o/blog%2Fadmin%2Flogo.svg?alt=media&token=61be4137-41ff-4b65-bc4a-926c3f7deaac" alt="logo" />
                  <h3 className="font-normal text-gray-600 text-xl uppercase ">Blog</h3>
            </div>
            <div>
                <a href={props.link}>
                  <FontAwesomeIcon className="text-gray-600 text-xl cursor-pointer duration-150 hover:text-gray-400" icon={faHouseChimney}/>
                </a>
            </div>
        </nav>
    </>
  )
}

export default Navbar