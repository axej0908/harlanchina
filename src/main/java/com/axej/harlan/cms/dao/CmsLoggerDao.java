package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.CmsLoggerBean;
import com.axej.harlan.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface CmsLoggerDao extends BaseDao<CmsLoggerBean> {
}
