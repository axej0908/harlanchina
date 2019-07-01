package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.SupplyServBean;

import java.util.List;

public interface SupplyServService {

    boolean save(SupplyServBean supplyServBean);

    boolean update(SupplyServBean supplyServBean);

    boolean delete(int supply_id);

    List<SupplyServBean> queryList(Query query);
    int queryTotal(Query query);

    SupplyServBean queryObject(int supply_id);
}
