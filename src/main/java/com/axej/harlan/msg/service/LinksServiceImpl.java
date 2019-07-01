package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.LinksBean;
import com.axej.harlan.msg.dao.LinksDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class LinksServiceImpl implements LinksService{

    @Autowired
    private LinksDao linksDao;

    @Override
    public boolean save(LinksBean linksBean) {
        linksBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        int i = linksDao.save(linksBean);
        return i == 1 ? true : false;
    }

    @Override
    public boolean update(LinksBean linksBean) {
        linksBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        int i = linksDao.update(linksBean);
        return i == 1 ? true : false;
    }

    @Override
    public boolean delete(int links_id) {
        int i = linksDao.delete(links_id);
        return i == 1 ? true : false;
    }

    @Override
    public List<LinksBean> queryList(Query query) {
        return linksDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return linksDao.queryTotal(query);
    }

    @Override
    public LinksBean queryObject(int links_id) {
        return linksDao.queryObject(links_id);
    }
}
