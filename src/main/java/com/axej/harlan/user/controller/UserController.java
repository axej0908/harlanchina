package com.axej.harlan.user.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.*;
import com.axej.harlan.user.bean.UserBean;
import com.axej.harlan.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Random;

/**
 * Description:用户 user CRUD
 * 我的资料 - 账户安全 - 登录密码（修改）/手机验证
 * Created by IntelliJ IDEA
 *
 * @author : jaywechen
 * Date:20:34 2017/11/23
 */
@RestController
@RequestMapping(value = "/user")
public class UserController extends AbstractController {

    @Autowired
    private UserService userService;


    /**
     * 1.apply to be vip
     * @param param
     * user_id
     * @return
     */
    @RequestMapping(value = "/toVip")
    public R toVip(UserBean param){
        if (param.getUser_id() == 0){
            return R.error("error param");
        }
        String msg = userService.becomeVip(param);
        if("ok".equals(msg)){
            return R.ok();
        }else {
            return R.error(msg);
        }
    }


    @RequestMapping(value = "/save")
    public R save(UserBean userBean) {
        if (userBean == null) {
            logger.error("null param" + userBean.toString());
            return R.error("null param");
        }
        boolean flag = userService.save(userBean);
        if (flag) {
            return R.ok().put("msg", "success");
        } else {
            logger.error("save fail,id:" + userBean.getUser_id());
            return R.error("save fail");
        }
    }

    @RequestMapping(value = "/delete/{user_id}")
    public R delete(@PathVariable("user_id") int user_id) {
        if (user_id == 0) {
            logger.error("null param" + user_id);
            return R.error("null param");
        }
        boolean flag = userService.delete(user_id);
        if (flag) {
            return R.ok().put("msg", "success");
        } else {
            logger.error("delete fail,id:" + user_id);
            return R.error("delete fail");
        }
    }

    /**
     * 我的资料 - 基本资料补全 / 登录密码修改
     *
     * @param userBean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(UserBean userBean) {
        if (userBean == null || userBean.getUser_id() == 0) {
            logger.error("null param" + userBean.toString());
            return R.error("null param");
        }
        boolean flag = userService.update(userBean);
        if (flag) {
            return R.ok("success");
        } else {
            logger.error("update fail,id:" + userBean.getUser_id());
            return R.error("update fail");
        }
    }

    @RequestMapping(value = "/list")
    public R list(Map<String, Object> map) {
        if (map == null || map.size() == 0) {
            logger.error("null param:" + map.toString());
            return R.error();
        }
        Query query = new Query(map);
        List<UserBean> list = userService.queryList(query);
        int totalCount = userService.queryTotal(query);
        PageUtils pageUtils = new PageUtils(list, totalCount, query.getLimit(), query.getPage());
        return R.ok().put("result", pageUtils);
    }

    @RequestMapping(value = "/detail")
    public R detail(UserBean userBean) {
        if (userBean.getUser_id() == 0) {
            logger.error("null param" + userBean.toString());
            return R.error("null param");
        }
        UserBean dbUser = userService.queryObject(userBean);
        return R.ok().put("result", dbUser);
    }


    /**
     * 我的资料 - 账户安全 - 更换手机号 -> 发送短信验证码 ----------start
     *
     * @param user_phone
     * @return
     */
    @RequestMapping(value = "/mobile/code")
    public R sendMobileCode(String user_phone, HttpServletRequest request) {
        if (user_phone == null) {
            return R.error("user_phone null");
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

    /**
     * 我的资料 - 账户安全 - 修改登录密码
     *
     * @param user_id
     * @param old_pass
     * @param new_pass
     * @return
     */
    @RequestMapping(value = "/password/modify")
    public R modifyPassword(int user_id, String old_pass, String new_pass) {
        boolean flag = userService.changePassword(user_id, old_pass, new_pass);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }

    /**
     * 后台-->用户管理-->注册用户(接口暂时)
     *
     * @Method: lists
     * @Param [map]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 10:42 2018/6/22
     */
    @RequestMapping(value = "/lists")
    public R lists(int page , int limit, Map<String, Object> map) {
        if(page == 0 && limit == 0){
            return R.error("null param");
        }
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<UserBean> userBeans = userService.queryList(query);
        int total = userService.queryTotal(query);
        return R.ok().put("data", userBeans).put("count", total);
    }
}
