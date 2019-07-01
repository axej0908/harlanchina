package com.axej.harlan.goods.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.DangerBean;
import com.axej.harlan.goods.service.DangerService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Description：危险品、禁品
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：15:05 2019/3/22
 */
@RestController
@RequestMapping(value = "/danger")
public class DangerController extends AbstractController {

    @Autowired
    private DangerService dangerService;


    /**
     * 保存
     * @param dangerBean
     * @return
     */
    @RequestMapping(value = "save")
    public R save(DangerBean dangerBean){
        if(dangerBean == null){
            logger.error("null param:" + JSON.toJSONString(dangerBean));
            return R.error("null param");
        }
        boolean flag = dangerService.save(dangerBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 删除
     * @param danger_id
     * @return
     */
    @RequestMapping(value = "del")
    public R del(int danger_id){
        if(danger_id == 0){
            logger.error("null param");
            return R.error("null param");
        }
        boolean flag = dangerService.delete(danger_id);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 是否是违禁品
     * true 是  false 否
     *
     * @param dangerBean
     * @return
     */
    @RequestMapping(value = "queryExist")
    public R queryExist(DangerBean dangerBean){
        if(StringUtils.isEmpty(dangerBean.getCas())){
            logger.error("null param:" + JSON.toJSONString(dangerBean));
            return R.error("null param");
        }
        boolean flag = dangerService.queryExist(dangerBean);
        return R.ok().put("data", flag);
    }
}
