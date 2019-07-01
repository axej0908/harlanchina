package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsRole;
import com.axej.harlan.common.utils.Query;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:01 2018/3/16
 */
public interface CmsRoleService {
    boolean save(CmsRole cmsRole);

    List<CmsRole> list();

    List<CmsRole> queryList(Query query);
    int queryTotal();

    CmsRole queryMenuObject(Map<String, Object> map);

    boolean change(CmsRole cmsRole);
}
