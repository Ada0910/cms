// Copyright (c) 2009, Baidu Inc. All rights reserved.
// 
// Licensed under the BSD License
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http:// tangram.baidu.com/license.html
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @namespace T Tangram���ɰ�
 * @name T
 * @version 1.6.0
 */

/**
 * ����baidu��
 * @author: allstar, erik, meizz, berg
 */
var T,
    baidu = T = baidu || {version: "1.5.0"};
baidu.guid = "$BAIDU$";
baidu.$$ = window[baidu.guid] = window[baidu.guid] || {global: {}};

/**
 * ʹ��flash��Դ��װ��һЩ����
 * @namespace baidu.flash
 */
baidu.flash = baidu.flash || {};

/**
 * ����dom�ķ���
 * @namespace baidu.dom
 */
baidu.dom = baidu.dom || {};


/**
 * ���ĵ��л�ȡָ����DOMԪ��
 * @name baidu.dom.g
 * @function
 * @grammar baidu.dom.g(id)
 * @param {string|HTMLElement} id Ԫ�ص�id��DOMԪ��.
 * @shortcut g,T.G
 * @meta standard
 * @see baidu.dom.q
 *
 * @return {HTMLElement|null} ��ȡ��Ԫ�أ����Ҳ���ʱ����null,����������Ϸ���ֱ�ӷ��ز���.
 */
baidu.dom.g = function (id) {
    if (!id) return null;
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};
baidu.g = baidu.G = baidu.dom.g;


/**
 * ��������ķ���
 * @namespace baidu.array
 */

baidu.array = baidu.array || {};


/**
 * ��������������Ԫ��
 * @name baidu.array.each
 * @function
 * @grammar baidu.array.each(source, iterator[, thisObject])
 * @param {Array} source ��Ҫ����������
 * @param {Function} iterator ��ÿ������Ԫ�ؽ��е��õĺ������ú�����������������һ��Ϊ����Ԫ�أ��ڶ���Ϊ��������ֵ��function (item, index)��
 * @param {Object} [thisObject] ��������ʱ��thisָ�룬���û�д˲�����Ĭ���ǵ�ǰ����������
 * @remark
 * each������֧�ֶ�Object�ı���,��Object�ı���ʹ��baidu.object.each ��
 * @shortcut each
 * @meta standard
 *
 * @returns {Array} ����������
 */

baidu.each = baidu.array.forEach = baidu.array.each = function (source, iterator, thisObject) {
    var returnValue, item, i, len = source.length;

    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            returnValue = iterator.call(thisObject || source, item, i);

            if (returnValue === false) {
                break;
            }
        }
    }
    return source;
};

/**
 * �����Բ���ķ�װ�����������жϡ�ģ����չ���̳л����Լ������Զ����¼���֧�֡�
 * @namespace baidu.lang
 */
baidu.lang = baidu.lang || {};


/**
 * �ж�Ŀ������Ƿ�Ϊfunction��Functionʵ��
 * @name baidu.lang.isFunction
 * @function
 * @grammar baidu.lang.isFunction(source)
 * @param {Any} source Ŀ�����
 * @version 1.2
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 * @meta standard
 * @returns {boolean} �����жϽ��
 */
baidu.lang.isFunction = function (source) {
    return '[object Function]' == Object.prototype.toString.call(source);
};

/**
 * �ж�Ŀ������Ƿ�string���ͻ�String����
 * @name baidu.lang.isString
 * @function
 * @grammar baidu.lang.isString(source)
 * @param {Any} source Ŀ�����
 * @shortcut isString
 * @meta standard
 * @see baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *
 * @returns {boolean} �����жϽ��
 */
baidu.lang.isString = function (source) {
    return '[object String]' == Object.prototype.toString.call(source);
};
baidu.isString = baidu.lang.isString;


/**
 * �ж���������ͺ����Ե�����
 * @namespace baidu.browser
 */
baidu.browser = baidu.browser || {};


/**
 * �ж��Ƿ�Ϊopera�����
 * @property opera opera�汾��
 * @grammar baidu.browser.opera
 * @meta standard
 * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.safari,baidu.browser.chrome
 * @returns {Number} opera�汾��
 */

/**
 * opera ��10��ʼ������opera������ַ������а汾���ж�
 * ��Browser identification������Version + ���ֽ��а汾��ʶ
 * opera��������ֱ�����9.80����
 */
baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp["\x246"] || RegExp["\x242"]) : undefined;


/**
 * ��Ŀ��Ԫ�ص�ָ��λ�ò���HTML����
 * @name baidu.dom.insertHTML
 * @function
 * @grammar baidu.dom.insertHTML(element, position, html)
 * @param {HTMLElement|string} element Ŀ��Ԫ�ػ�Ŀ��Ԫ�ص�id
 * @param {string} position ����html��λ����Ϣ��ȡֵΪbeforeBegin,afterBegin,beforeEnd,afterEnd
 * @param {string} html Ҫ�����html
 * @remark
 *
 * ����position��������Сд������<br>
 * ��������˼��beforeBegin&lt;span&gt;afterBegin   this is span! beforeEnd&lt;/span&gt; afterEnd <br />
 * ���⣬���ʹ�ñ������������script��ǩ��HTML�ַ�����script��ǩ��Ӧ�Ľű������ᱻִ�С�
 *
 * @shortcut insertHTML
 * @meta standard
 *
 * @returns {HTMLElement} Ŀ��Ԫ��
 */
