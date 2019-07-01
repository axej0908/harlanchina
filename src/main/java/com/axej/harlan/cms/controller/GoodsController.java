package com.axej.harlan.cms.controller;

import com.axej.harlan.common.utils.L;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.service.GoodsMallService;
import org.omg.CORBA.OBJECT_NOT_EXIST;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 9:57 2018/3/17
 */
@RestController
@RequestMapping(value = "/cmsGoods")
public class GoodsController {

    @Autowired
    private GoodsMallService goodsMallService;

    /**
     * cms - my goods
     * @param page
     * @param limit
     * @param user_id
     * @param goods_state
     *
     * goods_id
     * goods_name
     * @return
     */
    @RequestMapping(value = "/pager")
    public L pager(Integer page, Integer limit, Integer user_id, String goods_state, String status, Integer goods_id,String goods_name,String goods_type) {
        Map<String,Object> map = new HashMap<>();
        map.put("page", page);
        map.put("limit", limit);
        map.put("user_id", user_id);
        map.put("goods_state", goods_state);
        map.put("status", status);
        map.put("goods_id", goods_id);
        map.put("goods_name", goods_name);
        map.put("goods_type", goods_type);
        Query query = new Query(map);
        List<GoodsMallBean> goodsMallBeans = goodsMallService.queryList(query);
        int num = goodsMallService.queryTotal(query);
        return L.ok(num,goodsMallBeans);
    }

    /**
     * cas 搜索
     * @param cas
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping(value = "/searchCas")
    public R searchCas(String cas , String goods_state , String goods_type, int page , int limit){
        Map<String , Object> map = new HashMap<>();
        map.put("cas" , cas);
        map.put("goods_state" , goods_state);
        map.put("goods_type" , goods_type);
        map.put("page" , page);
        map.put("limit" , limit);
        Query query = new Query(map);
        List<GoodsMallBean> goodsMallBeans = goodsMallService.searchCas(query);
        int total = goodsMallService.searchCasTotal(query);
        return R.ok("success").put("data" , goodsMallBeans).put("count" , total);
    }

    /**
     * 商品编号 搜索
     * @param goodsMallBean
     * @return
     */
    @RequestMapping(value = "/searchId")
    public R searchId(GoodsMallBean goodsMallBean){
        if(goodsMallBean == null){
            return R.error("null param");
        }
        List<GoodsMallBean> goodsMallBeans = goodsMallService.searchId(goodsMallBean);
        return R.ok("success").put("data" , goodsMallBeans);
    }
}
