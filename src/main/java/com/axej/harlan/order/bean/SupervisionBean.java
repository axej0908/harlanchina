package com.axej.harlan.order.bean;

import java.util.List;

/**
 * Description:免费监理bean
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:18:27 2017/12/12
 */
public class SupervisionBean {
    private int supv_id;
    //监理人员姓名
    private String supv_name;
    //运单编号
    private String log_number;

    private List<LogisticsBean> logisticsBeans;

    public List<LogisticsBean> getLogisticsBeans() {
        return logisticsBeans;
    }

    public void setLogisticsBeans(List<LogisticsBean> logisticsBeans) {
        this.logisticsBeans = logisticsBeans;
    }

    public int getSupv_id() {
        return supv_id;
    }

    public void setSupv_id(int supv_id) {
        this.supv_id = supv_id;
    }

    public String getSupv_name() {
        return supv_name;
    }

    public void setSupv_name(String supv_name) {
        this.supv_name = supv_name;
    }

    public String getLog_number() {
        return log_number;
    }

    public void setLog_number(String log_number) {
        this.log_number = log_number;
    }
}
