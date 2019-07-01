package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.FindGoodsBean;
import com.axej.harlan.goods.dao.FindGoodsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @author: lava
 * date: 10:13 2018/5/23
 * created by: IntelliJ IDEA
 */
@Service
@Transactional
public class FindGoodsServiceImpl implements FindGoodsService {

    @Autowired
    private FindGoodsDao findGoodsDao;


    @Override
    public int save(FindGoodsBean bean) {
        bean.setGoods_state("await");
        bean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        return findGoodsDao.save(bean);
    }

    @Override
    public FindGoodsBean queryObject(int goods_id) {
        return findGoodsDao.queryObject(goods_id);
    }

    @Override
    public int delete(int goods_id) {
        return findGoodsDao.delete(goods_id);
    }

    @Override
    public int update(FindGoodsBean bean) {
        return findGoodsDao.update(bean);
    }

    @Override
    public List<FindGoodsBean> queryList(Query query) {
        return findGoodsDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return findGoodsDao.queryTotal();
    }

    @Override
    public FindGoodsBean queryInquiryObject(int goods_id) {
        return findGoodsDao.queryInquiryObject(goods_id);
    }

    @Override
    public List<FindGoodsBean> queryInquiryList(Query query) {
        return findGoodsDao.queryInquiryList(query);
    }

    @Override
    public int queryInquiryTotal(Query query) {
        return findGoodsDao.queryInquiryTotal(query);
    }
}
