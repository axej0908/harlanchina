package com.axej.harlan.goods.controller;

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
 * Description：供应链金融
 * Package com.axej.harlan.goods.controller
 * Class SupplyServController
 * Aauthor：Ning
 * Date：10:03 2019/2/15
 */
@RestController
@RequestMapping(value = "/supplyServ")
public class SupplyServController extends AbstractController {

    @Autowired
    private SupplyServService supplyServService;

    /**
     * 保存
     * @param supplyServBean
     * @return
     */
    @RequestMapping(value = "save")
    public R save(SupplyServBean supplyServBean){
        if(supplyServBean == null){
            logger.error("null param" + JSON.toJSONString(supplyServBean));
            return R.error("null param");
        }
        boolean flag = supplyServService.save(supplyServBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 修改
     * @param supplyServBean
     * @return
     */
    @RequestMapping(value = "edit")
    public R update(SupplyServBean supplyServBean){
        if(supplyServBean.getSupply_id() == 0){
            logger.error("null param" + JSON.toJSONString(supplyServBean));
            return R.error("null param");
        }
        boolean flag = supplyServService.update(supplyServBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

    /**
     * 删除
     * @param supply_id
     * @return
     */
    @RequestMapping(value = "del")
    public R delete(int supply_id){
        if(supply_id == 0){
            logger.error("null param" + supply_id);
            return R.error("null param");
        }
        boolean flag = supplyServService.delete(supply_id);
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
            logger.error("null param" + JSON.toJSONString(jsonStr));
            return R.error("null param");
        }
        map = JSON.parseObject(jsonStr);
        Query query = new Query(map);
        List<SupplyServBean> supplyServBeans = supplyServService.queryList(query);
        int total = supplyServService.queryTotal(query);
        return R.ok().put("data", supplyServBeans).put("count", total);
    }


    /**
     * 详情
     * @param supply_id
     * @return
     */
    @RequestMapping(value = "detail")
    public R queryObject(int supply_id){
        if(supply_id == 0){
            logger.error("null param" + supply_id);
            return R.error("null param" + supply_id);
        }
        SupplyServBean supplyServBean = supplyServService.queryObject(supply_id);
        if(supplyServBean != null){
            return R.ok().put("data", supplyServBean);
        }else {
            return R.error().put("data", null);
        }
    }
}
