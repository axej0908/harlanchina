package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.PriceBean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:10 2018/3/1
 */
public interface PriceService {
    boolean save(PriceBean priceBean);

    List<PriceBean> queryList(Query query);

    int queryTotal(Query query);
}
