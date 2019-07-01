package com.axej.harlan.goods.controller;

import com.axej.harlan.common.utils.L;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.TarEnquiryBean;
import com.axej.harlan.goods.service.TarEnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: 指定商品的询盘
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 10:23 2018/3/28
 */
@RestController
@RequestMapping(value = "/tarEnquiry")
public class TarEnquiryController {

    @Autowired
    private TarEnquiryService tarEnquiryService;


    /**
     * 5.query pager by criteria
     * 国内供应商申请的服务
     * @param page
     * @param limit
     * @param buyer_id
     * @return
     */
    @RequestMapping(value = "/pagerZh")
    public L pager(Integer page, Integer limit,Integer buyer_id, String beginTime,
                   String limitTime, String tar_status,String zh_pos) {
        Map<String, Object> map = new HashMap<>();
        map.put("page", page);
        map.put("limit", limit);
        map.put("buyer_id", buyer_id);
        map.put("tar_status", tar_status);
        map.put("beginTime", beginTime);
        map.put("limitTime", limitTime);
        map.put("zh_pos", zh_pos);
        Query query = new Query(map);
        List<TarEnquiryBean> list = tarEnquiryService.queryZhList(query);
        int total = tarEnquiryService.queryZhTotal(query);
        return L.ok(total, list);
    }

    /**
     * 4.update
     *
     * @param bean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(TarEnquiryBean bean) {
        if (bean.getEn_id() == 0) {
            return R.error("error param");
        }
        int i = tarEnquiryService.upate(bean);
        if (i == 1) {
            return R.ok();
        } else {
            return R.error();
        }
    }

    /**
     * 3.query detail
     *
     * @param en_id
     * @return
     */
    @RequestMapping(value = "/detail")
    public R detail(int en_id) {
        if (en_id == 0) {
            return R.error("error param");
        }
        TarEnquiryBean tarEnquiryBean = tarEnquiryService.queryObject(en_id);
        return R.ok().put("data", tarEnquiryBean);
    }


    /**
     * 2.query pager by criteria
     *
     * @param page
     * @param limit
     * @param user_id
     * @param buyer_id
     * @return
     */
    @RequestMapping(value = "/pager")
    public L pager(Integer page, Integer limit, Integer user_id, Integer buyer_id, String beginTime,
                   String limitTime, String tar_status,String zh_pos) {
        Map<String, Object> map = new HashMap<>();
        map.put("page", page);
        map.put("limit", limit);
        map.put("user_id", user_id);
        map.put("buyer_id", buyer_id);
        map.put("tar_status", tar_status);
        map.put("beginTime", beginTime);
        map.put("limitTime", limitTime);
        map.put("zh_pos", zh_pos);
        Query query = new Query(map);
        List<TarEnquiryBean> list = tarEnquiryService.queryList(query);
        int total = tarEnquiryService.queryTotal(query);
        return L.ok(total, list);
    }


    /**
     * 1.save
     *
     * @param tarEnquiryBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(TarEnquiryBean tarEnquiryBean) {
        int i = tarEnquiryService.save(tarEnquiryBean);
        if (i == 1) {
            return R.ok();
        } else {
            return R.error();
        }
    }

    /**
     * 2.query pager by criteria
     *
     * @param page
     * @param limit
     * @param user_id
     * @param buyer_id
     * @return
     */
    @RequestMapping(value = "/back_pager")
    public L back_pager(Integer page, Integer limit, Integer user_id, Integer buyer_id, String beginTime,
                   String limitTime, String tar_status,String zh_pos) {
        Map<String, Object> map = new HashMap<>();
        map.put("page", page);
        map.put("limit", limit);
        map.put("user_id", user_id);
        map.put("buyer_id", buyer_id);
        map.put("tar_status", tar_status);
        map.put("beginTime", beginTime);
        map.put("limitTime", limitTime);
        map.put("zh_pos", zh_pos);
        Query query = new Query(map);
        List<TarEnquiryBean> list = tarEnquiryService.back_queryList(query);
        int total = tarEnquiryService.back_queryTotal(query);
        return L.ok(total, list);
    }
}
