package com.axej.harlan.goods.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.goods.dao.ShopDao;
import com.axej.harlan.goods.service.ShopService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: 店铺
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:16 2018/1/20
 */
@RestController
@RequestMapping(value = "/shop")
public class ShopController extends AbstractController {

    @Autowired
    private ShopService shopService;
    @Autowired
    private ShopDao shopDao;

    /**
     * 7.修改
     *
     * @param shopBean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(ShopBean shopBean) {
        if (shopBean.getShop_id() == 0) {
            return R.error();
        }
        int i = shopDao.update(shopBean);
        if (i == 1) {
            return R.ok();
        } else {
            return R.error();
        }
    }

    /**
     * 6.我要开店 (保存-个人中心-首页-我要开店)
     *
     * @param shopBean
     * @return
     */
    @RequestMapping(value = "/openShop")
    public R openShop(ShopBean shopBean) {
        if (StringUtils.isEmpty(shopBean.getShop_name())) {
            logger.error("error param" + JSON.toJSONString(shopBean));
            return R.error("error param" + JSON.toJSONString(shopBean));
        }
        boolean flag = shopService.openShop(shopBean);
        if (flag) {
            return R.ok("success").put("shop_id", shopBean.getShop_id());
        } else {
            return R.error("fail");
        }
    }

    /**
     * 5.后台审核通过(修改状态)
     * shop_id
     */
    @RequestMapping(value = "/approve")
    public R approve(int shop_id) {
        if (shop_id == 0) {
            logger.error("param error" + shop_id);
            return R.error("param error" + shop_id);
        }
        boolean flag = shopService.approve(shop_id);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("fail");
        }
    }


    /**
     * 4.后台审核拒绝(修改状态)
     * shop_id
     *
     * @return
     */
    @RequestMapping(value = "/refuse")
    public R refuse(int shop_id) {
        if (shop_id == 0) {
            logger.error("param error" + shop_id);
            return R.error("param error" + shop_id);
        }
        boolean flag = shopService.refuse(shop_id);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("fail");
        }
    }

    /**
     * 3.查询店铺详情（根据用户id）
     * user_id
     */
    @RequestMapping(value = "/detail")
    public R queryDetail(int user_id) {
        if (user_id == 0) {
            logger.error("param error" + user_id);
            return R.error("param error" + user_id);
        }
        ShopBean shopBean = shopService.queryDetail(user_id);
        if (shopBean == null) {
            return R.error("fail");
        } else {
            return R.ok("success").put("data", shopBean);
        }
    }


    /**
     * 2.导航栏 搜索店铺 以及旗下热销产品
     * searchParam
     */
    @RequestMapping(value = "/listByName")
    public R list(String searchParam) {
        if (!StringUtils.isNotBlank(searchParam)) {
            return R.error("null param");
        }
        List<ShopBean> list = shopService.queryListByName(searchParam);
        if (list.size() > 0) {
            return R.ok("success").put("data", list);
        } else {
            return R.error("fail");
        }
    }


    /**
     * 1.app首页底部 热门供应商
     */
    @RequestMapping(value = "/appHotSuppliers")
    public R queryHotSuppliers(String jsonStr , Map<String, Object> map) {
        map = JSON.parseObject(jsonStr);
        if(map.get("page") == null || map.get("limit") == null){
            return R.error("null param");
        }
        Query query = new Query(map);
        List<ShopBean> list = shopDao.queryHotSuppliers(query);
        return R.ok("success").put("data", list);
    }

    /**
     * PC首页底部 热门供应商
     * @return
     */
    @RequestMapping(value = "/pcHotSuppliers")
    public R queryHotSuppliers() {
        List<ShopBean> list = shopDao.listHotSuppliers();
        return R.ok("success").put("data", list);
    }

    /**
     * 审核失败从新提交店铺申请
     *
     * @Method: alter
     * @Param [shopBean]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 18:15 2018/7/26
     */
    @RequestMapping(value = "/alter")
    public R alter(ShopBean shopBean){
        if(shopBean.getShop_id() == 0){
            return R.error("null param");
        }
        boolean flag = shopService.alter(shopBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }
}
