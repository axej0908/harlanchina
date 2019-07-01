package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.SyntheticRouteBean;
import com.axej.harlan.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface SyntheticRouteDao extends BaseDao<SyntheticRouteBean> {
    int remove(int cpd_id);
}
