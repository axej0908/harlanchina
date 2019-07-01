package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.CompoundBean;
import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.common.utils.Query;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface CompoundDao extends BaseDao<CompoundBean> {

    List<CompoundBean> gather();

}
