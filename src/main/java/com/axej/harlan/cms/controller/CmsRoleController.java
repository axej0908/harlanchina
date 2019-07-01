package com.axej.harlan.cms.controller;

import com.axej.harlan.cms.bean.CmsRole;
import com.axej.harlan.cms.service.CmsRoleService;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:55 2018/3/16
 */
@RestController
@RequestMapping(value = "/cmsRole")
public class CmsRoleController {

    @Autowired
    private CmsRoleService cmsRoleService;
    /**
     * 1.save
     * @param cmsRole
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(CmsRole cmsRole){
        if (StringUtils.isEmpty(cmsRole.getRole_name())){
            return R.error("empty role name");
        }
        boolean flag = cmsRoleService.save(cmsRole);
        if (flag){
            return R.ok();
        }else {
            return R.error();
        }
    }

    /**
     * 所有角色名称
     *
     * @Method: list
     * @Param []
     * @Return com.axej.harlan.common.utils.R
     * @Date: 10:57 2018/7/19
     */
    @RequestMapping({"/list"})
    public R list(){
        List<CmsRole> cmsRoleList = cmsRoleService.list();
        return R.ok("success").put("data" , cmsRoleList);
    }


    /**
     * 全部角色
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "pager")
    public R pager(int page, int limit, Map<String, Object> map){
        if(page == 0 || limit == 0){
            return R.error("null param");
        }
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<CmsRole> cmsRoles = cmsRoleService.queryList(query);
        int total = cmsRoleService.queryTotal();
        return R.ok().put("data", cmsRoles).put("count", total);
    }


    /**
     * 角色及权限
     * @param role_id
     * @param map
     * @return
     */
    @RequestMapping(value = "queryMenuObject")
    public R queryMenuObject(int role_id, Map<String, Object> map){
        if(role_id == 0){
            return R.error("null param");
        }
        map.put("role_id", role_id);
        CmsRole cmsRole = cmsRoleService.queryMenuObject(map);
        return R.ok().put("data", cmsRole);
    }


    /**
     * 修改权限
     * @param cmsRole
     * @return
     */
    @RequestMapping(value = "change")
    public R change(CmsRole cmsRole){
        if (cmsRole.getRole_id() == 0){
            return R.error("null param");
        }
        boolean flag = cmsRoleService.change(cmsRole);
        if (flag){
            return R.ok();
        }else {
            return R.error();
        }
    }
}
