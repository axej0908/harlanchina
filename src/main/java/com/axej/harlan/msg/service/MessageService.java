package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.MessageBean;

import java.util.List;
import java.util.Map;

public interface MessageService {

    boolean save(MessageBean messageBean);

    boolean edit(MessageBean messageBean);

    boolean del(MessageBean messageBean);

    List<MessageBean> queryList(Query query);
    int queryTotal(Query query);

    List<MessageBean> queryByAll(Query query);
    int queryByTotal(Query query);

    int queryUnreadNumber(Map<String, Object> map);
}
