package com.axej.harlan.cms.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.ExhibitBean;
import com.axej.harlan.msg.service.ExhibitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：展会
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：11:23 2019/4/18
 */
@RestController
@RequestMapping(value = "/cmsExhibit")
public class CmsExhibitController extends AbstractController {

    @Autowired
    private ExhibitService exhibitService;


    /**
     * 全部
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "pager")
    public R pager(int page, int limit, Map<String, Object> map){
        if(page == 0 || limit == 0){
            return R.error("null param");
        }
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<ExhibitBean> exhibitBeans = exhibitService.queryList(query);
        int total = exhibitService.queryTotal(query);
        return R.ok().put("data", exhibitBeans).put("count", total);
    }
}
