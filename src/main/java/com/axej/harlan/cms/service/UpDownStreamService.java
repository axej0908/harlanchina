package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.UpDownStreamBean;
import com.axej.harlan.common.utils.Query;

import java.util.List;

public interface UpDownStreamService {

    boolean save(UpDownStreamBean upDownStreamBean);

    boolean update(UpDownStreamBean upDownStreamBean);

    boolean delete(int updown_id);

    List<UpDownStreamBean> queryList(Query query);
    int queryTotal(Query query);

    UpDownStreamBean queryObject(int updown_id);
}
