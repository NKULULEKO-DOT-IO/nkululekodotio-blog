import React, {useState, useEffect} from 'react'

const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title + " | NKULULEKO DOT IO BLOG"
    }, [title])
}

export default useDocumentTitle