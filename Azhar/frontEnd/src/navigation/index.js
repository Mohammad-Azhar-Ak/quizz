import React, { Component } from 'react'
import PrivateLayout from '../layout/private';
import PublicLayout from '../layout/public';

class Navigation extends Component {

    render() {
        if (localStorage.getItem('sessionToken')) return <PrivateLayout /> 
        return <PublicLayout />   
    }
}

export default Navigation