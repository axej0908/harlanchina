package com.axej.harlan.user.service;

import com.axej.harlan.user.bean.AuthBean;

/**
 * Description:实名认证
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:10:53 2017/12/4
 */
public interface AuthService {

    boolean submitAuth(AuthBean idAuthBean);

    AuthBean detail(AuthBean idAuthBean);

    boolean updateById(AuthBean idAuthBean);
}
