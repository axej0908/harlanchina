package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.SysMsgBean;
import org.omg.PortableInterceptor.LOCATION_FORWARD;

import java.util.List;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:10:00 2017/12/6
 */
public interface SysMsgService {
    List<SysMsgBean> queryList(Query query);

    int queryTotal(Query query);

    boolean save(SysMsgBean SysMsgBean);

    boolean delete(Long msg_id);
}
