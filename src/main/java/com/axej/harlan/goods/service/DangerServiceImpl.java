package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.DangerBean;
import com.axej.harlan.goods.dao.DangerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DangerServiceImpl implements DangerService{

    @Autowired
    private DangerDao dangerDao;

    @Override
    public boolean save(DangerBean dangerBean) {
        int i = dangerDao.save(dangerBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean delete(int danger_id) {
        int i = dangerDao.delete(danger_id);
        return i == 1 ? true : false;
    }

    @Override
    public boolean queryExist(DangerBean dangerBean) {
        int i = dangerDao.queryExist(dangerBean);
        return i > 0 ? true : false;
    }

    @Override
    public List<DangerBean> queryList(Query query) {
        return dangerDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return dangerDao.queryTotal(query);
    }


}
