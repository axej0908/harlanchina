package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.ExpoBean;

import java.util.List;
import java.util.Map; /**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:55 2018/3/21
 */
public interface ExpoService {
    int save(ExpoBean expoBean);

    int update(ExpoBean expoBean);

    List<ExpoBean> queryList(Map<String, Object> map);

    ExpoBean queryObject(ExpoBean bean);
}
