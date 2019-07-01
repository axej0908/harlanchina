package com.axej.harlan.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Date;

/**
 * Description:文件工具类
 * Created by IntelliJ IDEA
 *
 * @author :jaywechen
 * Date:11:43 2017/11/15
 */
public class FileUtils {
    private static final Logger logger = LoggerFactory.getLogger(FileUtils.class);

    /**
     * 1.function:文件上传
     *
     * @param multipartFile 上传单个文件
     * @param dirParam      保存路径目录
     * @return 文件保存路径
     */
    public static String upload(MultipartFile multipartFile, String dirParam) {
        StringBuffer saveDir = new StringBuffer();
        saveDir.append("E:").append(File.separator)
                .append("upload").append(File.separator)
                .append(dirParam).append(File.separator);

        if (multipartFile == null || multipartFile.isEmpty()) {
            return null;
        }
        //1.初始化文件的保存相对路径
        String relativePath = "";
        //2.文件保存操作
        //2.1生成保存文件名称
        String originalName = multipartFile.getOriginalFilename();
        String fileType = originalName.substring(originalName.lastIndexOf("."), originalName.length());
        String saveFileName = RDateUtils.formatDate(new Date(), RDateUtils.TIME_STAMP_PATTERN);
        //2.2路径判断是否存在,保存文件
        File dir = new File(saveDir.toString());
        if (!dir.exists()) {
            dir.mkdirs();
        }
        relativePath = saveDir + saveFileName + fileType;
        try {
            //读写之前创建文件
            multipartFile.transferTo(new File(relativePath));
        } catch (IOException e) {
            logger.error("保存文件失败", e);
            e.printStackTrace();
        }
        String res = relativePath.substring(relativePath.indexOf("upload"), relativePath.length()).replaceAll("\\\\", "/");
        logger.info("文件" + originalName + "保存的相对路径" + res);
        return res;
    }


    /**
     * 1.function:文件上传
     *
     * @param multipartFiles 上传数组文件
     * @param dirParam       保存路径目录
     * @return 文件保存路径
     */
    public static String uploadArrs(MultipartFile[] multipartFiles, String dirParam) {
        StringBuffer saveDir = new StringBuffer();
        saveDir.append("E:").append(File.separator)
                .append("upload").append(File.separator)
                .append(dirParam).append(File.separator);

        if (multipartFiles == null || multipartFiles.length < 1) {
            return "error";
        }
        //1.初始化文件的保存相对路径
        String relativePath = "";
        //2.文件保存操作
        StringBuffer res = new StringBuffer();
        //2.2路径判断是否存在,保存文件
        File dir = new File(saveDir.toString());
        if (!dir.exists()) {
            dir.mkdirs();
        }
        for (MultipartFile multipartFile : multipartFiles) {
            //2.1生成保存文件名称
            String originalName = multipartFile.getOriginalFilename();
            String fileType = originalName.substring(originalName.lastIndexOf("."), originalName.length());
            String saveFileName = RDateUtils.formatDate(new Date(), RDateUtils.TIME_STAMP_PATTERN);
            relativePath = saveDir + saveFileName + fileType;

            try {
                //读写之前创建文件
                multipartFile.transferTo(new File(relativePath));
            } catch (IOException e) {
                logger.error("保存文件失败", e);
                e.printStackTrace();
            }
            res.append(relativePath.substring(relativePath.indexOf("upload"), relativePath.length()).replaceAll("\\\\", "/")).append(",");
            logger.info("文件" + originalName + "保存的相对路径" + res.toString());
        }

        return res.toString().substring(0,res.length()-1);
    }

    /**
     * 2.function:文件下载
     *
     * @param filePath (文件的全路径)
     * @param response (响应头)
     * @throws IOException
     */
    public static void download(String filePath, HttpServletResponse response) throws IOException {
        //1.创建文件
        File file = new File(filePath);
        //2.文件名称
        String fileName = file.getName().replaceAll(" ", "");
        //3.文件流
        InputStream fis = null;
        byte[] bytes = null;
        try {
            fis = new BufferedInputStream(new FileInputStream(file));
            bytes = new byte[fis.available()];
            fis.read(bytes);
        } catch (FileNotFoundException e) {
            logger.error("文件流创建失败", e);
            e.printStackTrace();
        } finally {
            fis.close();
        }
        //4.设置响应头
        response.reset();
        response.addHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"), "iso8859-1"));
        response.addHeader("Content-Length", String.valueOf(file.length()));
        OutputStream outputStream = new BufferedOutputStream(response.getOutputStream());
        response.setContentType("application/octet-stream");
        //5.字节数组 写入到输出流中
        outputStream.write(bytes);
        outputStream.flush();
        outputStream.close();
    }

    public static String uploadAPK(MultipartFile multipartFile , String dirParam) {
        StringBuffer saveDir = new StringBuffer();
        saveDir.append("E:").append(File.separator)
                .append("upload").append(File.separator)
                .append(dirParam).append(File.separator);

        if (multipartFile == null || multipartFile.isEmpty()) {
            return null;
        }
        //1.初始化文件的保存相对路径
        String relativePath = "";
        //2.文件保存操作
        //2.1生成保存文件名称
        String originalName = multipartFile.getOriginalFilename();
        String fileType = originalName.substring(originalName.lastIndexOf("."), originalName.length());
        String saveFileName = "harlan";
        //2.2路径判断是否存在,保存文件
        File dir = new File(saveDir.toString());
        if (!dir.exists()) {
            dir.mkdirs();
        }
        relativePath = saveDir + saveFileName + fileType;
        try {
            //读写之前创建文件
            multipartFile.transferTo(new File(relativePath));
        } catch (IOException e) {
            logger.error("保存文件失败", e);
            e.printStackTrace();
        }
        String res = relativePath.substring(relativePath.indexOf("upload"), relativePath.length()).replaceAll("\\\\", "/");
        logger.info("文件" + originalName + "保存的相对路径" + res);
        return res;
    }
}
