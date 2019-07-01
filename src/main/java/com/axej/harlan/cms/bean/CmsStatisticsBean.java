package com.axej.harlan.cms.bean;

import java.io.Serializable;

/**
 * Description：折线图统计
 * Package com.axej.harlan.cms.bean
 * Class CmsStatisticsBean
 * Aauthor：Ning
 * Date：11:00 2018/10/24 
 */
public class CmsStatisticsBean implements Serializable{
    private static final long serialVersionUID = 3412046324751131461L;

    private String xAxis;

    private String yAxis;

    public String getxAxis() {
        return xAxis;
    }

    public void setxAxis(String xAxis) {
        this.xAxis = xAxis;
    }

    public String getyAxis() {
        return yAxis;
    }

    public void setyAxis(String yAxis) {
        this.yAxis = yAxis;
    }
}
