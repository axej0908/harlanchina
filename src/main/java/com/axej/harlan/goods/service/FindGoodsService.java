package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.FindGoodsBean;
import com.axej.harlan.goods.bean.ShopEnvBean;

import java.util.List;

/**
 * @author: lava
 * date: 10:13 2018/5/23
 * created by: IntelliJ IDEA
 */
public interface FindGoodsService {
    int save(FindGoodsBean bean);

    int delete(int goods_id);

    int update(FindGoodsBean bean);

    List<FindGoodsBean> queryList(Query query);
    int queryTotal(Query query);

    FindGoodsBean queryObject(int goods_id);

    FindGoodsBean queryInquiryObject(int goods_id);

    List<FindGoodsBean> queryInquiryList(Query query);
    int queryInquiryTotal(Query query);
}
