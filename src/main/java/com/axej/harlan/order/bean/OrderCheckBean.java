package com.axej.harlan.order.bean;

/**
 * @author: lava
 * date: 9:12 2018/5/29
 * created by: IntelliJ IDEA
 * 订单免费检测实体类
 */
public class OrderCheckBean {

   private int check_id;
   private String uv;
   private String color;
   private String sample;
   private String report;
   private String video;
   private String bulk;
   private String check_url;
   private String order_id;

    public int getCheck_id() {
        return check_id;
    }

    public void setCheck_id(int check_id) {
        this.check_id = check_id;
    }

    public String getUv() {
        return uv;
    }

    public void setUv(String uv) {
        this.uv = uv;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSample() {
        return sample;
    }

    public void setSample(String sample) {
        this.sample = sample;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getBulk() {
        return bulk;
    }

    public void setBulk(String bulk) {
        this.bulk = bulk;
    }

    public String getCheck_url() {
        return check_url;
    }

    public void setCheck_url(String check_url) {
        this.check_url = check_url;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }
}
