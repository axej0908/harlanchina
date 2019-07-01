package com.axej.harlan.order.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.order.bean.OrderCheckBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @author: lava
 * date: 9:13 2018/5/29
 * created by: IntelliJ IDEA
 */
@Mapper
@Repository
public interface OrderCheckDao extends BaseDao<OrderCheckBean>{
}
