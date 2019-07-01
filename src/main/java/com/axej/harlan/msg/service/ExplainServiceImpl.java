package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.ExplainBean;
import com.axej.harlan.msg.dao.ExplainDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class ExplainServiceImpl implements ExplainService{

    @Autowired
    private ExplainDao explainDao;

    @Override
    public boolean save(ExplainBean explainBean) {
        int i = explainDao.save(explainBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean edit(ExplainBean explainBean) {
        int i = explainDao.update(explainBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean del(ExplainBean explainBean) {
        int i = explainDao.delete(explainBean);
        return i > 0 ? true : false;
    }

    @Override
    public ExplainBean queryObject(int explain_id) {
        return explainDao.queryObject(explain_id);
    }

    @Override
    public List<ExplainBean> queryList(Query query) {
        return explainDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return explainDao.queryTotal(query);
    }
}
