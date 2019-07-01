package com.axej.harlan.order.bean;

/**
 * Description:免费监理物流信息bean
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:10:11 2017/12/13
 */
public class LogisticsBean {
    private int os_id;
    //时间
    private String os_time;
    //物流信息内容
    private String os_content;
    //上传文件内容
    private String os_files;
    //外键
    private String supv_id;

    public int getOs_id() {
        return os_id;
    }

    public void setOs_id(int os_id) {
        this.os_id = os_id;
    }

    public String getOs_time() {
        return os_time;
    }

    public void setOs_time(String os_time) {
        this.os_time = os_time;
    }

    public String getOs_content() {
        return os_content;
    }

    public void setOs_content(String os_content) {
        this.os_content = os_content;
    }

    public String getOs_files() {
        return os_files;
    }

    public void setOs_files(String os_files) {
        this.os_files = os_files;
    }

    public String getSupv_id() {
        return supv_id;
    }

    public void setSupv_id(String supv_id) {
        this.supv_id = supv_id;
    }
}
