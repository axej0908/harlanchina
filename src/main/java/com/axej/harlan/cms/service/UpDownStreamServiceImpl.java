package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.UpDownStreamBean;
import com.axej.harlan.cms.dao.UpDownStreamDao;
import com.axej.harlan.common.utils.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UpDownStreamServiceImpl implements UpDownStreamService{

    @Autowired
    private UpDownStreamDao upDownStreamDao;

    @Override
    public boolean save(UpDownStreamBean upDownStreamBean) {
        int i = upDownStreamDao.save(upDownStreamBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean update(UpDownStreamBean upDownStreamBean) {
        int i = upDownStreamDao.update(upDownStreamBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean delete(int updown_id) {
        int i = upDownStreamDao.delete(updown_id);
        return i > 0 ? true : false;
    }

    @Override
    public List<UpDownStreamBean> queryList(Query query) {
        return upDownStreamDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return upDownStreamDao.queryTotal(query);
    }

    @Override
    public UpDownStreamBean queryObject(int updown_id) {
        return upDownStreamDao.queryObject(updown_id);
    }
}
