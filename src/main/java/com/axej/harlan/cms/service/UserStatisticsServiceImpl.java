package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.CmsStatisticsBean;
import com.axej.harlan.cms.dao.UserStatisticsDao;
import com.axej.harlan.common.utils.DataTimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Transactional
public class UserStatisticsServiceImpl implements UserStatisticsService{

    @Autowired
    private UserStatisticsDao userStatisticsDao;

    @Override
    public List<CmsStatisticsBean> queryUserStatistics(Map<String, Object> map) {
        List<CmsStatisticsBean> cmsStatisticsBeans = new ArrayList<>();

        Date start = null;
        Date end = null;

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        //默认加载
        if(map.get("query").toString().equals("default")){
            //结束时间
            end = DataTimeUtils.beforeDate("current");
            //开始时间
            start = DataTimeUtils.beforeDate("previous");
        }
        //条件加载
        if(map.get("query").toString().equals("effective")){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            try {
                //开始时间
                start = sdf.parse(map.get("start").toString());
                //结束时间
                end = sdf.parse(map.get("end").toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        //获取时间段中的所有时间
        List<Date> dates = DataTimeUtils.getDatesBetweenTwoDate(start , end);
        if(dates.size() > 0){
            //循环遍历出所有时间
            for(int i = 0; i < dates.size(); i++){
                //请求参数
                map.put("register_time", dateFormat.format(dates.get(i)));
                CmsStatisticsBean cmsStatisticsBean = userStatisticsDao.queryUserStatistics(map);
                cmsStatisticsBean.setxAxis(dateFormat.format(dates.get(i)));
                cmsStatisticsBeans.add(cmsStatisticsBean);
            }
        }
        return cmsStatisticsBeans;
    }

    @Override
    public List<CmsStatisticsBean> querySumStatistics(Map<String, Object> map) {
        List<CmsStatisticsBean> cmsStatisticsBeans = new ArrayList<>();

        Date start = null;
        Date end = null;

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        //默认加载
        if(map.get("query").toString().equals("default")){
            //结束时间
            end = DataTimeUtils.beforeDate("current");
            //开始时间
            start = DataTimeUtils.beforeDate("previous");
        }
        //条件加载
        if(map.get("query").toString().equals("effective")){
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            try {
                //开始时间
                start = sdf.parse(map.get("start").toString());
                //结束时间
                end = sdf.parse(map.get("end").toString());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        //获取时间段中的所有时间
        List<Date> dates = DataTimeUtils.getDatesBetweenTwoDate(start , end);
        if(dates.size() > 0){
            //循环遍历出所有时间
            for(int i = 0; i < dates.size(); i++){
                //请求参数
                map.put("register_time", dateFormat.format(dates.get(i)));
                CmsStatisticsBean cmsStatisticsBean = userStatisticsDao.queryUserStatistics(map);
                cmsStatisticsBean.setxAxis(dateFormat.format(dates.get(i)));
                cmsStatisticsBeans.add(cmsStatisticsBean);
            }
        }
        return cmsStatisticsBeans;
    }
}
