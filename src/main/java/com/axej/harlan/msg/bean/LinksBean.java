package com.axej.harlan.msg.bean;

import java.io.Serializable;

/**
 * Description：友情链接
 * Package com.axej.harlan.msg.bean
 * Class LinksBean
 * Aauthor：Ning
 * Date：9:54 2019/1/26
 */
public class LinksBean implements Serializable{
    private static final long serialVersionUID = -4018398191708830801L;

    private int links_id;
    private String links_type;
    private String links_name;
    private String links_site;
    private String create_time;

    public int getLinks_id() {
        return links_id;
    }

    public void setLinks_id(int links_id) {
        this.links_id = links_id;
    }

    public String getLinks_type() {
        return links_type;
    }

    public void setLinks_type(String links_type) {
        this.links_type = links_type;
    }

    public String getLinks_name() {
        return links_name;
    }

    public void setLinks_name(String links_name) {
        this.links_name = links_name;
    }

    public String getLinks_site() {
        return links_site;
    }

    public void setLinks_site(String links_site) {
        this.links_site = links_site;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }
}
