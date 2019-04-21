package com.cms.service;

import com.cms.pojo.Config;

public interface ConfigService {


    public Integer update(Config config);


    public Config findById(Integer id);

}
