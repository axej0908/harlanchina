package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.MessageBean;
import com.axej.harlan.msg.bean.SysUserMessBean;
import com.axej.harlan.msg.dao.MessageDao;
import com.axej.harlan.msg.dao.SysUserMessDao;
import com.axej.harlan.user.bean.UserBean;
import com.axej.harlan.user.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class MessageServiceImpl implements MessageService{

    @Autowired
    private MessageDao messageDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private SysUserMessDao sysUserMessDao;

    @Override
    public boolean save(MessageBean messageBean) {
        messageBean.setCreate_time(ConcurrentDateUtils.format(new Date()));
        /**
         * 存储user_id
         * 供应商、采购商
         */
        Map<String, Object> map = new HashMap<>();

        int i = messageDao.save(messageBean);
        if(i > 0){
            map.put("seller", "seller");
            map.put("buyer", "buyer");
            List<UserBean> userBeans = userDao.queryEnList(map);
            SysUserMessBean sysUserMessBean = new SysUserMessBean();
            if(userBeans.size() > 0){
                for(UserBean userBean : userBeans){
                    sysUserMessBean.setMess_id(messageBean.getMess_id());
                    sysUserMessBean.setUser_id(userBean.getUser_id());
                    //默认
                    sysUserMessBean.setStatus("0");
                    sysUserMessDao.save(sysUserMessBean);
                }
                return true;
            }
            return false;
        }
        return false;
    }

    @Override
    public boolean edit(MessageBean messageBean) {
        int i = messageDao.update(messageBean);
        return i > 0 ? true : false;
    }

    @Override
    public boolean del(MessageBean messageBean) {
        int i  = messageDao.delete(messageBean);
        if(i > 0){
            SysUserMessBean sysUserMessBean = new SysUserMessBean();
            sysUserMessBean.setMess_id(messageBean.getMess_id());
            int j = sysUserMessDao.delete(sysUserMessBean);
            return j > 0 ? true : false;
        }
        return i > 0 ? true : false;
    }

    @Override
    public List<MessageBean> queryList(Query query) {
        return messageDao.queryList(query);
    }

    @Override
    public int queryTotal(Query query) {
        return messageDao.queryTotal(query);
    }

    @Override
    public List<MessageBean> queryByAll(Query query) {
        return messageDao.queryByAll(query);
    }

    @Override
    public int queryByTotal(Query query) {
        return messageDao.queryByTotal(query);
    }

    @Override
    public int queryUnreadNumber(Map<String, Object> map) {
        return messageDao.queryUnreadNumber(map);
    }
}
