package com.axej.harlan.goods.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.goods.bean.ShopEnvBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @author: lava
 * date: 10:02 2018/5/23
 * created by: IntelliJ IDEA
 */
@Mapper
@Repository
public interface ShopEnvDao extends BaseDao<ShopEnvBean> {
}
