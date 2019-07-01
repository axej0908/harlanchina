package com.axej.harlan.user.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.user.bean.CpvcBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 14:34 2018/3/29
 */
@Repository
@Mapper
public interface CpvcDao extends BaseDao<CpvcBean> {
}
