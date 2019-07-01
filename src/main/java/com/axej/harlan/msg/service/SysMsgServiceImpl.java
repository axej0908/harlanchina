package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.SysMsgBean;
import com.axej.harlan.msg.dao.SysMsgDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Description:
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:10:00 2017/12/6
 */
@Service
@Transactional
public class SysMsgServiceImpl implements SysMsgService {

    @Autowired
    private SysMsgDao sysMsgDao;

    @Override
    public List<SysMsgBean> queryList(Query query) {
        return sysMsgDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return sysMsgDao.queryTotal(query);
    }

    @Override
    public boolean save(SysMsgBean sysMsgBean) {
        sysMsgBean.setMsg_time(ConcurrentDateUtils.format(new Date()));
        int i =  sysMsgDao.save(sysMsgBean);
        return  (i == 1) ? true : false;
    }

    @Override
    public boolean delete(Long msg_id) {
        int i = sysMsgDao.delete(msg_id);
        return i == 1 ? true : false;
    }
}
