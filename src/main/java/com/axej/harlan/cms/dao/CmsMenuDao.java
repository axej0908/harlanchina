package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.CmsMenu;
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
 * @Date: 16:45 2018/3/19
 */
@Repository
@Mapper
public interface CmsMenuDao extends BaseDao<CmsMenu>{

    List<CmsMenu> queryUserList(Map<String, Object> map);
}
