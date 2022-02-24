package com.quizPortal.quizPortal.service;

import com.quizPortal.quizPortal.model.Entities.Quiz;
import com.quizPortal.quizPortal.model.dto.CreateQuizRequest;

import java.util.List;

public interface QuizService {

    Quiz createQuiz(CreateQuizRequest request);

    List<Quiz> getAllQuiz(String token);
}
