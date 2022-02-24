package com.quizPortal.quizPortal.service.impl;

import com.quizPortal.quizPortal.model.Entities.Quiz;
import com.quizPortal.quizPortal.dao.QuestionDao;
import com.quizPortal.quizPortal.dao.QuizDao;
import com.quizPortal.quizPortal.model.Entities.Question;
import com.quizPortal.quizPortal.model.dto.SubmitQuizRequest;
import com.quizPortal.quizPortal.model.dto.SubmitResponse;
import com.quizPortal.quizPortal.model.dto.CreateQuestionRequest;
import com.quizPortal.quizPortal.model.dto.SubmitQuestionsRequest;
import com.quizPortal.quizPortal.service.QuestionService;
import com.quizPortal.quizPortal.service.UserSessionService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionDao questionDao;

    @Autowired
    QuizDao quizDao;

    @Autowired
    UserSessionService userSessionService;

    @Override
    public void addQuestion(Integer quizId, CreateQuestionRequest request) {
        if(quizId==null)
            throw new IllegalArgumentException("Quiz id cannot be null.");

        if(request==null)
            throw new IllegalArgumentException("Request cannot be null.");

        if(StringUtils.isBlank(request.getStatement()))
            throw new IllegalArgumentException("Statement cannot be empty.");

        if(request.getAnswer()==null)
            throw new IllegalArgumentException("Answer cannot be null.");

        if(request.getMarks()==null)
            throw new IllegalArgumentException("Mark cannot be null.");

        if(request.getMarks()<=0)
            throw new IllegalArgumentException("Mark should be greater than 0.");

        Question question = new Question();
        question.setStatement(request.getStatement());
        question.setAnswer(request.getAnswer());
        question.setMarks(request.getMarks());
        Quiz quiz = quizDao.getById(quizId);
        question.setQuiz(quiz);
        questionDao.save(question);
    }

    @Override
    public List<Question> getAllQuestion(String token, Integer quizId) {
        if(StringUtils.isBlank(token))
            throw new AccessDeniedException("Token cannot be null.");

        if(quizId==null)
            throw new IllegalArgumentException("Quiz id cannot be null.");

        userSessionService.validateSession(token);

        return questionDao.findAllByQuizId(quizId);
    }

    @Override
    public SubmitResponse submitQuiz(String token, SubmitQuizRequest request, Integer quizId) {
        if(StringUtils.isBlank(token))
            throw new AccessDeniedException("Token cannot be null.");

        if(request == null)
            throw new IllegalArgumentException("Request cannot be null");

        if(quizId==null)
            throw new IllegalArgumentException("Quiz id cannot be null.");

        userSessionService.validateSession(token);

        List<Question> questionList = questionDao.findAllByQuizId(quizId);
        if(questionList==null)
            throw new IllegalArgumentException("No questions found in this quiz.");

        HashMap<Integer, Boolean> responseOfUser = new HashMap<>();
        Integer rightCount=0,wrongCount=0,totalMarks=0,marksScored=0;
        if(request.getListOfQuestion()==null)
            throw new IllegalArgumentException("Question List cannot be null.");
        
        for(SubmitQuestionsRequest questions : request.getListOfQuestion()) {
            if(questions.getId()==null || questions.getAnswer()==null)
                throw new IllegalArgumentException("Question id or answer cannot be null.");
            responseOfUser.put(questions.getId(), questions.getAnswer());
        }

        for(Question questions : questionList){
            totalMarks+= questions.getMarks();
            if(responseOfUser.get(questions.getId())==null)
                continue;

           if(responseOfUser.get(questions.getId()).equals(questions.isAnswer())){
               rightCount++;
               marksScored+= questions.getMarks();
           }
           else{
               wrongCount++;
           }
        }
        SubmitResponse submitResponse = new SubmitResponse(rightCount,wrongCount,marksScored,totalMarks);
        return submitResponse;
    }
}