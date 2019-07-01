package com.axej.harlan.cms.bean;

import java.io.Serializable;

/**
 * Description：合成图片
 * Package com.axej.harlan.cms.bean
 * Class ComplexBean
 * Aauthor：Ning
 * Date：10:54 2018/8/13 
 */
public class ComplexBean implements Serializable {
    private static final long serialVersionUID = 2286726767701479172L;

    private int complex_id;
    private String complex_name;
    private String complex_img;
    private int synthetic_id;

    public int getComplex_id() {
        return complex_id;
    }

    public void setComplex_id(int complex_id) {
        this.complex_id = complex_id;
    }

    public String getComplex_name() {
        return complex_name;
    }

    public void setComplex_name(String complex_name) {
        this.complex_name = complex_name;
    }

    public String getComplex_img() {
        return complex_img;
    }

    public void setComplex_img(String complex_img) {
        this.complex_img = complex_img;
    }

    public int getSynthetic_id() {
        return synthetic_id;
    }

    public void setSynthetic_id(int synthetic_id) {
        this.synthetic_id = synthetic_id;
    }
}
