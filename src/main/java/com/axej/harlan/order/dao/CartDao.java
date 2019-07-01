package com.axej.harlan.order.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.order.bean.CartBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description: 购物车CRUD
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 10:19 2018/2/26
 */
@Repository
@Mapper
public interface CartDao extends BaseDao<CartBean> {

    /**
     * s1.查询我的订单
     * @param query
     * @return
     */
    List<ShopBean> queryMyCartList(Query query);
    int queryMyCartTotal(Query query);
}
