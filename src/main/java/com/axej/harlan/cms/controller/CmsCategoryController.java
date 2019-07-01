package com.axej.harlan.cms.controller;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.CategoryBean;
import com.axej.harlan.goods.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：商品分类
 * Package com.axej.harlan.cms.controller
 * Class CmsCategoryController
 * Aauthor：Ning
 * Date：14:56 2019/3/6
 */
@RestController
@RequestMapping(value = "/cmsCategory")
public class CmsCategoryController {

    @Autowired
    private CategoryService categoryService;


    /**
     * 详情&类别是否存在
     * @param categoryBean
     * @return
     */
    @RequestMapping(value = "detail")
    public R detail(CategoryBean categoryBean){
        if(categoryBean == null){
            return R.error("null param");
        }
        CategoryBean category = categoryService.queryObject(categoryBean);
        if(category != null){
            return R.ok().put("data", category);
        }else {
            return R.error("null data");
        }
    }


    /**
     * 查询二级分类及所属一级分类
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "pager")
    public R pager(int page, int limit, Map<String, Object> map){
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<CategoryBean> categoryBeans = categoryService.queryList(query);
        int total = categoryService.queryTotal();
        return R.ok().put("data", categoryBeans).put("count", total);
    }
}
