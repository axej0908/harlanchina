package com.axej.harlan.goods.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.FindGoodsBean;
import com.axej.harlan.goods.bean.GoodsMallBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
* Description：
* Package com.axej.harlan.tendency.dao
* Class ProductDao
* Author: Ning
* Date: 14:16 2017/12/20
*/
@Repository
@Mapper
public interface FindGoodsDao extends BaseDao<FindGoodsBean>{

    FindGoodsBean queryInquiryObject(int goods_id);

    List<FindGoodsBean> queryInquiryList(Query query);
    int queryInquiryTotal(Query query);

}
