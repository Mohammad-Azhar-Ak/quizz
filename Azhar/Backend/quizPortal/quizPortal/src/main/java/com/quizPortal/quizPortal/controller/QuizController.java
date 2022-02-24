package com.quizPortal.quizPortal.controller;

import com.quizPortal.quizPortal.model.Entities.Question;
import com.quizPortal.quizPortal.model.Entities.Quiz;
import com.quizPortal.quizPortal.model.dto.*;
import com.quizPortal.quizPortal.service.QuestionService;
import com.quizPortal.quizPortal.service.QuizService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @Autowired
    QuestionService questionService;

    @PostMapping
    public BaseResponse<Quiz> createQuiz(@RequestBody CreateQuizRequest request){
        Quiz quiz = quizService.createQuiz(request);
        return new BaseResponse<>(HttpStatus.OK.value(), "Quiz created successfully", quiz);
    }

    @GetMapping
    public BaseResponse<List<Quiz>> getAllQuiz(@RequestHeader("Authorization") String token){
        if(StringUtils.isBlank(token))
            throw new AccessDeniedException("Token cannot be null.");
        List<Quiz> list = quizService.getAllQuiz(token);
        return new BaseResponse<>(HttpStatus.OK.value(), "Success", list);
    }

    @PostMapping(path ="/{quizId}/question")
    public BaseResponse<Void> addQuestion(@PathVariable("quizId") Integer quizId, @RequestBody CreateQuestionRequest request ){
        questionService.addQuestion(quizId, request);
        return new BaseResponse<>(HttpStatus.OK.value(), "Success");
    }

    @GetMapping(path ="/{quizId}/questions")
    public BaseResponse<List<Question>> getAllQuestion(@RequestHeader("Authorization") String token,@PathVariable("quizId") Integer quizId){
        if(StringUtils.isBlank(token))
            throw new AccessDeniedException("Token cannot be null.");
        List<Question> list = questionService.getAllQuestion(token, quizId);
        return new BaseResponse<>(HttpStatus.OK.value(), "Success", list);
    }

    @PostMapping(path = "{quizId}/submit")
    public BaseResponse<SubmitResponse> submitQuiz(@RequestHeader("Authorization") String token, @RequestBody SubmitQuizRequest list, @PathVariable("quizId") Integer quizId){
        if(StringUtils.isBlank(token))
            throw new AccessDeniedException("Token cannot be null.");
        SubmitResponse scores = questionService.submitQuiz(token, list, quizId);
        return new BaseResponse<>(HttpStatus.OK.value(), "Success", scores);
    }
}
