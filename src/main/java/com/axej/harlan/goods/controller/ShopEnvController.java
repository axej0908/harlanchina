package com.axej.harlan.goods.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.ShopEnvBean;
import com.axej.harlan.goods.service.ShopEnvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @author: lava
 * date: 10:11 2018/5/23
 * created by: IntelliJ IDEA
 */
@RestController
@RequestMapping(value = "/shopEnv")
public class ShopEnvController extends AbstractController {

    @Autowired
    private ShopEnvService shopEnvService;

    /**
     * 1.保存环境文件路径
     *
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(ShopEnvBean bean) {
        if (bean.getShop_id() == 0) {
            return R.error();
        }
        shopEnvService.save(bean);
        return R.ok();
    }


    /**
     * 2.删除环境文件路径
     *
     * @param env_id
     * @return
     */
    @RequestMapping(value = "/delete")
    public R delete(int env_id) {
        if (env_id == 0) {
            return R.error();
        }
        shopEnvService.delete(env_id);
        return R.ok();
    }


    /**
     * 3.修改 环境文件路径
     *
     * @param bean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(ShopEnvBean bean) {
        if (bean.getEnv_id() == 0) {
            return R.error();
        }
        shopEnvService.update(bean);
        return R.ok();
    }


    /**
     * 4.查询指定店铺下的所有环境图片
     * @param jsonStr
     * user_id (false)
     * shop_id
     * env_type
     * page
     * limit
     * @return
     */
    @RequestMapping(value = "/page")
    public R list(Map<String, Object> map, String jsonStr){
        if (map.size() == 0 && jsonStr != null) {
            map = JSON.parseObject(jsonStr);
        } else {
            return R.error("null param");
        }
        Query query = new Query(map);
        List<ShopEnvBean> list = shopEnvService.queryList(query);
        int total = shopEnvService.queryTotal(query);
        PageUtils pageUtils = new PageUtils(total, list);
        return R.ok().put("data",pageUtils);
    }
}
