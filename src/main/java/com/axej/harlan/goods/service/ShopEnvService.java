package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.ShopEnvBean;

import java.util.List;

/**
 * @author: lava
 * date: 10:13 2018/5/23
 * created by: IntelliJ IDEA
 */
public interface ShopEnvService {
    void save(ShopEnvBean bean);

    void delete(int env_id);

    void update(ShopEnvBean bean);

    List<ShopEnvBean> queryList(Query query);

    int queryTotal(Query query);
}
