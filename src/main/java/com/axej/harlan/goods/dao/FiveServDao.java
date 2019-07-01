package com.axej.harlan.goods.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.FiveServBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 10:06 2018/3/7
 */
@Repository
@Mapper
public interface FiveServDao extends BaseDao<FiveServBean>{

    List<FiveServBean> per_queryList(Query query);
    int per_queryTotal(Query query);
}
