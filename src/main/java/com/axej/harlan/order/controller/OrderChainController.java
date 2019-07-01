package com.axej.harlan.order.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.order.bean.OrderChainBean;
import com.axej.harlan.order.service.OrderChainService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Description：订单支付方式-供应链金融
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：17:57 2019/3/25
 */
@RestController
@RequestMapping(value = "/orderChain")
public class OrderChainController extends AbstractController {

    @Autowired
    private OrderChainService orderChainService;


    /**
     * 保存
     * @param orderChainBean
     * @return
     */
    @RequestMapping(value = "save")
    public R save(OrderChainBean orderChainBean){
        if(StringUtils.isEmpty(orderChainBean.getOrder_id()) || orderChainBean.getUser_id() == 0){
            logger.error("null param" + JSON.toJSONString(orderChainBean));
            return R.error("null param");
        }
        boolean flag = orderChainService.save(orderChainBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 修改
     * @param orderChainBean
     * @return
     */
    @RequestMapping(value = "edit")
    public R update(OrderChainBean orderChainBean){
        if(orderChainBean.getChain_id() == 0){
            logger.error("null param" + JSON.toJSONString(orderChainBean));
            return R.error("null param");
        }
        boolean flag = orderChainService.update(orderChainBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 详情
     * chain_id && order_id
     * @param orderChainBean
     * @return
     */
    @RequestMapping(value = "detail")
    public R detail(OrderChainBean orderChainBean){
        if(orderChainBean.getChain_id() == 0 && StringUtils.isEmpty(orderChainBean.getOrder_id())){
            logger.error("null param" + JSON.toJSONString(orderChainBean));
            return R.error("null param");
        }
        OrderChainBean orderChain = orderChainService.queryObject(orderChainBean);
        if(orderChain != null){
            return R.ok().put("data", orderChain);
        }else {
            return R.error("null data");
        }
    }
}
