package com.axej.harlan.cms.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.cms.bean.CmsStatisticsBean;
import com.axej.harlan.cms.service.EnquiryStatisticsService;
import com.axej.harlan.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：询盘统计（系统/三方）
 * Package com.axej.harlan.cms.controller
 * Class EnquiryStatisticsController
 * Aauthor：Ning
 * Date：15:01 2018/10/29 
 */
@RestController
@RequestMapping(value = "enquiryStatistics")
public class EnquiryStatisticsController {

    @Autowired
    private EnquiryStatisticsService enquiryStatisticsService;


    /**
     * 询盘总数统计
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
        List<CmsStatisticsBean> systemStatistics = enquiryStatisticsService.querySystemSumStatistics(map);
        List<CmsStatisticsBean> tripartiteStatistics = enquiryStatisticsService.queryTripartiteSumStatistics(map);
        return R.ok("success").put("systemStatistics", systemStatistics).put("tripartiteStatistics", tripartiteStatistics);
    }
}
