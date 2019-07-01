package com.axej.harlan.msg.controller;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.BannerBean;
import com.axej.harlan.msg.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:04 2018/3/2
 */
@RestController
@RequestMapping(value = "/banner")
public class BannerController {

    @Autowired
    private BannerService bannerService;

    /**
     * c1 save
     * @param bannerBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(BannerBean bannerBean){
        if (bannerBean == null){
            return R.error("null param");
        }
        boolean flag = bannerService.save(bannerBean);
        if (flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

    /**
     * r1 query list
     * @return
     */
    @RequestMapping(value = "/list")
    public R list(){
        Map<String, Object> map = new HashMap<>();
        map.put("page", 1);
        map.put("limit", 5);
        Query query = new Query(map);
        List<BannerBean> list = bannerService.queryList(query);
        return R.ok().put("data",list);
    }


    /**
     * 删除
     * @param banner_id
     * @return
     */
    @RequestMapping(value = "del")
    public R delete(int banner_id){
        if(banner_id == 0){
            return R.error("null param" + banner_id);
        }
        boolean flag = bannerService.delete(banner_id);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }
}
