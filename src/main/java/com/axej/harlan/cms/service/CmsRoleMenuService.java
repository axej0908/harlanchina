package com.axej.harlan.cms.service;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:16 2018/3/16
 */
public interface CmsRoleMenuService {
    void saveOrUpdate(int role_id, Integer[] menuIds);
}
