package com.axej.harlan.user.bean;

/**
 * @Author: jaywechen
 * @Description: 手机号码和验证码一一对应 临时表
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 14:30 2018/3/29
 */
public class CpvcBean {

    private String mobile;
    private String cpvc;
    private String last_modified;

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCpvc() {
        return cpvc;
    }

    public void setCpvc(String cpvc) {
        this.cpvc = cpvc;
    }

    public String getLast_modified() {
        return last_modified;
    }

    public void setLast_modified(String last_modified) {
        this.last_modified = last_modified;
    }

    public CpvcBean() { }

    public CpvcBean(String mobile, String cpvc, String last_modified) {
        this.mobile = mobile;
        this.cpvc = cpvc;
        this.last_modified = last_modified;
    }
}
