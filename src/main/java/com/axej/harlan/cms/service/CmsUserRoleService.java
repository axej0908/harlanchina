package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsUserRole;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 14:38 2018/3/16
 */
public interface CmsUserRoleService {
    /*void saveOrUpdate(int user_id,Integer[] roleIds);*/
    void saveOrUpdate(CmsUserRole cmsUserRole);
}
