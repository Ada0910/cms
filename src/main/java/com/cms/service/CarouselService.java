package com.cms.service;

import java.util.List;
import java.util.Map;

import com.cms.pojo.Carousel;

/**
 * 轮播图service层
 *
 * @author 谢伟宁
 */
public interface CarouselService {

    public Integer add(Carousel carousel);

    public Integer update(Carousel carousel);

    public List<Carousel> list(Map<String, Object> map);

    public List<Carousel> index_list();

    public Integer getTotal(Map<String, Object> map);

    public Carousel findById(Integer id);

    public Integer delete(Integer id);

}
