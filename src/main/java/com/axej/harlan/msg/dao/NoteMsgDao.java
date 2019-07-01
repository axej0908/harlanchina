package com.axej.harlan.msg.dao;
import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.msg.bean.NoteMsgBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface NoteMsgDao extends BaseDao<NoteMsgBean>{
}
