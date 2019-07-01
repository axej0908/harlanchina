package com.axej.harlan.common.base;

/**
 * Description:
 * Created by IntelliJ IDEA
 * @author: jaywechen
 * Date:9:20 2017/12/13
 */
public class PagerBean {
    //当前页码
    private int page;
    //每页条数
    private int limit;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}
