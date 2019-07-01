package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.ExplainBean;

import java.util.List;

public interface ExplainService {

    boolean save(ExplainBean explainBean);

    boolean edit(ExplainBean explainBean);

    boolean del(ExplainBean explainBean);

    ExplainBean queryObject(int explain_id);

    List<ExplainBean> queryList(Query query);
    int queryTotal(Query query);
}
