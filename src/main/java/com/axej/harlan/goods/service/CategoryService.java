package com.axej.harlan.goods.service;


import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.CategoryBean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:28 2018/1/22
 */
public interface CategoryService {
    List<CategoryBean> queryOneTypes();

    List<CategoryBean> querySubListByPid(int parent_id);

    boolean save(CategoryBean categoryBean);

    List<CategoryBean> queryRecursionList();

    CategoryBean queryObject(CategoryBean categoryBean);

    List<CategoryBean> queryList(Query query);
    int queryTotal();

    boolean update(CategoryBean categoryBean);
}
