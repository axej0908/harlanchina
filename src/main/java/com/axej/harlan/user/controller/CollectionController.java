package com.axej.harlan.user.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.user.bean.CollectionBean;
import com.axej.harlan.user.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: 收藏 商品或者商铺
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:19 2018/1/29
 */
@RestController
@RequestMapping(value = "/collection")
public class CollectionController extends AbstractController {

    @Autowired
    private CollectionService collectionService;

    /**
     * 1.添加收藏(保存)
     *
     * @param collectionBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(CollectionBean collectionBean) {
        boolean flag = collectionService.save(collectionBean);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("fail");
        }
    }

    /**
     * 2.查询收藏列表by user_id by col_type
     * user_id
     * col_type 1店铺 2商品
     * page
     * limit
     */
    @RequestMapping(value = "/list")
    public R queryList(String jsonStr) {
        Map<String, Object> map = JSON.parseObject(jsonStr);
        if (map.get("page") == null || map.get("limit") == null) {
            logger.error("error param" + jsonStr);
            return R.error("error param" + jsonStr);
        }
        Query query = new Query(map);
        List<CollectionBean> list = collectionService.queryList(query);
        int total = collectionService.queryTotal(query);
        PageUtils pageUtils = new PageUtils(list, total, query.getLimit(), query.getPage());
        return R.ok().put("data", pageUtils);
    }

    /**
     * 3.根据id删除收藏记录
     */
    @RequestMapping(value = "/delete")
    public R delete(Integer col_id) {
        if (col_id == 0 || col_id == null) {
            logger.error("error param"+col_id);
            return R.error("error param"+col_id);
        }
        boolean flag = collectionService.delete(col_id);
        if (flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }
}
