package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.BuyerInfoEntry;
import com.axej.harlan.common.utils.Query;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:43 2018/3/28
 */
public interface BuyerInfoEntryService {
    boolean importExcel(MultipartFile file) throws InvalidFormatException, InstantiationException, IllegalAccessException, IOException;

    int queryTotal(Query query);

    List<BuyerInfoEntry> queryList(Query query);
}
