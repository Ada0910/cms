package com.cms.mapper;

import com.cms.pojo.Carousel;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface CarouselMapper {
    public Integer add(Carousel carousel);

    public Integer update(Carousel carousel);

    public List<Carousel> list(Map<String, Object> map);

    public List<Carousel> index_list();

    public Integer getTotal(Map<String, Object> map);

    public Carousel findById(Integer id);

    public Integer delete(Integer id);
}