package com.axej.harlan.cms.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.cms.bean.CmsStatisticsBean;
import com.axej.harlan.cms.service.ServiceStatisticsService;
import com.axej.harlan.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Description：服务统计（har1/har2/har3）
 * Package com.axej.harlan.cms.controller
 * Class ServiceStatisticsController
 * Aauthor：Ning
 * Date：9:42 2018/10/30 
 */
@RestController
@RequestMapping(value = "/serviceStatistics")
public class ServiceStatisticsController {

    @Autowired
    private ServiceStatisticsService serviceStatisticsService;


    /**
     * 服务数量统计
     * @param jsonStr
     * @param map
     * @return
     */
    @RequestMapping(value = "queryServiceStatistics")
    public R queryServiceStatistics(String jsonStr, Map<String, Object> map){
        if(jsonStr == null || jsonStr.equals("")){
            return R.error("null param");
        }
        map = JSON.parseObject(jsonStr);
        //Application-oriented Detection 服务
        map.put("five_type", "har1");
        List<CmsStatisticsBean> har1ServiceStatistics = serviceStatisticsService.queryServiceStatistics(map);
        //Order Supervision 服务
        map.put("five_type", "har2");
        List<CmsStatisticsBean> har2ServiceStatistics = serviceStatisticsService.queryServiceStatistics(map);
        //Factory Inspection 服务
        map.put("five_type", "har3");
        List<CmsStatisticsBean> har3ServiceStatistics = serviceStatisticsService.queryServiceStatistics(map);
        return R.ok("success").put("har1ServiceStatistics", har1ServiceStatistics).put("har2ServiceStatistics", har2ServiceStatistics).put("har3ServiceStatistics", har3ServiceStatistics);
    }
}
