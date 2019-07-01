package com.axej.harlan.cms.controller;

import com.axej.harlan.cms.bean.SyntheticRouteBean;
import com.axej.harlan.cms.service.SyntheticRouteService;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：化合物合成路线
 * Package com.axej.harlan.cms.controller
 * Class SyntheticRouteController
 * Aauthor：Ning
 * Date：14:48 2018/8/10
 */
@RestController
@RequestMapping(value = "/syntheticRoute")
public class SyntheticRouteController {

    @Autowired
    private SyntheticRouteService syntheticRouteService;

    /**
     * 保存
     * @param syntheticRouteBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(SyntheticRouteBean syntheticRouteBean){
        if(syntheticRouteBean.getCpd_id() == 0){
            return R.error("param null");
        }
        boolean flag = syntheticRouteService.save(syntheticRouteBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("failed");
    }

    /**
     * 修改
     * @param syntheticRouteBean
     * @return
     */
    @RequestMapping(value = "/edit")
    public R alter(SyntheticRouteBean syntheticRouteBean){
        if(syntheticRouteBean.getSynthetic_id() == 0){
            return R.error("param null");
        }
        boolean flag = syntheticRouteService.update(syntheticRouteBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("fail");
    }

    /**
     * 删除
     * @param synthetic_id
     * @return
     */
    @RequestMapping(value = "/del")
    public R del(int synthetic_id){
        if(synthetic_id == 0){
            return R.error("param null");
        }
        boolean flag = syntheticRouteService.delete(synthetic_id);
        if(flag){
            return R.ok("success");
        }
        return R.error("failed");
    }

    /**
     * 查看某个化合物下所有的合成路线
     * @param cpd_id
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "/list")
    public R list(int cpd_id , int page , int limit , Map<String , Object> map){
        if(cpd_id == 0){
            return R.error("param null");
        }
        map.put("cpd_id" , cpd_id);
        map.put("page" , page);
        map.put("limit" , limit);
        Query query = new Query(map);
        List<SyntheticRouteBean> syntheticRouteBeans = syntheticRouteService.queryList(query);
        int totals = syntheticRouteService.queryTotal(query);
        return R.ok("success").put("data" , syntheticRouteBeans).put("count" , totals);
    }

    /**
     * 查看合成路线
     * @param synthetic_id
     * @return
     */
    @RequestMapping(value = "detail")
    public R get(int synthetic_id){
        if(synthetic_id == 0){
            return R.error("param null");
        }
        SyntheticRouteBean syntheticRouteBean = syntheticRouteService.queryObject(synthetic_id);
        if(syntheticRouteBean != null){
            return R.ok("success").put("data" , syntheticRouteBean);
        }
        return R.error("null data");
    }
}