baidu.dom.insertHTML = function (element, position, html) {
    element = baidu.dom.g(element);
    var range, begin;
    if (element.insertAdjacentHTML && !baidu.browser.opera) {
        element.insertAdjacentHTML(position, html);
    } else {
        range = element.ownerDocument.createRange();
        position = position.toUpperCase();
        if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
            range.selectNodeContents(element);
            range.collapse(position == 'AFTERBEGIN');
        } else {
            begin = position == 'BEFOREBEGIN';
            range[begin ? 'setStartBefore' : 'setEndAfter'](element);
            range.collapse(begin);
        }
        range.insertNode(range.createContextualFragment(html));
    }
    return element;
};

baidu.insertHTML = baidu.dom.insertHTML;

/**
 * ����flash����ķ�������������flash���󡢻�ȡflash�����Լ��ж�flash����İ汾��
 * @namespace baidu.swf
 */
baidu.swf = baidu.swf || {};


/**
 * �����֧�ֵ�flash����汾
 * @property version �����֧�ֵ�flash����汾
 * @grammar baidu.swf.version
 * @return {String} �汾��
 * @meta standard
 */
baidu.swf.version = (function () {
    var n = navigator;
    if (n.plugins && n.mimeTypes.length) {
        var plugin = n.plugins["Shockwave Flash"];
        if (plugin && plugin.description) {
            return plugin.description
                .replace(/([a-zA-Z]|\s)+/, "")
                .replace(/(\s)+r/, ".") + ".0";
        }
    } else if (window.ActiveXObject && !window.opera) {
        for (var i = 12; i >= 2; i--) {
            try {
                var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
                if (c) {
                    var version = c.GetVariable("$version");
                    return version.replace(/WIN/g, '').replace(/,/g, '.');
                }
            } catch (e) {
            }
        }
    }
})();

/**
 * �����ַ����ķ���
 * @namespace baidu.string
 */
baidu.string = baidu.string || {};


/**
 * ��Ŀ���ַ�������html����
 * @name baidu.string.encodeHTML
 * @function
 * @grammar baidu.string.encodeHTML(source)
 * @param {string} source Ŀ���ַ���
 * @remark
 * �����ַ���5����&<>"'
 * @shortcut encodeHTML
 * @meta standard
 * @see baidu.string.decodeHTML
 *
 * @returns {string} html�������ַ���
 */
baidu.string.encodeHTML = function (source) {
    return String(source)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
};

baidu.encodeHTML = baidu.string.encodeHTML;

/**
 * ����flash�����html�ַ���
 * @name baidu.swf.createHTML
 * @function
 * @grammar baidu.swf.createHTML(options)
 *
 * @param {Object}    options                    ����flash��ѡ�����
 * @param {string}    options.id                    Ҫ������flash�ı�ʶ
 * @param {string}    options.url                flash�ļ���url
 * @param {String}    options.errorMessage        δ��װflash player��flash player�汾�Ź���ʱ����ʾ
 * @param {string}    options.ver                �����Ҫ��flash player�汾��
 * @param {string}    options.width                flash�Ŀ��
 * @param {string}    options.height                flash�ĸ߶�
 * @param {string}    options.align                flash�Ķ��뷽ʽ������ֵ��middle/left/right/top/bottom
 * @param {string}    options.base                �������ڽ���swf�ļ��е��������·�����Ļ���Ŀ¼��URL
 * @param {string}    options.bgcolor            swf�ļ��ı���ɫ
 * @param {string}    options.salign                �������ŵ�swf�ļ�����width��height���ö���������ڵ�λ�á�����ֵ��l/r/t/b/tl/tr/bl/br
 * @param {boolean} options.menu                �Ƿ���ʾ�Ҽ��˵�������ֵ��true/false
 * @param {boolean} options.loop                ���ŵ����һ֡ʱ�Ƿ����²��ţ�����ֵ�� true/false
 * @param {boolean} options.play                flash�Ƿ������������ʱ�Ϳ�ʼ���š�����ֵ��true/false
 * @param {string}    options.quality            ����flash���ŵĻ��ʣ�����ֵ��low/medium/high/autolow/autohigh/best
 * @param {string}    options.scale                ����flash���������������Ӧ���õĿ�ߡ�����ֵ��showall/noborder/exactfit
 * @param {string}    options.wmode                ����flash����ʾģʽ������ֵ��window/opaque/transparent
 * @param {string}    options.allowscriptaccess    ����flash��ҳ���ͨ��Ȩ�ޡ�����ֵ��always/never/sameDomain
 * @param {string}    options.allownetworking    ����swf�ļ�������ʹ�õ�����API������ֵ��all/internal/none
 * @param {boolean} options.allowfullscreen    �Ƿ�����flashȫ��������ֵ��true/false
 * @param {boolean} options.seamlesstabbing    ��������ִ���޷����񣬴Ӷ�ʹ�û�������flashӦ�ó��򡣸ò���ֻ���ڰ�װFlash7�����߰汾��Windows��ʹ�á�����ֵ��true/false
 * @param {boolean} options.devicefont            ���þ�̬�ı������Ƿ����豸������֡�����ֵ��true/false
 * @param {boolean} options.swliveconnect        ��һ�μ���flashʱ������Ƿ�Ӧ����Java������ֵ��true/false
 * @param {Object}    options.vars                Ҫ���ݸ�flash�Ĳ�����֧��JSON��string���͡�
 *
 * @see baidu.swf.create
 * @meta standard
 * @returns {string} flash�����html�ַ���
 */
