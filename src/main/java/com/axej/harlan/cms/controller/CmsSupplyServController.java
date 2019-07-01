package com.axej.harlan.cms.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.SupplyServBean;
import com.axej.harlan.goods.service.SupplyServService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Description：管理后台 供应链金额
 * Package com.axej.harlan.cms.controller
 * Class CmsSupplyServController
 * Aauthor：Ning
 * Date：11:48 2019/2/15
 */
@RestController
@RequestMapping(value = "/cmsSupplyServ")
public class CmsSupplyServController extends AbstractController {

    @Autowired
    private SupplyServService supplyServService;


    /**
     * 查询
     * @param border_type
     * @param supply_state
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "pager")
    public R pager(String border_type, String supply_state, int page, int limit, Map<String, Object> map){
        if(StringUtils.isEmpty(border_type) || StringUtils.isEmpty(supply_state)){
            logger.error("null param");
            return R.error("null param");
        }
        map.put("border_type", border_type);
        map.put("supply_state", supply_state);
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<SupplyServBean> supplyServBeans = supplyServService.queryList(query);
        int total = supplyServService.queryTotal(query);
        return R.ok().put("data", supplyServBeans).put("count", total);

    }
}
