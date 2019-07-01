package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.TarEnquiryBean;
import com.axej.harlan.goods.dao.TarEnquiryDao;
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
 * @Date: 10:24 2018/3/28
 */
@Service
@Transactional
public class TarEnquiryServiceImpl implements TarEnquiryService {

    @Autowired
    private TarEnquiryDao tarEnquiryDao;

    @Override
    public int save(TarEnquiryBean tarEnquiryBean) {
        tarEnquiryBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        tarEnquiryBean.setTar_status("-1");
        return tarEnquiryDao.save(tarEnquiryBean);
    }

    @Override
    public List<TarEnquiryBean> queryList(Query query) {
        return tarEnquiryDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return tarEnquiryDao.queryTotal(query);
    }

    @Override
    public TarEnquiryBean queryObject(int en_id) {
        return tarEnquiryDao.queryObject(en_id);
    }

    @Override
    public int upate(TarEnquiryBean bean) {
        return tarEnquiryDao.update(bean);
    }

    @Override
    public List<TarEnquiryBean> queryZhList(Query query) {
        return tarEnquiryDao.queryZhList(query);
    }

    @Override
    public int queryZhTotal(Query query) {
        return tarEnquiryDao.queryZhTotal(query);
    }

    @Override
    public List<TarEnquiryBean> back_queryList(Query query) {
        return tarEnquiryDao.back_queryList(query);
    }
    @Override
    public int back_queryTotal(Query query) {
        return tarEnquiryDao.back_queryTotal(query);
    }
}
