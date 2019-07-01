package com.axej.harlan.order.service;

import com.axej.harlan.order.bean.LogisticsBean;
import org.springframework.web.multipart.MultipartFile;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:17:53 2017/12/15
 */
public interface LogisticsService {
    boolean save(LogisticsBean logisticsBean, MultipartFile os_files);

    boolean update(LogisticsBean logisticsBean,MultipartFile os_files_file);

    boolean delete(int os_id);
}
