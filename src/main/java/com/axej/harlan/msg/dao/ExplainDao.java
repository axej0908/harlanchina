package com.axej.harlan.msg.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.msg.bean.ExplainBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface ExplainDao extends BaseDao<ExplainBean> {

    ExplainBean queryObject(@Param("explain_id") int explain_id);
}
