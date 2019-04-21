package com.cms.mapper;

import com.cms.pojo.Down;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface DownMapper {
    public Integer add(Down down);

    public Integer update(Down down);

    public List<Down> list(Map<String, Object> map);

    public Integer getTotal(Map<String, Object> map);

    public Down findById(Integer id);

    public Integer delete(Integer id);
}