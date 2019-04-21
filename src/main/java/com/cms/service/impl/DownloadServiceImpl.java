package com.cms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.mapper.DownMapper;
import com.cms.pojo.Down;
import com.cms.service.DownloadService;

@Service("downloadService")
public class DownloadServiceImpl implements DownloadService {

    @Autowired
    private DownMapper downMapper;

    @Override
    public Integer add(Down down) {
        // TODO Auto-generated method stub
        return downMapper.add(down);
    }

    @Override
    public Integer update(Down down) {
        // TODO Auto-generated method stub
        return downMapper.update(down);
    }

    @Override
    public List<Down> list(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return downMapper.list(map);
    }

    @Override
    public Integer getTotal(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return downMapper.getTotal(map);
    }

    @Override
    public Down findById(Integer id) {
        // TODO Auto-generated method stub
        return downMapper.findById(id);
    }

    @Override
    public Integer delete(Integer id) {
        // TODO Auto-generated method stub
        return downMapper.delete(id);
    }

}
