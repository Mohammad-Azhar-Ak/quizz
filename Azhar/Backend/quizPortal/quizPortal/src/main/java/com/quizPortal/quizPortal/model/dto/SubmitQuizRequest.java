package com.quizPortal.quizPortal.model.dto;

import java.util.List;

public class SubmitQuizRequest {

    private List<SubmitQuestionsRequest> listOfQuestion;

    public List<SubmitQuestionsRequest> getListOfQuestion() {
        return listOfQuestion;
    }

    public void setListOfQuestion(List<SubmitQuestionsRequest> listOfQuestion) {
        this.listOfQuestion = listOfQuestion;
    }
}
