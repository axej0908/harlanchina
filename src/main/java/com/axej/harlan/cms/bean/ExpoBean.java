package com.axej.harlan.cms.bean;

/**
 * @author: jaywechen
 * @Description:首页展会内容
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:48 2018/3/21
 */
public class ExpoBean {
    private Integer expo_id;
    /**
     * 标题
     */
    private String title;

    /**
     * 自定义 富文本内容
     */
    private String content;

    /**
     * 是否显示(暂时不用)
     */
    private String display;

    /**
     * 区别 广告展示的位置 - imp
     */
    private String expo_pos;

    /**
     * 编辑保存时间(暂时不用)
     */
    private String create_time;

    public String getDisplay() {
        return display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    public String getExpo_pos() {
        return expo_pos;
    }

    public void setExpo_pos(String expo_pos) {
        this.expo_pos = expo_pos;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public Integer getExpo_id() {
        return expo_id;
    }

    public void setExpo_id(Integer expo_id) {
        this.expo_id = expo_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
