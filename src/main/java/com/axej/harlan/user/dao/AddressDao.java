package com.axej.harlan.user.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.user.bean.AddressBean;
import org.apache.ibatis.annotations.Mapper;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:13:35 2017/12/2
 */
@Mapper
public interface AddressDao extends BaseDao<AddressBean> {
    /**
     * 指定用户所有地址改为普通状态
     * @param user_id
     */
    int updateAsNormal(int user_id);
}