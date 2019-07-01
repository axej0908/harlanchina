package com.axej.harlan.user.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.user.bean.AddressBean;

import java.util.List;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:11:21 2017/12/4
 */
public interface AddressService {
    List<AddressBean> queryList(Query query);

    int queryTotal(Query query);

    AddressBean queryObject(AddressBean addressBean);

    boolean save(AddressBean addressBean);

    boolean delete(AddressBean addressBean);

    boolean update(AddressBean addressBean);

}
