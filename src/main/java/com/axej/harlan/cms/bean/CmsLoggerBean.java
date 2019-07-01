package com.axej.harlan.cms.bean;

import java.io.Serializable;

/**
 * Description：危险产品记录
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：14:48 2019/3/29
 */
public class CmsLoggerBean implements Serializable {
    private static final long serialVersionUID = -2597696063464242614L;

    private int logger_id;
    private String cas;
    private String create_time;

    public int getLogger_id() {
        return logger_id;
    }

    public void setLogger_id(int logger_id) {
        this.logger_id = logger_id;
    }

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }
}
