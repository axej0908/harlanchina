package com.axej.harlan.goods.controller;

import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.CategoryBean;
import com.axej.harlan.goods.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description: 商品分类
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:27 2018/1/22
 */
@RestController
@RequestMapping(value = "/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    /**
     * 1.查询所有的一级分类
     * @return
     */
    @RequestMapping(value = "/oneTypes")
    public R queryOneTypes(){
        List<CategoryBean> list = categoryService.queryOneTypes();
        return R.ok().put("data",list);
    }

    /**
     * 2.查询指定上级分类下的下级分类
     * @return
     */
    @RequestMapping(value = "subList")
    public R querySubListByPid(int parent_id){
        List<CategoryBean> list = categoryService.querySubListByPid(parent_id);
        return R.ok("success").put("data",list);
    }

    /**
     * 3.添加商品分类
     */
    @RequestMapping(value = "/save")
    public R save(CategoryBean categoryBean){
        if (categoryBean.getText() == null || categoryBean.getText().trim().equals("")){
            return R.error("error param");
        }
        boolean flag = categoryService.save(categoryBean);
        if (flag){
            return R.ok("success").put("cate_id",categoryBean.getCate_id());
        }else {
            return R.error("fail");
        }
    }

    /**
     * 4.递归查询所有菜单列表
     */
    @RequestMapping(value = "/recursion")
    public R recursionList(){

        List<CategoryBean> list = categoryService.queryRecursionList();
        return R.ok("success").put("data",list);
    }


    /**
     * 修改
     * @param categoryBean
     * @return
     */
    @RequestMapping(value = "edit")
    public R edit(CategoryBean categoryBean){
        if(categoryBean.getCate_id() == 0){
            return R.error("null param");
        }
        boolean flag = categoryService.update(categoryBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }
}
