package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.NoteMsgBean;

import java.util.List;

/**
 * Description:通知消息
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:10:13 2017/12/6
 */
public interface NoteMsgService {
    List<NoteMsgBean> queryList(Query query);

    int queryTotal(Query query);

    boolean save(NoteMsgBean noteMsgBean);
}
