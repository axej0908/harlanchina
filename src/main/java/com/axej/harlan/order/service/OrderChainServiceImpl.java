package com.axej.harlan.order.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.order.bean.OrderChainBean;
import com.axej.harlan.order.dao.OrderChainDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@Transactional
public class OrderChainServiceImpl implements OrderChainService{

    @Autowired
    private OrderChainDao orderChainDao;

    @Override
    public boolean save(OrderChainBean orderChainBean) {
        orderChainBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        int i = orderChainDao.save(orderChainBean);
        return i == 1 ? true : false;
    }

    @Override
    public boolean update(OrderChainBean orderChainBean) {
        int i = orderChainDao.update(orderChainBean);
        return i == 1 ? true : false;
    }

    @Override
    public OrderChainBean queryObject(OrderChainBean orderChainBean) {
        return orderChainDao.queryObject(orderChainBean);
    }
}
