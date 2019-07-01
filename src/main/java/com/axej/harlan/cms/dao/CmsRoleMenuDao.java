package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.CmsRoleMenu;
import com.axej.harlan.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:19 2018/3/16
 */
@Repository
@Mapper
public interface CmsRoleMenuDao extends BaseDao<CmsRoleMenu> {
}
