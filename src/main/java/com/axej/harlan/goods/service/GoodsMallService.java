package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.bean.ShopBean;

import java.util.List;

/**
* Description：
* Package com.axej.harlan.tendency.service
* Class ProductService
* Author: Ning
* Date: 14:16 2017/12/20
*/
public interface GoodsMallService {

    boolean save(GoodsMallBean productBean);

    boolean delete(Long goods_id);

    boolean update(GoodsMallBean productBean);

    List<GoodsMallBean> queryList(Query query);
    int queryListTotal(Query query);

    int queryTotal(Query query);

    List<GoodsMallBean> queryListGuessYouLike(Query query);

    GoodsMallBean queryObject(int goods_id);

    List<GoodsMallBean> queryListByName(Query query);

    int queryTotalByName(Query query);

    List<GoodsMallBean> queryEnquiryList(Query query);

    List<GoodsMallBean> searchCas(Query query);
    int searchCasTotal(Query query);

    List<GoodsMallBean> searchId(GoodsMallBean goodsMallBean);

    List<GoodsMallBean> queryListByCas(Query query);
    int queryTotalByCas(Query query);

    boolean saveTheEnquiries(GoodsMallBean goodsMallBean);

    List<GoodsMallBean> queryHotSell();
}
