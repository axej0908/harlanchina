package com.axej.harlan.cms.service;

import com.axej.harlan.cms.bean.BuyerInfoEntry;
import com.axej.harlan.cms.dao.BuyerInfoEntryDao;
import com.axej.harlan.common.utils.ExcelOperateUtils;
import com.axej.harlan.common.utils.Query;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
@Service
@Transactional
public class BuyerInfoEntryServiceImpl implements BuyerInfoEntryService {

    @Autowired
    private BuyerInfoEntryDao buyerInfoEntryDao;

    @Override
    public boolean importExcel(MultipartFile file) throws InvalidFormatException, InstantiationException, IllegalAccessException, IOException {
        //step1:parse excel
        List list = ExcelOperateUtils.fromExcel2List(file,new BuyerInfoEntry());
        //step2:saveBatch
        buyerInfoEntryDao.saveBatch(list);
        return true;
    }

    @Override
    public int queryTotal(Query query) {
        return buyerInfoEntryDao.queryTotal(query);
    }

    @Override
    public List<BuyerInfoEntry> queryList(Query query) {
        return buyerInfoEntryDao.queryList(query);
    }
}
