package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsUserRole;
import com.axej.harlan.cms.dao.CmsUserRoleDao;
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
 * @Date: 14:39 2018/3/16
 */
@Service
@Transactional
public class CmsUserRoleServiceImpl implements CmsUserRoleService{

    @Autowired
    private CmsUserRoleDao cmsUserRoleDao;


    /*@Override
    public void saveOrUpdate(int user_id, Integer[] roleIds) {
        //step1:delete relations of user and role
        cmsUserRoleDao.delete(user_id);

        //step2:save relations of user and role
        Map<String,Object> map = new HashMap<>();
        map.put("user_id",user_id);
        map.put("roleIds",roleIds);
        cmsUserRoleDao.save(map);
    }*/

    @Override
    public void saveOrUpdate(CmsUserRole cmsUserRole) {
        //step1:delete relations of user and role
        cmsUserRoleDao.delete(cmsUserRole.getUser_id());

        //step2:save relations of user and role
        cmsUserRoleDao.save(cmsUserRole);
    }
}
