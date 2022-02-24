import React, { Component } from 'react'
import { HomeComponent } from '../components';
import base_url from "../../../utils/api";
import axios from 'axios';
import history from '../../../utils/history';
class HomeContainer extends Component {

  state = {
    posts: []
  }

  componentDidMount = () => {
    const token = localStorage.getItem("sessionToken");
    if (token) {
      const options = {
        headers: { "Authorization": `${token}` }
      };
      axios.get(`${base_url}/quiz`, options)
        .then(res => {
          const posts = res.data.data;
          this.setState({ posts });
        }).catch(
          (error) => {
            console.log(error);
            localStorage.removeItem("sessionToken");
            window.location.href = "/"
          }
        )
    }
    else {
      localStorage.removeItem("sessionToken");
      window.location.href = "/";
    }
  }

  handleClick = (id) => {
    localStorage.setItem("quizId", id);
    if (localStorage.getItem("sessionToken")) {
      history.push("/quizpage");
    }
    else {
      window.location.href = "/"
    }
  }

  render() {

    return (
      <HomeComponent
        data={this.state.posts}
        handleClick={this.handleClick}
      />
    )

  }
}

export default HomeContainer