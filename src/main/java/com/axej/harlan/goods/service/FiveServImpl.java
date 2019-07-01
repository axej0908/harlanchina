package com.axej.harlan.goods.service;

import com.axej.harlan.common.status.FiveSerCons;
import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.FiveServBean;
import com.axej.harlan.goods.dao.FiveServDao;
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
 * @Date: 10:30 2018/3/7
 */
@Service
@Transactional
public class FiveServImpl implements FiveServ {
    @Autowired
    private FiveServDao fiveServDao;
    @Override
    public boolean save(FiveServBean fiveServBean) {
        fiveServBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        fiveServBean.setAppl_status(FiveSerCons.ServiceStatus.SUSPEND.getVal());
        return 1==fiveServDao.save(fiveServBean);
    }

    @Override
    public List<FiveServBean> queryList(Query query) {
        return fiveServDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return fiveServDao.queryTotal(query);
    }

    @Override
    public int update(FiveServBean param) {
        return fiveServDao.update(param);
    }

    @Override
    public List<FiveServBean> per_queryList(Query query) {
        return fiveServDao.per_queryList(query);
    }
    @Override
    public int per_queryTotal(Query query) {
        return fiveServDao.per_queryTotal(query);
    }
}
