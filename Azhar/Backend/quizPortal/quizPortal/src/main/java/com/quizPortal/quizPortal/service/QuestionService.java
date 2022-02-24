package com.quizPortal.quizPortal.service;
import com.quizPortal.quizPortal.model.Entities.Question;
import com.quizPortal.quizPortal.model.dto.SubmitQuizRequest;
import com.quizPortal.quizPortal.model.dto.SubmitResponse;
import com.quizPortal.quizPortal.model.dto.CreateQuestionRequest;
import com.quizPortal.quizPortal.model.dto.SubmitQuestionsRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuestionService {

    void addQuestion(Integer quizId, CreateQuestionRequest request);

    List<Question> getAllQuestion(String token, Integer quizId);

    SubmitResponse submitQuiz(String token, SubmitQuizRequest list, Integer quizId);
}
