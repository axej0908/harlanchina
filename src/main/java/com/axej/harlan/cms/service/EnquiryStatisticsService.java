package com.axej.harlan.cms.service;


import com.axej.harlan.cms.bean.CmsStatisticsBean;

import java.util.List;
import java.util.Map;

public interface EnquiryStatisticsService {

    List<CmsStatisticsBean> querySystemSumStatistics(Map<String, Object> map);

    List<CmsStatisticsBean> queryTripartiteSumStatistics(Map<String, Object> map);
}
