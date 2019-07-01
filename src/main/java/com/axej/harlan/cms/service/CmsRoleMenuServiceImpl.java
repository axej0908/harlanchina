package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsRoleMenu;
import com.axej.harlan.cms.dao.CmsRoleMenuDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:17 2018/3/16
 */
@Service
@Transactional
public class CmsRoleMenuServiceImpl implements CmsRoleMenuService{
    @Autowired
    private CmsRoleMenuDao cmsRoleMenuDao;

    @Override
    public void saveOrUpdate(int role_id, Integer[] menuIds) {
        //step1:delete relations of role-menu
        cmsRoleMenuDao.delete(role_id);

        //step2:save relations of role-menu
        Map<String,Object> map = new HashMap<>();
        map.put("role_id",role_id);
        map.put("menuIds",menuIds);
        cmsRoleMenuDao.save(map);
    }
}
