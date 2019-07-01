package com.axej.harlan.order.service;

import com.axej.harlan.common.utils.Query;
import com.axej.harlan.order.bean.DetectionBean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:23 2017/12/23
 */
public interface DetectionService {
    boolean save(DetectionBean detectionBean);

    List<DetectionBean> queryList(Query query);

    int queryTotal(Query query);
}
