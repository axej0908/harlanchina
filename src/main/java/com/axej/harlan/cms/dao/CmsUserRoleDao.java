package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.CmsUserRole;
import com.axej.harlan.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 14:17 2018/3/16
 */
@Repository
@Mapper
public interface CmsUserRoleDao extends BaseDao<CmsUserRole>{
}
