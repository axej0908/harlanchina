package com.axej.harlan.goods.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.goods.bean.TarEnquiryBean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 10:24 2018/3/28
 */
public interface TarEnquiryService {
    int save(TarEnquiryBean tarEnquiryBean);

    List<TarEnquiryBean> queryList(Query query);

    List<TarEnquiryBean> back_queryList(Query query);

    int queryTotal(Query query);

    int back_queryTotal(Query query);

    TarEnquiryBean queryObject(int en_id);

    int upate(TarEnquiryBean bean);

    List<TarEnquiryBean> queryZhList(Query query);

    int queryZhTotal(Query query);
}
