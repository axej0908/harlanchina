package com.axej.harlan.cms.bean;

import java.io.Serializable;
import java.util.List;

/**
 * Description：化合物合成路线
 * Package com.axej.harlan.cms.bean
 * Class SyntheticRouteBean
 * Aauthor：Ning
 * Date：14:15 2018/8/10
 */
public class SyntheticRouteBean implements Serializable{
    private static final long serialVersionUID = 5098223705233284324L;

    private int synthetic_id;
    private String synthetic_name;
    private String synthetic_route;
    private int cpd_id;

    /**
     * 冗余数据
     */
    private List<ComplexBean> complexBeans;

    public int getSynthetic_id() {
        return synthetic_id;
    }

    public void setSynthetic_id(int synthetic_id) {
        this.synthetic_id = synthetic_id;
    }

    public String getSynthetic_name() {
        return synthetic_name;
    }

    public void setSynthetic_name(String synthetic_name) {
        this.synthetic_name = synthetic_name;
    }

    public String getSynthetic_route() {
        return synthetic_route;
    }

    public void setSynthetic_route(String synthetic_route) {
        this.synthetic_route = synthetic_route;
    }

    public int getCpd_id() {
        return cpd_id;
    }

    public void setCpd_id(int cpd_id) {
        this.cpd_id = cpd_id;
    }

    public List<ComplexBean> getComplexBeans() {
        return complexBeans;
    }

    public void setComplexBeans(List<ComplexBean> complexBeans) {
        this.complexBeans = complexBeans;
    }
}
