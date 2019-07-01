package com.axej.harlan.msg.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.NewsFlashBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 11:42 2018/1/30
 */
@Repository
@Mapper
public interface NewsFlashDao extends BaseDao<NewsFlashBean>{

    List<NewsFlashBean> lists(Query query);

    int listsTotal(Query query);
}
