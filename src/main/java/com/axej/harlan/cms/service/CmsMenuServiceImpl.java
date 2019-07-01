package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsMenu;
import com.axej.harlan.cms.dao.CmsMenuDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:43 2018/3/19
 */
@Service
@Transactional
public class CmsMenuServiceImpl implements CmsMenuService {

    @Autowired
    private CmsMenuDao cmsMenuDao;

    @Override
    public List<CmsMenu> queryRecursion() {
        //step1:query root list
        Map<String, Object> map = new HashMap<>();
        map.put("type", "1");
        List<CmsMenu> rootList = cmsMenuDao.queryList(map);

        //step2:recursion
        return getDeepTreeMenu(rootList);
    }


    @Override
    public List<CmsMenu> queryUserList(Map<String, Object> map) {
        List<CmsMenu> cmsMenus = cmsMenuDao.queryUserList(map);
        return getDeepTreeMenu(cmsMenus);
    }

    /**
     * 1.recursion
     *
     * @param list
     * @return
     */
    private List<CmsMenu> getDeepTreeMenu(List<CmsMenu> list) {
        //step1:preparation
        if (list.size() == 0) {
            return null;
        }
        List<CmsMenu> resList = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();

        //step2:deep search
        for (CmsMenu cmsMenu : list) {
            map.put("pub_id",cmsMenu.getMenu_id());
            cmsMenu.setChildren(getDeepTreeMenu(cmsMenuDao.queryList(map)));
            resList.add(cmsMenu);
        }
        return resList;
    }
}
