package com.axej.harlan.cms.controller;

import com.axej.harlan.cms.bean.UpDownStreamBean;
import com.axej.harlan.cms.service.UpDownStreamService;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：化合物上下游
 * Package com.axej.harlan.cms.controller
 * Class UpDownStreamController
 * Aauthor：Ning
 * Date：14:55 2018/8/10
 */
@RestController
@RequestMapping(value = "/upDownStream")
public class UpDownStreamController {

    @Autowired
    private UpDownStreamService upDownStreamService;

    /**
     * 保存
     * @param upDownStreamBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(UpDownStreamBean upDownStreamBean){
        if(upDownStreamBean.getCpd_id() == 0){
            return R.error("param null");
        }
        boolean flag = upDownStreamService.save(upDownStreamBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("failed");
    }

    /**
     * 修改
     * @param upDownStreamBean
     * @return
     */
    @RequestMapping(value = "/edit")
    public R alter(UpDownStreamBean upDownStreamBean){
        if(upDownStreamBean.getUpdown_id() == 0){
            return R.error("param null");
        }
        boolean flag = upDownStreamService.update(upDownStreamBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("failed");
    }

    /**
     * 删除
     * @param updown_id
     * @return
     */
    @RequestMapping(value = "/del")
    public R del(int updown_id){
        if(updown_id == 0){
            return R.error("param null");
        }
        boolean flag = upDownStreamService.delete(updown_id);
        if(flag){
            return R.ok("success");
        }
        return R.error("failed");
    }

    /**
     * 查看化合物下所有的上下游
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
        List<UpDownStreamBean> upDownStreamBeans = upDownStreamService.queryList(query);
        int totals = upDownStreamService.queryTotal(query);
        return R.ok("success").put("data" , upDownStreamBeans).put("count" , totals);
    }

    /**
     * 查看上下游
     * @param updown_id
     * @return
     */
    @RequestMapping(value = "/get")
    public R get(int updown_id){
        if(updown_id == 0){
            return R.error("param null");
        }
        UpDownStreamBean upDownStreamBean = upDownStreamService.queryObject(updown_id);
        if(upDownStreamBean != null){
            return R.ok("success").put("data" , upDownStreamBean);
        }
        return R.error("failed");
    }
}
