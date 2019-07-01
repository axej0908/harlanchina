package com.axej.harlan.msg.bean;

import java.io.Serializable;

/**
 * Description：展会
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：10:02 2019/4/18
 */
public class ExhibitBean implements Serializable {
    private static final long serialVersionUID = 6608665910769310142L;

    private int exhibit_id;
    private String headline;
    private String textpart;
    private String picture;
    private String place;
    private String industry;
    private String linker;
    private String start_time;
    private String end_time;
    private String create_time;

    public int getExhibit_id() {
        return exhibit_id;
    }

    public void setExhibit_id(int exhibit_id) {
        this.exhibit_id = exhibit_id;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getTextpart() {
        return textpart;
    }

    public void setTextpart(String textpart) {
        this.textpart = textpart;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getLinker() {
        return linker;
    }

    public void setLinker(String linker) {
        this.linker = linker;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }
}
