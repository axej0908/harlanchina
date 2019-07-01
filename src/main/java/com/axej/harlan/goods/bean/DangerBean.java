package com.axej.harlan.goods.bean;

import java.io.Serializable;

/**
 * Description：危险品
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：14:46 2019/3/22
 */
public class DangerBean implements Serializable {

    private static final long serialVersionUID = 7740258123096028948L;

    private int danger_id;
    private String nations;
    private String danger_name;
    private String alias;
    private String cas;
    private String belongs_directory;
    private String risk_category;

    public int getDanger_id() {
        return danger_id;
    }

    public void setDanger_id(int danger_id) {
        this.danger_id = danger_id;
    }

    public String getNations() {
        return nations;
    }

    public void setNations(String nations) {
        this.nations = nations;
    }

    public String getDanger_name() {
        return danger_name;
    }

    public void setDanger_name(String danger_name) {
        this.danger_name = danger_name;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    public String getBelongs_directory() {
        return belongs_directory;
    }

    public void setBelongs_directory(String belongs_directory) {
        this.belongs_directory = belongs_directory;
    }

    public String getRisk_category() {
        return risk_category;
    }

    public void setRisk_category(String risk_category) {
        this.risk_category = risk_category;
    }
}
