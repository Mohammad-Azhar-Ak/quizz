package com.quizPortal.quizPortal.service.impl;

import com.quizPortal.quizPortal.model.Entities.User;
import com.quizPortal.quizPortal.model.Entities.UserSession;
import com.quizPortal.quizPortal.dao.UserSessionDao;
import com.quizPortal.quizPortal.service.UserSessionService;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserSessionServiceImpl implements UserSessionService {
    @Autowired
    UserSessionDao userSessionDao;

    @Override
    public UserSession createSession(User user) {

        UserSession userSession = new UserSession();

        String userToken = RandomStringUtils.randomAlphanumeric(45).toUpperCase();
        userSession.setToken(userToken);
        userSession.setSignInTime(new Date());
        userSession.setUser(user);
        return userSessionDao.save(userSession);
    }

    @Override
    public UserSession validateSession(String token) {
        if(StringUtils.isBlank(token))
            throw new AccessDeniedException("Token cannot be null");

        UserSession userSession = userSessionDao.findByToken(token);
        if(userSession==null || userSession.getSignOutTime()!=null)
            throw new AccessDeniedException("Access denied");

        return userSession;
    }

    @Override
    public void userLogout(String token) {
        if(StringUtils.isBlank(token))
            throw new AccessDeniedException("Token cannot be null");

        UserSession loginUser = userSessionDao.findByToken(token);
        if(loginUser==null || loginUser.getSignOutTime()!=null)
            throw new AccessDeniedException("Invalid user");

        loginUser.setSignOutTime(new Date());
        userSessionDao.save(loginUser);

    }
}
