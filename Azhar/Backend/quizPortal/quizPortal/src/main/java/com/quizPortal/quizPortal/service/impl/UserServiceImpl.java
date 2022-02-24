package com.quizPortal.quizPortal.service.impl;

import com.quizPortal.quizPortal.model.Entities.User;
import com.quizPortal.quizPortal.model.Entities.UserSession;
import com.quizPortal.quizPortal.dao.UserSessionDao;
import com.quizPortal.quizPortal.model.dto.CreateUserRequest;
import com.quizPortal.quizPortal.model.dto.LoginSignupResponse;
import com.quizPortal.quizPortal.model.dto.UpdateUserRequest;
import com.quizPortal.quizPortal.model.dto.UserResponse;
import com.quizPortal.quizPortal.service.UserService;
import com.quizPortal.quizPortal.service.UserSessionService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.AccessDeniedException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.quizPortal.quizPortal.dao.UserDao;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Autowired
    UserSessionService userSessionService;

    @Autowired
    UserSessionDao userSessionDao;

    @Override
    public LoginSignupResponse createUser(CreateUserRequest request) {

        if (StringUtils.isBlank(request.getEmail()))
            throw new IllegalArgumentException("Null value cannot accepted in email");

        if (StringUtils.isBlank(request.getName()))
            throw new IllegalArgumentException("Invalid Name");

        if (StringUtils.isBlank(request.getPassword()))
            throw new IllegalArgumentException("Invalid Password");

        if (StringUtils.isBlank(request.getMobile()) || !request.getMobile().matches("\\d{10}"))
            throw new IllegalArgumentException("Invalid Mobile Number,Mobile number must be of 10 digits.");

        if (!request.getEmail().matches("^([\\w-\\.]+){1,64}@([\\w&&[^_]]+){2,255}.[a-z]{2,}$"))
            throw new IllegalArgumentException("Invalid Email");

        if (!request.getPassword().matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$"))
            throw new IllegalArgumentException("Please enter a valid password having atleast a digit," +
                    " a lowercase character, an uppercase character," +
                    " a special character and should be of minimum length 8 without any space.");

        if (userDao.findByEmail(request.getEmail()) != null)
            throw new AccessDeniedException("User already exists.");

        User user = new User();
        BCryptPasswordEncoder encodePassword = new BCryptPasswordEncoder(12);
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setPassword(encodePassword.encode(request.getPassword()));
        userDao.save(user);
        UserSession userSession = userSessionService.createSession(user);
        return new LoginSignupResponse(userSession.getToken(), user.getName());
    }

    @Override
    public UserResponse getUser(String token) {
        if (StringUtils.isBlank(token))
            throw new AccessDeniedException("Token cannot be null.");

        UserSession userSession = userSessionDao.findByToken(token);

        if (userSession == null || userSession.getSignOutTime() != null)
            throw new AccessDeniedException("Invalid user");

        User user = userSession.getUser();

        if (user == null)
            throw new IllegalArgumentException("Unauthorized User, signIn Again.");

        return new UserResponse(user.getName(), user.getGender(),
                user.getLinkedIn(), user.getHobbies(), user.getMobile());
    }

    @Override
    public UserResponse updateUser(UpdateUserRequest request, String token) {
        if (StringUtils.isBlank(token))
            throw new AccessDeniedException("Token cannot be null");

        if (StringUtils.isBlank(request.getName()))
            throw new IllegalArgumentException("Name cannot be null or empty");

        if (StringUtils.isBlank(request.getMobile()) || !request.getMobile().matches("\\d{10}"))
            throw new IllegalArgumentException("Invalid mobile number.");

        UserSession userSession = userSessionDao.findByToken(token);
        if (userSession == null)
            throw new AccessDeniedException("Invalid user.");

        User user = userSession.getUser();
        if (user == null)
            throw new AccessDeniedException("Invalid user");

        user.setName(request.getName());
        user.setMobile(request.getMobile());
        user.setHobbies(request.getHobbies());
        user.setLinkedIn(request.getLinkedIn());
        user.setGender(request.getGender());
        userDao.save(user);
        return new UserResponse(user.getName(), user.getGender(),
                user.getLinkedIn(), user.getHobbies(), user.getMobile());
    }

    @Override
    public LoginSignupResponse userLogin(CreateUserRequest request) {
        if (StringUtils.isBlank(request.getEmail()))
            throw new IllegalArgumentException("Email cannot be empty or null.");

        if (StringUtils.isBlank(request.getPassword()))
            throw new IllegalArgumentException("Password cannot be empty or null.");

        User user = userDao.findByEmail(request.getEmail());
        if (user == null)
            throw new IllegalArgumentException("User Not Registered");

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
        if (!request.getEmail().equals(user.getEmail()) || !bCryptPasswordEncoder.matches(request.getPassword(),
                user.getPassword()))
            throw new IllegalArgumentException("Invalid Credentials");

        UserSession userSession = userSessionService.createSession(user);
        return new LoginSignupResponse(userSession.getToken(), user.getName());
    }
}
