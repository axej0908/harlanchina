package com.axej.harlan.common.utils;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:20 2018/3/28
 */
public class ExcelOperateUtils {


    /**
     * 1.get List<Obj> from excel
     *
     * @param file
     * @param object
     * @return
     */
    public static List fromExcel2List(MultipartFile file, Object object) throws IOException, InvalidFormatException, InstantiationException, IllegalAccessException {
        //1.define list for return
        List list = new ArrayList();

        //step1:get workbook obj form file
        Workbook workbook = WorkbookFactory.create(file.getInputStream());

        //step2:get obj fields from obj
        Field[] fields = object.getClass().getDeclaredFields();

        //step3:get sheet form workbook
        Sheet sheet1 = workbook.getSheetAt(0);

        /**
         * step4:foreach row
         */
        for (int rowIndex = 1; rowIndex <= sheet1.getLastRowNum(); rowIndex++) {
            Row row = sheet1.getRow(rowIndex);
            if (row == null){
                continue;
            }
            Cell cell = null;
            object = object.getClass().newInstance();
            for (int columnIndex = 1;columnIndex<row.getLastCellNum();columnIndex++){
                cell = row.getCell(columnIndex);
                try {
                    fields[columnIndex].setAccessible(true);
                    fields[columnIndex].set(object,cell.toString());
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
                System.out.println("foreach属性名称:" + fields[columnIndex].getName() + ",excel列值:" + cell.toString());
            }
            list.add(object);
        }
        return list;
    }
}
