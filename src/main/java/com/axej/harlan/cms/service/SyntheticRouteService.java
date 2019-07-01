package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.SyntheticRouteBean;
import com.axej.harlan.common.utils.Query;

import java.util.List;

public interface SyntheticRouteService {

    boolean save(SyntheticRouteBean syntheticRouteBean);

    boolean update(SyntheticRouteBean syntheticRouteBean);

    boolean delete(int synthetic_id);

    List<SyntheticRouteBean> queryList(Query query);
    int queryTotal(Query query);

    SyntheticRouteBean queryObject(int synthetic_id);
}