baidu.swf.createHTML = function (options) {
    options = options || {};
    var version = baidu.swf.version,
        needVersion = options['ver'] || '6.0.0',
        vUnit1, vUnit2, i, k, len, item, tmpOpt = {},
        encodeHTML = baidu.string.encodeHTML;
    for (k in options) {
        tmpOpt[k] = options[k];
    }
    options = tmpOpt;
    if (version) {
        version = version.split('.');
        needVersion = needVersion.split('.');
        for (i = 0; i < 3; i++) {
            vUnit1 = parseInt(version[i], 10);
            vUnit2 = parseInt(needVersion[i], 10);
            if (vUnit2 < vUnit1) {
                break;
            } else if (vUnit2 > vUnit1) {
                return '';
            }
        }
    } else {
        return '';
    }

    var vars = options['vars'],
        objProperties = ['classid', 'codebase', 'id', 'width', 'height', 'align'];
    options['align'] = options['align'] || 'middle';
    options['classid'] = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
    options['codebase'] = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
    options['movie'] = options['url'] || '';
    delete options['vars'];
    delete options['url'];
    if ('string' == typeof vars) {
        options['flashvars'] = vars;
    } else {
        var fvars = [];
        for (k in vars) {
            item = vars[k];
            fvars.push(k + "=" + encodeURIComponent(item));
        }
        options['flashvars'] = fvars.join('&');
    }
    var str = ['<object '];
    for (i = 0, len = objProperties.length; i < len; i++) {
        item = objProperties[i];
        str.push(' ', item, '="', encodeHTML(options[item]), '"');
    }
    str.push('>');
    var params = {
        'wmode': 1,
        'scale': 1,
        'quality': 1,
        'play': 1,
        'loop': 1,
        'menu': 1,
        'salign': 1,
        'bgcolor': 1,
        'base': 1,
        'allowscriptaccess': 1,
        'allownetworking': 1,
        'allowfullscreen': 1,
        'seamlesstabbing': 1,
        'devicefont': 1,
        'swliveconnect': 1,
        'flashvars': 1,
        'movie': 1
    };

    for (k in options) {
        item = options[k];
        k = k.toLowerCase();
        if (params[k] && (item || item === false || item === 0)) {
            str.push('<param name="' + k + '" value="' + encodeHTML(item) + '" />');
        }
    }
    options['src'] = options['movie'];
    options['name'] = options['id'];
    delete options['id'];
    delete options['movie'];
    delete options['classid'];
    delete options['codebase'];
    options['type'] = 'application/x-shockwave-flash';
    options['pluginspage'] = 'http://www.macromedia.com/go/getflashplayer';
    str.push('<embed');
    var salign;
    for (k in options) {
        item = options[k];
        if (item || item === false || item === 0) {
            if ((new RegExp("^salign\x24", "i")).test(k)) {
                salign = item;
                continue;
            }

            str.push(' ', k, '="', encodeHTML(item), '"');
        }
    }

    if (salign) {
        str.push(' salign="', encodeHTML(salign), '"');
    }
    str.push('></embed></object>');

    return str.join('');
};


/**
 * ��ҳ���д���һ��flash����
 * @name baidu.swf.create
 * @function
 * @grammar baidu.swf.create(options[, container])
 *
 * @param {Object}    options                    ����flash��ѡ�����
 * @param {string}    options.id                    Ҫ������flash�ı�ʶ
 * @param {string}    options.url                flash�ļ���url
 * @param {String}    options.errorMessage        δ��װflash player��flash player�汾�Ź���ʱ����ʾ
 * @param {string}    options.ver                �����Ҫ��flash player�汾��
 * @param {string}    options.width                flash�Ŀ��
 * @param {string}    options.height                flash�ĸ߶�
 * @param {string}    options.align                flash�Ķ��뷽ʽ������ֵ��middle/left/right/top/bottom
 * @param {string}    options.base                �������ڽ���swf�ļ��е��������·�����Ļ���Ŀ¼��URL
 * @param {string}    options.bgcolor            swf�ļ��ı���ɫ
 * @param {string}    options.salign                �������ŵ�swf�ļ�����width��height���ö���������ڵ�λ�á�����ֵ��l/r/t/b/tl/tr/bl/br
 * @param {boolean} options.menu                �Ƿ���ʾ�Ҽ��˵�������ֵ��true/false
 * @param {boolean} options.loop                ���ŵ����һ֡ʱ�Ƿ����²��ţ�����ֵ�� true/false
 * @param {boolean} options.play                flash�Ƿ������������ʱ�Ϳ�ʼ���š�����ֵ��true/false
 * @param {string}    options.quality            ����flash���ŵĻ��ʣ�����ֵ��low/medium/high/autolow/autohigh/best
 * @param {string}    options.scale                ����flash���������������Ӧ���õĿ�ߡ�����ֵ��showall/noborder/exactfit
 * @param {string}    options.wmode                ����flash����ʾģʽ������ֵ��window/opaque/transparent
 * @param {string}    options.allowscriptaccess    ����flash��ҳ���ͨ��Ȩ�ޡ�����ֵ��always/never/sameDomain
 * @param {string}    options.allownetworking    ����swf�ļ�������ʹ�õ�����API������ֵ��all/internal/none
 * @param {boolean} options.allowfullscreen    �Ƿ�����flashȫ��������ֵ��true/false
 * @param {boolean} options.seamlesstabbing    ��������ִ���޷����񣬴Ӷ�ʹ�û�������flashӦ�ó��򡣸ò���ֻ���ڰ�װFlash7�����߰汾��Windows��ʹ�á�����ֵ��true/false
 * @param {boolean} options.devicefont            ���þ�̬�ı������Ƿ����豸������֡�����ֵ��true/false
 * @param {boolean} options.swliveconnect        ��һ�μ���flashʱ������Ƿ�Ӧ����Java������ֵ��true/false
 * @param {Object}    options.vars                Ҫ���ݸ�flash�Ĳ�����֧��JSON��string���͡�
 *
 * @param {HTMLElement|string} [container]        flash����ĸ�����Ԫ�أ������ݸò���ʱ�ڵ�ǰ����λ�ô���flash����
 * @meta standard
 * @see baidu.swf.createHTML,baidu.swf.getMovie
 */
