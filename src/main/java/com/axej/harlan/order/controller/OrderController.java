package com.axej.harlan.order.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.order.bean.CartBean;
import com.axej.harlan.order.bean.OrderBean;
import com.axej.harlan.order.bean.OrderItemBean;
import com.axej.harlan.order.bean.OrderSuperBean;
import com.axej.harlan.order.dao.OrderDao;
import com.axej.harlan.order.service.OrderService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * Description:订单处理
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:17:53 2017/12/14
 */
@RestController
@RequestMapping(value = "/order")
public class OrderController extends AbstractController {

    @Autowired
    private OrderService orderService;


    /**
     * 8.查询订单详情
     * @param order_id
     * @return
     */
    @RequestMapping(value = "/detail")
    public R detail(String order_id){
        if (StringUtils.isEmpty(order_id)) {
            return R.error(ERROR_PARAM);
        }
        Map<String,Object> map = orderService.detail(order_id);
        return R.ok().put("data",map);
    }

    /**
     * 7.查询我的购物车列表
     * buyer_id
     * page
     * limit
     * (后台设置 order_type = 3,order_state = 1)
     *
     * @return
     */
    @RequestMapping(value = "/myCarts")
    public R queryMyCarts(String jsonStr) {
        if (!StringUtils.isNotBlank(jsonStr)) {
            logger.error("error param" + jsonStr);
            return R.error("error param" + jsonStr);
        }
        Map<String, Object> map = JSON.parseObject(jsonStr);
        if (map.get("buyer_id") == null || map.get("page") == null || map.get("limit") == null) {
            return R.error("error param");
        }
        Query query = new Query(map);
        List<OrderBean> list = orderService.queryMyCartsList(query);
        int total = orderService.queryMyCartsTotal(query);
        PageUtils pageUtils = new PageUtils(list, total, query.getLimit(), query.getPage());
        return R.ok("success").put("data", pageUtils);
    }


    /**
     * 6.查询 供货订单列表(根据供货人id)
     * user_id
     * page
     * limit
     * status
     * @return
     */
    @RequestMapping(value = "/supplyOrders")
    public R querySupplyOrders(String jsonStr, Map<String, Object> map) {
        if (jsonStr == null || "".equals(jsonStr.trim())) {
            logger.error("error param");
            return R.error("error param");
        }
        map = JSON.parseObject(jsonStr);
        if (map.get("page") == null || map.get("limit") == null) {
            logger.error("pagination param error");
            return R.error("pagination param error");
        }
        Query query = new Query(map);
        List<OrderBean> list = orderService.querySupplyOrdersList(query);
        int total = orderService.querySupplyOrdersTotal(query);
        PageUtils pageUtils = new PageUtils(list, total, query.getLimit(), query.getPage());
        return R.ok().put("data", pageUtils);
    }


    /**
     * 5.查询 采购订单列表
     * buyer_id
     * status
     * json - > page 1 默认
     * json - > limit 10 默认
     */
    @RequestMapping(value = "/purchaseOrders")
    public R queryPurchaseOrders(String jsonStr) {
        Map<String, Object> map = JSON.parseObject(jsonStr);
        if (map.get("page") == null || map.get("limit") == null) {
            logger.error("null param" + jsonStr);
            return R.error("null param");
        }
        Query query = new Query(map);
        List<OrderBean> list = orderService.queryPurchaseOrdersList(query);
        int total = orderService.queryPurchaseOrdersTotal(query);
        PageUtils pageUtils = new PageUtils(list, total, query.getLimit(), query.getPage());
        return R.ok("success").put("data", pageUtils);
    }

    /**
     * 4.修改订单状态、确认发货
     * orderBean - > order_id
     * orderBean - > order_state
     * 订单状态（1待付款、2待发货、3待收货、4已完成 0取消订单）
     *
     * @return
     */
    @RequestMapping(value = "/update")
    public R stateUpdate(OrderBean orderBean) {
        if (orderBean == null || orderBean.getOrder_id() == null) {
            logger.error("null param");
            return R.error("null param");
        }
        boolean flag = orderService.updateState(orderBean);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }


    /**
     * 3.取消订单
     *
     * @param order_id
     * @return
     */
    @RequestMapping(value = "/cancel")
    public R cancel(String order_id) {
        if (StringUtils.isEmpty(order_id)) {
            return R.error(ERROR_PARAM);
        }
        orderService.cancel(order_id);
        return R.ok();
    }


    /**
     * 2.购物车结算
     * orderStr 订单实体s str
     * cartStr  购物车 ids 逗号分隔
     *
     * @return
     */
    @RequestMapping(value = "/buyCart")
    public R buyCart(String orderStr, String cartIds) {
        List<OrderBean> orderBeans = new ArrayList<>();
        /** 1.判断参数 */
        if (StringUtils.isEmpty(orderStr) || StringUtils.isEmpty(cartIds)) {
            logger.error("null param");
            return R.error("null param");
        } else {
            orderBeans = JSON.parseObject(orderStr, new TypeReference<ArrayList<OrderBean>>() {
            });
            String[] arr = cartIds.split(",");
            if (arr.length != orderBeans.size()) {
                return R.error("the size of cart and order not equal");
            }
        }
        boolean flag = orderService.buyCart(orderBeans, cartIds);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }

