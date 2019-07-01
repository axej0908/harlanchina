package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.CmsRole;
import com.axej.harlan.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:10 2018/3/16
 */
@Repository
@Mapper
public interface CmsRoleDao extends BaseDao<CmsRole> {

    CmsRole getName(String role_name);

    List<CmsRole> list();

    CmsRole queryMenuObject(Map<String, Object> map);
}
