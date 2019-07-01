package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.SyntheticRouteBean;
import com.axej.harlan.cms.dao.SyntheticRouteDao;
import com.axej.harlan.common.utils.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SyntheticRouteServiceImpl implements SyntheticRouteService{

    @Autowired
    private SyntheticRouteDao syntheticRouteDao;

    @Override
    public boolean save(SyntheticRouteBean syntheticRouteBean) {
        int i = syntheticRouteDao.save(syntheticRouteBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean update(SyntheticRouteBean syntheticRouteBean) {
        int i = syntheticRouteDao.update(syntheticRouteBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean delete(int synthetic_id) {
        int i = syntheticRouteDao.delete(synthetic_id);
        return i > 0 ? true : false;
    }

    @Override
    public List<SyntheticRouteBean> queryList(Query query) {
        return syntheticRouteDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return syntheticRouteDao.queryTotal(query);
    }

    @Override
    public SyntheticRouteBean queryObject(int synthetic_id) {
        return syntheticRouteDao.queryObject(synthetic_id);
    }
}
