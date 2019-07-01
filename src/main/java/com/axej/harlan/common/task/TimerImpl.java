package com.axej.harlan.common.task;

import com.axej.harlan.common.utils.ConcurrentDateUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @Author: jaywechen
 * @Description: boot定时任务 需要在启动类添加注解 配置类@component
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 11:30 2018/2/27
 */
@Component
public class TimerImpl implements Timer{
    private final static String CRON_5SEC = "0/5 * * * * ?";
//    @Scheduled(cron = CRON_5SEC)
    @Override
    public void sayHello() {
        System.out.println("***");
    }
}
