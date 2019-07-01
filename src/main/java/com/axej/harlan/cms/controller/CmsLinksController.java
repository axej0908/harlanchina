package com.axej.harlan.cms.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.LinksBean;
import com.axej.harlan.msg.service.LinksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：友情链接
 * Package com.axej.harlan.cms.controller
 * Class CmsLinksController
 * Aauthor：Ning
 * Date：10:18 2019/1/26
 */
@RestController
@RequestMapping(value = "/cmsLinks")
public class CmsLinksController extends AbstractController {

    @Autowired
    private LinksService linksService;

    /**
     * 保存
     * @param linksBean
     * @return
     */
    @RequestMapping(value = "save")
    public R save(LinksBean linksBean){
        if(linksBean == null){
            logger.error("null param" + JSON.toJSONString(linksBean));
            return R.error("null param");
        }
        boolean flag = linksService.save(linksBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

    /**
     * 删除
     * @param links_id
     * @return
     */
    @RequestMapping(value = "del")
    public R del(int links_id){
        if(links_id == 0){
            logger.error("null param" + JSON.toJSONString(links_id));
            return R.error("null param");
        }
        boolean flag = linksService.delete(links_id);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 修改&编辑
     * @param linksBean
     * @return
     */
    @RequestMapping(value = "edit")
    public R edit(LinksBean linksBean){
        if(linksBean == null){
            logger.error("null param" + JSON.toJSONString(linksBean));
            return R.error("null param");
        }
        boolean flag = linksService.update(linksBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

    @RequestMapping(value = "pager")
    public R pager(String links_type, int page, int limit, Map<String, Object> map){
        if(page == 0 || limit == 0){
            return R.error("null param");
        }
        map.put("page", page);
        map.put("limit", limit);
        map.put("links_type", links_type);
        Query query = new Query(map);
        List<LinksBean> linksBeans = linksService.queryList(query);
        int total = linksService.queryTotal(query);
        return R.ok().put("data", linksBeans).put("count", total);
    }
}
