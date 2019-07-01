package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.ComplexBean;
import com.axej.harlan.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface ComplexDao extends BaseDao<ComplexBean> {
    int remove(int synthetic_id);
}
