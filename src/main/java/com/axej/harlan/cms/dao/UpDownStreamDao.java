package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.UpDownStreamBean;
import com.axej.harlan.common.base.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface UpDownStreamDao extends BaseDao<UpDownStreamBean> {
    int remove(int cpd_id);

    List<UpDownStreamBean> listType(@Param("cpd_id") int cpd_id , @Param("updown_type") String updown_type);
}
