package com.axej.harlan.goods.dao;

import com.axej.harlan.cms.bean.CmsLoggerBean;
import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.bean.ShopBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Queue;

/**
* Description：
* Package com.axej.harlan.tendency.dao
* Class ProductDao
* Author: Ning
* Date: 14:16 2017/12/20
*/
@Repository
@Mapper
public interface GoodsMallDao extends BaseDao<GoodsMallBean>{
    List<GoodsMallBean> queryListGuessYouLike(@Param("param") String param);

    List<GoodsMallBean> queryListByName(Query query);

    int queryTotalByName(Query query);

    int queryListTotal(Query query);

    List<GoodsMallBean> queryEnquiryList(Query query);

    GoodsMallBean goodsName(@Param("goods_name") String goods_name , @Param("cas") String cas);

    List<GoodsMallBean> searchCas(Query query);
    int searchCasTotal(Query query);

    List<GoodsMallBean> searchId(GoodsMallBean goodsMallBean);

    List<GoodsMallBean> queryListByCas(Query query);
    int queryTotalByCas(Query query);

    List<GoodsMallBean> queryHotSell();


    int queryDangerCas(@Param("cas") String cas);
    int deleteDanger(@Param("cas") String cas);
}
