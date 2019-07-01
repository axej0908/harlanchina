package com.axej.harlan.order.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.order.bean.OrderSuperBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface OrderSuperDao extends BaseDao<OrderSuperBean> {

    List<OrderSuperBean> listOrderSuper(String order_id);
    int listOrderSuperTotal(String order_id);
}
