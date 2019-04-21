<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <!-- JSTL -->
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    <!-- JSTL -->

    ${config.headStr} ${config.layuiStr}

    <!-- 加入移动布局 -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
    <!-- 加入移动布局 -->

    <!--添加  vue.js 支持加载-->
    <script src="${pageContext.request.contextPath}/static/vue/vue.min.js"></script>
    <!--添加  vue.js 支持加载-->

    <!--添加百度 编辑器  支持加载-->
    <script type="text/javascript" charset="UTF-8"
            src="${pageContext.request.contextPath}/static/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="UTF-8"
            src="${pageContext.request.contextPath}/static/ueditor/ueditor.all.min.js">

    </script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="UTF-8"
            src="${pageContext.request.contextPath}/static/ueditor/lang/zh-cn/zh-cn.js"></script>
    <!--添加百度 编辑器  支持加载-->

    <!--异步上传 js-->
    <script src="${pageContext.request.contextPath}/static/AjaxFileUpload/ajaxfileupload.js"></script>
    <!--异步上传 js-->

    <title>${title}</title>

    <script>
        $(function () {
            if ("${blog.blogClassifyId}" != "") {
                $("#blogClassifyId").val("${blog.blogClassifyId}");
            }

            if ("${blog.displayMode}" != "") {
                $("#displayMode").val("${blog.displayMode}");
            }

        });

        var save_url = '${save_url}';

        function save() {
            var index = layer.msg('提交中，请稍候', {
                icon: 16,
                time: false,
                shade: 0.8
            });

            var isUse = $('input[name="isUse"]:checked').val();
            if (isUse) {
            } else {
                isUse = 0;
            }
            var blogClassifyId = $("#blogClassifyId").val();
            var displayMode = $("#displayMode").val();
            var url = $("url").val();

            app.content = UE.getEditor('editor').getContent();
            app.contentNoTag = UE.getEditor('editor').getContentTxt();
            app.summary = UE.getEditor('editor').getContentTxt().substr(0, 155);

            $.post(save_url, {
                title: app.title,
                content: app.content, displayMode: displayMode,
                contentNoTag: app.contentNoTag, blogClassifyId: blogClassifyId,
                summary: app.summary,
                isUse: isUse,
                thumbnailImage: app.thumbnailImage,
                keywords: app.keywords,
                description: app.description,
           /*     url: app.url*/

            }, function (result) {
                if (result.success) {
                    if (result.btn_disable) {
                        $("#save").attr("onclick", "void();");
                        $("#save").text(result.msg);
                        //询问框
                        layer.confirm(result.msg, {
                            btn: ['好', '我知道了'] //按钮
                        }, function () {
                            layer.closeAll();
                        }, function () {
                            layer.closeAll();
                        });
                        //询问框
                    } else {
                        layer.msg(result.msg, {icon: 1});
                    }

                } else {
                    layer.closeAll();//关闭loading
                    layer.msg(result.msg);
                }
            }, 'json');
        }

        function uploadFile(file) {
            $.ajaxFileUpload({
                url: '/admin/blog/addThumbnailImage', //用于文件上传的服务器端请求地址
                secureuri: false, //一般设置为false
                fileElementId: 'file', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                type: 'post',
                dataType: 'text', //返回值类型 一般设置为json
                success: function (result) //服务器成功响应处理函数
                {
                    var result = eval('(' + result + ')');
                    if (result.success) {
                        app.thumbnailImage = result.path;
                        $("#thumbnailImageDiv").empty();
                        $("#thumbnailImageDiv").append('<img style="width: 200px;" src="' + result.path + '" />');
                    }
                },
                error: function (result)//服务器响应失败处理函数
                {
                }
            });
            return false;
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
<div style="width: 1200px; margin: 0 auto;">
    <div style="height: 100px;"></div>

    <div>
        <div class="layui-form layui-form-pane">

            <div class="layui-form-item">
                <label class="layui-form-label">标题</label>
                <div class="layui-input-block">
                    <input type="text" id="name" autocomplete="off"
                           value="${blog.title }" v-model="title" placeholder="请输入   标题"
                           class="layui-input">
                </div>
            </div>


            <div class="layui-form-item">
                <label class="layui-form-label">分类</label>
                <div class="layui-input-block">
                    <select name="blogClassifyId" id="blogClassifyId"
                            lay-filter="blogClassifyId">
                        <c:forEach var="blogClassify" items="${blogClassifyList}">
                            <option value="${blogClassify.id}">${blogClassify.name}</option>
                        </c:forEach>
                    </select>
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">关键字</label>
                <div class="layui-input-block">
                    <input type="text" id="trueName" autocomplete="off"
                           value="${blog.keywords }" v-model="keywords"
                           placeholder="请输入关键字" class="layui-input">
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">描述</label>
                <div class="layui-input-block">
                    <input type="text" id="trueName" autocomplete="off"
                           value="${blog.description }" v-model="description"
                           placeholder="请输入相关描述"
                           class="layui-input">
                </div>
            </div>

            <%--  <div class="layui-form-item">
                  <label class="layui-form-label">链接地址</label>
                  <div class="layui-input-block">
                      <input type="text" id="trueName" autocomplete="off"
                             value="${blog.url }" v-model="url"
                             placeholder="请输入链接地址"
                             class="layui-input">
                  </div>
              </div>--%>

            <div class="layui-form-item" pane="">
                <label class="layui-form-label">是否显示</label>
                <div class="layui-input-block">
                    <c:choose>
                        <c:when test="${blog.isUse==1}">
                            <input type="checkbox" id="isUse" name="isUse" checked=""
                                   value="1" lay-filter="isUse" lay-skin="switch" lay-text="是|否"/>
                        </c:when>
                        <c:when test="${blog.isUse==0 || blog.isUse==null }">
                            <input type="checkbox" id="isUse" name="isUse" value="1"
                                   lay-filter="isUse" lay-skin="switch" lay-text="是|否"/>
                        </c:when>
                    </c:choose>
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">展示模式</label>
                <div class="layui-input-block">
                    <select name="displayMode" id="displayMode"
                            lay-filter="displayMode">
                        <option value="0">默认</option>
                        <option value="1">全屏模式</option>
                        <option value="2">手机模式</option>
                        <option value="3">无导航-模式</option>
                        <option value="4">无导航-全屏-模式</option>
                    </select>
                </div>
            </div>


            <style>
                .edui-editor {
                    z-index: 1 !important;
                }
            </style>


            <div class="layui-form-item layui-form-text">
                <label class="layui-form-label">内容</label>
                <div class="layui-input-block">
                    <script id="editor" name="content" type="text/plain" style="width:100%;height:600px; "></script>
                    </div>
                    </div>

                    <div class="layui-form-item"
                    style="border-bottom: 1px solid #9E9E9E;">
                        <label class="layui-form-label">封面</label>
                        <div class="layui-input-block">
                        <!-- <input type="file" id="trueName" autocomplete="off" class="layui-input"> -->
                        <input type="file" name="file" id="file" onchange ="uploadFile(this)" class="layui-input" />
                        <div id="thumbnailImageDiv"  style="min-height: 10px;">
                        <img style="width: 200px;" alt="" src="${blog.thumbnailImage }" />
                        </div>
                        </div>
                        </div>

                        <div class="layui-form-item">
                        <div class="layui-input-block" style="margin-left: 0px;">
                        <button id="save" onclick="save()" class="layui-btn" lay-submit="" lay-filter="demo1">${btn_text}</button>
                        <button onclick=" window.opener=null;window.open('','_self');window.close();" class="layui-btn layui-btn-danger">关闭页面</button>
                        </div>
                        </div>

                        </div>
                        </div>


                        <div style = "height: 200px;"> </div>
                        <div></div>

                        <!-- 实例化百度编辑器 -->
                        <script type="text/javascript">
                    var ue = UE.getEditor('editor');
                    </script>


                    <c:if test="${isEdit}">
                    <!-- 实例化编辑器 -->
                    <script type="text/javascript">
                        ue.addListener("ready",function(){
                            // 通过ajax请求数据
                            UE.ajax.request("${pageContext.request.contextPath}/admin/blog/findById",
                                {
                                    method:"post",
                                    async:false,
                                    data:{"id":"${blog.id}"},
                                    onsuccess:function(result){
                                        result=eval("("+result.responseText+")");
                                        UE.getEditor('editor').setContent(result.content);
                                    }
                                });
                        });
                    </script>
                    </c:if>



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
                            data : {}
                        });
                    </script>
</body>
</html>