baidu.swf.create = function (options, target) {
    options = options || {};
    var html = baidu.swf.createHTML(options)
        || options['errorMessage']
        || '';

    if (target && 'string' == typeof target) {
        target = document.getElementById(target);
    }
    baidu.dom.insertHTML(target || document.body, 'beforeEnd', html);
};
/**
 * �ж��Ƿ�Ϊie�����
 * @name baidu.browser.ie
 * @field
 * @grammar baidu.browser.ie
 * @returns {Number} IE�汾��
 */
baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || +RegExp['\x241']) : undefined;

/**
 * �Ƴ������е���
 * @name baidu.array.remove
 * @function
 * @grammar baidu.array.remove(source, match)
 * @param {Array} source ��Ҫ�Ƴ��������
 * @param {Any} match Ҫ�Ƴ�����
 * @meta standard
 * @see baidu.array.removeAt
 *
 * @returns {Array} �Ƴ��������
 */
baidu.array.remove = function (source, match) {
    var len = source.length;

    while (len--) {
        if (len in source && source[len] === match) {
            source.splice(len, 1);
        }
    }
    return source;
};

/**
 * �ж�Ŀ������Ƿ�Array����
 * @name baidu.lang.isArray
 * @function
 * @grammar baidu.lang.isArray(source)
 * @param {Any} source Ŀ�����
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *
 * @returns {boolean} �����жϽ��
 */
baidu.lang.isArray = function (source) {
    return '[object Array]' == Object.prototype.toString.call(source);
};


/**
 * ��һ������ת����array
 * @name baidu.lang.toArray
 * @function
 * @grammar baidu.lang.toArray(source)
 * @param {mix} source ��Ҫת����array�ı���
 * @version 1.3
 * @meta standard
 * @returns {array} ת�����array
 */
baidu.lang.toArray = function (source) {
    if (source === null || source === undefined)
        return [];
    if (baidu.lang.isArray(source))
        return source;
    if (typeof source.length !== 'number' || typeof source === 'string' || baidu.lang.isFunction(source)) {
        return [source];
    }
    if (source.item) {
        var l = source.length, array = new Array(l);
        while (l--)
            array[l] = source[l];
        return array;
    }

    return [].slice.call(source);
};

/**
 * ���flash�����ʵ��
 * @name baidu.swf.getMovie
 * @function
 * @grammar baidu.swf.getMovie(name)
 * @param {string} name flash���������
 * @see baidu.swf.create
 * @meta standard
 * @returns {HTMLElement} flash�����ʵ��
 */
baidu.swf.getMovie = function (name) {
    var movie = document[name], ret;
    return baidu.browser.ie == 9 ?
        movie && movie.length ?
            (ret = baidu.array.remove(baidu.lang.toArray(movie), function (item) {
                return item.tagName.toLowerCase() != "embed";
            })).length == 1 ? ret[0] : ret
            : movie
        : movie || window[name];
};


