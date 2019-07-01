package com.axej.harlan.goods.service;

import com.axej.harlan.common.status.FiveSerCons;
import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.SupplyServBean;
import com.axej.harlan.goods.dao.SupplyServDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class SupplyServServiceImpl implements SupplyServService{

    @Autowired
    private SupplyServDao supplyServDao;

    @Override
    public boolean save(SupplyServBean supplyServBean) {
        supplyServBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        supplyServBean.setSupply_state(FiveSerCons.ServiceStatus.SUSPEND.getVal());
        int i = supplyServDao.save(supplyServBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean update(SupplyServBean supplyServBean) {
        int i = supplyServDao.update(supplyServBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean delete(int supply_id) {
        int i = supplyServDao.delete(supply_id);
        return i > 0 ? true : false;
    }

    @Override
    public List<SupplyServBean> queryList(Query query) {
        return supplyServDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return supplyServDao.queryTotal(query);
    }

    @Override
    public SupplyServBean queryObject(int supply_id) {
        return supplyServDao.queryObject(supply_id);
    }
}
