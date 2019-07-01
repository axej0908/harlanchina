package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.ShopEnvBean;
import com.axej.harlan.goods.dao.ShopEnvDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author: lava
 * date: 10:13 2018/5/23
 * created by: IntelliJ IDEA
 */
@Service
@Transactional
public class ShopEnvServiceImpl implements ShopEnvService {

    @Autowired
    private ShopEnvDao shopEnvDao;

    @Override
    public void save(ShopEnvBean bean) {
        shopEnvDao.save(bean);
    }

    @Override
    public void delete(int env_id) {
        shopEnvDao.delete(env_id);
    }

    @Override
    public void update(ShopEnvBean bean) {
        shopEnvDao.update(bean);
    }

    @Override
    public List<ShopEnvBean> queryList(Query query) {
        return shopEnvDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return shopEnvDao.queryTotal(query);
    }
}
