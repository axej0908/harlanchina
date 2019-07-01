package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsRole;
import com.axej.harlan.cms.dao.CmsRoleDao;
import com.axej.harlan.cms.dao.CmsRoleMenuDao;
import com.axej.harlan.common.utils.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:01 2018/3/16
 */
@Service
@Transactional
public class CmsRoleServiceImpl implements CmsRoleService {
    @Autowired
    private CmsRoleDao cmsRoleDao;
    @Autowired
    private CmsRoleMenuService cmsRoleMenuService;

    @Autowired
    private CmsRoleMenuDao cmsRoleMenuDao;

    @Override
    public boolean save(CmsRole cmsRole) {

        CmsRole cmsRole1 = cmsRoleDao.getName(cmsRole.getRole_name());
        if(cmsRole1 != null){
            return false;
        }
        //step1:save role
        int i = cmsRoleDao.save(cmsRole);
        if (i != 1) {
            return false;
        } else {
            //step2:saveOrUpdate relations of role-menu
            cmsRoleMenuService.saveOrUpdate(cmsRole.getRole_id(), cmsRole.getMenuIds());
        }
        return true;
    }

    @Override
    public List<CmsRole> list() {
        return cmsRoleDao.list();
    }

    @Override
    public List<CmsRole> queryList(Query query) {
        return cmsRoleDao.queryList(query);
    }

    @Override
    public int queryTotal() {
        return cmsRoleDao.queryTotal();
    }

    @Override
    public CmsRole queryMenuObject(Map<String, Object> map) {
        return cmsRoleDao.queryMenuObject(map);
    }

    @Override
    public boolean change(CmsRole cmsRole) {
        int i = cmsRoleMenuDao.delete(cmsRole.getRole_id());
        if(i > 0){
            cmsRoleMenuService.saveOrUpdate(cmsRole.getRole_id(), cmsRole.getMenuIds());
        }else {
            return false;
        }
        return true;
    }
}
