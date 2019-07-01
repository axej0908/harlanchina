package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.PriceBean;
import com.axej.harlan.msg.dao.PriceDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:11 2018/3/1
 */
@Service
@Transactional
public class PriceServiceImpl implements PriceService {
    @Autowired
    private PriceDao priceDao;

    @Override
    public boolean save(PriceBean priceBean) {
        return 1 == priceDao.save(priceBean);
    }

    @Override
    public List<PriceBean> queryList(Query query) {
        return priceDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return priceDao.queryTotal(query);
    }
}
