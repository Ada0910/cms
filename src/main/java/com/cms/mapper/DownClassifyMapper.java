package com.cms.mapper;

import com.cms.pojo.DownClassify;

import java.util.List;
import java.util.Map;


public interface DownClassifyMapper {
    public Integer add(DownClassify downClassify);

    public Integer update(DownClassify downClassify);

    public List<DownClassify> list(Map<String, Object> map);

    public Integer getTotal(Map<String, Object> map);

    public Integer delete(Integer id);

    public DownClassify findById(Integer id);
}