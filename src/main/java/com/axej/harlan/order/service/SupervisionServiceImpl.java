package com.axej.harlan.order.service;

import com.axej.harlan.order.bean.LogisticsBean;
import com.axej.harlan.order.bean.SupervisionBean;
import com.axej.harlan.order.dao.LogisticsDao;
import com.axej.harlan.order.dao.SupervisionDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Description:免费监理
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:17:25 2017/12/15
 */
@Service
public class SupervisionServiceImpl implements SupervisionService {
    private static final Logger logger = LoggerFactory.getLogger(SupervisionServiceImpl.class);
    @Autowired
    private SupervisionDao supervisionDao;
    @Autowired
    private LogisticsDao logisticsDao;

    @Override
    public boolean save(SupervisionBean supervisionBean) {
        //step1:保存列表物流信息
        List<LogisticsBean> logisticsBeans = supervisionBean.getLogisticsBeans();
        if (logisticsBeans != null && logisticsBeans.size() != 0){
            for (LogisticsBean item:logisticsBeans) {
                int i = logisticsDao.save(item);
                if (i != 1){
                    logger.error("保存物流信息出错"+item.toString());
                    return false;
                }
            }
        }
        //step2:保存 监理人电话以及运单编号
        int i = supervisionDao.save(supervisionBean);
        return i == 1 ? true : false;
    }

    @Override
    public SupervisionBean queryObject(SupervisionBean supervisionBean) {
        return supervisionDao.queryObject(supervisionBean);
    }
}
