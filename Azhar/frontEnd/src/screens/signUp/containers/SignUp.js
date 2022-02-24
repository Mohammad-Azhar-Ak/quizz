import React, { Component } from 'react'
import { SignUpComponent } from '../components';
import base_url from "../../../utils/api";
import axios from "axios";
import { isEmpty } from 'lodash';
import history from '../../../utils/history';

class SignUpContainer extends Component {

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
                headers: { 'Headers': 'value' }
            };
            axios.post(`${base_url}/user/`, this.state.data, options)
                .then((response) => {
                    localStorage.setItem('sessionToken', response.data.data.token);
                    window.location.href = "/home";
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ open: true });
                });
        }
    }

    validation = () => {
        let regexForEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let regexForPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        let regexForMob = /^[6-9]\d{9}$/
        let error = {}

        if (!this.state.data.email) {
            error.email = "Email cannot be empty"
        }
        if (!this.state.data.password) {
            error.password = "Password cannot be empty"
        }
        if (!this.state.data.name) {
            error.name = "Name cannot be empty"
        }
        if (!this.state.data.mobile) {
            error.mobile = "Mobile number cannot be empty"
        }
        if (this.state.data.email && !regexForEmail.test(this.state.data.email)) {
            error.email = "Invalid email!"
        }
        if (this.state.data.password && !regexForPass.test(this.state.data.password)) {
            error.password = "Password must be of 6 digit, contain uppercase, lowercase character, number and a special character"
        }
        if (this.state.data.password !== this.state.data.confirm_password) {
            error.confirm_password = "Password and confirm password must be same"
        }
        if (this.state.data.mobile && !regexForMob.test(this.state.data.mobile)) {
            error.mobile = "Invalid mobile number, mobile number must be of 10 digit"
        }
        this.setState({ error: error });
        return error;
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleLink = () => {
        history.push("/")
    }

    render() {
        return (
            <SignUpComponent
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

export default SignUpContainer