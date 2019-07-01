package com.axej.harlan.goods.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.FindGoodsBean;
import com.axej.harlan.goods.bean.ShopEnvBean;
import com.axej.harlan.goods.service.FindGoodsService;
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
@RequestMapping(value = "/findGoods")
public class FindGoodsController extends AbstractController {

    @Autowired
    private FindGoodsService findGoodsService;

    /**
     * 1.保存环境文件路径
     *
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(FindGoodsBean bean) {
        if (bean.getUser_id() == 0) {
            return R.error();
        }
        findGoodsService.save(bean);
        return R.ok();
    }


    /**
     * 2.删除环境文件路径
     *
     * @param env_id
     * @return
     */
/*    @RequestMapping(value = "/delete")
    public R delete(int env_id) {
        if (env_id == 0) {
            return R.error();
        }
        shopEnvService.delete(env_id);
        return R.ok();
    }*/


    /**
     * 3.修改
     *
     * @param bean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(FindGoodsBean bean) {
        if (bean.getGoods_id() == 0) {
            return R.error();
        }
        findGoodsService.update(bean);
        return R.ok();
    }


    /**
     * 4.查询all
     * @param jsonStr
     * page
     * limit
     * @return list
     */
    @RequestMapping(value = "/page")
    public R list(Map<String, Object> map, String jsonStr){
        if (jsonStr != null) {
            map = JSON.parseObject(jsonStr);
        } else {
            return R.error("null param");
        }
        Query query = new Query(map);
        List<FindGoodsBean> list = findGoodsService.queryList(query);
        int total = findGoodsService.queryTotal(query);
        PageUtils pageUtils = new PageUtils(total, list);
        return R.ok().put("data",pageUtils);
    }
    /**
     * 查询单个商品
     * 根据用户id或者商品id
     */
    @RequestMapping(value = "/detail")
    public R detail(int goods_id) {
        FindGoodsBean dbBean = findGoodsService.queryObject(goods_id);
        return R.ok("success").put("data", dbBean);
    }


    /**
     * 删除
     * @param goods_id
     * @return
     */
    @RequestMapping(value = "del")
    public R delet(int goods_id){
        if(goods_id == 0){
            return R.error("null param");
        }
        int i = findGoodsService.delete(goods_id);
        if(i == 1){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

}
