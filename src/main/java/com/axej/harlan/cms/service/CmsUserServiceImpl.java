package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsRole;
import com.axej.harlan.cms.bean.CmsUser;
import com.axej.harlan.cms.bean.CmsUserRole;
import com.axej.harlan.cms.dao.CmsRoleDao;
import com.axej.harlan.cms.dao.CmsUserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 13:43 2018/3/16
 */
@Transactional
@Service
public class CmsUserServiceImpl implements CmsUserService {

    @Autowired
    private CmsUserDao cmsUserDao;
    @Autowired
    private CmsUserRoleService cmsUserRoleService;

    @Autowired
    private CmsRoleDao cmsRoleDao;

    @Override
    public CmsUser queryObject(CmsUser cmsUser) {
        return cmsUserDao.queryObject(cmsUser);
    }

    @Override
    public boolean save(CmsUser cmsUser) {
        CmsUser cmsUser1 = cmsUserDao.getName(cmsUser.getPrincipal());
        if(cmsUser1 != null){
            return false;
        }
        //step1:save user
        cmsUser.setCreate_time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        int i = cmsUserDao.save(cmsUser);
        if (i!=1){
            return false;
        }else {
            //step2:saveOrUpdate user-role relations
            CmsUserRole cmsUserRole = new CmsUserRole();
            //角色ID
            cmsUserRole.setRole_id(cmsUser.getRole_id());
            //用户ID
            cmsUserRole.setUser_id(cmsUser.getUser_id());
            cmsUserRoleService.saveOrUpdate(cmsUserRole);
        }
        return true;
    }

    @Override
    public boolean update(CmsUser cmsUser) {
        int i = cmsUserDao.update(cmsUser);
        return i > 0 ? true : false;
    }

    @Override
    public List<CmsUser> queryList(Map<String, Object> map) {
        return cmsUserDao.queryList(map);
    }

    @Override
    public int queryTotal(Map<String, Object> map) {
        return cmsUserDao.queryTotal(map);
    }

    @Override
    public int delete(int user_id) {
        return cmsUserDao.delete(user_id);
    }
}
