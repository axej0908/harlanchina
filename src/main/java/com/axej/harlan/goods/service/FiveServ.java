package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.FiveServBean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 10:30 2018/3/7
 */
public interface FiveServ {
    boolean save(FiveServBean fiveServBean);

    List<FiveServBean> queryList(Query query);

    int queryTotal(Query query);

    List<FiveServBean> per_queryList(Query query);

    int per_queryTotal(Query query);

    int update(FiveServBean param);
}
