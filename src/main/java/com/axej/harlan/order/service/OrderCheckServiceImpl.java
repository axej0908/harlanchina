package com.axej.harlan.order.service;

import com.axej.harlan.order.bean.OrderBean;
import com.axej.harlan.order.bean.OrderCheckBean;
import com.axej.harlan.order.dao.OrderCheckDao;
import com.axej.harlan.order.dao.OrderDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author: lava
 * date: 9:14 2018/5/29
 * created by: IntelliJ IDEA
 */
@Service
@Transactional
public class OrderCheckServiceImpl implements OrderCheckService {

    @Autowired
    private OrderCheckDao orderCheckDao;

    @Autowired
    private OrderDao orderDao;

    @Override
    public OrderCheckBean queryObject(OrderCheckBean bean) {
        return orderCheckDao.queryObject(bean);
    }

    @Override
    public boolean save(OrderCheckBean orderCheckBean) {
        OrderBean orderBean = orderDao.queryObject(orderCheckBean.getOrder_id());
        if(orderBean == null){
            return false;
        }
        /**
         * 修改订单检测状态
         0 待检测
         1 已检测
         */
        orderBean.setCheck_state("1");
        int i = orderDao.update(orderBean);
        int j = orderCheckDao.save(orderCheckBean);
        return j == 1 ? true : false;
    }
}
