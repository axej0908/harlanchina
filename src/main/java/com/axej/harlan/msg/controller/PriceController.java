package com.axej.harlan.msg.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.PriceBean;
import com.axej.harlan.msg.service.PriceService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: 价格快递(后台上传 首页展示)
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:08 2018/3/1
 */
@RestController
@RequestMapping(value = "/price")
public class PriceController {

    @Autowired
    private PriceService priceService;

    /**
     * c 保存价格快递
     *
     * @param priceBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(PriceBean priceBean) {
        if (priceBean == null || priceBean.getPrice_id() != 0) {
            return R.error("param error"+ JSON.toJSONString(priceBean));
        }
        boolean flag = priceService.save(priceBean);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("error");
        }
    }


    /**
     * r 查询价格快递
     *
     * @param jsonStr
     * @param map
     * page
     * limit
     * @return
     */
    @RequestMapping(value = "/list")
    public R list(String jsonStr, Map<String,Object> map){
        if (StringUtils.isNotBlank(jsonStr)){
            map = JSON.parseObject(jsonStr);
            //省略判断map
        }else {
            return R.error("null param");
        }
        Query query = new Query(map);
        List<PriceBean> priceBeans = priceService.queryList(query);
        int total = priceService.queryTotal(query);
        PageUtils pageUtils = new PageUtils(priceBeans,total,query.getLimit(),query.getPage());
        return R.ok("success").put("data",pageUtils);
    }
}
