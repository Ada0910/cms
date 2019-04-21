package com.cms.mapper;

import com.cms.pojo.MemoClassify;

import java.util.List;
import java.util.Map;


public interface MemoClassifyMapper {
    public Integer add(MemoClassify classify);

    public Integer update(MemoClassify classify);

    public List<MemoClassify> list(Map<String, Object> map);

    public Integer getTotal(Map<String, Object> map);

    public Integer delete(Integer id);

    public MemoClassify findById(Integer id);
}