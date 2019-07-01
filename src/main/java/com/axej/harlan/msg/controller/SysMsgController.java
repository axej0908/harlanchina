package com.axej.harlan.msg.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.SysMsgBean;
import com.axej.harlan.msg.service.SysMsgService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Description:系统消息
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:9:59 2017/12/6
 */
@RestController
@RequestMapping(value = "/msg/sys")
public class SysMsgController extends AbstractController{

    @Autowired
    private SysMsgService sysMsgService;

    /**
     * 查询系统消息列表
     * map - > page
     * map - > limit
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
        List<SysMsgBean> list = sysMsgService.queryList(query);
        int total = sysMsgService.queryTotal(query);
        PageUtils pageUtils = new PageUtils(list,total,query.getLimit(),query.getPage());
        return R.ok("success").put("data",pageUtils);
    }


    /**
     * 发布系统消息
     * sysMsgBean - > msg_content
     * sysMsgBean - > msg_time
     * sysMsgBean - > msg_publisher
     * @param sysMsgBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(SysMsgBean sysMsgBean){
        if (sysMsgBean == null){
            logger.error("error param...sysMsgBean:"+sysMsgBean.toString());
            return R.error("error param");
        }
        boolean flag = sysMsgService.save(sysMsgBean);
        if (flag){
            return R.ok("success");
        } else{
            return R.error("failure");
        }
    }


    /**
     * 删除系统消息
     * msg_id
     * @return
     */
    @RequestMapping(value = "/delete/{msg_id}")
    public R delete(@PathVariable("msg_id") Long msg_id){
        if (msg_id == null){
            return R.error("error param");
        }
        boolean flag = sysMsgService.delete(msg_id);
        if (flag){
            return R.ok("success");
        } else{
            return R.error("failure");
        }
    }
}
