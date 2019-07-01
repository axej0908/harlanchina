package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CompoundBean;
import com.axej.harlan.common.utils.Query;

import java.util.List;

public interface CompoundService {

    boolean save(CompoundBean compoundBean);

    boolean update(CompoundBean compoundBean);

    boolean delete(int cpd_id);

    List<CompoundBean> queryList(Query query);
    int queryTotal();

    CompoundBean queryObject(CompoundBean compoundBean);

    List<CompoundBean> gather();
}
