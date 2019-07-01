package com.axej.harlan.cms.controller;

import com.axej.harlan.cms.bean.CompoundBean;
import com.axej.harlan.cms.service.CompoundService;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/compound")
public class CompoundController {

    @Autowired
    private CompoundService compoundService;

    /**
     * 保存
     * @param compoundBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(CompoundBean compoundBean){
        if(compoundBean == null){
            return R.error("param null");
        }
        boolean flag = compoundService.save(compoundBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("fail");
    }

    /**
     * 修改
     * @param compoundBean
     * @return
     */
    @RequestMapping(value = "/edit")
    public R alter(CompoundBean compoundBean){
        if(compoundBean.getCpd_id() == 0){
            return R.error("param null");
        }
        boolean flag = compoundService.update(compoundBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("fail");
    }

    /**
     * 删除
     * @param cpd_id
     * @return
     */
    @RequestMapping(value = "/del")
    public R del(int cpd_id){
        if(cpd_id == 0){
            return R.error("param null");
        }
        boolean flag = compoundService.delete(cpd_id);
        if(flag){
            return R.ok("success");
        }
        return R.error("fail");
    }

    /**
     * 查看所有化合物
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping(value = "/list")
    public R list(int page , int limit , Map<String , Object> map){
        map.put("page" , page);
        map.put("limit" , limit);
        Query query = new Query(map);
        List<CompoundBean> compoundBeans = compoundService.queryList(query);
        int total = compoundService.queryTotal();
        return R.ok("success").put("data" , compoundBeans).put("count" , total);
    }

    /**
     * 化合物详情
     * @param param
     * @return
     */
    @RequestMapping(value = "detail")
    public R details(CompoundBean param){
        if(param == null){
            return R.error("param null");
        }
        CompoundBean compoundBean = compoundService.queryObject(param);
        if(compoundBean != null){
            return R.ok("success").put("data" , compoundBean);
        }
        return R.error("null data");
    }

    /**
     * 所有化合物名称
     * @return
     */
    @RequestMapping(value = "/gather")
    public R gather(){
        List<CompoundBean> compoundBeans = compoundService.gather();
        if(compoundBeans.size() > 0){
            return R.ok("success").put("data" , compoundBeans);
        }
        return R.error("failed");
    }

}
