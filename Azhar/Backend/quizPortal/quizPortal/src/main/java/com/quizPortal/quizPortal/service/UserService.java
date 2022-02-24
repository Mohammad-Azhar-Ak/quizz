package com.quizPortal.quizPortal.service;

import com.quizPortal.quizPortal.model.dto.CreateUserRequest;
import com.quizPortal.quizPortal.model.dto.LoginSignupResponse;
import com.quizPortal.quizPortal.model.dto.UpdateUserRequest;
import com.quizPortal.quizPortal.model.dto.UserResponse;

public interface UserService {

    LoginSignupResponse createUser(CreateUserRequest request);

    UserResponse getUser(String token);

    UserResponse updateUser(UpdateUserRequest request, String token);

    LoginSignupResponse userLogin(CreateUserRequest request);

}
