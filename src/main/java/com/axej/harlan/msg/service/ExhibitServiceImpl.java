package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.ExhibitBean;
import com.axej.harlan.msg.dao.ExhibitDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class ExhibitServiceImpl implements ExhibitService{

    @Autowired
    private ExhibitDao exhibitDao;

    @Override
    public boolean save(ExhibitBean exhibitBean) {
        exhibitBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        int i = exhibitDao.save(exhibitBean);
        return i == 1 ? true : false;
    }

    @Override
    public boolean delete(int exhibit_id) {
        int i = exhibitDao.delete(exhibit_id);
        return i == 1 ? true : false;
    }

    @Override
    public boolean update(ExhibitBean exhibitBean) {
        int i = exhibitDao.update(exhibitBean);
        return i == 1 ? true : false;
    }

    @Override
    public List<ExhibitBean> queryList(Query query) {
        return exhibitDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return exhibitDao.queryTotal(query);
    }

    @Override
    public ExhibitBean queryObject(ExhibitBean exhibitBean) {
        return exhibitDao.queryObject(exhibitBean);
    }
}
