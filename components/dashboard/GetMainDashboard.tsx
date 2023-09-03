import React from 'react'
import Articles from './layout/articles/Articles';
import CreateArticles from './layout/createArticles/CreateArticles';

export default function GetMainDashboard({section=""}) {
 
    switch (section.toLowerCase()) {
        case "articles":
            return <Articles/>
            case "createarticles":
                return <CreateArticles/>
    
        default:
            break;
    }
}
