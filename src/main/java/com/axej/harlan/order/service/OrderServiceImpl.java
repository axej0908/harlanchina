package com.axej.harlan.order.service;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.status.FiveSerCons;
import com.axej.harlan.common.status.OrderCons;
import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.TextMsgCode;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.goods.dao.GoodsMallDao;
import com.axej.harlan.goods.dao.ShopDao;
import com.axej.harlan.goods.service.ShopService;
import com.axej.harlan.order.bean.OrderBean;
import com.axej.harlan.order.bean.OrderChainBean;
import com.axej.harlan.order.bean.OrderCheckBean;
import com.axej.harlan.order.bean.OrderSuperBean;
import com.axej.harlan.order.dao.*;
import com.axej.harlan.user.bean.AddressBean;
import com.axej.harlan.user.bean.UserBean;
import com.axej.harlan.user.dao.AddressDao;
import com.axej.harlan.user.dao.UserDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

/**
 * Description:
 * Created by IntelliJ IDEA
 *
 * @author :jaywechen
 * Date:17:53 2017/12/14
 */
@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    @Autowired
    private ShopDao shopDao;
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private CartDao cartDao;
    @Autowired
    private GoodsMallDao goodsMallDao;
    @Autowired
    private ShopService shopService;

    @Autowired
    private UserDao userDao;

    @Autowired
    private GoodsMallDao getGoodsMallDao;

    @Autowired
    private AddressDao addressDao;

    @Autowired
    private OrderCheckDao orderCheckDao;

    @Autowired
    private OrderSuperDao orderSuperDao;

    @Autowired
    private OrderChainDao orderChainDao;

    private final static Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    /**
     * 6.查询供货订单列表
     *
     * @param query
     * @return
     */
    @Override
    public List<OrderBean> querySupplyOrdersList(Query query) {
        return orderDao.querySupplyOrdersList(query);
    }

    @Override
    public int querySupplyOrdersTotal(Query query) {
        return orderDao.querySupplyOrdersTotal(query);
    }

    /**
     * 5.查询采购订单列表
     *
     * @param query
     * @return
     */
    @Override
    public List<OrderBean> queryPurchaseOrdersList(Query query) {
        return orderDao.queryPurchaseOrdersList(query);
    }

    @Override
    public int queryPurchaseOrdersTotal(Query query) {
        return orderDao.queryPurchaseOrdersTotal(query);
    }


    /**
     * 4.修改订单状态
     *
     * @param orderBean
     * @return
     */
    @Override
    public boolean updateState(OrderBean orderBean) {
        OrderBean dbBean = orderDao.queryObject(orderBean);
        if (dbBean == null) {
            return false;
        }
        //订单状态
        dbBean.setStatus("3");
        //物流公司
        dbBean.setTransport_corporation(orderBean.getTransport_corporation());
        //物流单号
        dbBean.setTransport_number(orderBean.getTransport_number());
        int i = orderDao.update(dbBean);
        if(i == 1){
            UserBean userBean = userDao.get(dbBean.getBuyer_id());
            if(userBean != null){
                TextMsgCode.sendOrderMod(userBean.getUser_phone(), "con");
            }
        }
        return i == 1 ? true : false;
    }


    /**
     * 3.取消订单
     *
     * @param order_id
     */
    @Override
    public void cancel(String order_id) {
        /** 删除该订单 */
        int i = orderDao.cancel(order_id);
        if (i != 1) {
            logger.error("订单号:" + order_id + "删除失败");
            throw new RuntimeException("删除订单失败");
        }
    }

    /**
     * 2. 购物车结算
     *
     * @param orderBeans
     * @param cartStr
     * @return
     */
    @Override
    public boolean buyCart(List<OrderBean> orderBeans, String cartStr) {
        /** 1.删除购物车 */
        String[] arr = cartStr.split(",");
        int c = cartDao.deleteBatch(arr);
        if (c == 0) {
            throw new RuntimeException("购物车删除失败");
        }
        /** 2.保存订单 */
        for (OrderBean bean : orderBeans) {
            String order_id = System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 4);
            bean.setOrder_id(order_id);
            bean.setStatus(OrderCons.Status.WAIT_DELIVERY.getValue());
            bean.setPlace_time(ConcurrentDateUtils.format(new Date()));
            bean.setChain_state(FiveSerCons.ServiceStatus.SUSPEND.getVal());
            int j = orderDao.save(bean);
            if (j != 1) {
                throw new RuntimeException("订单保存失败");
            }else {
                /**  供应链金融  */
                if(bean.getPayment_opt().equals("chain")){
                    OrderChainBean orderChainBean = bean.getOrderChainBean();
                    if(orderChainBean.getUser_id() != 0){
                        orderChainBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
                        orderChainBean.setOrder_id(bean.getOrder_id());
                        orderChainDao.save(orderChainBean);
                    }
                }
            }
            /** 3.更新商品的销量 */
            GoodsMallBean param = new GoodsMallBean();
            param.setGoods_id(bean.getGoods_id());
            GoodsMallBean dbGoods = goodsMallDao.queryObject(param);
            if (dbGoods == null) {
                throw new RuntimeException("更新销量的产品不存在goods_id:" + bean.getGoods_id());
            }
            int addNum = bean.getGoods_num();
            dbGoods.setSales_volume(dbGoods.getSales_volume() + addNum);
            int k = goodsMallDao.update(dbGoods);
            if (k != 1) {
                throw new RuntimeException("更新产品的销量失败goods_id:" + bean.getGoods_id());
            }
            //3.2更新店铺总销量
            if(dbGoods.getUser_id() != 0){
                shopService.syncTotalSaleVolumes(dbGoods.getGoods_id());
            }
        }
        return true;
    }

    /**
     * 1.立即购买 产品详情
     *
     * @param orderBean
     */
    @Override
    public synchronized boolean buyItNow(OrderBean orderBean) {
        /** 1.验证产品单价 */
        GoodsMallBean goodsMallBean = goodsMallDao.queryObject(orderBean.getGoods_id());
        if (goodsMallBean == null) {
            logger.error("该产品不存在,产品id：" + orderBean.getGoods_id());
            throw new RuntimeException("该产品不存在");
        }
   /*     else if (!goodsMallBean.getCurrent_price().equals(String.valueOf(orderBean.getGoods_price()))) {
            logger.error("订单产品单价与商品此时单价不同" + JSONObject.toJSONString(orderBean));
            throw new RuntimeException("订单产品单价与商品此时单价不同");
        }*/
        /** 2.保存订单 */
        String order_id = System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 4);
        orderBean.setOrder_id(order_id);
        orderBean.setPlace_time(ConcurrentDateUtils.format(new Date()));
        orderBean.setStatus(OrderCons.Status.WAIT_DELIVERY.getValue());
        orderBean.setChain_state(FiveSerCons.ServiceStatus.SUSPEND.getVal());
        int i = orderDao.save(orderBean);
        if (i != 1) {
            throw new RuntimeException("订单保存失败");
        }
        //获取电话
        UserBean userBean = userDao.get(orderBean.getSeller_id());
        if(userBean != null){
            //发送短信通知 提交订单
            TextMsgCode.sendOrderMod(userBean.getUser_phone(), "sub");
        }
        //3.有时间do 消息通知
        return true;
    }

    @Override
    public List<OrderBean> queryList(Query query) {
        return orderDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return orderDao.queryTotal(query);
    }

    @Override
    public List<OrderBean> queryMyCartsList(Query query) {
        return shopDao.queryMyCartsList(query);
    }

    @Override
    public int queryMyCartsTotal(Query query) {
        return shopDao.queryMyCartsTotal(query);
    }

    @Override
    public Map<String,Object> detail(String order_id) {
        return orderDao.detail(order_id);
    }

    @Override
    public List<OrderBean> queryTimeOrderList(Query query) {
        return orderDao.queryTimeOrderList(query);
    }

    @Override
    public int queryTimeOrderTotal(Query query) {
        return orderDao.queryTimeOrderTotal(query);
    }

    @Override
    public List<OrderBean> queryNameOrderList(Query query) {
        return orderDao.queryNameOrderList(query);
    }

    @Override
    public int queryNameOrderTotal(Query query) {
        return orderDao.queryNameOrderTotal(query);
    }

    @Override
    public boolean alter(OrderBean orderBean) {
        int i = orderDao.updateOrderStateById(orderBean);
        return i == 1 ? true : false;
    }

    @Override
    public List<OrderBean> checkOrder(Query query) {
        List<OrderBean> orderBeanList = orderDao.checkOrder(query);
        if(orderBeanList.size() > 0){
            List<OrderBean> orderBeans = new ArrayList<>();
            for(OrderBean orderBean : orderBeanList){
                //买家
                AddressBean addressBean = addressDao.queryObject(orderBean.getAddr_id());
                if(addressBean != null){
                    //下单人名称
                    orderBean.setBuy_name(addressBean.getConsignee());
                    //下单人联系方式
                    orderBean.setBuy_phone(addressBean.getMobile());
                    //下单人地址
                    orderBean.setBuy_site(addressBean.getDetail());
                }
                //卖家
                ShopBean shopBean = shopDao.queryObject(orderBean.getSeller_id());
                if(shopBean != null){
                    //发货方名称
                    orderBean.setSell_name(shopBean.getContact_name());
                    //发货方联系方式
                    orderBean.setSell_phone(shopBean.getContact_mobile());
                    //发货方地址
                    orderBean.setSell_site(shopBean.getCom_addr());
                }

                //商品图
                GoodsMallBean goodsMallBean = getGoodsMallDao.queryObject(orderBean.getGoods_id());
                if(goodsMallBean != null){
                    orderBean.setProduct_picture(goodsMallBean.getProduct_picture());
                }
                OrderCheckBean orderCheckBean = orderCheckDao.queryObject(orderBean.getOrder_id());
                if(orderCheckBean != null){
                    orderBean.setCheck_id(orderCheckBean.getCheck_id());
                    orderBean.setTotal(orderCheckBean.getCheck_url());
                }

                orderBeans.add(orderBean);
            }
            return orderBeans;
        }
        return null;
    }

    @Override
    public int checkTotal(Query query) {
        return orderDao.checkTotal(query);
    }

    @Override
    public List<OrderBean> superOrder(Query query) {
        List<OrderBean> orderBeanList = orderDao.superOrder(query);
        if(orderBeanList.size() > 0){
            List<OrderBean> orderBeans = new ArrayList<>();
            for(OrderBean orderBean : orderBeanList){
                //买家
                AddressBean addressBean = addressDao.queryObject(orderBean.getAddr_id());
                if(addressBean != null){
                    //下单人名称
                    orderBean.setBuy_name(addressBean.getConsignee());
                    //下单人联系方式
                    orderBean.setBuy_phone(addressBean.getMobile());
                    //下单人地址
                    orderBean.setBuy_site(addressBean.getDetail());
                }
                //卖家
                ShopBean shopBean = shopDao.queryObject(orderBean.getSeller_id());
                if(shopBean != null){
                    //发货方名称
                    orderBean.setSell_name(shopBean.getContact_name());
                    //发货方联系方式
                    orderBean.setSell_phone(shopBean.getContact_mobile());
                    //发货方地址
                    orderBean.setSell_site(shopBean.getCom_addr());
                }

                //商品图
                GoodsMallBean goodsMallBean = getGoodsMallDao.queryObject(orderBean.getGoods_id());
                if(goodsMallBean != null){
                    orderBean.setProduct_picture(goodsMallBean.getProduct_picture());
                }

                List<OrderSuperBean> orderSuperBeanList = orderSuperDao.listOrderSuper(orderBean.getOrder_id());
                if(orderSuperBeanList.size() > 0){
                    orderBean.setOrderSuperBeans(orderSuperBeanList);
                }
                orderBeans.add(orderBean);
            }
            return orderBeans;
        }
        return null;
    }

    @Override
    public int superTotal(Query query) {
        return orderDao.superTotal(query);
    }

    @Override
    public boolean superState(String order_id, String super_state) {
        OrderBean orderBean = orderDao.queryObject(order_id);
        if(orderBean == null){
            return false;
        }
        orderBean.setSuper_state(super_state);
        int i = orderDao.update(orderBean);
        return i == 1 ? true : false;
    }

    @Override
    public List<OrderBean> dimOrder(Query query) {
        List<OrderBean> orderBeanList = orderDao.dimOrder(query);
        if(orderBeanList.size() > 0){
            List<OrderBean> orderBeans = new ArrayList<>();
            for(OrderBean orderBean : orderBeanList){
                //买家
                AddressBean addressBean = addressDao.queryObject(orderBean.getAddr_id());
                if(addressBean != null){
                    //下单人名称
                    orderBean.setBuy_name(addressBean.getConsignee());
                    //下单人联系方式
                    orderBean.setBuy_phone(addressBean.getMobile());
                    //下单人地址
                    orderBean.setBuy_site(addressBean.getDetail());
                }
                //卖家
                ShopBean shopBean = shopDao.queryObject(orderBean.getSeller_id());
                if(shopBean != null){
                    //发货方名称
                    orderBean.setSell_name(shopBean.getContact_name());
                    //发货方联系方式
                    orderBean.setSell_phone(shopBean.getContact_mobile());
                    //发货方地址
                    orderBean.setSell_site(shopBean.getCom_addr());
                }

                //商品图
                GoodsMallBean goodsMallBean = getGoodsMallDao.queryObject(orderBean.getGoods_id());
                if(goodsMallBean != null){
                    orderBean.setProduct_picture(goodsMallBean.getProduct_picture());
                }
                orderBeans.add(orderBean);
            }
            return orderBeans;
        }
        return null;
    }

    @Override
    public int dimTotal(Query query) {
        return orderDao.dimTotal(query);
    }
}
