package com.axej.harlan.msg.bean;

import java.io.Serializable;

/**
 * Description：说明
 * Package com.axej.harlan.msg.bean
 * Class ExplainBean
 * Aauthor：Ning
 * Date：17:22 2019/1/4
 */
public class ExplainBean implements Serializable{
    private static final long serialVersionUID = -4400948770515943182L;

    private int explain_id;
    private String theme;
    private String sorts;
    private String digests;

    public int getExplain_id() {
        return explain_id;
    }

    public void setExplain_id(int explain_id) {
        this.explain_id = explain_id;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getSorts() {
        return sorts;
    }

    public void setSorts(String sorts) {
        this.sorts = sorts;
    }

    public String getDigests() {
        return digests;
    }

    public void setDigests(String digests) {
        this.digests = digests;
    }
}
