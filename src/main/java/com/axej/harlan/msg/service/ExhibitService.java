package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.ExhibitBean;

import java.util.List;

public interface ExhibitService {

    boolean save(ExhibitBean exhibitBean);

    boolean delete(int exhibit_id);

    boolean update(ExhibitBean exhibitBean);

    List<ExhibitBean> queryList(Query query);
    int queryTotal(Query query);

    ExhibitBean queryObject(ExhibitBean exhibitBean);
}
