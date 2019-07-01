package com.axej.harlan.msg.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.NoteMsgBean;
import com.axej.harlan.msg.service.NoteMsgService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Description:通知消息
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:10:13 2017/12/6
 */
@RestController
@RequestMapping(value = "/msg/note")
public class NoteMsgController extends AbstractController{

    @Autowired
    private NoteMsgService noteMsgService;

    /**
     * 查看通知消息列表
     * map - > user_id 通知消息人的id (当用户角色为一般用户时必传)
     * map - > page
     * map - > limit
     * @param map
     * @return
     */
    @RequestMapping(value = "/list")
    public R list(String jsonStr,Map<String,Object> map){
        if (StringUtils.isNotBlank(jsonStr) && map.size() == 0){
            map = JSON.parseObject(jsonStr);
        }
        if (map.get("page") == null || map.get("limit") == null){
            logger.error("error param...map:"+map.toString());
            return R.error("error param...");
        }
        Query query = new Query(map);
        List<NoteMsgBean> list = noteMsgService.queryList(query);
        int total = noteMsgService.queryTotal(query);
        PageUtils pageUtils = new PageUtils(list,total,query.getLimit(),query.getPage());
        return R.ok("success").put("data",pageUtils);
    }

}
