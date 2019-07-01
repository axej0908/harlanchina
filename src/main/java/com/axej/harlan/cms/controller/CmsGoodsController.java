package com.axej.harlan.cms.controller;

import com.axej.harlan.common.utils.L;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.service.GoodsMallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;

/**
 * @Author: jaywechen
 * @Description: 后台系统询盘管理
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 17:53 2018/3/31
 */
@RestController
@RequestMapping(value = "/cmsEnquiry")
public class CmsGoodsController {

    @Autowired
    private GoodsMallService goodsMallService;

    @RequestMapping(value = "/pager")
    public L pager(String goods_type, String goods_state, Integer page, Integer limit, String beginTime, String limitTime) {
        Map<String, Object> map = new HashMap<>();
        map.put("goods_type", goods_type);
        map.put("goods_state", goods_state);
        map.put("page", page);
        map.put("limit", limit);
        map.put("beginTime", beginTime);
        map.put("limitTime", limitTime);
        Query query = new Query(map);
        List<GoodsMallBean> goodsMallBeans = goodsMallService.queryList(query);
        int num = goodsMallService.queryTotal(query);
        return L.ok(num, goodsMallBeans);
    }
}
