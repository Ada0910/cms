package com.cms.util;

import java.io.File;

public class FileUtil {

    /**
     * 创建文件夹 时间 2018年11月19日 下午12:14:38 谢伟宁
     *
     * @param filePath
     * @return
     */
    public static boolean makeDirs(String filePath) {
        File folder = new File(filePath);
        return (folder.exists() && folder.isDirectory()) ? true : folder.mkdirs();
    }

    /**
     * 删除文件夹 时间 2018年11月19日 下午12:15:16 谢伟宁
     *
     * @param fileName
     * @return
     */
    public static boolean deleteFile(String fileName) {
        File file = new File(fileName);
        // 如果文件路径所对应的文件存在，并且是一个文件，则直接删除
        if (file.exists() && file.isFile()) {
            if (file.delete()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
