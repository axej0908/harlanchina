package com.axej.harlan.msg.bean;

/**
 * @Author: jaywechen
 * @Description: 轮播图
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:55 2018/3/2
 */
public class BannerBean {
    private int banner_id;
    private String banner_path;
    private String banner_order;
    private String create_time;
    private String ue_content;

    public String getUe_content() {
        return ue_content;
    }

    public void setUe_content(String ue_content) {
        this.ue_content = ue_content;
    }

    public int getBanner_id() {
        return banner_id;
    }

    public void setBanner_id(int banner_id) {
        this.banner_id = banner_id;
    }

    public String getBanner_path() {
        return banner_path;
    }

    public void setBanner_path(String banner_path) {
        this.banner_path = banner_path;
    }

    public String getBanner_order() {
        return banner_order;
    }

    public void setBanner_order(String banner_order) {
        this.banner_order = banner_order;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }
}
