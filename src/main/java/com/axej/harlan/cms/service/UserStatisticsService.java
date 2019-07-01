package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsStatisticsBean;
import java.util.List;
import java.util.Map;

public interface UserStatisticsService {

    List<CmsStatisticsBean> queryUserStatistics(Map<String , Object> map);

    List<CmsStatisticsBean> querySumStatistics(Map<String , Object> map);
}
