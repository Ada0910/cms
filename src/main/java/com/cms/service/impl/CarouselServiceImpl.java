package com.cms.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cms.mapper.CarouselMapper;
import com.cms.pojo.Carousel;
import com.cms.service.CarouselService;

/**
 * 轮播图实现的逻辑方法
 *
 * @author 谢伟宁
 */
@Service("carouselService")
public class CarouselServiceImpl implements CarouselService {

    @Autowired
    private CarouselMapper carouselMapper;

    /**
     * 添加
     */
    @Override
    public Integer add(Carousel carousel) {
        // TODO Auto-generated method stub
        return carouselMapper.add(carousel);
    }

    @Override
    public Integer update(Carousel carousel) {
        // TODO Auto-generated method stub
        return carouselMapper.update(carousel);
    }

    @Override
    public List<Carousel> list(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return carouselMapper.list(map);
    }

    @Override
    public List<Carousel> index_list() {
        // TODO Auto-generated method stub
        return carouselMapper.index_list();
    }

    @Override
    public Integer getTotal(Map<String, Object> map) {
        // TODO Auto-generated method stub
        return carouselMapper.getTotal(map);
    }

    @Override
    public Carousel findById(Integer id) {
        // TODO Auto-generated method stub
        return carouselMapper.findById(id);
    }

    @Override
    public Integer delete(Integer id) {
        // TODO Auto-generated method stub
        return carouselMapper.delete(id);
    }

}
