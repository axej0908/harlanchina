package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsMenu;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:43 2018/3/19
 */
public interface CmsMenuService {
    List<CmsMenu> queryRecursion();

    List<CmsMenu> queryUserList(Map<String, Object> map);
}
