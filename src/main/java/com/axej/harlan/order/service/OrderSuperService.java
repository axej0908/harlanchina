package com.axej.harlan.order.service;

import com.axej.harlan.order.bean.OrderSuperBean;

import java.util.List;

public interface OrderSuperService {

    boolean save(OrderSuperBean orderSuperBean);

    boolean delete(int super_id);

    List<OrderSuperBean> listOrderSuper(String order_id);
    int listOrderSuperTotal(String order_id);
}
