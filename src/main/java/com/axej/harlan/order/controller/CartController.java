package com.axej.harlan.order.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.order.bean.CartBean;
import com.axej.harlan.order.service.CartService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:02 2018/2/26
 */
@RestController
@RequestMapping(value = "/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * 5.删除购物车
     */
    @RequestMapping(value = "/delete")
    public R delete(CartBean bean){
        cartService.delete(bean);
//        cartService
        return R.ok();
    }


    /**
     * 4.查询详情
     * @return
     */
    @RequestMapping(value = "/detail")
    public R detail(CartBean bean){
        if (bean.getCart_id() == 0) {
            return R.error();
        }
        CartBean cartBean = cartService.queryObject(bean);
        return R.ok().put("data",cartBean);
    }


    /**
     * 3.更新购物车 数量etc
     *
     * @param cartBean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(CartBean cartBean) {
        if (cartBean.getGoods_id() == 0) {
            return R.error("null param" + JSON.toJSONString(cartBean));
        }
        boolean flag = cartService.update(cartBean);
        if (flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

    /**
     * r1 查询我的购物车列表
     *
     * @param jsonStr
     * @param map     (user_id page limit)
     * @return
     */
    @RequestMapping(value = "/myList")
    public R queryMyCart(String jsonStr, Map<String, Object> map) {
        if (StringUtils.isNotBlank(jsonStr)) {
            map = JSON.parseObject(jsonStr);
        } else {
            return R.error("param null" + jsonStr);
        }
        if (map.get("user_id") == null || map.get("limit") == null || map.get("page") == null) {
            return R.error("param error" + JSON.toJSONString(map));
        }
        Query query = new Query(map);
        List<ShopBean> list = cartService.queryMyCartList(query);
        int total = cartService.queryMyCartTotal(query);
        PageUtils pageUtils = new PageUtils(list, total, query.getLimit(), query.getPage());
        return R.ok("success").put("data", pageUtils);
    }


    /**
     * c1 添加商品到购物车
     *
     * @param cartBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R saveToCart(CartBean cartBean) {
        if (cartBean.getUser_id() == 0 || cartBean.getGoods_id() == 0) {
            return R.error("null param" + JSON.toJSONString(cartBean));
        }
        //判断如果加入的购物车产品已经存在，则直接让数量加1就行
        if(cartService.isExistGoods(cartBean.getUser_id(),cartBean.getGoods_id()))
        {
            if(cartService.updateCartGoodsNum(cartBean.getUser_id(),cartBean.getGoods_id()))
            {
                return R.ok("success");
            }else{
                return R.error("fail");
            }
        }else {
            boolean flag = cartService.saveToCart(cartBean);
            if (flag){
                return R.ok("success");
            }else {
                return R.error("fail");
            }
        }

    }

    /**
     * 购物车产品总量
     * @param jsonStr
     * @param map
     * @return
     */
    @RequestMapping(value = "quantity")
    public R quantity(String jsonStr, Map<String, Object> map){
        if (StringUtils.isNotBlank(jsonStr)) {
            map = JSON.parseObject(jsonStr);
        } else {
            return R.error("param null" + jsonStr);
        }
        Query query = new Query(map);

        int total = cartService.queryMyCartTotal(query);
        return R.ok().put("data", total);
    }

}
