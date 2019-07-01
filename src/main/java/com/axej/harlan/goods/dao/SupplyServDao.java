package com.axej.harlan.goods.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.goods.bean.SupplyServBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface SupplyServDao extends BaseDao<SupplyServBean> {
}
