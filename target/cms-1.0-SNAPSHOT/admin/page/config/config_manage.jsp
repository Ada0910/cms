<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${title}</title>
    <!-- JSTL -->
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    <!-- JSTL -->
    ${config.headStr} ${config.layuiStr}
    <!-- 加入移动布局 -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
    <!-- 加入移动布局 -->
</head>
<style>
    body {
        padding-top: 10px;
    }

    .layui-table-view {
        margin: 0px 0 !important;
    }

    /*修改table里复选框  有点靠上*/
    .layui-table-cell .layui-form-checkbox {
        top: 6px;
    }

    .layui-table-toolbar {
        overflow: hidden;
        width: 100%;
    }

    /*修复单元格元素，单选框在我的layui-v2.1.5  有点向上的bug 原始是8px改为0px  再宽一点。原始不是60  */
    .layui-form-switch {
        width: 60px;
        margin-top: 0px;
    }
</style>
<body>
<script>

    //打开编辑窗口
    function edit(id) {
        w = 700;
        h = 1200;
        layer.open({
            type: 2,
            title: '修改',
            shadeClose: true,
            shade: 0.8,
            area: ['100%', '100%'],
            content: '/backstage/config/edit?id=' + id //iframe的url
        });
    }

    //子窗口调用 的  关闭窗口方法
    function closeDlg(msg) {
        layer.closeAll();
        layer.msg(msg);
        location.replace(location.href);
    }

    //刷新的方法
    function refresh_() {
        location.replace(location.href);
    }

    function seeImg(url) {
        w = 700;
        h = 600;
        //iframe层
        layer.open({
            type: 2,
            title: '图片',
            shadeClose: true,
            shade: 0.8,
            area: ['100%', '100%'],
            content: url //iframe的url
        });
    }
</script>


<div style=" padding-left: 10px; margin-bottom: 300px;">
    <blockquote class="layui-elem-quote">
        本页面数据为网站的配置数据 <a class="layui-btn layui-btn-normal" target="_blank">请不要随意修改</a>
    </blockquote>

    <div class="layui-form">
        <table class="layui-table">
            <colgroup>
                <col width="150">
                <col>
            </colgroup>

            <thead>
            <tr>
                <th>值</th>
                <th>内容</th>
            </tr>
            </thead>
            <tbody>

            <tr>
                <td>网站名称</td>
                <td>${config.webName}</td>
            </tr>
            <tr>
                <td>公司名称</td>
                <td>${config.stationName }</td>
            </tr>

            <tr>
                <td>网站域名</td>
                <td>${config.webSite }</td>
            </tr>

            <tr>
                <td>headStr</td>

                <td><textarea disabled="disabled" placeholder="headStr"
                              class="layui-textarea">${config.headStr }</textarea></td>
            </tr>

            <tr>
                <td>layui 版本</td>
                <td><textarea disabled="disabled" placeholder="layui 版本"
                              class="layui-textarea">${config.layuiStr }</textarea></td>
            </tr>

            <%--<tr>
                <td>统计代码</td>
                &lt;%&ndash; <td><div  placeholder="统计代码" class="layui-textarea">${config.countStr }</div></td> &ndash;%&gt;
                <td><textarea disabled="disabled" placeholder="统计代码"
                              class="layui-textarea">${config.countStr }</textarea></td>
            </tr>--%>

            <tr>
                <td>后台logo 200*60</td>
                <td><img style="width: 40px; height: 40px;" alt=""
                         src="${config.backstageLogo} "
                         onclick="seeImg('${config.backstageLogo }')"/></td>
            </tr>

            <tr>
                <td>公众号二维码</td>
                <td><img style="width: 40px; height: 40px;" alt=""
                         src="${config.publicNumber } "
                         onclick="seeImg('${config.publicNumber }')"/></td>
            </tr>

            <tr>
                <td>个人 二维码</td>
                <td><img style="width: 40px; height: 40px;" alt=""
                         src=" ${config.personalCode } "
                         onclick="seeImg('${config.personalCode }')"/></td>
            </tr>


            <tr>
                <td>首页导航左边的logo图片</td>
                <td><img style="width: 40px; height: 40px;" alt=""
                         src="${config.logo } " onclick="seeImg('${config.logo }')"/></td>
            </tr>

            <tr>
                <td>首页 标题</td>
                <td>${config.indexPageTitle}</td>
            </tr>

            <tr>
                <td>首页 关键词</td>
                <td>${config.indexPageKeywords}</td>
            </tr>

            <tr>
                <td>首页 描述 摘要</td>
                <td>${config.indexPageDescription}</td>
            </tr>

           <%-- <tr>
                <td>备案信息</td>
                <td><textarea disabled="disabled" placeholder="备案信息"
                              class="layui-textarea">${config.record }</textarea></td>
            </tr>--%>

            <tr>
                <td>版本号</td>
                <td>${config.version}</td>
            </tr>

            <tr>
                <td>页面底部内容</td>
                <td><textarea disabled="disabled" style="height: 500px;"
                              placeholder="页面底部内容" class="layui-textarea">${config.foodInfo }</textarea></td>
            </tr>

            <tr>
                <td>导航内容</td>
                <td><textarea disabled="disabled" style="height: 500px;"
                              placeholder="导航内容" class="layui-textarea">${config.navStr }</textarea></td>
            </tr>


            </tbody>
        </table>
    </div>

    <button onclick="edit(1)" class="layui-btn">修改配置</button>

    <button onclick="refresh_()" class="layui-btn">刷新</button>

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
            , element = layui.element //元素操作
            , form = layui.form;
    });
</script>


</body>
</html>
