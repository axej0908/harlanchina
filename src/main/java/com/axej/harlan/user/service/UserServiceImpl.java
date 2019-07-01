package com.axej.harlan.user.service;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.user.bean.CpvcBean;
import com.axej.harlan.user.bean.UserBean;
import com.axej.harlan.user.dao.CpvcDao;
import com.axej.harlan.user.dao.UserDao;
import com.axej.harlan.common.utils.Query;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:9:27 2017/11/24
 */
@Service
@Transactional
public class UserServiceImpl extends AbstractController implements UserService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private CpvcDao cpvcDao;

    @Override
    public boolean save(UserBean userBean) {
        //1.查询此手机号是否已被注册
        UserBean dbUser = new UserBean();
        dbUser.setUser_phone(userBean.getUser_phone());
        dbUser = userDao.queryObject(dbUser);
        if (dbUser != null) {
            return false;
        }

        //2.save
        userBean.setRegister_time(ConcurrentDateUtils.format(new Date()));
        if (StringUtils.isEmpty(userBean.getDomestic())) {
            userBean.setDomestic("-1");
        }

        //添加默认昵称
        if(userBean.getUser_name() == null || userBean.getUser_name().equals("")){
            int code = 0;
            Random random = new Random();
            while (code < 100000) {
                code = random.nextInt(999999);
            }
            userBean.setUser_name("harlan_" + Integer.toString(code));
        }
        //添加默认头像
        userBean.setUser_photo("http://www.harlanchina.com/photo.png");
        int i = userDao.save(userBean);
        return i == 1 ? true : false;
    }

    @Override
    public boolean delete(int user_id) {
        int i = userDao.delete(user_id);
        return i == 1 ? true : false;
    }

    @Override
    public boolean update(UserBean userBean) {
        Map<String, Object> map = new HashMap<>();
        if (userBean.getUser_id() != 0) {
            map.put("user_id", userBean.getUser_id());
        } else if (userBean.getUser_phone() != null) {
            map.put("user_phone", userBean.getUser_phone());
        }

        UserBean dbUser = userDao.queryObject(map);
        if (dbUser == null) {
            logger.error("row not exist", userBean.getUser_id());
            return false;
        }
        userBean.setUser_id(dbUser.getUser_id());
        int i = userDao.update(userBean);
        return i == 1 ? true : false;

    }

    @Override
    public List<UserBean> queryList(Map<String, Object> map) {
        return userDao.queryList(map);
    }

    @Override
    public int queryTotal(Query query) {
        return userDao.queryTotal(query);
    }

    @Override
    public UserBean queryObject(UserBean userBean) {
        return userDao.queryObject(userBean);
    }

    @Override
    public boolean changePassword(int user_id, String old_pass, String new_pass) {
        UserBean userBean = new UserBean();
        userBean.setUser_id(user_id);
        UserBean dbUser = userDao.queryObject(userBean);
        if (dbUser == null) {
            return false;
        }
        if (!dbUser.getUser_password().equals(old_pass)) {
            return false;
        }
        dbUser.setUser_password(new_pass);
        int i = userDao.update(dbUser);
        return i == 1 ? true : false;
    }

    @Override
    public String becomeVip(UserBean param) {
        //step1:query this user by user_id
        UserBean userBean = userDao.queryObject(param);
        if (userBean == null) {
            return "not exist this user";
        }
        //step2:update this user to be vip
        if ("1".equals(userBean.getDomestic())) {
            return "already vip";
        } else {
            //缴费环节???
            userBean.setDomestic("1");
            userDao.update(userBean);
        }
        return "ok";
    }

    @Override
    public R modMobile(int user_id, String mobile, String cpvc) {
        //1.验证 短信验证码是否正确
        CpvcBean cpvcBean = cpvcDao.queryObject(mobile);
        if (cpvc == null || !cpvc.equals(cpvcBean.getCpvc())) {
            return R.error("not correct code");
        }
        //2.修改登录账号
        UserBean userBean = new UserBean();
        userBean.setUser_id(user_id);
        userBean.setUser_phone(mobile);
        int i = userDao.update(userBean);
        if (i == 1) {
            return R.ok();
        } else {
            return R.error();
        }
    }
}
