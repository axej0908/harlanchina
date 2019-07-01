package com.axej.harlan.order.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.order.bean.OrderBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:17:34 2017/12/14
 */
@Repository
@Mapper
public interface OrderDao extends BaseDao<OrderBean>{
    int querySupplyOrdersTotal(Query query);

    List<OrderBean> querySupplyOrdersList(Query query);

    List<OrderBean> queryPurchaseOrdersList(Query query);

    int queryPurchaseOrdersTotal(Query query);

    int cancel(@Param("order_id") String order_id);

    Map<String,Object> detail(@Param("order_id") String order_id);

    List<OrderBean> queryTimeOrderList(Query query);
    int queryTimeOrderTotal(Query query);

    List<OrderBean> queryNameOrderList(Query query);
    int queryNameOrderTotal(Query query);

    int updateOrderStateById(OrderBean orderBean);

    List<OrderBean> checkOrder(Query query);
    int checkTotal(Query query);

    List<OrderBean> superOrder(Query query);
    int superTotal(Query query);

    List<OrderBean> dimOrder(Query query);
    int dimTotal(Query query);
}
