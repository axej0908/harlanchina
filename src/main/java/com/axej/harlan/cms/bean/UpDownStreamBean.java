package com.axej.harlan.cms.bean;

import java.io.Serializable;
import java.util.List;

/**
 * Description：化合物上下游
 * Package com.axej.harlan.cms.bean
 * Class UpDownStreamBean
 * Aauthor：Ning
 * Date：14:17 2018/8/10
 */
public class UpDownStreamBean implements Serializable{
    private static final long serialVersionUID = 8987383379409746720L;

    private int updown_id;
    private String updown_name;
    private String updown_type;
    private String updown_img;
    private int cpd_id;

    public int getUpdown_id() {
        return updown_id;
    }

    public void setUpdown_id(int updown_id) {
        this.updown_id = updown_id;
    }

    public String getUpdown_name() {
        return updown_name;
    }

    public void setUpdown_name(String updown_name) {
        this.updown_name = updown_name;
    }

    public String getUpdown_type() {
        return updown_type;
    }

    public void setUpdown_type(String updown_type) {
        this.updown_type = updown_type;
    }

    public String getUpdown_img() {
        return updown_img;
    }

    public void setUpdown_img(String updown_img) {
        this.updown_img = updown_img;
    }

    public int getCpd_id() {
        return cpd_id;
    }

    public void setCpd_id(int cpd_id) {
        this.cpd_id = cpd_id;
    }
}