baidu.flash._Base = (function () {

    var prefix = 'bd__flash__';

    /**
     * ����һ��������ַ���
     * @private
     * @return {String}
     */
    function _createString() {
        return prefix + Math.floor(Math.random() * 2147483648).toString(36);
    };

    /**
     * ���flash״̬
     * @private
     * @param {Object} target flash����
     * @return {Boolean}
     */
    function _checkReady(target) {
        if (typeof target !== 'undefined' && typeof target.flashInit !== 'undefined' && target.flashInit()) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * ����֮ǰ����ѹջ�ĺ���
     * @private
     * @param {Array} callQueue ���ö���
     * @param {Object} target flash����
     * @return {Null}
     */
    function _callFn(callQueue, target) {
        var result = null;

        callQueue = callQueue.reverse();
        baidu.each(callQueue, function (item) {
            result = target.call(item.fnName, item.params);
            item.callBack(result);
        });
    };

    /**
     * Ϊ�����������������������
     * @private
     * @param {String|Function} fun ����������������ߺ�����
     * @return {String}
     */
    function _createFunName(fun) {
        var name = '';

        if (baidu.lang.isFunction(fun)) {
            name = _createString();
            window[name] = function () {
                fun.apply(window, arguments);
            };

            return name;
        } else if (baidu.lang.isString) {
            return fun;
        }
    };

    /**
     * ����flash
     * @private
     * @param {Object} options ��������
     * @return {Object}
     */
    function _render(options) {
        if (!options.id) {
            options.id = _createString();
        }

        var container = options.container || '';
        delete(options.container);

        baidu.swf.create(options, container);

        return baidu.swf.getMovie(options.id);
    };

    return function (options, callBack) {
        var me = this,
            autoRender = (typeof options.autoRender !== 'undefined' ? options.autoRender : true),
            createOptions = options.createOptions || {},
            target = null,
            isReady = false,
            callQueue = [],
            timeHandle = null,
            callBack = callBack || [];

        /**
         * ��flash�ļ����Ƶ�ҳ����
         * @public
         * @return {Null}
         */
        me.render = function () {
            target = _render(createOptions);

            if (callBack.length > 0) {
                baidu.each(callBack, function (funName, index) {
                    callBack[index] = _createFunName(options[funName] || new Function());
                });
            }
            me.call('setJSFuncName', [callBack]);
        };

        /**
         * ����flash״̬
         * @return {Boolean}
         */
        me.isReady = function () {
            return isReady;
        };

        /**
         * ����flash�ӿڵ�ͳһ���
         * @param {String} fnName ���õĺ�����
         * @param {Array} params ����Ĳ�����ɵ�����,������Ҫ�������贫�������
         * @param {Function} [callBack] �첽���ú󽫷���ֵ��Ϊ�����ĵ��ûص����������޷���ֵ�����Բ�����˲���
         * @return {Null}
         */
        me.call = function (fnName, params, callBack) {
            if (!fnName) return null;
            callBack = callBack || new Function();

            var result = null;

            if (isReady) {
                result = target.call(fnName, params);
                callBack(result);
            } else {
                callQueue.push({
                    fnName: fnName,
                    params: params,
                    callBack: callBack
                });

                (!timeHandle) && (timeHandle = setInterval(_check, 200));
            }
        };

        /**
         * Ϊ�����������������������
         * @public
         * @param {String|Function} fun ����������������ߺ�����
         * @return {String}
         */
        me.createFunName = function (fun) {
            return _createFunName(fun);
        };

        /**
         * ���flash�Ƿ�ready�� �����е���
         * @private
         * @return {Null}
         */
        function _check() {
            if (_checkReady(target)) {
                clearInterval(timeHandle);
                timeHandle = null;
                _call();

                isReady = true;
            }
        };

        /**
         * ����֮ǰ����ѹջ�ĺ���
         * @private
         * @return {Null}
         */
        function _call() {
            _callFn(callQueue, target);
            callQueue = [];
        }

        autoRender && me.render();
    };
})();


/**
 * ����flash based imageUploader
 * @class
 * @grammar baidu.flash.imageUploader(options)
 * @param {Object} createOptions ����flashʱ��Ҫ�Ĳ����������baidu.swf.create�ĵ�
 * @config {Object} vars ����imageUploaderʱ����Ҫ�Ĳ���
 * @config {Number} vars.gridWidth ÿһ��Ԥ��ͼƬ��ռ�Ŀ�ȣ�Ӧ��Ϊflash��������
 * @config {Number} vars.gridHeight ÿһ��Ԥ��ͼƬ��ռ�ĸ߶ȣ�Ӧ��Ϊflash�ߵ�����
 * @config {Number} vars.picWidth ����Ԥ��ͼƬ�Ŀ��
 * @config {Number} vars.picHeight ����Ԥ��ͼƬ�ĸ߶�
 * @config {String} vars.uploadDataFieldName POST������ͼƬ���ݵ�key,Ĭ��ֵ'picdata'
 * @config {String} vars.picDescFieldName POST������ͼƬ������key,Ĭ��ֵ'picDesc'
 * @config {Number} vars.maxSize �ļ���������,��λ'MB'
 * @config {Number} vars.compressSize �ϴ�ǰ���ͼƬ���������ֵ������ѹ��
 * @config {Number} vars.maxNum:32 ����ϴ����ٸ��ļ�
 * @config {Number} vars.compressLength �ܽ��ܵ����߳���������ֵ��ȱ�ѹ��
 * @config {String} vars.url �ϴ���url��ַ
 * @config {Number} vars.mode mode == 0ʱ����ʹ�ù�������mode == 1ʱ������flash, Ĭ��ֵΪ0
 * @see baidu.swf.createHTML
 * @param {String} backgroundUrl ����ͼƬ·��
 * @param {String} listBacgroundkUrl ���ֿؼ�����
 * @param {String} buttonUrl ��ťͼƬ������
 * @param {String|Function} selectFileCallback ѡ���ļ��Ļص�
 * @param {String|Function} exceedFileCallback�ļ��������Ƶ�������ʱ�Ļص�
 * @param {String|Function} deleteFileCallback ɾ���ļ��Ļص�
 * @param {String|Function} startUploadCallback ��ʼ�ϴ�ĳ���ļ�ʱ�Ļص�
 * @param {String|Function} uploadCompleteCallback ĳ���ļ��ϴ���ɵĻص�
 * @param {String|Function} uploadErrorCallback ĳ���ļ��ϴ�ʧ�ܵĻص�
 * @param {String|Function} allCompleteCallback ȫ���ϴ����ʱ�Ļص�
 * @param {String|Function} changeFlashHeight �ı�Flash�ĸ߶ȣ�mode==1��ʱ�������
 */
baidu.flash.imageUploader = baidu.flash.imageUploader || function (options) {

    var me = this,
        options = options || {},
        _flash = new baidu.flash._Base(options, [
            'selectFileCallback',
            'exceedFileCallback',
            'deleteFileCallback',
            'startUploadCallback',
            'uploadCompleteCallback',
            'uploadErrorCallback',
            'allCompleteCallback',
            'changeFlashHeight'
        ]);
    /**
     * ��ʼ��ظ��ϴ�ͼƬ
     * @public
     * @return {Null}
     */
    me.upload = function () {
        _flash.call('upload');
    };

    /**
     * ��ͣ�ϴ�ͼƬ
     * @public
     * @return {Null}
     */
    me.pause = function () {
        _flash.call('pause');
    };
    me.addCustomizedParams = function (index, obj) {
        _flash.call('addCustomizedParams', [index, obj]);
    }
};

/**
 * ����ԭ������ķ���
 * @namespace baidu.object
 */
baidu.object = baidu.object || {};


/**
 * ��Դ������������Կ�����Ŀ�������
 * @author erik
 * @name baidu.object.extend
 * @function
 * @grammar baidu.object.extend(target, source)
 * @param {Object} target Ŀ�����
 * @param {Object} source Դ����
 * @see baidu.array.merge
 * @remark
 *
 1.Ŀ������У���Դ����key��ͬ�ĳ�Ա���ᱻ���ǡ�<br>
 2.Դ�����prototype��Ա���´����

 * @shortcut extend
 * @meta standard
 *
 * @returns {Object} Ŀ�����
 */
baidu.extend =
    baidu.object.extend = function (target, source) {
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }

        return target;
    };


