import React from 'react' 
import { Link } from 'react-router-dom'
import history from '../../../utils/history'

const Customlink=({link, body}) => {
    return(
        <Link to={link}  exact >{body}</Link>
    )
}

export default Customlink
