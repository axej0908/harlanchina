package com.axej.harlan.cms.bean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 10:34 2018/3/16
 */
public class CmsMenu {
    private int menu_id;
    private String title;
    private String url;
    private String type;
    private int pub_id;
    private String icon;
    private boolean spread;

    private List<?> children;
    /**
     * id 冗余 just for layui menu 数据格式
     */
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<?> getChildren() {
        return children;
    }

    public void setChildren(List<?> children) {
        this.children = children;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public boolean isSpread() {
        return spread;
    }

    public void setSpread(boolean spread) {
        this.spread = spread;
    }

    public int getMenu_id() {
        return menu_id;
    }

    public void setMenu_id(int menu_id) {
        this.menu_id = menu_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPub_id() {
        return pub_id;
    }

    public void setPub_id(int pub_id) {
        this.pub_id = pub_id;
    }
}
