package com.axej.harlan.msg.dao;

import com.axej.harlan.common.base.BaseDao;
import com.axej.harlan.msg.bean.BannerBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:56 2018/3/2
 */
@Repository
@Mapper
public interface BannerDao extends BaseDao<BannerBean> {
}
