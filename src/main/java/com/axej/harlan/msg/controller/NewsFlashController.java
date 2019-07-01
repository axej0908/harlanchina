package com.axej.harlan.msg.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.NewsFlashBean;
import com.axej.harlan.msg.service.NewsFlashService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: 公司公告 行业快讯
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:11 2018/1/30
 */
@RestController
@RequestMapping(value = "/newsFlash")
public class NewsFlashController extends AbstractController {

    @Autowired
    private NewsFlashService newsFlashService;

    /**
     * 1.保存公司公告和行业快讯
     *
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(NewsFlashBean newsFlashBean) {
        if (!StringUtils.isNotBlank(newsFlashBean.getNews_type())) {
            logger.error("error param" + JSON.toJSONString(newsFlashBean));
            return R.error("error param" + JSON.toJSONString(newsFlashBean));
        }
        boolean flag = newsFlashService.save(newsFlashBean);
        if (flag) {
            return R.ok("success").put("news_id", newsFlashBean.getNews_id());
        } else {
            return R.error("fail");
        }
    }

    /**
     * 2.查询 公告或者咨询
     * page
     * limit
     */
    @RequestMapping(value = "/list")
    public R list(String jsonStr) {
        Map<String, Object> map = JSON.parseObject(jsonStr);
        if (map.get("page") == null || map.get("limit") == null) {
            logger.error("error param" + jsonStr);
            return R.error("error param" + jsonStr);
        }
        Query query = new Query(map);
        List<NewsFlashBean> list = newsFlashService.queryList(query);
        int total = newsFlashService.queryTotal(query);
        PageUtils pageUtils = new PageUtils(list, total, query.getLimit(), query.getPage());
        return R.ok("success").put("data", pageUtils);
    }

    /**
     * 3.修改公告内容
     *
     * @param bean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(NewsFlashBean bean) {
        if (bean.getNews_id() == 0) {
            logger.error("error params" + JSON.toJSONString(bean));
            return R.error("error params" + JSON.toJSONString(bean));
        }
        boolean flag =  newsFlashService.update(bean);
        if (flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 4.查看公告详情
     * @param bean
     * @return
     */
    @RequestMapping(value = "/detail")
    public R detail(NewsFlashBean bean){
        if (bean.getNews_id() == 0 || bean == null){
            logger.error("param error"+bean.getNews_id());
            return R.error("param error"+bean.getNews_id());
        }
        NewsFlashBean newsFlashBean = newsFlashService.queryObject(bean);
        return R.ok("success").put("data",newsFlashBean);
    }

    /**
     * 查询所有新闻资讯
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping(value = "/lists")
    public R lists(int page , int limit){
        Map<String, Object> map = new HashMap<>();
        map.put("page" , page);
        map.put("limit" , limit);
        Query query = new Query(map);
        List<NewsFlashBean> newsFlashBeans = newsFlashService.lists(query);
        if(newsFlashBeans.size() > 0){
            int total = newsFlashService.listsTotal(query);
            return R.ok("success").put("data" , newsFlashBeans).put("count" , total);
        }
        return R.error("failed");
    }

    /**
     * 删除
     * @param news_id
     * @return
     */
    @RequestMapping(value = "/del")
    public R del(int news_id){
        if(news_id == 0){
            return R.error("param null");
        }
        boolean flag = newsFlashService.del(news_id);
        if(flag){
            return R.ok("success");
        }
        return R.error("failde");
    }
}
