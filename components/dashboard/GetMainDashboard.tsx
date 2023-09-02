import React from 'react'
import Articles from './layout/articles/Articles';

export default function GetMainDashboard({section=""}) {
 
    switch (section) {
        case "articles":
            return <Articles/>
    
        default:
            break;
    }
}
