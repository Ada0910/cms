package com.cms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.mapper.DownClassifyMapper;
import com.cms.pojo.DownClassify;
import com.cms.service.DownloadClassifyService;

@Service("downloadClassifyService")
public class DownloadClassifyServiceImpl implements DownloadClassifyService {


    @Autowired
    private DownClassifyMapper downClassifyMapper;

    @Override
    public Integer add(DownClassify downClassify) {
        // TODO Auto-generated method stub
        return downClassifyMapper.add(downClassify);
    }

    @Override
    public Integer update(DownClassify downClassify) {
        // TODO Auto-generated method stub
        return downClassifyMapper.update(downClassify);
    }

    @Override
    public List<DownClassify> list(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return downClassifyMapper.list(map);
    }

    @Override
    public Integer getTotal(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return downClassifyMapper.getTotal(map);
    }

    @Override
    public Integer delete(Integer id) {
        // TODO Auto-generated method stub
        return downClassifyMapper.delete(id);
    }

    @Override
    public DownClassify findById(Integer id) {
        // TODO Auto-generated method stub
        return downClassifyMapper.findById(id);
    }

}
