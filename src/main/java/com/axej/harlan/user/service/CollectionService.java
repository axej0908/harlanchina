package com.axej.harlan.user.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.user.bean.CollectionBean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:22 2018/1/29
 */
public interface CollectionService {
    boolean save(CollectionBean collectionBean);

    List<CollectionBean> queryList(Query query);

    int queryTotal(Query query);

    boolean delete(Integer col_id);

}
