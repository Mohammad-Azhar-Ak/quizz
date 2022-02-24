import React, { Component } from 'react'
import HeaderComponent from '../components';
import axios from "axios";
import base_url from "../../../../utils/api"
import history from "../../../../utils/history";

class HeaderContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
        }
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    };

    handleClose = (id) => {
        const token = localStorage.getItem('sessionToken');
        if (id == 1) {
            history.push("/profile");
        }
        if (id == 2) {
            history.push("/home");
        }
        if (id == 3) {
            
            const options = {
                headers: { "Authorization": `${token}` }
            };
            axios.post(`${base_url}/user/logout`, `${token}`, options)
                .then((response) => {
                    localStorage.removeItem('sessionToken')
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.log(error);
                    window.location.href="/";
                });
        }
        this.setState({ anchorEl: null });
    };

    render() {
        return (
            <HeaderComponent
                anchorEl={this.state.anchorEl}
                handleClose={this.handleClose}
                handleMenu={this.handleMenu}                
            />
        )
    }
}

export default HeaderContainer