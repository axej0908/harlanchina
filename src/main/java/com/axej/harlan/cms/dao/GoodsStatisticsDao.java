package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.CmsStatisticsBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import java.util.Map;

@Repository
@Mapper
public interface GoodsStatisticsDao {

    CmsStatisticsBean queryUpDownStatistics(Map<String, Object> map);

    CmsStatisticsBean querySumStatistics(Map<String, Object> map);

}
