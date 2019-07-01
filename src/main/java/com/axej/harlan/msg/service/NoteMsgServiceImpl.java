package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.NoteMsgBean;
import com.axej.harlan.msg.dao.NoteMsgDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Description:通知消息
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:10:14 2017/12/6
 */
@Service
@Transactional
public class NoteMsgServiceImpl implements NoteMsgService {

    @Autowired
    private NoteMsgDao noteMsgDao;

    @Override
    public List<NoteMsgBean> queryList(Query query) {
        return noteMsgDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return noteMsgDao.queryTotal(query);
    }

    @Override
    public boolean save(NoteMsgBean noteMsgBean) {
        int i =  noteMsgDao.save(noteMsgBean);
        return i == 1 ? true : false;
    }
}
