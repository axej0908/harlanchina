package com.axej.harlan.cms.controller;

import com.axej.harlan.common.utils.L;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.goods.service.ShopService;
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
 * @Date: 15:29 2018/3/17
 */
@RestController
@RequestMapping(value = "/cmsShop")
public class CmsShopController {

    @Autowired
    private ShopService shopService;

    /**
     * 1.cms query shops by pager
     * @param shop_state
     * @param com_name(reserved)
     * @return
     */
    @RequestMapping(value = "/pager")
    public L pager(String shop_state,String com_name,Integer page,Integer limit){
        if (page == null || limit == null){
            return L.error("null param");
        }
        Map<String, Object> map = new HashMap<>();
        map.put("page", page);
        map.put("limit", limit);
        map.put("shop_state", shop_state);
        map.put("com_name", com_name);
        Query query = new Query(map);
        List<ShopBean> list = shopService.queryList(query);
        int total = shopService.queryTotal(query);
        return L.ok(total,list);
    }
}
