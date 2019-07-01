/*
package com.axej.harlan.common.intercept;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

*/
/**
 * Description:登录拦截 (实现拦截器)
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:11:44 2017/12/6
 *//*


public class LoginInterceptor extends HandlerInterceptorAdapter {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        logger.info("LoginInterceptor...preHandle...");
        logger.debug("handler:"+handler.getClass()+ ",HandlerMethod.class:"+HandlerMethod.class);
        Object obj = request.getSession().getAttribute("user");
        if (obj == null){
            response.sendRedirect(request.getContextPath()+"/login.html");
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        logger.info("postHandle...");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        logger.info("afterCompletion...");
    }
}
*/
