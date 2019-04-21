package com.cms.controller;

import com.cms.pojo.Down;
import com.cms.pojo.DownClassify;
import com.cms.service.DownloadClassifyService;
import com.cms.service.DownloadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/backstage/down")
public class DownloadController {
	
	@Autowired
	private DownloadService downloadService;
	
	@Autowired
	private DownloadClassifyService downloadClassifyService;
	
	@RequestMapping("/manage")
	public ModelAndView manage() throws Exception {
		ModelAndView mav = new ModelAndView();
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<DownClassify> downClassifyList = downloadClassifyService.list(map );
		mav.addObject("downClassifyList", downClassifyList);
		
		mav.setViewName("/admin/page/down/down_manage");
		return mav;
	}
	
	@RequestMapping("/add")
	public ModelAndView add() throws Exception {
		ModelAndView mav = new ModelAndView();
		
		mav.addObject("title", "添加软件下载");
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<DownClassify> downClassifyList = downloadClassifyService.list(map );
		mav.addObject("downClassifyList", downClassifyList);
		
		
		mav.addObject("btn_text", "添加");
		mav.addObject("save_url", "/admin/down/add");
		mav.setViewName("/admin/page/down/add_or_update");
		return mav;
	}
	
	
	/**
	 * /houtai/blog/edit
	 */
	@RequestMapping("/edit")
	public ModelAndView edit(@RequestParam(value="id",required=false)String id
			,HttpServletResponse response
			,HttpServletRequest request) throws Exception {
		ModelAndView mav = new ModelAndView();
		
		Map<String, Object> map = new HashMap<String, Object>();
		List<DownClassify> downClassifyList = downloadClassifyService.list(map );
		mav.addObject("downClassifyList", downClassifyList);
		
		
		Down down = downloadService.findById(Integer.parseInt(id));
		mav.addObject("title", "修改软件下载-"+down.getTitle());
		
		mav.addObject("isEdit", true);
		
		mav.addObject("down", down);
		mav.addObject("btn_text", "修改");
		mav.addObject("save_url", "/admin/down/update?id="+id);
		mav.setViewName("/admin/page/down/add_or_update");
		return mav;
	}
	

}
