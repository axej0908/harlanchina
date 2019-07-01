package com.axej.harlan.common.utils;

import java.util.List;

/**
 * Description:封装得到的结果集
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:16:39 2017/10/12
 */
public class PageUtils {

    //总记录数
    private int totalCount;
    //数据列表
    private List<?> list;
    //单页条数
    private int pageSize;
    //当前页
    private int currPage;
    //总页数
    private int totalPage;

    public PageUtils(List<?> list, int totalCount, int pageSize, int currPage) {
        this.list = list;
        this.totalCount = totalCount;
        this.pageSize = pageSize;
        this.currPage = currPage;
        this.totalPage = (int)Math.ceil((double)totalCount/pageSize);
    }

    public PageUtils(int totalCount, List<?> list) {
        this.totalCount = totalCount;
        this.list = list;
    }

    public PageUtils() {
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public List<?> getList() {
        return list;
    }

    public void setList(List<?> list) {
        this.list = list;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getCurrPage() {
        return currPage;
    }

    public void setCurrPage(int currPage) {
        this.currPage = currPage;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }
}
