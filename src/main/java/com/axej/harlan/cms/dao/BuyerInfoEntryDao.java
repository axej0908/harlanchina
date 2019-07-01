package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.BuyerInfoEntry;
import com.axej.harlan.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:02 2018/3/28
 */
@Repository
@Mapper
public interface BuyerInfoEntryDao extends BaseDao<BuyerInfoEntry> {
}
