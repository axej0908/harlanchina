package com.axej.harlan.goods.service;


import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.ShopBean;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:21 2018/1/20
 */
public interface ShopService {
    boolean openShop(ShopBean shopBean);

    boolean approve(int shop_id);

    boolean refuse(int shop_id);

    ShopBean queryDetail(int user_id);

    List<ShopBean> queryListByName(String searchParam);

    List<ShopBean> queryList(Query query);

    int queryTotal(Query query);

    void syncTotalSaleVolumes(int goods_id);

    boolean alter(ShopBean shopBean);
}
