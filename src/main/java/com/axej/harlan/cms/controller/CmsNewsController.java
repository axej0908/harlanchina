package com.axej.harlan.cms.controller;

import com.alibaba.fastjson.JSONObject;
import com.axej.harlan.common.utils.FileUtils;
import com.axej.harlan.common.utils.JsonUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Description：新闻上传
 * Package com.axej.harlan.cms.controller
 * Class CmsNewsController
 * Aauthor：Ning
 * Date：11:56 2018/8/9
 */
@RestController
@RequestMapping(value = "/cmsNews")
public class CmsNewsController extends JsonUtils {

    @RequestMapping({"upload"})
    public void upload(MultipartFile file , String user_id) {
        JSONObject json = new JSONObject();
        JSONObject json0 = new JSONObject();
        if (file == null || file.getSize() == 0) {
            json0.put("src" , "");
            json0.put("title" , "");
            json.put("code" , 0);
            json.put("data" , json0);
            json.put("msg" , "null param");
            super.writeJson(json);
        }
        //返回文件保存相对路径
        String res = FileUtils.upload(file , user_id);
        json0.put("src" , res);
        json0.put("title" , res);
        json.put("code" , 0);
        json.put("data" , json0);
        json.put("msg" , "success");
        super.writeJson(json);
    }
}
