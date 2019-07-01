package com.axej.harlan.user.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.FileUtils;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.user.bean.AuthBean;
import com.axej.harlan.user.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

/**
 * Description:实名认证
 * Created by IntelliJ IDEA
 *
 * @author : jaywechen
 * Date:9:54 2017/12/14
 */
@RestController
@RequestMapping(value = "/realNameAuth")
public class AuthController extends AbstractController {

    @Autowired
    private AuthService idAuthService;

    /**
     * 我的资料 - 基本资料补全 - 查询详情
     *
     * @param authBean auth_id
     * @return
     */
    @RequestMapping(value = "/detail")
    public R realNameAuthDetail(AuthBean authBean) {
        if (authBean.getUser_id() == 0) {
            logger.error("param error:" + authBean.toString());
            return R.error("param error");
        }
        AuthBean dbBean = idAuthService.detail(authBean);
        if (dbBean == null) {
            return R.error("failure").put("data", dbBean);
        } else {
            return R.ok("success").put("data", dbBean);
        }
    }

    /**
     * 我的资料 - 实名认证 - 提交认证
     *
     * @param authBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R realNameAuth(AuthBean authBean) {
        if (authBean == null) {
            logger.error("param error:" + authBean.toString());
            return R.error("param error");
        }
        boolean flag = idAuthService.submitAuth(authBean);
        //3.返回
        if (flag) {
            return R.ok("success").put("auth_id", authBean.getAuth_id());
        } else {
            return R.error("failure");
        }
    }

    /**
     * 修改 - 实名认证
     *
     * @param idAuthBean
     * @return
     */
    @RequestMapping(value = "/update")
    public R update(AuthBean idAuthBean) {
        if (idAuthBean == null || idAuthBean.getAuth_id() == 0) {
            logger.error("null param" + idAuthBean.toString());
            return R.error("null param");
        }
        boolean flag = idAuthService.updateById(idAuthBean);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }

}
