package com.cms.controller;

import com.cms.pojo.User;
import com.cms.service.PublicService;
import com.cms.service.UserService;
import com.cms.util.CryptographyUtil;
import com.cms.util.ResponseUtil;
import net.sf.json.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 用户登录
 *
 * @author 谢伟宁
 */

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private PublicService publicService;

    /**
     * /user/login 电脑登陆
     */
    @RequestMapping("/login")
    public String login(User user, HttpServletResponse response, HttpServletRequest request, RedirectAttributes attr)
            throws Exception {
        JSONObject result = new JSONObject();

        //获得当前“用户”
        Subject subject = SecurityUtils.getSubject();
        //设置login_type的属性值
        SecurityUtils.getSubject().getSession().setAttribute("login_type", "user_login");

        //获取用户名和密码
        UsernamePasswordToken token = new UsernamePasswordToken(user.getName(),
                CryptographyUtil.md5(user.getPassword(), "ada"));
        try {
            subject.login(token); // 登录验证
            // 如果登陆成功 就不会报错 报错就是登陆失败了
            user = userService.findByName(user.getName());
            SecurityUtils.getSubject().getSession().setAttribute("currentUser", user); // 把当前用户信息存到session中
            // return "redirect:/admin/main";
            result.put("success", true);
            result.put("msg", "登陆成功");

            ResponseUtil.write(response, result.toString());
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", false);
            result.put("msg", "帐号或密码错误");

            ResponseUtil.write(response, result.toString());
            return null;
        }
    }

    /**
     * 注销
     *
     * @throws Exception
     */
    @RequestMapping("/logout")
    public String logout() throws Exception {
        SecurityUtils.getSubject().logout(); // shiro的退出
        return "redirect:/login";
    }

    /**
     * 跳转到用户管理页面
     * <p>
     * 时间 2018年11月23日 上午11:27:22
     * 谢伟宁
     *
     * @return
     * @throws Exception
     */
    @RequestMapping("/manage")
    public ModelAndView manage() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.addObject("pageTitle", "用户管理");
        mav.addObject("title", "用户管理");
        mav.setViewName("/admin/page/user/user_manage");
        return mav;
    }

    /**
     * 添加用户
     * <p>
     * 时间 2018年11月23日 下午12:12:18
     * 谢伟宁
     *
     * @return
     * @throws Exception
     */
    @RequestMapping("/add")
    public ModelAndView add() throws Exception {
        ModelAndView mav = new ModelAndView();

        mav.addObject("btn_text", "添加");
        mav.addObject("save_url", "/admin/user/add");

        mav.setViewName("/admin/page/user/add_or_update");
        return mav;
    }

    /**
     * 用户编辑
     * <p>
     * 时间 2018年11月23日 下午2:47:06
     * 谢伟宁
     *
     * @param id
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/edit")
    public ModelAndView edit(@RequestParam(value = "id", required = false) String id
            , HttpServletResponse response
            , HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();

        User user = userService.findById(Integer.parseInt(id));

        mav.addObject("user", user);
        mav.addObject("btn_text", "修改");
        mav.addObject("save_url", "/admin/user/update?id=" + id);

        mav.setViewName("/admin/page/user/add_or_update");
        return mav;
    }

    /**
     * 设置密码
     * <p>
     * 时间 2018年11月23日 下午2:54:50
     * 谢伟宁
     *
     * @param id
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/setPassword")
    public ModelAndView setPassword(@RequestParam(value = "id", required = false) String id,
                                    HttpServletResponse response, HttpServletRequest request) throws Exception {
        //如果id有值就是 更新 如果没有值  就是添加
        ModelAndView mav = new ModelAndView();
        mav.addObject("userId", id);
        mav.addObject("save_url", "/admin/user/update?id=" + id);
        mav.setViewName("admin/page/user/set_password");
        return mav;
    }

    @RequestMapping("/setPersm")
    public ModelAndView setPersm(@RequestParam(value = "id", required = false) String id,
                                 HttpServletResponse response, HttpServletRequest request) throws Exception {

        //如果id有值就是 更新 如果没有值  就是添加
        ModelAndView mav = new ModelAndView();
        mav.addObject("userId", id);
        mav.setViewName("/admin/page/user/set_persm");
        return mav;
    }
}
