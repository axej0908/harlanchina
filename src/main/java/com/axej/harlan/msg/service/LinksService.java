package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.LinksBean;
import java.util.List;

public interface LinksService {

    boolean save(LinksBean linksBean);

    boolean update(LinksBean linksBean);

    boolean delete(int links_id);

    List<LinksBean> queryList(Query query);
    int queryTotal(Query query);

    LinksBean queryObject(int links_id);
}