/**
 * ����flash based fileUploader
 * @class
 * @grammar baidu.flash.fileUploader(options)
 * @param {Object} options
 * @config {Object} createOptions ����flashʱ��Ҫ�Ĳ����������baidu.swf.create�ĵ�
 * @config {String} createOptions.width
 * @config {String} createOptions.height
 * @config {Number} maxNum ����ѡ�ļ���
 * @config {Function|String} selectFile
 * @config {Function|String} exceedMaxSize
 * @config {Function|String} deleteFile
 * @config {Function|String} uploadStart
 * @config {Function|String} uploadComplete
 * @config {Function|String} uploadError
 * @config {Function|String} uploadProgress
 */
baidu.flash.fileUploader = baidu.flash.fileUploader || function (options) {
    var me = this,
        options = options || {};

    options.createOptions = baidu.extend({
        wmod: 'transparent'
    }, options.createOptions || {});

    var _flash = new baidu.flash._Base(options, [
        'selectFile',
        'exceedMaxSize',
        'deleteFile',
        'uploadStart',
        'uploadComplete',
        'uploadError',
        'uploadProgress'
    ]);

    _flash.call('setMaxNum', options.maxNum ? [options.maxNum] : [1]);

    /**
     * ���õ�����ƶ���flash��ʱ���Ƿ�������
     * @public
     * @param {Boolean} isCursor
     * @return {Null}
     */
    me.setHandCursor = function (isCursor) {
        _flash.call('setHandCursor', [isCursor || false]);
    };

    /**
     * ���������Ӧ������
     * @param {String|Function} fun
     */
    me.setMSFunName = function (fun) {
        _flash.call('setMSFunName', [_flash.createFunName(fun)]);
    };

    /**
     * ִ���ϴ�����
     * @param {String} url �ϴ���url
     * @param {String} fieldName �ϴ��ı��ֶ���
     * @param {Object} postData ��ֵ�ԣ��ϴ���POST����
     * @param {Number|Array|null|-1} [index]�ϴ����ļ�����
     *                            Intֵ�ϴ����ļ�
     *                            Arrayһ�δ����ϴ��������ļ�
     *                            -1/null�ϴ������ļ�
     * @return {Null}
     */
    me.upload = function (url, fieldName, postData, index) {

        if (typeof url !== 'string' || typeof fieldName !== 'string') return null;
        if (typeof index === 'undefined') index = -1;

        _flash.call('upload', [url, fieldName, postData, index]);
    };

    /**
     * ȡ���ϴ�����
     * @public
     * @param {Number|-1} index
     */
    me.cancel = function (index) {
        if (typeof index === 'undefined') index = -1;
        _flash.call('cancel', [index]);
    };

    /**
     * ɾ���ļ�
     * @public
     * @param {Number|Array} [index] Ҫɾ����index��������ȫ��ɾ��
     * @param {Function} callBack
     * */
    me.deleteFile = function (index, callBack) {

        var callBackAll = function (list) {
            callBack && callBack(list);
        };

        if (typeof index === 'undefined') {
            _flash.call('deleteFilesAll', [], callBackAll);
            return;
        }
        ;

        if (typeof index === 'Number') index = [index];
        index.sort(function (a, b) {
            return b - a;
        });
        baidu.each(index, function (item) {
            _flash.call('deleteFileBy', item, callBackAll);
        });
    };

    /**
     * ����ļ����ͣ�֧��macType
     * @public
     * @param {Object|Array[Object]} type {description:String, extention:String}
     * @return {Null};
     */
    me.addFileType = function (type) {
        var type = type || [[]];

        if (type instanceof Array) type = [type];
        else type = [[type]];
        _flash.call('addFileTypes', type);
    };

    /**
     * �����ļ����ͣ�֧��macType
     * @public
     * @param {Object|Array[Object]} type {description:String, extention:String}
     * @return {Null};
     */
    me.setFileType = function (type) {
        var type = type || [[]];

        if (type instanceof Array) type = [type];
        else type = [[type]];
        _flash.call('setFileTypes', type);
    };

    /**
     * ���ÿ�ѡ�ļ�����������
     * @public
     * @param {Number} num
     * @return {Null}
     */
    me.setMaxNum = function (num) {
        _flash.call('setMaxNum', [num]);
    };

    /**
     * ���ÿ�ѡ�ļ���С���ƣ�����MΪ��λ
     * @public
     * @param {Number} num,0Ϊ������
     * @return {Null}
     */
    me.setMaxSize = function (num) {
        _flash.call('setMaxSize', [num]);
    };

    /**
     * @public
     */
    me.getFileAll = function (callBack) {
        _flash.call('getFileAll', [], callBack);
    };

    /**
     * @public
     * @param {Number} index
     * @param {Function} [callBack]
     */
    me.getFileByIndex = function (index, callBack) {
        _flash.call('getFileByIndex', [], callBack);
    };

    /**
     * @public
     * @param {Number} index
     * @param {function} [callBack]
     */
    me.getStatusByIndex = function (index, callBack) {
        _flash.call('getStatusByIndex', [], callBack);
    };
};

/**
 * ʹ�ö�̬script��ǩ�����������Դ�������ɷ������˵Ļص���������˵Ļص�
 * @namespace baidu.sio
 */
baidu.sio = baidu.sio || {};

/**
 *
 * @param {HTMLElement} src script�ڵ�
 * @param {String} url script�ڵ�ĵ�ַ
 * @param {String} [charset] ����
 */
baidu.sio._createScriptTag = function (scr, url, charset) {
    scr.setAttribute('type', 'text/javascript');
    charset && scr.setAttribute('charset', charset);
    scr.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(scr);
};

/**
 * ɾ��script�����ԣ���ɾ��script��ǩ���Խ���޸��ڴ�й©������
 *
 * @param {HTMLElement} src script�ڵ�
 */
