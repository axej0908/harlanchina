package com.axej.harlan.msg.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.LinksBean;
import com.axej.harlan.msg.service.LinksService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/links")
public class LinksController extends AbstractController {

    @Autowired
    private LinksService linksService;


    /**
     * 引导页、首页
     * @param jsonStr
     * @param map
     * @return
     */
    @RequestMapping(value = "queryList")
    public R queryList(String jsonStr, Map<String, Object> map){
        if(StringUtils.isEmpty(jsonStr)){
            logger.error("error param" + jsonStr);
            return R.error("null param");
        }
        map = JSON.parseObject(jsonStr);
        Query query = new Query(map);
        List<LinksBean> linksBeans = linksService.queryList(query);
        int total = linksService.queryTotal(query);
        return R.ok().put("data", linksBeans).put("count", total);
    }

    /**
     * 详情
     * @param links_id
     * @return
     */
    @RequestMapping(value = "detail")
    public R detail(int links_id){
        if(links_id == 0){
            logger.error("null param" + JSON.toJSONString(links_id));
            return R.error("null param");
        }
        LinksBean linksBean = linksService.queryObject(links_id);
        if(linksBean != null){
            return R.ok("success").put("data", linksBean);
        }else {
            return R.error("null data");
        }
    }

}
