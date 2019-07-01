package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsUser;

import java.util.List;
import java.util.Map; /**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 13:42 2018/3/16
 */
public interface CmsUserService {
    CmsUser queryObject(CmsUser cmsUser);

    boolean save(CmsUser cmsUser);

    boolean update(CmsUser cmsUser);

    List<CmsUser> queryList(Map<String, Object> map);

    int queryTotal(Map<String, Object> map);

    int delete(int user_id);
}
