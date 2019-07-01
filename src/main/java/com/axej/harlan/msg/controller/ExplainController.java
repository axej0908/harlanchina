package com.axej.harlan.msg.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.ExplainBean;
import com.axej.harlan.msg.service.ExplainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：说明
 * Package com.axej.harlan.msg.controller
 * Class ExplainController
 * Aauthor：Ning
 * Date：17:40 2019/1/4
 */
@RestController
@RequestMapping(value = "/explain")
public class ExplainController extends AbstractController {

    @Autowired
    private ExplainService explainService;

    /**
     * 保存
     * @param explainBean
     * @return
     */
    @RequestMapping(value = "save")
    public R save(ExplainBean explainBean){
        if(explainBean == null){
            logger.error("error param" + JSON.toJSONString(explainBean));
            return R.error("null param");
        }

        boolean flag = explainService.save(explainBean);
        if(flag){
            return R.ok("success").put("data", explainBean.getExplain_id());
        }else {
            return R.error("fail");
        }
    }


    /**
     * 编辑
     * @param explainBean
     * @return
     */
    @RequestMapping(value = "edit")
    public R edit(ExplainBean explainBean){
        if(explainBean == null){
            logger.error("error param" + JSON.toJSONString(explainBean));
            return R.error("null param");
        }
        boolean flag = explainService.edit(explainBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 删除
     * @param explainBean
     * @return
     */
    @RequestMapping(value = "del")
    public R del(ExplainBean explainBean){
        if(explainBean == null){
            logger.error("error param" + JSON.toJSONString(explainBean));
            return R.error("null param");
        }
        boolean flag = explainService.del(explainBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 详情
     * @param explain_id
     * @return
     */
    @RequestMapping(value = "queryObject")
    public R queryObject(int explain_id){
        if(explain_id == 0){
            return R.error("null param");
        }
        ExplainBean explainBean = explainService.queryObject(explain_id);
        if(explainBean != null){
            return R.ok("success").put("data", explainBean);
        }else {
            return R.error("null data");
        }
    }


    /**
     * 查询全部
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "queryList")
    public R queryList(int page, int limit, Map<String, Object> map){
        if(page == 0 && limit == 0){
            return R.error("null param");
        }
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<ExplainBean> explainBeans = explainService.queryList(query);
        int total = explainService.queryTotal(query);
        return R.ok().put("data", explainBeans).put("count", total);
    }
}
