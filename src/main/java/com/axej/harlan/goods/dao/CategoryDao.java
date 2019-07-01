package com.axej.harlan.goods.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.goods.bean.CategoryBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:29 2018/1/22
 */
@Repository
@Mapper
public interface CategoryDao extends BaseDao<CategoryBean>{
    List<CategoryBean> queryListOneType();

    List<CategoryBean> querySubListByPid(@Param("parent_id") int parent_id);
}
