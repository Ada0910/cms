<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <!-- JSTL -->
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
    <!-- JSTL -->

    ${config.headStr}

    ${config.layuiStr}

    <!-- 加入移动布局 -->
    <meta name="viewport"	content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no" />
    <!-- 加入移动布局 -->

    <!--添加  vue.js 支持加载-->
    <script src="${pageContext.request.contextPath}/static/vue/vue.min.js"></script>
    <!--添加  vue.js 支持加载-->

    <script>
        var save_url = '${save_url}';
        function save(){
            var index = layer.msg('提交中，请稍候',{icon: 16,time:false,shade:0.8});

            var isUse = $('input[name="isUse"]:checked').val();
            if(isUse){
            }else{
                isUse = 0 ;
            }
            $.post(save_url,{
                name:app.name,
                isUse:isUse,
                pos:app.pos,
                orderNo:app.orderNo,
                remark:app.remark
            },function(result){
                if(result.success){
                    //调用 父窗口的  关闭所有窗口 并且刷新 页面
                    window.parent.closeDlg(result.msg);
                }else{
                    layer.closeAll();//关闭loading
                    layer.msg(result.msg);
                }
            },'json');
        }


    </script>
    <style>
        html, body {
        }
        .layui-form-item {
            margin-bottom: 3px;
        }
    </style>
</head>
<body id="app">

<div style="padding: 10px;">
    <div class="layui-form layui-form-pane">

        <div class="layui-form-item">
            <label class="layui-form-label">分类名称</label>
            <div class="layui-input-block">
                <input type="text" id="name" autocomplete="off" value="${classify.name }" v-model="name" placeholder="请输入  分类名称" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">排序号</label>
            <div class="layui-input-block">
                <input type="text" id="trueName" autocomplete="off" value="${classify.orderNo }" v-model="orderNo" placeholder="请输入  排序号" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">显示位置</label>
            <div class="layui-input-block">
                <input type="text" id="trueName" autocomplete="off" value="${classify.pos }" v-model="pos" placeholder="请输入  显示位置" class="layui-input">
            </div>
        </div>


        <div class="layui-form-item" >
            <div class="layui-inline">
                <label class="layui-form-label" style="width: 120px;" >是否展示</label>
                <div class="layui-input-inline" style="width: 100px;" >
                    <c:choose>
                        <c:when test="${classify.isUse==1}">
                            <input type="checkbox" id="isUse" name="isUse"  checked="" value="1" lay-filter="isUse"  lay-skin="switch" lay-text="是|否" />
                        </c:when>
                        <c:when test="${classify.isUse==0 || classify.isUse==null }">
                            <input type="checkbox" id="isUse" name="isUse" value="1" lay-filter="isUse"  lay-skin="switch" lay-text="是|否" />
                        </c:when>
                    </c:choose>
                </div>
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">备注</label>
            <div class="layui-input-block">
                <input type="text" id="remark" autocomplete="off" v-model="remark" value="${classify.remark}" placeholder="请输入备注" class="layui-input">
            </div>
        </div>

    </div>

    <div class="site-demo-button" style="margin-top: 20px;">
        <button id="save" onclick="save()" class="layui-btn site-demo-layedit" data-type="content">${btn_text }</button>
    </div>

</div>


<script>
    layui.use([ 'laydate', 'laypage', 'layer', 'table', 'carousel',
        'upload', 'element' ], function() {
        var laydate = layui.laydate //日期
            , laypage = layui.laypage //分页
        layer = layui.layer //弹层
            , table = layui.table //表格
            , carousel = layui.carousel //轮播
            , upload = layui.upload //上传
            , element = layui.element; //元素操作
    });
</script>
<script>
    var app = new Vue({
        el : '#app',
        data : {
        }
    });

</script>


</body>
</html>