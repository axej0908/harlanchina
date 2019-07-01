package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.ApkVersionBean;
import com.axej.harlan.cms.dao.ApkVersionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@Transactional
public class ApkVersionServiceImpl implements ApkVersionService{
    @Autowired
    private ApkVersionDao apkVersionDao;

    @Override
    public boolean save(ApkVersionBean apkVersionBean) {
        //版本更新时间
        apkVersionBean.setApk_time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        int i = apkVersionDao.save(apkVersionBean);
        return i == 1 ? true : false;
    }

    @Override
    public boolean alter(ApkVersionBean apkVersionBean) {
        //版本更新时间
        apkVersionBean.setApk_time(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        int i = apkVersionDao.update(apkVersionBean);
        return i == 1 ? true : false;
    }

    @Override
    public ApkVersionBean get() {
        return apkVersionDao.get();
    }
}
