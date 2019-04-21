package com.cms.service;

import java.util.List;
import java.util.Map;

import com.cms.pojo.DownClassify;

public interface DownloadClassifyService {

    public Integer add(DownClassify downClassify);

    public Integer update(DownClassify downClassify);

    public List<DownClassify> list(Map<String, Object> map);

    public Integer getTotal(Map<String, Object> map);

    public Integer delete(Integer id);

    public DownClassify findById(Integer id);

}
