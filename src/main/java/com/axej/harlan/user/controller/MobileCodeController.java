package com.axej.harlan.user.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.user.bean.CpvcBean;
import com.axej.harlan.user.dao.CpvcDao;
import com.axej.harlan.user.service.MobileCodeService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author: lava
 * date: 10:12 2018/5/25
 * created by: IntelliJ IDEA
 */
@RestController
@RequestMapping(value = "/code")
public class MobileCodeController extends AbstractController {

    @Autowired
    private MobileCodeService mobileCodeService;

    /**
     * 1.修改
     * @param cpvcBean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(CpvcBean cpvcBean) {
        if (StringUtils.isEmpty(cpvcBean.getMobile())) {
            return R.error();
        }
        mobileCodeService.update(cpvcBean);
        return R.ok();
    }


    /**
     * 2.验证 手机和验证码是否匹配
     * @param cpvcBean
     * @return
     */
    @RequestMapping(value = "/verify")
    public R verify(CpvcBean cpvcBean){
        if (StringUtils.isEmpty(cpvcBean.getMobile())) {
            return R.error();
        }
        boolean flag = mobileCodeService.verify(cpvcBean);
        if (flag){
            return R.ok();
        }else {
            return R.error();
        }
    }
}
