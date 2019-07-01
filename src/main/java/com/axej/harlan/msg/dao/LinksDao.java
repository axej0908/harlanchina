package com.axej.harlan.msg.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.msg.bean.LinksBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface LinksDao extends BaseDao<LinksBean>{
}
