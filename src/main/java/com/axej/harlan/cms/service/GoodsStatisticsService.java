package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsStatisticsBean;
import java.util.List;
import java.util.Map;

public interface GoodsStatisticsService {

    List<CmsStatisticsBean> queryUpDownStatistics(Map<String, Object> map);

    List<CmsStatisticsBean> querySumStatistics(Map<String, Object> map);

}
