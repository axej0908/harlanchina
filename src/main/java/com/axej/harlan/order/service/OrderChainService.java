package com.axej.harlan.order.service;

import com.axej.harlan.order.bean.OrderChainBean;

public interface OrderChainService {

    boolean save(OrderChainBean orderChainBean);

    boolean update(OrderChainBean orderChainBean);

    OrderChainBean queryObject(OrderChainBean orderChainBean);
}
