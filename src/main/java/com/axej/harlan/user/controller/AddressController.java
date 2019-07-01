package com.axej.harlan.user.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.user.bean.AddressBean;
import com.axej.harlan.user.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: 地址管理
 * @Created by: IntelliJ IDEA
 * @Date: 11:19 2017/12/4
 */
@RestController
@RequestMapping(value = "/address")
public class AddressController extends AbstractController {

    @Autowired
    private AddressService addressService;

    /**
     * 查询当前登录人的所有地址列表
     *
     * @param
     * @return
     */
    @RequestMapping(value = "/list")
    public R list(Map<String, Object> map, String jsonStr) {
        if (map.size() == 0 && jsonStr != null) {
            map = JSON.parseObject(jsonStr);
        } else {
            return R.error("null param");
        }
        if (map.get("user_id") == null || map.get("user_id").toString().equals("")) {
            logger.error("param error:" + map.toString());
            return R.error("param error");
        }
        Query query = new Query(map);
        List<AddressBean> addressBeans = addressService.queryList(query);
        int total = addressService.queryTotal(query);
        PageUtils pageUtils = new PageUtils(addressBeans, total, query.getLimit(), query.getPage());
        return R.ok("success").put("data", pageUtils);
    }


    /**
     * 查询单个地址详情
     *
     * @param addressBean
     * @return
     */
    @RequestMapping(value = "/detail")
    public R detail(AddressBean addressBean) {
        if (addressBean.getAddr_id() == 0) {
            logger.error("param error:" + addressBean.getAddr_id());
            return R.error("param error");
        }
        AddressBean dbBean = addressService.queryObject(addressBean);
        return R.ok("success").put("data", dbBean);
    }


    /**
     * 保存地址
     *
     * @param addressBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(AddressBean addressBean) {
        if (addressBean == null || addressBean.getAddr_id() != 0) {
            return R.error("param error");
        }
        boolean flag = addressService.save(addressBean);
        if (flag) {
            return R.ok("success").put("data", addressBean.getAddr_id());
        } else {
            return R.error("failure");
        }
    }


    /**
     * 删除地址
     *
     * @param addressBean
     * @return
     */
    @RequestMapping(value = "/delete")
    public R delete(AddressBean addressBean) {
        if (addressBean == null) {
            logger.error("error param:" + addressBean.toString());
            return R.error("error param");
        }
        boolean flag = addressService.delete(addressBean);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }


    /**
     * 编辑地址
     *
     * @param addressBean
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public R update(AddressBean addressBean) {
        if (addressBean == null || addressBean.getAddr_id() == 0) {
            logger.error("error param:" + addressBean.toString());
            return R.error("error param");
        }
        boolean flag = addressService.update(addressBean);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }

}
