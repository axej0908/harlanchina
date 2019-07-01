package com.axej.harlan.cms.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.cms.bean.CmsMenu;
import com.axej.harlan.cms.bean.CmsUser;
import com.axej.harlan.cms.service.CmsMenuService;
import com.axej.harlan.common.utils.R;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: menus
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:40 2018/3/19
 */
@RestController
@RequestMapping(value = "/cmsMenu")
public class CmsMenuController {

    @Autowired
    private CmsMenuService cmsMenuService;

    /**
     * 1.recursion all menus
     *
     * @return
     */
    @RequestMapping(value = "/recursion")
    public List<CmsMenu> recursion(){

        List<CmsMenu> list = cmsMenuService.queryRecursion();
        return list;
    }

    /**
     * 查询管理员权限
     * @param map
     * @param request
     * @return
     */
    @RequestMapping(value = "/queryUserMenu")
    public List<CmsMenu> queryUserList(Map<String, Object> map, HttpServletRequest request){
        CmsUser cmsUser = (CmsUser) request.getSession().getAttribute("users");
        if(cmsUser != null){
            map.put("user_id", cmsUser.getUser_id());
        }
        List<CmsMenu> cmsMenus = cmsMenuService.queryUserList(map);
        return cmsMenus;
    }
}