baidu.sio._removeScriptTag = function (scr) {
    if (scr.clearAttributes) {
        scr.clearAttributes();
    } else {
        for (var attr in scr) {
            if (scr.hasOwnProperty(attr)) {
                delete scr[attr];
            }
        }
    }
    if (scr && scr.parentNode) {
        scr.parentNode.removeChild(scr);
    }
    scr = null;
};


/**
 * ͨ��script��ǩ�������ݣ����������������˴����ص�
 * @name baidu.sio.callByBrowser
 * @function
 * @grammar baidu.sio.callByBrowser(url, opt_callback, opt_options)
 * @param {string} url �������ݵ�url
 * @param {Function|string} opt_callback ���ݼ��ؽ���ʱ���õĺ���������
 * @param {Object} opt_options ������ѡ��
 * @config {String} [charset] script���ַ���
 * @config {Integer} [timeOut] ��ʱʱ�䣬�������ʱ�佫������Ӧ�����󣬲�����onfailure����
 * @config {Function} [onfailure] timeOut�趨�����Ч�����ﳬʱʱ��ʱ����������
 * @remark
 * 1����callByServer��ͬ��callback����ֻ֧��Function���ͣ���֧��string��
 * 2�����������һ�������ڵ�ҳ�棬callback������IE/opera��Ҳ�ᱻ���ã����ʹ������Ҫ��onsuccess�������ж������Ƿ���ȷ���ء�
 * @meta standard
 * @see baidu.sio.callByServer
 */
baidu.sio.callByBrowser = function (url, opt_callback, opt_options) {
    var scr = document.createElement("SCRIPT"),
        scriptLoaded = 0,
        options = opt_options || {},
        charset = options['charset'],
        callback = opt_callback || function () {
        },
        timeOut = options['timeOut'] || 0,
        timer;
    scr.onload = scr.onreadystatechange = function () {
        if (scriptLoaded) {
            return;
        }

        var readyState = scr.readyState;
        if ('undefined' == typeof readyState
            || readyState == "loaded"
            || readyState == "complete") {
            scriptLoaded = 1;
            try {
                callback();
                clearTimeout(timer);
            } finally {
                scr.onload = scr.onreadystatechange = null;
                baidu.sio._removeScriptTag(scr);
            }
        }
    };

    if (timeOut) {
        timer = setTimeout(function () {
            scr.onload = scr.onreadystatechange = null;
            baidu.sio._removeScriptTag(scr);
            options.onfailure && options.onfailure();
        }, timeOut);
    }

    baidu.sio._createScriptTag(scr, url, charset);
};

/**
 * ͨ��script��ǩ�������ݣ���������ɷ������˴����ص�
 * @name baidu.sio.callByServer
 * @function
 * @grammar baidu.sio.callByServer(url, callback[, opt_options])
 * @param {string} url �������ݵ�url.
 * @param {Function|string} callback �������˵��õĺ��������������û��ָ��������������URL��Ѱ��options['queryField']��Ϊcallback�ķ�����.
 * @param {Object} opt_options ��������ʱ��ѡ��.
 * @config {string} [charset] script���ַ���
 * @config {string} [queryField] ��������callback�����ֶ�����Ĭ��Ϊcallback
 * @config {Integer} [timeOut] ��ʱʱ��(��λ��ms)���������ʱ�佫������Ӧ�����󣬲�����onfailure����
 * @config {Function} [onfailure] timeOut�趨�����Ч�����ﳬʱʱ��ʱ����������
 * @remark
 * ���url���Ѿ�����keyΪ��options['queryField']����query����ᱻ�滻��callback�в������ݻ��Զ����ɵĺ�������
 * @meta standard
 * @see baidu.sio.callByBrowser
 */
baidu.sio.callByServer = /**@function*/function (url, callback, opt_options) {
    var scr = document.createElement('SCRIPT'),
        prefix = 'bd__cbs__',
        callbackName,
        callbackImpl,
        options = opt_options || {},
        charset = options['charset'],
        queryField = options['queryField'] || 'callback',
        timeOut = options['timeOut'] || 0,
        timer,
        reg = new RegExp('(\\?|&)' + queryField + '=([^&]*)'),
        matches;

    if (baidu.lang.isFunction(callback)) {
        callbackName = prefix + Math.floor(Math.random() * 2147483648).toString(36);
        window[callbackName] = getCallBack(0);
    } else if (baidu.lang.isString(callback)) {
        callbackName = callback;
    } else {
        if (matches = reg.exec(url)) {
            callbackName = matches[2];
        }
    }

    if (timeOut) {
        timer = setTimeout(getCallBack(1), timeOut);
    }
    url = url.replace(reg, '\x241' + queryField + '=' + callbackName);

    if (url.search(reg) < 0) {
        url += (url.indexOf('?') < 0 ? '?' : '&') + queryField + '=' + callbackName;
    }
    baidu.sio._createScriptTag(scr, url, charset);

    /*
     * ����һ����������������������window�ϣ����߳�ʱ������setTimeout�У�ʱִ��
     */
    function getCallBack(onTimeOut) {
        /*global callbackName, callback, scr, options;*/
        return function () {
            try {
                if (onTimeOut) {
                    options.onfailure && options.onfailure();
                } else {
                    callback.apply(window, arguments);
                    clearTimeout(timer);
                }
                window[callbackName] = null;
                delete window[callbackName];
            } catch (exception) {
            } finally {
                baidu.sio._removeScriptTag(scr);
            }
        }
    }
};

/**
 * ͨ������һ��ͼƬ�ķ�ʽ��������洢һ����־
 * @function
 * @grammar baidu.sio.log(url)
 * @param {string} url Ҫ���͵ĵ�ַ.
 * @author: int08h,leeight
 */
