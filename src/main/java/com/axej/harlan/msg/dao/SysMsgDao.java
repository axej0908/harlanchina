package com.axej.harlan.msg.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.msg.bean.SysMsgBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface SysMsgDao extends BaseDao<SysMsgBean>{
}
