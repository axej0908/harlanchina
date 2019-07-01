package com.axej.harlan.cms.bean;

/**
 * Description：手机应用版本更新
 * Package com.axej.harlan.cms.bean
 * Class ApkVersionBean
 * Aauthor：Ning
 * Date：10:31 2018/7/31
 */
public class ApkVersionBean {

    private int apk_id;
    private String apk_num;
    private String is_coercion;
    private String apk_url;
    private String apk_time;

    public int getApk_id() {
        return apk_id;
    }

    public void setApk_id(int apk_id) {
        this.apk_id = apk_id;
    }

    public String getApk_num() {
        return apk_num;
    }

    public void setApk_num(String apk_num) {
        this.apk_num = apk_num;
    }

    public String getIs_coercion() {
        return is_coercion;
    }

    public void setIs_coercion(String is_coercion) {
        this.is_coercion = is_coercion;
    }

    public String getApk_url() {
        return apk_url;
    }

    public void setApk_url(String apk_url) {
        this.apk_url = apk_url;
    }

    public String getApk_time() {
        return apk_time;
    }

    public void setApk_time(String apk_time) {
        this.apk_time = apk_time;
    }
}
