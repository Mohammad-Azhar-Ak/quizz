import React, { Component } from 'react';
import { SignInComponent } from '../components';
import base_url from "../../../utils/api";
import axios from "axios";
import { isEmpty } from 'lodash';
import history from '../../../utils/history';

class SignInContainer extends React.Component {

    constructor() {
        super()
        this.state = {
            data: {},
            error: {},
            open: false
        }
    }

    handleChange = (value, key) => {
        this.setState({
            data: { ...this.state.data, [key]: value }
        });
    }

    handleClick = () => {
        if (isEmpty(this.validation())) {
            const options = {
                headers: { 'Authorization': '' }
            };
            axios.post(`${base_url}/user/login`, this.state.data, options)
                .then((response) => {
                    localStorage.setItem('sessionToken', response.data.data.token);
                    window.location.href="/home"
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ open: true });
                });
        }
    }
    validation = () => {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let error = {}

        if (!this.state.data.email) {
            error.email = "Email cannot be empty"
        }
        if (!this.state.data.password) {
            error.password = "Password cannot be empty"
        }

        if (this.state.data.email && !regex.test(this.state.data.email)) {
            error.email = "Invalid email!"
        }

        this.setState({ error: error });
        return error;
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleLink=()=>{
        history.push("/signup");
    }

    render() {
        return (
            <SignInComponent
                data={this.state.data}
                handleChange={this.handleChange}
                handleClick={this.handleClick}
                error={this.state.error}
                handleClose={this.handleClose}
                open={this.state.open}
                handleLink={this.handleLink} />
        )
    }
}

export default SignInContainer;