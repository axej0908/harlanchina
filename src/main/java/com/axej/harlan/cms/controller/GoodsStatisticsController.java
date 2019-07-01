package com.axej.harlan.cms.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.cms.bean.CmsStatisticsBean;
import com.axej.harlan.cms.service.GoodsStatisticsService;
import com.axej.harlan.common.utils.JsonUtils;
import com.axej.harlan.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：商品统计（自营/第三方）
 * Package com.axej.harlan.cms.controller
 * Class GoodsStatisticsController
 * Aauthor：Ning
 * Date：15:45 2018/10/26 
 */
@RestController
@RequestMapping(value = "/goodsStatistics")
public class GoodsStatisticsController extends JsonUtils {

    @Autowired
    private GoodsStatisticsService goodsStatisticsService;


    /**
     * 商品数量统计
     * 上/下架商品数量统计（区别自营于第三方）
     * @param jsonStr
     * @param map
     * @return
     */
    @RequestMapping(value = "queryUpDownStatistics")
    public R queryUpDownStatistics(String jsonStr, Map<String, Object> map){
        if(jsonStr == null || jsonStr.equals("")){
            return R.error("null param");
        }
        map = JSON.parseObject(jsonStr);
        //上架
        map.put("goods_state", "up");
        List<CmsStatisticsBean> upStatistics = goodsStatisticsService.queryUpDownStatistics(map);
        //下架
        map.put("goods_state", "down");
        List<CmsStatisticsBean> downStatistics = goodsStatisticsService.queryUpDownStatistics(map);
        return R.ok("success").put("upStatistics", upStatistics).put("downStatistics", downStatistics);
    }


    /**
     * 商品成交量
     * 成交总价统计（区别自营于第三方）
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
        List<CmsStatisticsBean> cmsStatisticsBeans = goodsStatisticsService.querySumStatistics(map);
        return R.ok("success").put("data", cmsStatisticsBeans);
    }
}
