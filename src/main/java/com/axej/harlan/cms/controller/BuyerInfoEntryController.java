package com.axej.harlan.cms.controller;

import com.axej.harlan.cms.bean.BuyerInfoEntry;
import com.axej.harlan.cms.service.BuyerInfoEntryService;
import com.axej.harlan.common.utils.L;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: excel录入供应商信息
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:08 2018/3/28
 */
@RestController
@RequestMapping(value = "/buyerInfo")
public class BuyerInfoEntryController {

    @Autowired
    private BuyerInfoEntryService buyerInfoEntryService;


    /**
     * 2.query by pager
     * @param page
     * @param limit
     * @param goods_name
     * @return
     */
    public L pager(int page,int limit,String goods_name){
        Map<String,Object> map = new HashMap<>();
        map.put("page",page);
        map.put("limit",limit);
        map.put("goods_name", goods_name);
        Query query = new Query(map);
        List<BuyerInfoEntry> list = buyerInfoEntryService.queryList(query);
        int total = buyerInfoEntryService.queryTotal(query);
        return L.ok(total,list);
    }

    /**
     * 1.importExcel
     * @param file
     * @return
     */
    @RequestMapping(value = "/importExcel")
    public R saveBatch(MultipartFile file) throws IOException, InvalidFormatException, InstantiationException, IllegalAccessException {
        if (file == null || file.getSize() == 0){
            return R.error("error param");
        }
        boolean flag = buyerInfoEntryService.importExcel(file);
        if (flag){
            return R.ok();
        }else {
            return R.error();
        }
    }

}
