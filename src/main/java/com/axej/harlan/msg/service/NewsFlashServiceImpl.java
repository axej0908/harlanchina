package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.NewsFlashBean;
import com.axej.harlan.msg.dao.NewsFlashDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:14 2018/1/30
 */
@Service
@Transactional
public class NewsFlashServiceImpl implements NewsFlashService {
    @Autowired
    private NewsFlashDao newsFlashDao;

    @Override
    public boolean save(NewsFlashBean newsFlashBean) {
        //创建时间
        newsFlashBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        return 1 == newsFlashDao.save(newsFlashBean);
    }

    @Override
    public List<NewsFlashBean> queryList(Query query) {
        return newsFlashDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return newsFlashDao.queryTotal(query);
    }

    @Override
    public boolean update(NewsFlashBean bean) {
        return 1 == newsFlashDao.update(bean);
    }

    /**
     * 查看公告、快讯详情
     *
     * @param bean
     * @return
     */
    @Override
    public NewsFlashBean queryObject(NewsFlashBean bean) {
        //step1:查询详情
        NewsFlashBean newsFlashBean = newsFlashDao.queryObject(bean);
        //step2:更新阅读量
        int temp = newsFlashBean.getRead_times() + 1;
        newsFlashBean.setRead_times(temp);
        update(newsFlashBean);
        return newsFlashBean;
    }

    @Override
    public List<NewsFlashBean> lists(Query query) {
        return newsFlashDao.lists(query);
    }

    @Override
    public int listsTotal(Query query) {
        return newsFlashDao.listsTotal(query);
    }

    @Override
    public boolean del(int news_id) {
        int i = newsFlashDao.delete(news_id);
        return i == 1 ? true : false;
    }
}
