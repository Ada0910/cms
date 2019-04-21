<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <!-- JSTL -->
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    ${config.headStr} ${config.layuiStr}
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${config.webName}【${currentUser.trueName }】</title>
    <link href="static/favicon.ico" rel="shortcut icon"/>
    <!-- 加入移动布局 -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>

    <script>
        var add_flag = true;
        var layui_tab_item_height;
        var layui_tab_item_width;

        //这个值是由  manage_top.jsp  里面的一个显示隐藏的侧边的方法控制
        var left_width = 200;

        //遍历选项卡，查询这个id是否存在，存在true  不存在false
        function for_tab(id) {
            add_flag = false;
            $(".layui-tab-title li").each(function () {
                var lay_id = $(this).attr("lay-id");
                console.log(lay_id);
                if (lay_id) {
                    if (lay_id == id) {
                        add_flag = true;
                    }
                }
            });
            return add_flag;
        }

        //可以从子页面传来个 关闭  由我关闭  有时候子页面  也可以直接关闭  某个选择卡-item
        function delete_tab_id(id) {
            element.tabDelete('layer_tab', id);
        }

        $(function () {
            set_layui_tab_item_height();
            set_layui_tab_item_width();
            window.onresize = function () {
                //窗口发生改变时， 重置我们的选项卡窗口  高和宽
                set_layui_tab_item_height();
                set_layui_tab_item_width();
            }
        });

        function set_layui_tab_item_width() {
            var body_width = document.body.offsetWidth;
            layui_tab_item_width = (body_width - left_width);
            console.log("layui_tab_item的宽是:" + layui_tab_item_width);
        }

        function set_layui_tab_item_height() {
            //计算layui-tab-item 需要 设置高是多少      顶部的60  layui-tab-title=41
            var body_height = document.body.offsetHeight;
            layui_tab_item_height = (body_height - 60 - 41);
            $(".layui-tab-item").css("height", layui_tab_item_height + "px");
            console.log("layui_tab_item的高是:" + layui_tab_item_height);
        }

        function addTab(id, title, content) {
            //遍历tab 看看这个id是否存在  如果存在直接切换
            var s = for_tab(id);
            if (s) {
                element.tabChange('layer_tab', id); //切换到 用户点的
                set_layui_tab_item_height();
                set_layui_tab_item_width();

            } else {
                //不存在  添加
                element.tabAdd('layer_tab', {
                    title: title,
                    content: content,
                    id: id
                });

                element.tabChange('layer_tab', id); //切换到 用户点的

                set_layui_tab_item_height();
                set_layui_tab_item_width();
            }
        }


        //这个子页面传来的addtab    这个方法  用得不多。
        function addTab2(id, text, url) {
            //tab 有的话直接复盖
            var content = "<iframe frameborder=0 scrolling='auto' style='width:100%;height:100%' src='" + url + "'></iframe>";
            var s = for_tab(id);
            if (s) {
                //存在删除
                delete_tab_id(id);
            }
            addTab(id, text, content);
        }
    </script>
    <style>
        html, body {
            min-width: 1024px;
            height: 100%;
            overflow: hidden;
        }

        .layui-tab-item {
            overflow-x: scroll;
        }
    </style>
</head>
<body>


<div
        style="display: flex;display: -webkit-flex; flex-direction:column; height: 100%; ">
    <!-- include指令加载页面的各个部分 -->
    <jsp:include page="/admin/common/top_menu.jsp"/>
    <div
            style=" flex:1;-webkit-flex:1;   display: flex;display: -webkit-flex; flex-direction:row;  ">
        <%-- <jsp:include page="${leftPage}" /> --%>
        <jsp:include page="/admin/common/left_menu.jsp"/>
        <div id="main_scroll"
             style="flex:1;-webkit-flex:1;padding-left: 200px;">
            <div class="layui-tab layui-tab-brief" lay-allowclose="true"
                 style="margin: 0;" lay-filter="layer_tab">
                <ul class="layui-tab-title">
                </ul>
                <div class="layui-tab-content" style="padding:0px;"></div>
            </div>
        </div>
    </div>
</div>


<script>
    layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel',
        'upload', 'element'], function () {
        var laydate = layui.laydate, //日期
            laypage = layui.laypage //分页
        layer = layui.layer //弹层
            , table = layui.table //表格
            , carousel = layui.carousel //轮播
            , upload = layui.upload //上传
            , element = layui.element; //元素操作

        //监听导航点击
        element.on('nav(left_menu)', function (elem) {
            //console.log(elem)
            //layer.msg(elem.text());
            var id = $(elem).attr("id");
            var url = $(elem).attr("url");
            var text = $(elem).attr("text");
            var type = $(elem).attr("type");

            var content = "<iframe frameborder=0 scrolling='auto' style='width:100%;height:100%' src='" + url + "'></iframe>";

            switch (type) {
                case '0':
                    //页面内  tab内部   添加  页面
                    addTab(id, text, content);
                    break;
                case '1':
                    //新窗口打开。
                    window.open(url);
                    break;
                case '2':
                    break;
            }

        });
    });
</script>


</body>
</html>