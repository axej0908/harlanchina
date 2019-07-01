package com.axej.harlan.cms.controller;

import com.axej.harlan.cms.bean.CmsLoggerBean;
import com.axej.harlan.cms.service.CmsLoggerService;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：过滤危险产品
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：15:07 2019/3/29
 */
@RestController
@RequestMapping(value = "/cmsLogger")
public class CmsLoggerController extends AbstractController {

    @Autowired
    private CmsLoggerService cmsLoggerService;


    @RequestMapping(value = "executeAsync")
    public void executeAsync(){
        logger.info("start submit");

        //调用service层的任务
        cmsLoggerService.executeAsync();

        logger.info("end submit");
    }


    /**
     * 查询已删除的危险产品
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "pager")
    public R queryList(int page, int limit, Map<String, Object> map){
        if(page == 0 || limit == 0){
            return R.error("null param");
        }
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<CmsLoggerBean> loggerBeans = cmsLoggerService.queryList(query);
        int total = cmsLoggerService.queryTotal(query);
        return R.ok().put("data", loggerBeans).put("count", total);
    }
}
