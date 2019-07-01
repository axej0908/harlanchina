package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.DangerBean;

import java.util.List;

public interface DangerService {

    boolean save(DangerBean dangerBean);

    boolean delete(int danger_id);

    boolean queryExist(DangerBean dangerBean);

    List<DangerBean> queryList(Query query);
    int queryTotal(Query query);

}
