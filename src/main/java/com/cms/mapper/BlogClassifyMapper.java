package com.cms.mapper;

import com.cms.pojo.BlogClassify;

import java.util.List;
import java.util.Map;

public interface BlogClassifyMapper {
    public Integer add(BlogClassify blogClassify);

    public Integer update(BlogClassify blogClassify);

    public List<BlogClassify> list(Map<String, Object> map);

    public Integer getTotal(Map<String, Object> map);

    public Integer delete(Integer id);

    public BlogClassify findById(Integer id);
}