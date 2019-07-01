package com.axej.harlan.cms.bean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 10:32 2018/3/16
 */
public class CmsRole {
    private int role_id;
    private String role_name;

    private Integer[] menuIds;


    List<CmsMenu> cmsMenus;

    public Integer[] getMenuIds() {
        return menuIds;
    }

    public void setMenuIds(Integer[] menuIds) {
        this.menuIds = menuIds;
    }

    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public String getRole_name() {
        return role_name;
    }

    public void setRole_name(String role_name) {
        this.role_name = role_name;
    }

    public List<CmsMenu> getCmsMenus() {
        return cmsMenus;
    }

    public void setCmsMenus(List<CmsMenu> cmsMenus) {
        this.cmsMenus = cmsMenus;
    }
}
