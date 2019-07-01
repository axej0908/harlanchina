package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.ApkVersionBean;

public interface ApkVersionService {

    boolean save(ApkVersionBean apkVersionBean);

    boolean alter(ApkVersionBean apkVersionBean);

    ApkVersionBean get();
}
