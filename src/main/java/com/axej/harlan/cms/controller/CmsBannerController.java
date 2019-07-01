package com.axej.harlan.cms.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.L;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.BannerBean;
import com.axej.harlan.msg.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: 后台管理 banner 首页轮播图片
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 11:53 2018/4/14
 */
@RestController
@RequestMapping(value = "/cmsBanner")
public class CmsBannerController extends AbstractController {

    @Autowired
    private BannerService bannerService;

    /**
     * 3.detail
     * @return
     */
    @RequestMapping(value = "/detail")
    public R detail(BannerBean bannerBean){
        if (bannerBean.getBanner_id() == 0) {
            return R.error(ERROR_PARAM);
        }
        BannerBean dbBean = bannerService.queryObject(bannerBean);
        return R.ok().put("data",dbBean);
    }


    /**
     * 2.cms update
     *
     * @param bannerBean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(BannerBean bannerBean) {
        if (bannerBean.getBanner_id() == 0) {
            return R.error(ERROR_PARAM);
        }
        int i = bannerService.update(bannerBean);
        if (i == 1) {
            return R.ok();
        } else {
            return R.error();
        }
    }

    /**
     * 1.cms query pager
     *
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping(value = "/list")
    public L list(int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<BannerBean> list = bannerService.queryList(query);
        int total = bannerService.queryTotal(query);
        return L.ok(total, list);
    }
}
