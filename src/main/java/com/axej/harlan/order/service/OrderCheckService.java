package com.axej.harlan.order.service;

import com.axej.harlan.order.bean.OrderCheckBean; /**
 * @author: lava
 * date: 9:14 2018/5/29
 * created by: IntelliJ IDEA
 */
public interface OrderCheckService {
    OrderCheckBean queryObject(OrderCheckBean bean);

    boolean save(OrderCheckBean orderCheckBean);
}
