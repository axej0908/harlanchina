package com.axej.harlan.user.service;

import com.axej.harlan.user.bean.CpvcBean;

/**
 * @author: lava
 * date: 10:26 2018/5/25
 * created by: IntelliJ IDEA
 */
public interface MobileCodeService {

    void update(CpvcBean cpvcBean);

    boolean verify(CpvcBean cpvcBean);
}
