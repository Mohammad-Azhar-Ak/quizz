import React, { Component } from 'react'
import { ProfileComponent } from '../components';
import axios from "axios";
import base_url from "../../../utils/api";

class ProfileContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            responseData: {},
            data: {},
            flag: true
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('sessionToken');
        if (token) {
            const options = {
                headers: { "Authorization": `${token}` }
            };
            axios.get(`${base_url}/user/profile`, options)
                .then(res => {
                    const data = res.data.data;
                    this.setState({ responseData: data });
                }).catch(
                    (error) => {
                        console.log(error);
                        localStorage.removeItem("sessionToken")
                        window.location.href = "/"
                    }
                )
        }
        else {
            localStorage.removeItem("sessionToken");
            window.location.href = "/";
        }
    }

    handleChange = (key, value) => {
        this.setState({
            responseData: { ...this.state.responseData, [key]: value },
        });
    };

    handleClick = () => {
        if (!this.state.flag) {
            const token = localStorage.getItem('sessionToken');
            const options = {
                headers: { "Authorization": `${token}` }
            };
            axios.post(`${base_url}/user/update`, this.state.responseData, options)
                .then((response) => {
                })
                .catch((error) => {
                    console.log(error);
                    window.location.href = "/";
                });
        }
        this.setState({
            flag: !this.state.flag
        })
    }

    render() {
        return (
            <ProfileComponent
                data={this.state.responseData}
                handleChange={this.handleChange}
                handleClick={this.handleClick}
                flag={this.state.flag}
            />
        )
    }
}

export default ProfileContainer