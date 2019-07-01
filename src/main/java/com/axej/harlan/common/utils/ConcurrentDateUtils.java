package com.axej.harlan.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Description:
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:10:19 2017/11/13
 */
public class ConcurrentDateUtils {
    public static final Logger logger = LoggerFactory.getLogger(ConcurrentDateUtils.class);

    public static final String NORMAL = "yyyy-MM-dd HH:mm:ss";

    public static ThreadLocal<DateFormat> dateFormatThreadLocal = new ThreadLocal<DateFormat>(){
        @Override
        protected DateFormat initialValue() {
            return new SimpleDateFormat(NORMAL);
        }
    };

    /**
     * 1.function:transfer data -> string
     * @param date
     * @return
     */
    public static String format(Date date){
        return dateFormatThreadLocal.get().format(date);
    }

    /**
     * 2.function:transfer string - > data
     * @param dateStr
     * @return
     */
    public static Date parse(String dateStr){
        try {
            return dateFormatThreadLocal.get().parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            logger.info(e.getMessage());
        }
        return null;
    }
}