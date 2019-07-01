package com.axej.harlan.cms.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.cms.bean.CmsStatisticsBean;
import com.axej.harlan.cms.service.UserStatisticsService;
import com.axej.harlan.common.utils.JsonUtils;
import com.axej.harlan.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：用户统计(供应商/采购商)
 * Package com.axej.harlan.cms.controller
 * Class UserStatisticsController
 * Aauthor：Ning
 * Date：17:07 2018/10/24 
 */
@RestController
@RequestMapping(value = "/userStatistics")
public class UserStatisticsController extends JsonUtils{

    @Autowired
    private UserStatisticsService userStatisticsService;

    /**
     * 用户注册量统计(data)
     * @param map
     * @return
     */
    @RequestMapping(value = "queryUserStatistics")
    public R queryUserStatistics(String jsonStr, Map<String, Object> map){
        if(jsonStr == null || jsonStr.equals("")){
            return R.error("null param");
        }
        map = JSON.parseObject(jsonStr);
        //供货商
        map.put("biz_type", "seller");
        List<CmsStatisticsBean> sellerStatistics = userStatisticsService.queryUserStatistics(map);
        //采购商
        map.put("biz_type", "buyer");
        List<CmsStatisticsBean> buyerStatistics = userStatisticsService.queryUserStatistics(map);
        return R.ok("success").put("sellerStatistics", sellerStatistics).put("buyerStatistics", buyerStatistics);
    }


    /**
     * 订单成交量统计(金额统计)
     * @param jsonStr
     * @param map
     * @return
     */
    @RequestMapping(value = "querySumStatistics")
    public R querySumStatistics(String jsonStr, Map<String, Object> map){
        if(jsonStr == null || jsonStr.equals("")){
            return R.error("null param");
        }
        map = JSON.parseObject(jsonStr);
        List<CmsStatisticsBean> cmsStatisticsBeans = userStatisticsService.querySumStatistics(map);
        return R.ok("success").put("data", cmsStatisticsBeans);
    }
}
