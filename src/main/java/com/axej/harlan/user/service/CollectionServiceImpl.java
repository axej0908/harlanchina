package com.axej.harlan.user.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.user.bean.CollectionBean;
import com.axej.harlan.user.dao.CollectionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:23 2018/1/29
 */
@Service
@Transactional
public class CollectionServiceImpl implements CollectionService {
    @Autowired
    private CollectionDao collectionDao;

    @Override
    public boolean save(CollectionBean collectionBean) {
        return 1 == collectionDao.save(collectionBean);
    }

    @Override
    public List<CollectionBean> queryList(Query query) {
        return collectionDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return collectionDao.queryTotal(query);
    }

    @Override
    public boolean delete(Integer col_id) {
        return 1 == collectionDao.delete(col_id);
    }
}
