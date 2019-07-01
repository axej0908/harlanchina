package com.axej.harlan.cms.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.L;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.FiveServBean;
import com.axej.harlan.goods.service.FiveServ;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:15 2018/4/18
 */
@RestController
@RequestMapping(value = "/cmsFiveSer")
public class CmsFiveSerController extends AbstractController {

    @Autowired
    private FiveServ fiveServ;

    /**
     * 1.更新申请状态
     *
     * @param param
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(FiveServBean param) {
        if (param.getFive_id() == 0) {
            return R.error(ERROR_PARAM);
        }
        int i = fiveServ.update(param);
        if (i == 1) {
            return R.ok();
        } else {
            return R.error();
        }
    }

    /**
     * 1.后台管理 根据分类查询国外用户申请的服务*5
     *
     * @param page
     * @param limit
     * @param five_type
     * @return
     */
    @RequestMapping(value = "/pager")
    public L pager(Integer page, Integer limit, String five_type, String border_type, String appl_status) {
        Map<String, Object> map = new HashMap<>();
        map.put("page", page);
        map.put("limit", limit);
        map.put("five_type", five_type);
        map.put("border_type", border_type);
        map.put("appl_status", appl_status);
        Query query = new Query(map);
        List<FiveServBean> list = fiveServ.queryList(query);
        int total = fiveServ.queryTotal(query);
        return L.ok(total, list);
    }
}
