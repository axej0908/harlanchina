package com.axej.harlan.common.base;

import com.axej.harlan.user.bean.UserBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:20:34 2017/11/23
 */
public class AbstractController {
    public static final String ERROR_PARAM = "error param";

    public HttpServletRequest request;

    public Logger logger = LoggerFactory.getLogger(getClass());

    public UserBean getCurrUser() {
        return (UserBean) request.getSession().getAttribute("user");
    }

    public boolean logout(HttpSession session) {
        if (session == null){
            return false;
        }
        session.removeAttribute("user");
        session.invalidate();
        return true;
    }

}
