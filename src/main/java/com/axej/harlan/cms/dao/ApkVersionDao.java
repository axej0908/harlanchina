package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.ApkVersionBean;
import com.axej.harlan.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface ApkVersionDao extends BaseDao<ApkVersionBean> {

    ApkVersionBean get();
}
