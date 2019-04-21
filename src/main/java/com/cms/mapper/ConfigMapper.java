package com.cms.mapper;

import com.cms.pojo.Config;


public interface ConfigMapper {
    public Integer update(Config config);

    public Config findById(Integer id);
}