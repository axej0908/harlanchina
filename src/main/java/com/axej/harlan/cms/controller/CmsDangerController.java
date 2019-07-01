package com.axej.harlan.cms.controller;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.DangerBean;
import com.axej.harlan.goods.service.DangerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：危险平、禁品
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：15:24 2019/3/28
 */
@RestController
@RequestMapping(value = "/cmsDanger")
public class CmsDangerController {

    @Autowired
    private DangerService dangerService;


    /**
     * 危险性物品列表
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "pager")
    public R pager(int page, int limit, Map<String, Object> map){
        if(page == 0 && limit == 0){
            return R.error("null param");
        }
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<DangerBean> dangerBeans = dangerService.queryList(query);
        int total = dangerService.queryTotal(query);
        return R.ok().put("data", dangerBeans).put("count", total);
    }
}
