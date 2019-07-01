package com.axej.harlan.cms.controller;

import com.alibaba.fastjson.JSONObject;
import com.axej.harlan.cms.bean.ApkVersionBean;
import com.axej.harlan.cms.service.ApkVersionService;
import com.axej.harlan.common.utils.FileUtils;
import com.axej.harlan.common.utils.JsonUtils;
import com.axej.harlan.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Description：apk版本更新
 * Package com.axej.harlan.cms.controller
 * Class ApkVersionController
 * Aauthor：Ning
 * Date：10:33 2018/7/31
 */
@RestController
@RequestMapping(value = "/apkVersion")
public class ApkVersionController extends JsonUtils {

    @Autowired
    private ApkVersionService apkVersionService;

    /**
     * 上传apk
     *
     * @Method: upload
     * @Param [apk]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 15:01 2018/7/31
     */
    @RequestMapping({"upload"})
    public void upload(MultipartFile apk) {
        JSONObject json = new JSONObject();
        if (apk == null || apk.getSize() == 0) {
            json.put("code" , 0);
            json.put("data" , "");
            json.put("msg" , "null param");
            super.writeJson(json);
        }
        //返回文件保存相对路径
        String res = FileUtils.uploadAPK(apk , "apk");
        json.put("code" , 0);
        json.put("data" , res);
        json.put("msg" , "success");
        super.writeJson(json);
    }


    /**
     * 保存
     *
     * @Method: save
     * @Param [apkVersionBean]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 10:56 2018/7/31
     */
    @RequestMapping({"save"})
    public R save(ApkVersionBean apkVersionBean){
        if(apkVersionBean == null){
            return R.error("null param");
        }
        boolean flag = apkVersionService.save(apkVersionBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("fail");
    }

    /**
     * 修改
     *
     * @Method: alter
     * @Param [apkVersionBean]
     * @Return com.axej.harlan.common.utils.R
     * @Date: 10:59 2018/7/31
     */
    @RequestMapping({"alter"})
    public R alter(ApkVersionBean apkVersionBean) {
        if(apkVersionBean.getApk_id() == 0){
            return R.error("null param");
        }
        boolean flag = apkVersionService.alter(apkVersionBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("fail");
    }

    /**
     * 获取版本
     *
     * @Method: get
     * @Param []
     * @Return com.axej.harlan.common.utils.R
     * @Date: 11:01 2018/7/31
     */
    @RequestMapping({"get"})
    public R get(){
        ApkVersionBean apkVersionBean = apkVersionService.get();
        if(apkVersionBean != null){
            return R.ok("success").put("data" , apkVersionBean);
        }
        return R.error("null");
    }

}
