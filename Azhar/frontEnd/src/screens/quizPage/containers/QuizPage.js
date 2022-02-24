import React, { Component } from 'react'
import { QuizPageComponent } from '../components';
import base_url from "../../../utils/api";
import axios from "axios";
import history from '../../../utils/history';

class QuizPageContainer extends Component {

    state = {
        list: [],
        answers: {},
        res: {},
        open: false
    }

    componentDidMount = () => {
        const token = localStorage.getItem('sessionToken');
        if(token){
        const options = {
            headers: { "Authorization": `${token}` }
        };
        let id = localStorage.getItem("quizId")
        axios.get(`${base_url}/quiz/${id}/questions`, options)
            .then((response) => {
                const list = response.data.data;
                this.setState({ list });
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("sessionToken");
                window.location.href = "/";
            });
        }
        else{
            localStorage.removeItem("sessionToken");
            window.location.href="/";
        }
    }
    onChangeValue = (id, value) => {
        let { answers } = this.state
        answers[id] = value;
        this.setState({ answers: answers });
    }

    submitQuiz = () => {
        let { answers } = this.state
        let listOfQuestion = Object.keys(answers).map((id, index) => {
            return {
                "id": id,
                "answer": answers[id]
            }
        })
        let QuestionList = { listOfQuestion }
        const token = localStorage.getItem('sessionToken');
        if(token){
        const options = {
            headers: { "Authorization": `${token}` }
        };
        let quizId = localStorage.getItem("quizId")
        axios.post(`${base_url}/quiz/${quizId}/submit`, QuestionList, options)
            .then((response) => {
                let res = response.data.data;
                this.setState({ res: res });
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("sessionToken");
                window.location.href = "/";
            });
        this.handleOpen();
        this.setState({ answers: answers });
        }
        else{
            localStorage.removeItem("sessionToken");
            window.location.href="/";
        }
    }

    handleClose = () => {
        this.setState({ open: false });
        history.push("/home");
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    render() {
        return (
            <QuizPageComponent
                data={this.state.list}
                onChangeValue={this.onChangeValue}
                answers={this.state.answers}
                submitQuiz={this.submitQuiz}
                submitResponse={this.state.res}
                handleOpen={this.state.open}
                handleClose={this.handleClose}
            />
        )
    }
}

export default QuizPageContainer