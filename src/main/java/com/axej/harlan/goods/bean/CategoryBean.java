package com.axej.harlan.goods.bean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description: 首页商品分类表
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:25 2018/1/22
 */
public class CategoryBean {
    private int cate_id;
    private String text;
    private int parent_id;
    private String cate_type;
    private boolean checked;

    /**
     * 冗余字段
     * 查询二级类别所属一级类别字段
     */
    private String one_level;


    private List<?> list;

    public List<?> getList() {
        return list;
    }

    public void setList(List<?> list) {
        this.list = list;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getCate_id() {
        return cate_id;
    }

    public void setCate_id(int cate_id) {
        this.cate_id = cate_id;
    }

    public int getParent_id() {
        return parent_id;
    }

    public void setParent_id(int parent_id) {
        this.parent_id = parent_id;
    }

    public String getCate_type() {
        return cate_type;
    }

    public void setCate_type(String cate_type) {
        this.cate_type = cate_type;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public String getOne_level() {
        return one_level;
    }

    public void setOne_level(String one_level) {
        this.one_level = one_level;
    }
}
