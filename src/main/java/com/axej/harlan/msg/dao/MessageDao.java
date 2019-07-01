package com.axej.harlan.msg.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.MessageBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface MessageDao extends BaseDao<MessageBean> {

    List<MessageBean> queryByAll(Query query);
    int queryByTotal(Query query);

    int queryUnreadNumber(Map<String, Object> map);

}
