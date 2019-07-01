package com.axej.harlan.cms.dao;

import com.axej.harlan.cms.bean.CmsStatisticsBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import java.util.Map;

@Repository
@Mapper
public interface EnquiryStatisticsDao {

    CmsStatisticsBean querySystemSumStatistics(Map<String, Object> map);

    CmsStatisticsBean queryTripartiteSumStatistics(Map<String, Object> map);
}
