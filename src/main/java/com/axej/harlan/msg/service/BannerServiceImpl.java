package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.BannerBean;
import com.axej.harlan.msg.dao.BannerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:03 2018/3/2
 */
@Service
@Transactional
public class BannerServiceImpl implements BannerService {

    @Autowired
    private BannerDao bannerDao;

    @Override
    public boolean save(BannerBean bannerBean) {
        bannerBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        return 1 == bannerDao.save(bannerBean);
    }

    @Override
    public List<BannerBean> queryList(Query query) {
        return bannerDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return bannerDao.queryTotal(query);
    }

    @Override
    public int update(BannerBean bannerBean) {
        return bannerDao.update(bannerBean);
    }

    @Override
    public BannerBean queryObject(BannerBean bannerBean) {
        return bannerDao.queryObject(bannerBean);
    }

    @Override
    public boolean delete(int banner_id) {
        int i = bannerDao.delete(banner_id);
        return i == 1 ? true : false;
    }
}
