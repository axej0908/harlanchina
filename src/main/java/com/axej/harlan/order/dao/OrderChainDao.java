package com.axej.harlan.order.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.order.bean.OrderChainBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface OrderChainDao extends BaseDao<OrderChainBean> {
}
