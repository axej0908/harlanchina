package com.axej.harlan.order.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.order.bean.OrderCheckBean;
import com.axej.harlan.order.service.OrderCheckService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: lava
 * date: 9:11 2018/5/29
 * created by: IntelliJ IDEA
 */
@RestController
@RequestMapping(value = "/orderCheck")
public class OrderCheckController extends AbstractController {

    @Autowired
    private OrderCheckService orderCheckService;


    /**
     * 1.详情 订单下的检测
     *
     * @param bean
     * @return
     */
    @RequestMapping(value = "/detail")
    public R detail(OrderCheckBean bean) {

        if (StringUtils.isEmpty(bean.getOrder_id())) {
            return R.error();
        }
        OrderCheckBean orderCheckBean = orderCheckService.queryObject(bean);
        return R.ok().put("data", orderCheckBean);
    }

    /**
     * 保存&修改订单检测状态
     * @param orderCheckBean
     * @return
     */
    @RequestMapping({"save"})
    public R save(OrderCheckBean orderCheckBean){
        if(orderCheckBean == null){
            return R.error("null param");
        }
        boolean flag = orderCheckService.save(orderCheckBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("fail");
    }

}
