package com.axej.harlan.order.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.order.bean.DetectionBean;
import com.axej.harlan.order.dao.DetectionDao;
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
 * @Date: 15:23 2017/12/23
 */
@Service
@Transactional
public class DetectionServiceImpl implements DetectionService {
    @Autowired
    private DetectionDao detectionDao;
    @Override
    public boolean save(DetectionBean detectionBean) {
        //提交时间
        detectionBean.setSubmit_time(ConcurrentDateUtils.format(new Date()));
        return detectionDao.save(detectionBean)==1;
    }

    @Override
    public List<DetectionBean> queryList(Query query) {
        return detectionDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return detectionDao.queryTotal(query);
    }
}
