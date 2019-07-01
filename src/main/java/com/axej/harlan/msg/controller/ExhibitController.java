package com.axej.harlan.msg.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.ExhibitBean;
import com.axej.harlan.msg.service.ExhibitService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Description：展会
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：11:24 2019/4/18
 */
@RestController
@RequestMapping(value = "/exhibit")
public class ExhibitController extends AbstractController {

    @Autowired
    private ExhibitService exhibitService;


    /**
     * 保存
     * @param exhibitBean
     * @return
     */
    @RequestMapping(value = "save")
    public R save(ExhibitBean exhibitBean){
        if(exhibitBean == null){
            logger.error("null param" + JSON.toJSONString(exhibitBean));
            return R.error("null param" + JSON.toJSONString(exhibitBean));
        }
        boolean flag = exhibitService.save(exhibitBean);
        if(flag){
            return R.ok("success").put("data", exhibitBean.getExhibit_id());
        }else {
            return R.error("fail");
        }
    }


    /**
     * 删除
     * @param exhibit_id
     * @return
     */
    @RequestMapping(value = "del")
    public R delete(int exhibit_id){
        if(exhibit_id == 0){
            logger.error("null param" + exhibit_id);
            return R.error("null param" + exhibit_id);
        }
        boolean flag = exhibitService.delete(exhibit_id);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 编辑
     * @param exhibitBean
     * @return
     */
    @RequestMapping(value = "edit")
    public R update(ExhibitBean exhibitBean){
        if(exhibitBean.getExhibit_id() == 0){
            logger.error("null param" + JSON.toJSONString(exhibitBean));
            return R.error("null param" + JSON.toJSONString(exhibitBean));
        }
        boolean flag = exhibitService.update(exhibitBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 查询
     * @param jsonStr
     * @param map
     * @return
     */
    @RequestMapping(value = "queryList")
    public R queryList(String jsonStr, Map<String, Object> map){
        if(StringUtils.isEmpty(jsonStr)){
            logger.error("null param" + jsonStr);
            return R.error("null param" + jsonStr);
        }
        map = JSON.parseObject(jsonStr);
        if (map.get("page") == null || map.get("limit") == null) {
            logger.error("pagination param error");
            return R.error("pagination param error");
        }
        Query query = new Query(map);
        List<ExhibitBean> exhibitBeans = exhibitService.queryList(query);
        int total = exhibitService.queryTotal(query);
        return R.ok().put("data", exhibitBeans).put("count", total);
    }


    /**
     * 详情
     * @param exhibitBean
     * @return
     */
    @RequestMapping(value = "detail")
    public R queryObject(ExhibitBean exhibitBean){
        if(exhibitBean == null){
            logger.error("null param" + JSON.toJSONString(exhibitBean));
            return R.error("null param" + JSON.toJSONString(exhibitBean));
        }
        ExhibitBean exhibit = exhibitService.queryObject(exhibitBean);
        if(exhibit != null){
            return R.ok().put("data", exhibit);
        }else {
            return R.error().put("data", null);
        }
    }
}
