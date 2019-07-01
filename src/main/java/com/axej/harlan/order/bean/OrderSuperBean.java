package com.axej.harlan.order.bean;

/**
 * Description：监理
 * Package com.axej.harlan.order.bean
 * Class OrderSuperBean
 * Aauthor：Ning
 * Date：20:24 2018/7/19
 */
public class OrderSuperBean {

    private int super_id;
    private String super_url;
    private String super_text;
    private String super_time;
    private String order_id;

    public int getSuper_id() {
        return super_id;
    }

    public void setSuper_id(int super_id) {
        this.super_id = super_id;
    }

    public String getSuper_url() {
        return super_url;
    }

    public void setSuper_url(String super_url) {
        this.super_url = super_url;
    }

    public String getSuper_text() {
        return super_text;
    }

    public void setSuper_text(String super_text) {
        this.super_text = super_text;
    }

    public String getSuper_time() {
        return super_time;
    }

    public void setSuper_time(String super_time) {
        this.super_time = super_time;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }
}
