package com.cms.controller.admin;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.cms.pojo.PageBean;
import com.cms.pojo.User;
import com.cms.service.UserService;
import com.cms.util.CryptographyUtil;
import com.cms.util.ResponseUtil;
import com.cms.util.StringUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/admin/user")
public class AdminUserController {

    @Autowired
    private UserService userService;

    /**
     * 返回用户列表
     * <p>
     * 时间 2018年11月23日 下午12:09:40 谢伟宁
     *
     * @param page
     * @param rows
     * @param q
     * @param date1
     * @param date2
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/list")
    public String list(@RequestParam(value = "page", required = false) String page,
                       @RequestParam(value = "limit", required = false) String rows,
                       @RequestParam(value = "q", required = false) String q,
                       @RequestParam(value = "date1", required = false) String date1,
                       @RequestParam(value = "date2", required = false) String date2, HttpServletResponse response,
                       HttpServletRequest request) throws Exception {
        PageBean pageBean = new PageBean(Integer.parseInt(page), Integer.parseInt(rows));
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("start", pageBean.getStart());
        map.put("size", pageBean.getPageSize());
        map.put("q", StringUtil.formatLike(q));
        map.put("date1", date1);
        map.put("date2", date2);

        List<User> list = userService.list(map);
        Integer total = userService.getTotal(map);
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm").create();

        map.clear();
        map.put("data", list);
        map.put("count", total);
        map.put("code", 0);
        map.put("msg", "");
        ResponseUtil.write(response, gson.toJson(map));
        return null;
    }

    /**
     * 修改用户数据
     * <p>
     * 时间 2018年11月23日 下午12:17:17 谢伟宁
     *
     * @param user
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/add")
    public String add(User user, HttpServletResponse response, HttpServletRequest request) throws Exception {
        user.setPassword(CryptographyUtil.md5(user.getPassword(), "ada"));
        user.setCreateDateTime(new Date());

        int resultTotal = userService.add(user);
        JSONObject result = new JSONObject();
        if (resultTotal > 0) {
            result.put("success", true);
            result.put("msg", "添加成功");
        } else {
            result.put("success", false);
            result.put("msg", "添加失败");
        }
        ResponseUtil.write(response, result.toString());
        return null;
    }

    /**
     * 删除选中的ids
     * <p>
     * 时间 2018年11月23日 下午2:42:48
     * 谢伟宁
     *
     * @param ids
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/delete")
    public String delete(@RequestParam(value = "ids", required = false) String ids, HttpServletResponse response)
            throws Exception {
        String[] idsStr = ids.split(",");
        JSONObject result = new JSONObject();

        for (int i = 0; i < idsStr.length; i++) {
            userService.delete(Integer.parseInt(idsStr[i]));
        }
        result.put("success", true);
        ResponseUtil.write(response, result.toString());
        return null;
    }

    /**
     * 用户更新
     * <p>
     * 时间 2018年11月23日 下午2:50:03
     * 谢伟宁
     *
     * @param user
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/update")
    public String update(User user, HttpServletResponse response, HttpServletRequest request) throws Exception {
        if (StringUtil.isNotEmpty(user.getPassword())) {
            user.setPassword(CryptographyUtil.md5(user.getPassword(), "ada"));
        }
        int resultTotal = userService.update(user);
        JSONObject result = new JSONObject();

        if (resultTotal > 0) {
            result.put("success", true);
            result.put("msg", "添加成功");
        } else {
            result.put("success", false);
            result.put("msg", "添加失败");
        }
        ResponseUtil.write(response, result.toString());
        return null;
    }

}
