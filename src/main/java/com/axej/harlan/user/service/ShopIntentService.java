package com.axej.harlan.user.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.user.bean.ShopIntentBean;

import java.util.List;

/**
* Description：
* Package com.axej.harlan.tendency.service
* Class ProductService
* Author: Ning
* Date: 14:16 2017/12/20
*/
public interface ShopIntentService {

    boolean save(ShopIntentBean productBean);

    boolean delete(Long shopIntent_id);

    boolean update(ShopIntentBean productBean);

    List<ShopIntentBean> queryList(Query query);

    int queryTotal(Query query);

    List<ShopIntentBean> queryRandomList(ShopIntentBean shopIntentBean);

    ShopIntentBean queryObject(ShopIntentBean shopIntentBean);
}
