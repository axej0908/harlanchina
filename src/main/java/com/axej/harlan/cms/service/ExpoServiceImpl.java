package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.ExpoBean;
import com.axej.harlan.cms.dao.ExpoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:55 2018/3/21
 */
@Service
@Transactional
public class ExpoServiceImpl implements ExpoService {

    @Autowired
    private ExpoDao expoDao;

    @Override
    public int save(ExpoBean expoBean) {
        return expoDao.save(expoBean);
    }

    @Override
    public int update(ExpoBean expoBean) {
        return expoDao.update(expoBean);
    }

    @Override
    public List<ExpoBean> queryList(Map<String, Object> map) {
        return expoDao.queryList(map);
    }

    @Override
    public ExpoBean queryObject(ExpoBean bean) {
        return expoDao.queryObject(bean);
    }
}
