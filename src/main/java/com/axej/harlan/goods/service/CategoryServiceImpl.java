package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.CategoryBean;
import com.axej.harlan.goods.dao.CategoryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:28 2018/1/22
 */
@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryDao categoryDao;

    @Override
    public List<CategoryBean> queryOneTypes() {
        return categoryDao.queryListOneType();
    }

    @Override
    public List<CategoryBean> querySubListByPid(int parent_id) {
        return categoryDao.querySubListByPid(parent_id);
    }

    @Override
    public boolean save(CategoryBean categoryBean) {
        //???此处需要判断添加的类别不重复
        CategoryBean category = categoryDao.queryObject(categoryBean);
        if(category != null){
            return false;
        }else {
            List<CategoryBean> categoryBeans = categoryDao.querySubListByPid(categoryBean.getParent_id());
            if(categoryBeans.size() <= 0){
                categoryBean.setChecked(true);
            }
        }
        return 1==categoryDao.save(categoryBean);
    }

    @Override
    public List<CategoryBean> queryRecursionList() {
        //查询根分类
        List<CategoryBean> rootList = queryOneTypes();
        //递归查询子分类
        return getCategoryTree(rootList);
    }

    /**
     * 递归获取分类结构
     */
    private List<CategoryBean> getCategoryTree(List<CategoryBean> list){
        List<CategoryBean> subCateList = new ArrayList<>();

        if (list.size()<=0){
            return null;
        }
        for (CategoryBean bean : list){
            if (("1").equals(bean.getCate_type()) && bean.getParent_id()!=-1){
                bean.setList(getCategoryTree(querySubListByPid(bean.getCate_id())));
            }
            subCateList.add(bean);
        }
        return subCateList;
    }

    @Override
    public CategoryBean queryObject(CategoryBean categoryBean) {
        return categoryDao.queryObject(categoryBean);
    }

    @Override
    public List<CategoryBean> queryList(Query query) {
        return categoryDao.queryList(query);
    }

    @Override
    public int queryTotal() {
        return categoryDao.queryTotal();
    }

    @Override
    public boolean update(CategoryBean categoryBean) {
        int i = categoryDao.update(categoryBean);
        return i == 1 ? true : false;
    }
}
