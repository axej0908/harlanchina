package com.axej.harlan.goods.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.goods.bean.DangerBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface DangerDao extends BaseDao<DangerBean> {

    int queryExist(DangerBean dangerBean);

    List<DangerBean> queryEntire();
}
