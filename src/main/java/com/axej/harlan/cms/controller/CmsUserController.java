package com.axej.harlan.cms.controller;

import com.axej.harlan.cms.bean.CmsUser;
import com.axej.harlan.cms.service.CmsUserService;
import com.axej.harlan.common.utils.L;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.user.bean.UserBean;
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
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:29 2018/3/16
 */
@RestController
@RequestMapping(value = "/cmsUser")
public class CmsUserController {

    @Autowired
    private CmsUserService cmsUserService;

    /**
     * 4.delete obj
     * param:user_id
     */
    @RequestMapping(value = "/delete")
    public R delete(int user_id) {
        if (user_id == 0) {
            return R.error("param error");
        }
        int i = cmsUserService.delete(user_id);
        if (i==1){
            return R.ok();
        }else {
            return R.error();
        }
    }

    /**
     * 1.login
     *
     * @param cmsUser principal,credentials
     * @return
     */
    @RequestMapping(value = "/login")
    public R login(CmsUser cmsUser, HttpServletRequest request) {
        if (StringUtils.isEmpty(cmsUser.getPrincipal()) || StringUtils.isEmpty(cmsUser.getCredentials())) {
            return R.error("null param");
        }
        CmsUser dbCms = cmsUserService.queryObject(cmsUser);
        if (dbCms != null && dbCms.getCredentials().equals(cmsUser.getCredentials())) {
            //session
            request.getSession().setAttribute("users", dbCms);
            return R.ok().put("data", dbCms);
        } else {
            return R.error();
        }
    }


    /**
     * 2.save
     *
     * @param cmsUser
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(CmsUser cmsUser) {
        if (cmsUser == null) {
            return R.error("null param");
        }
        boolean flag = cmsUserService.save(cmsUser);
        if (flag) {
            return R.ok();
        } else {
            return R.error();
        }
    }


    /**
     * 修改密码
     * @param cmsUser
     * @return
     */
    @RequestMapping(value = "edit")
    public R edit(CmsUser cmsUser){
        if(cmsUser.getUser_id() == 0){
            return R.error("null param");
        }
        boolean flag = cmsUserService.update(cmsUser);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 3.query pager
     * <p>
     * page
     * limit
     *
     * @return
     */
    @RequestMapping(value = "/pager")
    public L queryPager(int page, int limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<CmsUser> list = cmsUserService.queryList(query);
        int total = cmsUserService.queryTotal(query);
        return L.ok(total, list);
    }

    /**
     * 获取当前后台登录人的信息
     *
     * @Method: currentUser
     * @Param [request]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 9:26 2018/6/20
     */
    @RequestMapping(value = "/currentUser")
    public R currentUser(HttpServletRequest request) {
        CmsUser cmsUser = (CmsUser) request.getSession().getAttribute("users");
        if(cmsUser != null){
            return R.ok().put("data", cmsUser);
        }else {
            return R.error("user is empty");
        }
    }

    /**
     * 管理后台退出登录
     * @param request
     */
    @RequestMapping(value = "logout")
    public R logout(HttpServletRequest request){
        request.getSession().removeAttribute("users");
        request.getSession().invalidate();
        CmsUser cmsUser = (CmsUser) request.getSession().getAttribute("users");
        if(cmsUser == null){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }
}