    /**
     * 1.立即购买(从产品详情)
     * orderBean
     * @return
     */
    @RequestMapping(value = "/buyItNow")
    public R buyItNow(OrderBean orderBean) {
        if (orderBean.getBuyer_id() == 0 || orderBean.getGoods_id() == 0) {
            return R.error(ERROR_PARAM);
        }
        boolean flag = orderService.buyItNow(orderBean);
        if (flag) {
            return R.ok().put("data", orderBean);
        } else {
            return R.error();
        }
    }


    /**
     * 时间条件查询订单
     *
     * @Method: timeOrder
     * @Param [jsonStr]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 9:54 2018/7/14
     */
    @RequestMapping({"/queryTimeOrder"})
    public R queryTimeOrder(String jsonStr){
        Map<String, Object> map = JSON.parseObject(jsonStr);
        if (map.get("page") == null || map.get("limit") == null) {
            logger.error("null param" + jsonStr);
            return R.error("null param");
        }
        Query query = new Query(map);
        List<OrderBean> list = orderService.queryTimeOrderList(query);
        int total = orderService.queryTimeOrderTotal(query);
        PageUtils pageUtils = new PageUtils(list, total, query.getLimit(), query.getPage());
        return R.ok("success").put("data", pageUtils);
    }

    /**
     * 产品名称条件查询
     *
     * @Method: queryNameOrder
     * @Param [jsonStr]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 11:33 2018/7/14
     */
    @RequestMapping({"/queryNameOrder"})
    public R queryNameOrder(String jsonStr){
        Map<String, Object> map = JSON.parseObject(jsonStr);
        if (map.get("page") == null || map.get("limit") == null) {
            logger.error("null param" + jsonStr);
            return R.error("null param");
        }
        Query query = new Query(map);
        List<OrderBean> list = orderService.queryNameOrderList(query);
        int total = orderService.queryNameOrderTotal(query);
        PageUtils pageUtils = new PageUtils(list, total, query.getLimit(), query.getPage());
        return R.ok("success").put("data", pageUtils);
    }

    /**
     * 取消订单
     * status
     * 订单状态 1待支付 2待发货 3已收货 4已完成 0取消订单
     *
     * @Method: alter
     * @Param [orderBean]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 11:10 2018/7/18
     */
    @RequestMapping({"/alter"})
    public R alter (OrderBean orderBean){
        if(orderBean.getOrder_id() == null || orderBean.getOrder_id().equals("")){
            logger.error("null param");
            return R.error("null param");
        }
        boolean flag = orderService.alter(orderBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("failed");
        }
    }

    /**
     * 平台订单检测
     *
     * @Method: checkOrder
     * @Param [jsonStr]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 15:04 2018/7/19
     */
    @RequestMapping({"/checkOrder"})
    public R checkOrder(String check_state , int page , int limit){
        Map<String , Object> map = new HashMap<>();
        map.put("check_state" , check_state);
        map.put("page" , page);
        map.put("limit" , limit);
        Query query = new Query(map);
        List<OrderBean> list = orderService.checkOrder(query);
        int total = orderService.checkTotal(query);
        return R.ok("success").put("data", list).put("count" , total);
    }

    /**
     * 平台订单监理
     * super_state
     * 0 待监理 1 已监理
     *
     * @Method: superOrder
     * @Param [super_state, page, limit]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 20:13 2018/7/19
     */
    @RequestMapping({"/superOrder"})
    public R superOrder(String super_state , int page , int limit){
        Map<String , Object> map = new HashMap<>();
        map.put("super_state" , super_state);
        map.put("page" , page);
        map.put("limit" , limit);
        Query query = new Query(map);
        List<OrderBean> list = orderService.superOrder(query);
        int total = orderService.superTotal(query);
        return R.ok("success").put("data", list).put("count" , total);
    }

    /**
     * 修改订单监理状态
     *
     * @Method: superState
     * @Param [orderSuperBean, super_state]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 21:11 2018/7/19
     */
    @RequestMapping({"/superState"})
    public R superState(String order_id , String super_state){
        if(order_id == null || order_id.equals("")){
            logger.error("null param");
            return R.error("null param");
        }
        boolean flag = orderService.superState(order_id , super_state);
        if(flag){
            return  R.ok("success");
        }else {
            return R.error("failed");
        }
    }

    /**
     * 模糊查询订单
     * @param goods_type
     * @param status
     * @param chain_state
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping({"/dim"})
    public R dealerOrder(String goods_type , String status, String chain_state,  int page , int limit){
        Map<String , Object> map = new HashMap<>();
        map.put("goods_type" , goods_type);
        map.put("status" , status);
        map.put("chain_state", chain_state);
        map.put("page" , page);
        map.put("limit" , limit);
        Query query = new Query(map);
        List<OrderBean> list = orderService.dimOrder(query);
        int total = orderService.dimTotal(query);
        /*PageUtils pageUtils = new PageUtils(list, total, query.getLimit(), query.getPage());*/
        return R.ok("success").put("data", list).put("count" , total);
    }


    /**
     * 审核供应链金融
     * @param orderBean
     * @return
     */
    @RequestMapping(value = "edit")
    public R edit(OrderBean orderBean){
        if(StringUtils.isEmpty(orderBean.getOrder_id())){
            logger.error("null param" + JSON.toJSONString(orderBean));
            return R.error("null param");
        }
        boolean flag = orderService.alter(orderBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }
}
