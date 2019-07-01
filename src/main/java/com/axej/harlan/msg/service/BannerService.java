package com.axej.harlan.msg.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.msg.bean.BannerBean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:02 2018/3/2
 */
public interface BannerService {
    boolean save(BannerBean bannerBean);

    List<BannerBean> queryList(Query query);

    int queryTotal(Query query);

    int update(BannerBean bannerBean);

    BannerBean queryObject(BannerBean bannerBean);

    boolean delete(int banner_id);
}
