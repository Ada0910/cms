package com.cms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.cms.pojo.Down;
import com.cms.pojo.DownClassify;
import com.cms.service.DownloadClassifyService;
import com.cms.service.DownloadService;


@Controller
@RequestMapping("/download")
public class IndexDownloadController {

    @Autowired
    private DownloadService downloadService;
    @Autowired
    private DownloadClassifyService downClassifyService;


    @RequestMapping("/list")
    public ModelAndView down(@RequestParam(value = "id", required = false) Integer id, HttpServletResponse res,
                             HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView();

        if (id == null) {
            mav.addObject("title", "软件下载专区");
        } else {
            DownClassify downClassify = downClassifyService.findById(id);
            mav.addObject("title", downClassify.getName() + "下载");
        }

        mav.addObject("downClassifyId", id);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        List<DownClassify> downClassifyList = downClassifyService.list(map);
        mav.addObject("downClassifyList", downClassifyList);


        map.put("downClassifyId", id);
        List<Down> downList = downloadService.list(map);
        mav.addObject("downList", downList);


        mav.setViewName("/website/download/down_list");
        return mav;
    }


    /**
     * /a/down/get?id=1
     */
    @RequestMapping("/get")
    public ModelAndView get(@RequestParam(value = "id", required = false) Integer id, HttpServletResponse res,
                            HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView();

        Down down = downloadService.findById(id);
        mav.addObject("down", down);

        down.setClickHit(down.getClickHit() + 1);
        downloadService.update(down);

        switch (down.getDisplayMode()) {
            case 0:
                mav.setViewName("/website/down/down_base");
                break;
            case 1:
                mav.setViewName("/website/down/down_full");
                break;
            case 2:
                break;
        }
        return mav;
    }


}
