/**
 * Created with JetBrains PhpStorm.
 * User: xuheng
 * Date: 12-9-26
 * Time: ����12:29
 * To change this template use File | Settings | File Templates.
 */

//����ϴβ�ѡ�ĺۼ�
editor.firstForSR = 0;
editor.currentRangeForSR = null;

//��tabע���л��¼�
/**
 * tab��������¼�
 * @param tabHeads
 * @param tabBodys
 * @param obj
 */
function clickHandler(tabHeads, tabBodys, obj) {
    //head��ʽ����
    for (var k = 0, len = tabHeads.length; k < len; k++) {
        tabHeads[k].className = "";
    }
    obj.className = "focus";
    //body����
    var tabSrc = obj.getAttribute("tabSrc");
    for (var j = 0, length = tabBodys.length; j < length; j++) {
        var body = tabBodys[j],
            id = body.getAttribute("id");
        if (id != tabSrc) {
            body.style.zIndex = 1;
        } else {
            body.style.zIndex = 200;
        }
    }

}

/**
 * TAB�л�
 * @param tabParentId  tab�ĸ��ڵ�ID���߶�����
 */
function switchTab(tabParentId) {
    var tabElements = $G(tabParentId).children,
        tabHeads = tabElements[0].children,
        tabBodys = tabElements[1].children;

    for (var i = 0, length = tabHeads.length; i < length; i++) {
        var head = tabHeads[i];
        if (head.className === "focus") clickHandler(tabHeads, tabBodys, head);
        head.onclick = function () {
            clickHandler(tabHeads, tabBodys, this);
        }
    }
}

$G('searchtab').onmousedown = function () {
    $G('search-msg').innerHTML = '';
    $G('replace-msg').innerHTML = ''
}

//�Ƿ����ִ�Сд
function getMatchCase(id) {
    return $G(id).checked ? true : false;
}

//����
$G("nextFindBtn").onclick = function (txt, dir, mcase) {
    var findtxt = $G("findtxt").value, obj;
    if (!findtxt) {
        return false;
    }
    obj = {
        searchStr: findtxt,
        dir: 1,
        casesensitive: getMatchCase("matchCase")
    };
    if (!frCommond(obj)) {
        var bk = editor.selection.getRange().createBookmark();
        $G('search-msg').innerHTML = lang.getEnd;
        editor.selection.getRange().moveToBookmark(bk).select();


    }
};
$G("nextReplaceBtn").onclick = function (txt, dir, mcase) {
    var findtxt = $G("findtxt1").value, obj;
    if (!findtxt) {
        return false;
    }
    obj = {
        searchStr: findtxt,
        dir: 1,
        casesensitive: getMatchCase("matchCase1")
    };
    frCommond(obj);
};
$G("preFindBtn").onclick = function (txt, dir, mcase) {
    var findtxt = $G("findtxt").value, obj;
    if (!findtxt) {
        return false;
    }
    obj = {
        searchStr: findtxt,
        dir: -1,
        casesensitive: getMatchCase("matchCase")
    };
    if (!frCommond(obj)) {
        $G('search-msg').innerHTML = lang.getStart;
    }
};
$G("preReplaceBtn").onclick = function (txt, dir, mcase) {
    var findtxt = $G("findtxt1").value, obj;
    if (!findtxt) {
        return false;
    }
    obj = {
        searchStr: findtxt,
        dir: -1,
        casesensitive: getMatchCase("matchCase1")
    };
    frCommond(obj);
};
//�滻
$G("repalceBtn").onclick = function () {
    var findtxt = $G("findtxt1").value.replace(/^\s|\s$/g, ""), obj,
        replacetxt = $G("replacetxt").value.replace(/^\s|\s$/g, "");
    if (!findtxt) {
        return false;
    }
    if (findtxt == replacetxt || (!getMatchCase("matchCase1") && findtxt.toLowerCase() == replacetxt.toLowerCase())) {
        return false;
    }
    obj = {
        searchStr: findtxt,
        dir: 1,
        casesensitive: getMatchCase("matchCase1"),
        replaceStr: replacetxt
    };
    frCommond(obj);
};
//ȫ���滻
$G("repalceAllBtn").onclick = function () {
    var findtxt = $G("findtxt1").value.replace(/^\s|\s$/g, ""), obj,
        replacetxt = $G("replacetxt").value.replace(/^\s|\s$/g, "");
    if (!findtxt) {
        return false;
    }
    if (findtxt == replacetxt || (!getMatchCase("matchCase1") && findtxt.toLowerCase() == replacetxt.toLowerCase())) {
        return false;
    }
    obj = {
        searchStr: findtxt,
        casesensitive: getMatchCase("matchCase1"),
        replaceStr: replacetxt,
        all: true
    };
    var num = frCommond(obj);
    if (num) {
        $G('replace-msg').innerHTML = lang.countMsg.replace("{#count}", num);
    }
};
//ִ��
var frCommond = function (obj) {
    return editor.execCommand("searchreplace", obj);
};
switchTab("searchtab");