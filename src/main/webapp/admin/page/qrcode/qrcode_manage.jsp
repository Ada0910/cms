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
</style>
<script>
    function sub() {
        var content = $("#content").val();

        $.post("./qrcode/create", {
            content: content
        }, function (result) {
            if (result.success) {
                $("#img").attr('src',  result.path);
            } else {
                layer.msg(result.msg);
            }
        }, 'json');
    }

    function selectFile() {

        /* document.getElementById("select_file").click();  */
        /* document.execCommand('SaveAs'); */

        fileDialog.CancelError = true;
        try {
            fileDialog.Filter = "HTM   Files   (*.html)|*.html|Text   Files   (*.txt)|*.txt";
            fileDialog.ShowSave();
        } catch (e) {
        }

    }
</script>

<body>
<div style="padding: 10px; overflow: hidden;" id="app">

    <div class="layui-form layui-form-pane" style="margin-bottom: 10px;">
        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">内容</label>
            <div class="layui-input-block">
                <textarea id="content" placeholder="请输入内容" class="layui-textarea"></textarea>
            </div>
        </div>


        <div class="layui-form-item btn">
            <button class="layui-btn" lay-submit="" onclick="sub()"
                    lay-filter="demo2">在下方生成
            </button>
           <%-- <button class="layui-btn" lay-submit="" onclick="selectFile()"
                    lay-filter="demo2">保存
            </button>--%>
           <%-- <input type="file" id="select_file" style="display:none" value="保存"></input>--%>

        </div>

    </div>
    <div style="margin-bottom: 10px;">
        <img id="img" alt="" src=""/>
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

    });
</script>


</body>
</html>
