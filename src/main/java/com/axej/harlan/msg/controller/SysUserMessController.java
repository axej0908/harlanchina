package com.axej.harlan.msg.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.SysUserMessBean;
import com.axej.harlan.msg.service.SysUserMessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/sysUserMess")
public class SysUserMessController extends AbstractController {

    @Autowired
    private SysUserMessService sysUserMessService;

    /**
     * Edit the message
     * 注：Modify reading status 0.未读 1.已读 -1.删除
     * @param sysUserMessBean
     * @return
     */
    @RequestMapping(value = "edit")
    public R edit(SysUserMessBean sysUserMessBean){
        if(sysUserMessBean == null){
            logger.error("error param" + JSON.toJSONString(sysUserMessBean));
            return R.error("null param");
        }
        boolean flag = sysUserMessService.edit(sysUserMessBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }
}
