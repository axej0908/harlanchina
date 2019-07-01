package com.axej.harlan.msg.bean;

/**
 * @Author: jaywechen
 * @Description: 公司公告 行业快讯
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 11:39 2018/1/30
 */
public class NewsFlashBean {
    private int news_id;
    private String news_type;
    private String news_author;
    private String news_title;
    private String news_content;
    private String create_time;
    private String news_status;
    private int read_times = 0;
    private String img_src;

    public String getImg_src() {
        return img_src;
    }

    public void setImg_src(String img_src) {
        this.img_src = img_src;
    }

    public int getRead_times() {
        return read_times;
    }

    public void setRead_times(int read_times) {
        this.read_times = read_times;
    }

    public int getNews_id() {
        return news_id;
    }

    public void setNews_id(int news_id) {
        this.news_id = news_id;
    }

    public String getNews_type() {
        return news_type;
    }

    public void setNews_type(String news_type) {
        this.news_type = news_type;
    }

    public String getNews_author() {
        return news_author;
    }

    public void setNews_author(String news_author) {
        this.news_author = news_author;
    }

    public String getNews_title() {
        return news_title;
    }

    public void setNews_title(String news_title) {
        this.news_title = news_title;
    }

    public String getNews_content() {
        return news_content;
    }

    public void setNews_content(String news_content) {
        this.news_content = news_content;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public String getNews_status() {
        return news_status;
    }

    public void setNews_status(String news_status) {
        this.news_status = news_status;
    }
}
