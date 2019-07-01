package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.NewsFlashBean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:14 2018/1/30
 */
public interface NewsFlashService {
    boolean save(NewsFlashBean newsFlashBean);

    List<NewsFlashBean> queryList(Query query);

    int queryTotal(Query query);

    boolean update(NewsFlashBean bean);

    NewsFlashBean queryObject(NewsFlashBean bean);

    List<NewsFlashBean> lists(Query query);

    int listsTotal(Query query);

    boolean del(int news_id);
}
