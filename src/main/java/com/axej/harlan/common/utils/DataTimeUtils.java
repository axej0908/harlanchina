package com.axej.harlan.common.utils;

import javax.xml.crypto.Data;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Description：日期、时间
 * Package com.axej.harlan.common.utils
 * Class DataTimeUtils
 * Aauthor：Ning
 * Date：10:06 2018/10/25 
 */
public class DataTimeUtils {

    /**
     * 根据开始时间和结束时间返回时间段内的时间集合
     *
     * @param beginDate
     * @param endDate
     * @return List
     */
    public static List<Date> getDatesBetweenTwoDate(Date beginDate, Date endDate) {
        List<Date> lDate = new ArrayList<Date>();
        lDate.add(beginDate);// 把开始时间加入集合
        Calendar cal = Calendar.getInstance();
        // 使用给定的 Date 设置此 Calendar 的时间
        cal.setTime(beginDate);
        boolean bContinue = true;
        while (bContinue) {
            // 根据日历的规则，为给定的日历字段添加或减去指定的时间量
            cal.add(Calendar.DAY_OF_MONTH, 1);
            // 测试此日期是否在指定日期之后
            if (endDate.after(cal.getTime())) {
                lDate.add(cal.getTime());
            } else {
                break;
            }
        }
        lDate.add(endDate);// 把结束时间加入集合
        return lDate;
    }

    /**
     * 获取日期
     * end 前一天
     * start 一周之前
     * @param unknown
     * @return
     */
    public static Date beforeDate(String unknown){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            if(unknown.equals("current")){

                //结束时间
                calendar.set(Calendar.DATE, calendar.get(Calendar.DATE) - 1);
                /*String end = dateFormat.format(dateFormat.parse(dateFormat.format(calendar.getTime())));*/
                Date end = dateFormat.parse(dateFormat.format(calendar.getTime()));

                return end;
            }else if(unknown.equals("previous")){

                //开始时间
                calendar.set(Calendar.DATE, calendar.get(Calendar.DATE) - 7);
                /*String start = dateFormat.format(dateFormat.parse(dateFormat.format(calendar.getTime())));*/
                Date start = dateFormat.parse(dateFormat.format(calendar.getTime()));
                return start;
            }

        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

}
