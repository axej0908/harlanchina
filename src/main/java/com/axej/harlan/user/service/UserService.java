package com.axej.harlan.user.service;

import com.axej.harlan.common.utils.R;
import com.axej.harlan.user.bean.UserBean;
import com.axej.harlan.common.utils.Query;

import java.util.List;
import java.util.Map;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:9:26 2017/11/24
 */
public interface UserService {

    boolean save(UserBean userBean);

    boolean delete(int user_id);

    boolean update(UserBean userBean);

    List<UserBean> queryList(Map<String,Object> map);
    int queryTotal(Query query);

    UserBean queryObject(UserBean userBean);

    boolean changePassword(int user_id,String old_pass,String new_pass);

    String becomeVip(UserBean param);

    R modMobile(int user_id, String mobile, String cpvc);
}
