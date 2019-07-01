package com.axej.harlan.order.service;

import com.axej.harlan.order.bean.SupervisionBean; /**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:17:25 2017/12/15
 */
public interface SupervisionService {
    boolean save(SupervisionBean supervisionBean);

    SupervisionBean queryObject(SupervisionBean supervisionBean);
}
