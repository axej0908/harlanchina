package com.axej.harlan.common.base;

import com.axej.harlan.common.utils.FileUtils;
import com.axej.harlan.common.utils.R;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @Author: jaywechen
 * @Description: 文件上传共用类
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 11:51 2018/2/28
 */
@RestController
@RequestMapping(value = "/file")
public class FileController {

    private static final String CONTENT_NAME = "ueditor";

    /**
     * 单传文件
     *
     * @param file
     * @return
     */
    @RequestMapping(value = "/upload")
    public R upload(MultipartFile file, String user_id) {
        if (file == null || file.getSize() == 0) {
            return R.error();
        }

        //返回文件保存相对路径
        String res = FileUtils.upload(file, user_id);
        return R.ok().put("data", res);
    }


    /**
     * 2.ueditor
     *
     * @param file
     * @return
     */
    @RequestMapping(value = "/ueUpload")
    public String ueUpload(MultipartFile file) {
        //返回文件保存相对路径
        String res = FileUtils.upload(file, CONTENT_NAME);
        String config = "{\"state\": \"SUCCESS\"," +
                "\"url\": \"" + res + "\"," +
                "\"title\": \"" + res.substring(res.length() - 8, res.length()) + "\"," +
                "\"original\": \"" + res.substring(res.length() - 8, res.length()) + "\"}";
        return config;
    }
}
