package com.axej.harlan.order.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.order.bean.OrderSuperBean;
import com.axej.harlan.order.service.OrderSuperService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Description：订单监理
 * Package com.axej.harlan.order.controller
 * Class OrderSuperController
 * Aauthor：Ning
 * Date：20:33 2018/7/19
 */
@RestController
@RequestMapping(value = "/orderSuper")
public class OrderSuperController extends AbstractController {

    @Autowired
    private OrderSuperService orderSuperService;

    /**
     * 保存订单监理
     * @param orderSuperBean
     * @return
     */
    @RequestMapping({"save"})
    public R save(OrderSuperBean orderSuperBean){
        if(orderSuperBean == null){
            logger.error("null param");
            return R.error("null param");
        }
        boolean flag = orderSuperService.save(orderSuperBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("failed");
        }
    }


    /**
     * 删除
     * @param super_id
     * @return
     */
    @RequestMapping(value = "del")
    public R delete(int super_id){
        if(super_id == 0){
            logger.error("null param" + super_id);
            return R.error("null param");
        }
        boolean flag = orderSuperService.delete(super_id);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

    /**
     * 查询订单下所有订单监理
     * @param order_id
     * @return
     */
    @RequestMapping({"listOrderSuper"})
    public R listOrderSuper(String order_id){
        if(order_id == null || order_id.equals("")){
            return R.error("null param");
        }
        List<OrderSuperBean> orderSuperBeans = orderSuperService.listOrderSuper(order_id);
        if(orderSuperBeans.size() > 0){
            int count = orderSuperService.listOrderSuperTotal(order_id);
            return R.ok("success").put("data" , orderSuperBeans).put("count" , count);
        }
        return R.error("failed");
    }
}
