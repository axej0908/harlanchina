package com.axej.harlan.order.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.order.bean.CartBean;
import com.axej.harlan.order.bean.OrderBean;
import com.axej.harlan.order.bean.OrderItemBean;
import com.axej.harlan.order.bean.OrderSuperBean;

import java.util.List;
import java.util.Map;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:17:52 2017/12/14
 */
public interface OrderService {

    /**
     *  6.查询供货订单列表
     * @param query
     * @return
     */
    List<OrderBean> querySupplyOrdersList(Query query);
    int querySupplyOrdersTotal(Query query);

    /**
     *  5.查询采购订单列表
     * @param query
     * @return
     */
    List<OrderBean> queryPurchaseOrdersList(Query query);
    int queryPurchaseOrdersTotal(Query query);

    /**
     * 4.修改订单状态
     * @param orderBean
     * @return
     */
    boolean updateState(OrderBean orderBean);

    /**
     * 3.取消订单
     * @param order_id
     */
    void cancel(String order_id);

    /**
     * 2.购物车结算
     * @param orderBeans
     * @param cartStr
     * @return
     */
    boolean buyCart(List<OrderBean> orderBeans, String cartStr);

    /**
     * 1.立即购买
     * @param orderBean
     * @return
     */
    boolean buyItNow(OrderBean orderBean);



    List<OrderBean> queryList(Query query);

    int queryTotal(Query query);



    List<OrderBean> queryMyCartsList(Query query);

    int queryMyCartsTotal(Query query);


    /**
     * 查询订单详情
     * @param order_id
     * @return
     */
    Map<String,Object> detail(String order_id);

    /**
     * 时间条件查询
     * @param query
     * @return
     */
    List<OrderBean> queryTimeOrderList(Query query);
    int queryTimeOrderTotal(Query query);

    /**
     * 产品名称(关键字)条件查询
     * @param query
     * @return
     */
    List<OrderBean> queryNameOrderList(Query query);
    int queryNameOrderTotal(Query query);

    boolean alter(OrderBean orderBean);

    List<OrderBean> checkOrder(Query query);
    int checkTotal(Query query);

    List<OrderBean> superOrder(Query query);
    int superTotal(Query query);

    boolean superState(String order_id , String super_state);

    List<OrderBean> dimOrder(Query query);
    int dimTotal(Query query);
}
