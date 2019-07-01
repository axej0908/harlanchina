package com.axej.harlan.user.controller;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.TextMsgCode;
import com.axej.harlan.user.bean.CpvcBean;
import com.axej.harlan.user.bean.UserBean;
import com.axej.harlan.user.dao.CpvcDao;
import com.axej.harlan.user.service.UserService;
import com.axej.harlan.common.utils.R;
import com.google.code.kaptcha.Producer;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;

import com.axej.harlan.common.base.AbstractController;

import java.util.Date;
import java.util.Map;
import java.util.Random;

/**
 * @author lava
 * Description:用户注册-登录-退出-验证码生成
 * Created by IntelliJ IDEA
 * Date:17:34 2017/11/24
 */
@RestController
@RequestMapping(value = "/log")
public class LoginController extends AbstractController {

    @Autowired
    private UserService userService;
    @Autowired
    private CpvcDao cpvcDao;


    /**
     * 1.修改登录手机号
     *
     * @param user_id
     * @param mobile  (更换后手机号)
     * @param cpvc    (验证码)
     * @return
     */
    @RequestMapping(value = "/modMobile")
    public R modMobile(int user_id, String mobile, String cpvc) {
        if (user_id == 0 || StringUtils.isEmpty(mobile) || StringUtils.isEmpty(cpvc)) {
            return R.error(ERROR_PARAM);
        }
        return userService.modMobile(user_id, mobile, cpvc);
    }


    /**
     * 获取当前登录人的用户信息
     *
     * @return
     */
    @RequestMapping(value = "/currentUser")
    public R currentUser(HttpServletRequest request) throws Exception{
        UserBean userBean = (UserBean) request.getSession().getAttribute("user");
        if(userBean != null && userBean.getUser_id() != 0)
        {
            userBean = userService.queryObject(userBean);
            System.out.println(userBean.getUser_id());
        }
        return R.ok().put("data", userBean);
    }


    /**
     * 获取当前登录人的用户信息
     *
     * @return
     */
    @RequestMapping(value = "/currentChinaUser")
    public R currentChinaUser(HttpServletRequest request) {
        UserBean userBean = (UserBean) request.getSession().getAttribute("dbUser");
        if(userBean != null && userBean.getUser_id() != 0){
            userBean = userService.queryObject(userBean);
        }
        return R.ok().put("data", userBean);
    }


    /**
     * 注册
     *
     * @param userBean
     * @return
     */
    @RequestMapping(value = "/register")
    public R register(UserBean userBean, HttpServletRequest request) {
        if (userBean == null) {
            return R.error("null param");
        }
        CpvcBean cpvcBean = cpvcDao.queryObject(userBean.getUser_phone());
        if (!cpvcBean.getCpvc().equals(userBean.getUser_code())) {
            return R.error("cell phone verification code error");
        }
        boolean flag = userService.save(userBean);
        if (flag) {
            return R.ok("register success").put("data", userBean);
        } else {
            return R.error("register fail");
        }
    }

    /**
     * 注册 、修改(手机号)  发送 手机验证码
     *
     * @param user_phone
     * @return
     */
    @RequestMapping(value = "/mobileCode")
    public R sendMobileCode(String user_phone, HttpServletRequest request) {
        if (user_phone == null || StringUtils.isEmpty(user_phone)) {
            logger.error("error param...user_phone:" + user_phone);
            return R.error("error param");
        }
        //1.验证此手机号是否已经注册
        UserBean userBean = new UserBean();
        userBean.setUser_phone(user_phone);
        UserBean dbBean = userService.queryObject(userBean);
        if (dbBean != null) {
            return R.error("this phone has been registered");
        }

        //2.发送短信验证码
        int code = 0;
        Random random = new Random();
        while (code < 100000) {
            code = random.nextInt(999999);
        }
        //由于手机端session获取不到,验证码存于数据库中
//        request.getSession().setAttribute("mcode", code);
        //3.save mobile - code
        CpvcBean paramBean = new CpvcBean(user_phone, String.valueOf(code), ConcurrentDateUtils.format(new Date()));
        CpvcBean cpvcBean = cpvcDao.queryObject(user_phone);
        //saveOrUpdate
        if (cpvcBean == null) {
            cpvcDao.save(paramBean);
        } else {
            cpvcDao.update(paramBean);
        }
        Map<String, Object> map = TextMsgCode.sendCodeMod(user_phone, code);
        return R.ok().put("data", map.get("code"));
    }

    /**
     * 登录
     *
     * @param userBean
     * @return
     */
    @RequestMapping(value = "/login")
    public R login(UserBean userBean, HttpServletRequest request, HttpServletResponse response) {
        if (userBean.getUser_phone() == null || userBean.getUser_password() == null) {
            return R.error("null param");
        }
        UserBean dbUser = userService.queryObject(userBean);

        if (dbUser == null) {
            return R.error("account not exist");
        }

        if (dbUser.getUser_password().equals(userBean.getUser_password()) && "normal".equals(dbUser.getUser_state())) {
            if(dbUser.getBiz_type().equals("seller_zh")){
                request.getSession().setAttribute("dbUser", dbUser);
            }else if(dbUser.getBiz_type().equals("seller_en") || dbUser.getBiz_type().equals("buyer_en")){
                request.getSession().setAttribute("user", dbUser);
            }
            return R.ok("login success").put("data", dbUser);
        } else {
            return R.error("password is wrong or userType is wrong");
        }
    }


    /**
     * 退出登录
     */
    @RequestMapping(value = "/logout")
    public R logout(HttpServletRequest request) {
        boolean flag = logout(request.getSession());
        if (flag) {
            return R.ok();
        } else {
            return R.error();
        }
    }


    /**
     * 忘记密码
     *
     * @param userBean userBean - > user_phone
     *                 userBean - > user_code
     *                 userBean - > user_password
     * @return
     */
    @RequestMapping(value = "/resetPwd")
    public R forgetPwd(UserBean userBean) {
        if (userBean == null || userBean.getUser_phone() == null) {
            return R.error(ERROR_PARAM);
        }
        boolean flag = userService.update(userBean);
        if (flag) {
            return R.ok("register success");
        } else {
            return R.error("register fail");
        }
    }

    /**
     * 忘记密码 - 发送短信验证码
     *
     * @param user_phone
     * @param request
     * @return
     */
    @RequestMapping(value = "/mobile")
    public R sendMobileCodeOfPwd(String user_phone, HttpServletRequest request) {
        if (user_phone == null || "".equals(user_phone.trim())) {
            return R.error("null param");
        }
        int code = 0;
        Random random = new Random();
        while (code < 100000) {
            code = random.nextInt(999999);
        }
        Map<String, Object> map = TextMsgCode.sendCodeMod(user_phone, code);
        request.getSession().setAttribute("mcode", code);
        return R.ok().put("data", map.get("code"));
    }




}