baidu.sio.log = function (url) {
    var img = new Image(),
        key = 'tangram_sio_log_' + Math.floor(Math.random() *
            2147483648).toString(36);
    window[key] = img;

    img.onload = img.onerror = img.onabort = function () {
        img.onload = img.onerror = img.onabort = null;

        window[key] = null;
        img = null;
    };
    img.src = url;
};


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */


/**
 * ����json����ķ���
 * @namespace baidu.json
 */
baidu.json = baidu.json || {};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/parse.js
 * author: erik, berg
 * version: 1.2
 * date: 2009/11/23
 */


/**
 * ���ַ���������json����ע�������Զ�����ո�
 * @name baidu.json.parse
 * @function
 * @grammar baidu.json.parse(data)
 * @param {string} source ��Ҫ�������ַ���
 * @remark
 * �÷�����ʵ����ecma-262������й涨��JSON.parse��ͬ����ʱֻ֧�ִ���һ����������������й��ܷḻ��
 * @meta standard
 * @see baidu.json.stringify,baidu.json.decode
 *
 * @returns {JSON} �������json����
 */
baidu.json.parse = function (data) {
    //2010/12/09����������ʹ��ԭ��parse��������û������Ƿ���ȷ
    return (new Function("return (" + data + ")"))();
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/decode.js
 * author: erik, cat
 * version: 1.3.4
 * date: 2010/12/23
 */


/**
 * ���ַ���������json����Ϊ��ʱ�ӿڣ����ᱻbaidu.json.parse����
 * @name baidu.json.decode
 * @function
 * @grammar baidu.json.decode(source)
 * @param {string} source ��Ҫ�������ַ���
 * @meta out
 * @see baidu.json.encode,baidu.json.parse
 *
 * @returns {JSON} �������json����
 */
baidu.json.decode = baidu.json.parse;
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/stringify.js
 * author: erik
 * version: 1.1.0
 * date: 2010/01/11
 */


/**
 * ��json�������л�
 * @name baidu.json.stringify
 * @function
 * @grammar baidu.json.stringify(value)
 * @param {JSON} value ��Ҫ���л���json����
 * @remark
 * �÷�����ʵ����ecma-262������й涨��JSON.stringify��ͬ����ʱֻ֧�ִ���һ����������������й��ܷḻ��
 * @meta standard
 * @see baidu.json.parse,baidu.json.encode
 *
 * @returns {string} ���л�����ַ���
 */
baidu.json.stringify = (function () {
    /**
     * �ַ�������ʱ��Ҫת����ַ���
     * @private
     */
    var escapeMap = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"': '\\"',
        "\\": '\\\\'
    };

    /**
     * �ַ������л�
     * @private
     */
    function encodeString(source) {
        if (/["\\\x00-\x1f]/.test(source)) {
            source = source.replace(
                /["\\\x00-\x1f]/g,
                function (match) {
                    var c = escapeMap[match];
                    if (c) {
                        return c;
                    }
                    c = match.charCodeAt();
                    return "\\u00"
                        + Math.floor(c / 16).toString(16)
                        + (c % 16).toString(16);
                });
        }
        return '"' + source + '"';
    }

    /**
     * �������л�
     * @private
     */
    function encodeArray(source) {
        var result = ["["],
            l = source.length,
            preComma, i, item;

        for (i = 0; i < l; i++) {
            item = source[i];

            switch (typeof item) {
                case "undefined":
                case "function":
                case "unknown":
                    break;
                default:
                    if (preComma) {
                        result.push(',');
                    }
                    result.push(baidu.json.stringify(item));
                    preComma = 1;
            }
        }
        result.push("]");
        return result.join("");
    }

    /**
     * �����������л�ʱ�Ĳ���
     * @private
     */
    function pad(source) {
        return source < 10 ? '0' + source : source;
    }

    /**
     * �������л�
     * @private
     */
    function encodeDate(source) {
        return '"' + source.getFullYear() + "-"
            + pad(source.getMonth() + 1) + "-"
            + pad(source.getDate()) + "T"
            + pad(source.getHours()) + ":"
            + pad(source.getMinutes()) + ":"
            + pad(source.getSeconds()) + '"';
    }

    return function (value) {
        switch (typeof value) {
            case 'undefined':
                return 'undefined';

            case 'number':
                return isFinite(value) ? String(value) : "null";

            case 'string':
                return encodeString(value);

            case 'boolean':
                return String(value);

            default:
                if (value === null) {
                    return 'null';
                } else if (value instanceof Array) {
                    return encodeArray(value);
                } else if (value instanceof Date) {
                    return encodeDate(value);
                } else {
                    var result = ['{'],
                        encode = baidu.json.stringify,
                        preComma,
                        item;

                    for (var key in value) {
                        if (Object.prototype.hasOwnProperty.call(value, key)) {
                            item = value[key];
                            switch (typeof item) {
                                case 'undefined':
                                case 'unknown':
                                case 'function':
                                    break;
                                default:
                                    if (preComma) {
                                        result.push(',');
                                    }
                                    preComma = 1;
                                    result.push(encode(key) + ':' + encode(item));
                            }
                        }
                    }
                    result.push('}');
                    return result.join('');
                }
        }
    };
})();
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/encode.js
 * author: erik, cat
 * version: 1.3.4
 * date: 2010/12/23
 */


/**
 * ��json�������л���Ϊ��ʱ�ӿڣ����ᱻbaidu.json.stringify����
 * @name baidu.json.encode
 * @function
 * @grammar baidu.json.encode(value)
 * @param {JSON} value ��Ҫ���л���json����
 * @meta out
 * @see baidu.json.decode,baidu.json.stringify
 *
 * @returns {string} ���л�����ַ���
 */
baidu.json.encode = baidu.json.stringify;
