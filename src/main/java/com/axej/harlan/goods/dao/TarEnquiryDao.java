package com.axej.harlan.goods.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.TarEnquiryBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 9:47 2018/3/28
 */
@Repository
@Mapper
public interface TarEnquiryDao extends BaseDao<TarEnquiryBean>{
    List<TarEnquiryBean> queryZhList(Query query);
    List<TarEnquiryBean> back_queryList(Query query);
    int queryZhTotal(Query query);
    int back_queryTotal(Query query);
}
