package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.CmsUser;
import com.axej.harlan.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:14 2018/3/16
 */
@Repository
@Mapper
public interface CmsUserDao extends BaseDao<CmsUser>{

    CmsUser getName(String principal);
}
