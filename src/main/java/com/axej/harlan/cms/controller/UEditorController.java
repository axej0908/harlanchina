package com.axej.harlan.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 19:28 2018/3/22
 */
@Controller
@RequestMapping(value = "/ueditor")
public class UEditorController {

    @RequestMapping(value = "/config")
    @ResponseBody
    public String ueditor(HttpServletRequest request, HttpServletResponse response) {

        String s = "{\n" +
                "            \"imageActionName\": \"uploadimage\",\n" +
                "                \"imageFieldName\": \"file\", \n" +
                "                \"imageMaxSize\": 2048000, \n" +
                "                \"imageAllowFiles\": [\".png\", \".jpg\", \".jpeg\", \".gif\", \".bmp\"], \n" +
                "                \"imageCompressEnable\": true, \n" +
                "                \"imageCompressBorder\": 1600, \n" +
                "                \"imageInsertAlign\": \"none\", \n" +
                "                \"imageUrlPrefix\": \"\",\n" +
                "                \"imagePathFormat\": \"/ueditor/jsp/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}\" }";
        return s;
    }
}
