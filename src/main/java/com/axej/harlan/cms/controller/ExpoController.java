package com.axej.harlan.cms.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.cms.bean.ExpoBean;
import com.axej.harlan.cms.service.ExpoService;
import com.axej.harlan.common.utils.L;
import com.axej.harlan.common.utils.R;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: 首页 展会/广告 内容
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:46 2018/3/21
 */
@RestController
@RequestMapping(value = "/expo")
public class ExpoController {

    @Autowired
    private ExpoService expoService;

    private final static String MSG_ERROR_TIP = "error param";


    /**
     * 4.detail
     *
     * @param bean expo_id
     * @return
     */
    @RequestMapping(value = "/detail")
    public R detail(ExpoBean bean) {
        if (bean.getExpo_id() == null || bean.getExpo_id() == 0) {
            return R.error(MSG_ERROR_TIP);
        }
        ExpoBean expoBean = expoService.queryObject(bean);
        return R.ok().put("data", expoBean);
    }

    /**
     * 3.list
     *
     * @return
     */
    @RequestMapping(value = "/list")
    public L detail(String display, String expo_pos) {
        Map<String, Object> map = new HashMap<>();
        map.put("display", display);
        map.put("expo_pos", expo_pos);
        List<ExpoBean> list = expoService.queryList(map);
        return L.ok(list.size(), list);
    }

    /**
     * 2.update
     *
     * @param expoBean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(ExpoBean expoBean) {
        if (expoBean.getExpo_id() == 0) {
            return R.error(MSG_ERROR_TIP);
        }
        int i = expoService.update(expoBean);
        if (i == 1) {
            return R.ok();
        } else {
            return R.error();
        }
    }

    /**
     * 1.save
     *
     * @param expoBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(ExpoBean expoBean) {
        if (StringUtils.isEmpty(expoBean.getTitle())) {
            return R.error(MSG_ERROR_TIP);
        }
        int i = expoService.save(expoBean);
        if (i == 1) {
            return R.ok();
        } else {
            return R.error();
        }
    }

}
