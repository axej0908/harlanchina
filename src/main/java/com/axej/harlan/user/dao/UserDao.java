package com.axej.harlan.user.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.user.bean.UserBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:15:08 2017/11/23
 */
@Repository
@Mapper
public interface UserDao extends BaseDao<UserBean> {

    UserBean get(int user_id);

    List<UserBean> queryEnList(Map<String,Object> map);
}
