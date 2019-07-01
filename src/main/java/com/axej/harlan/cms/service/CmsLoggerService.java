package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsLoggerBean;
import com.axej.harlan.common.utils.Query;

import java.util.List;

public interface CmsLoggerService {

    void executeAsync();

    List<CmsLoggerBean> queryList(Query query);
    int queryTotal(Query query);
}
