package com.axej.harlan.order.service;

import com.axej.harlan.order.bean.OrderSuperBean;
import com.axej.harlan.order.dao.OrderSuperDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class OrderSuperServiceImpl implements OrderSuperService{

    @Autowired
    private OrderSuperDao orderSuperDao;

    @Override
    public boolean save(OrderSuperBean orderSuperBean) {
        orderSuperBean.setSuper_time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        int i = orderSuperDao.save(orderSuperBean);
        return i == 1 ? true : false;
    }

    @Override
    public boolean delete(int super_id) {
        int i = orderSuperDao.delete(super_id);
        return i == 1 ? true : false;
    }

    @Override
    public List<OrderSuperBean> listOrderSuper(String order_id) {
        return orderSuperDao.listOrderSuper(order_id);
    }

    @Override
    public int listOrderSuperTotal(String order_id) {
        return orderSuperDao.listOrderSuperTotal(order_id);
    }
}
