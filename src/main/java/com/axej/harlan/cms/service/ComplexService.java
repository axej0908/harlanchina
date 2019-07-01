package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.ComplexBean;
import com.axej.harlan.common.utils.Query;

import java.util.List;

public interface ComplexService {

    boolean save(ComplexBean complexBean);

    boolean update(ComplexBean complexBean);

    boolean delete(int complex_id);

    List<ComplexBean> queryList(Query query);
    int queryTotal(Query query);
}
