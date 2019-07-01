package com.axej.harlan.order.service;

import com.axej.harlan.common.utils.FileUtils;
import com.axej.harlan.order.bean.LogisticsBean;
import com.axej.harlan.order.dao.LogisticsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * Description:
 * Created by IntelliJ IDEA
 * @author : jaywechen
 * Date:17:53 2017/12/15
 */
@Service
public class LogisticsServiceImpl implements LogisticsService {
    @Autowired
    private LogisticsDao logisticsDao;

    @Override
    public boolean save(LogisticsBean logisticsBean, MultipartFile os_files) {
        //1.保存文件
        String os = FileUtils.upload(os_files,logisticsBean.getSupv_id());
        //2.设置文件路径
        logisticsBean.setOs_files(os);
        int i = logisticsDao.save(logisticsBean);
        return i == 1 ? true : false;
    }

    @Override
    public boolean update(LogisticsBean logisticsBean,MultipartFile os_files_file) {
        String os = FileUtils.upload(os_files_file,logisticsBean.getSupv_id());
        logisticsBean.setOs_files(os);
        return logisticsDao.update(logisticsBean)==1;
    }

    @Override
    public boolean delete(int os_id) {
        return logisticsDao.delete(os_id)==1;
    }
}
