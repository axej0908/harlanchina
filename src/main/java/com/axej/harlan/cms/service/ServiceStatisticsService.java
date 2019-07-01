package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsStatisticsBean;
import java.util.List;
import java.util.Map;

public interface ServiceStatisticsService {

    List<CmsStatisticsBean> queryServiceStatistics(Map<String, Object> map);
}
