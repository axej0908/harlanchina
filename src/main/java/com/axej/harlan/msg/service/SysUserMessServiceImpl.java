package com.axej.harlan.msg.service;

import com.axej.harlan.msg.bean.SysUserMessBean;
import com.axej.harlan.msg.dao.SysUserMessDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SysUserMessServiceImpl implements SysUserMessService{

    @Autowired
    private SysUserMessDao sysUserMessDao;

    @Override
    public boolean edit(SysUserMessBean sysUserMessBean) {
        int i = sysUserMessDao.update(sysUserMessBean);
        return i > 0 ? true : false;
    }
}
