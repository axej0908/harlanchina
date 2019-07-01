package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.ComplexBean;
import com.axej.harlan.cms.dao.ComplexDao;
import com.axej.harlan.common.utils.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ComplexServiceImpl implements ComplexService{
    @Autowired
    private ComplexDao complexDao;

    @Override
    public boolean save(ComplexBean complexBean) {
        int i = complexDao.save(complexBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean update(ComplexBean complexBean) {
        int i = complexDao.update(complexBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean delete(int complex_id) {
        int i = complexDao.delete(complex_id);
        return i > 0 ? true : false;
    }

    @Override
    public List<ComplexBean> queryList(Query query) {
        return complexDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return complexDao.queryTotal(query);
    }
}
