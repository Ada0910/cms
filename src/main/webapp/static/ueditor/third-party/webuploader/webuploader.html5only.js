/*! WebUploader 0.1.2 */


/**
 * @fileOverview ���ڲ����������Ĵ��������[amd](https://github.com/amdjs/amdjs-api/wiki/AMD)ģ�鶨�巽ʽ��֯������
 *
 * AMD API �ڲ��ļ򵥲���ȫʵ�֣�����ԡ�ֻ�е�WebUploader���ϲ���һ���ļ���ʱ��Ż����롣
 */
(function (root, factory) {
    var modules = {},

        // �ڲ�require, �򵥲���ȫʵ�֡�
        // https://github.com/amdjs/amdjs-api/wiki/require
        _require = function (deps, callback) {
            var args, len, i;

            // ���deps�������飬��ֱ�ӷ���ָ��module
            if (typeof deps === 'string') {
                return getModule(deps);
            } else {
                args = [];
                for (len = deps.length, i = 0; i < len; i++) {
                    args.push(getModule(deps[i]));
                }

                return callback.apply(null, args);
            }
        },

        // �ڲ�define����ʱ��֧�ֲ�ָ��id.
        _define = function (id, deps, factory) {
            if (arguments.length === 2) {
                factory = deps;
                deps = null;
            }

            _require(deps || [], function () {
                setModule(id, factory, arguments);
            });
        },

        // ����module, ����CommonJsд����
        setModule = function (id, factory, args) {
            var module = {
                    exports: factory
                },
                returned;

            if (typeof factory === 'function') {
                args.length || (args = [_require, module.exports, module]);
                returned = factory.apply(null, args);
                returned !== undefined && (module.exports = returned);
            }

            modules[id] = module.exports;
        },

        // ����id��ȡmodule
        getModule = function (id) {
            var module = modules[id] || root[id];

            if (!module) {
                throw new Error('`' + id + '` is undefined');
            }

            return module;
        },

        // ������modules����·��idsװ���ɶ���
        exportsTo = function (obj) {
            var key, host, parts, part, last, ucFirst;

            // make the first character upper case.
            ucFirst = function (str) {
                return str && (str.charAt(0).toUpperCase() + str.substr(1));
            };

            for (key in modules) {
                host = obj;

                if (!modules.hasOwnProperty(key)) {
                    continue;
                }

                parts = key.split('/');
                last = ucFirst(parts.pop());

                while ((part = ucFirst(parts.shift()))) {
                    host[part] = host[part] || {};
                    host = host[part];
                }

                host[last] = modules[key];
            }
        },

        exports = factory(root, _define, _require),
        origin;

    // exports every module.
    exportsTo(exports);

    if (typeof module === 'object' && typeof module.exports === 'object') {

        // For CommonJS and CommonJS-like environments where a proper window is present,
        module.exports = exports;
    } else if (typeof define === 'function' && define.amd) {

        // Allow using this built library as an AMD module
        // in another project. That other project will only
        // see this AMD call, not the internal modules in
        // the closure below.
        define([], exports);
    } else {

        // Browser globals case. Just assign the
        // result to a property on the global.
        origin = root.WebUploader;
        root.WebUploader = exports;
        root.WebUploader.noConflict = function () {
            root.WebUploader = origin;
        };
    }
})(this, function (window, define, require) {


    /**
     * @fileOverview jQuery or Zepto
     */
    define('dollar-third', [], function () {
        return window.jQuery || window.Zepto;
    });
    /**
     * @fileOverview Dom �������
     */
    define('dollar', [
        'dollar-third'
    ], function (_) {
        return _;
    });
    /**
     * @fileOverview ʹ��jQuery��Promise
     */
    define('promise-third', [
        'dollar'
    ], function ($) {
        return {
            Deferred: $.Deferred,
            when: $.when,

            isPromise: function (anything) {
                return anything && typeof anything.then === 'function';
            }
        };
    });
    /**
     * @fileOverview Promise/A+
     */
    define('promise', [
        'promise-third'
    ], function (_) {
        return _;
    });
    /**
     * @fileOverview �����෽����
     */

    /**
     * Web Uploader�ڲ������ϸ˵���������ἰ�Ĺ����࣬��������`WebUploader`��������з��ʵ���
     *
     * As you know, Web Uploader��ÿ���ļ������ù�[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)�淶�е�`define`��֯������, ÿ��Module�����и�module id.
     * Ĭ��module id���ļ���·��������·������ת�������ֿռ�����WebUploader�С��磺
     *
     * * module `base`��WebUploader.Base
     * * module `file`: WebUploader.File
     * * module `lib/dnd`: WebUploader.Lib.Dnd
     * * module `runtime/html5/dnd`: WebUploader.Runtime.Html5.Dnd
     *
     *
     * �����ĵ�������ʡ��`WebUploader`ǰ׺��
     * @module WebUploader
     * @title WebUploader API�ĵ�
     */
    define('base', [
        'dollar',
        'promise'
    ], function ($, promise) {

        var noop = function () {
            },
            call = Function.call;

        // http://jsperf.com/uncurrythis
        // �����ﻯ
        function uncurryThis(fn) {
            return function () {
                return call.apply(fn, arguments);
            };
        }

        function bindFn(fn, context) {
            return function () {
                return fn.apply(context, arguments);
            };
        }

        function createObject(proto) {
            var f;

            if (Object.create) {
                return Object.create(proto);
            } else {
                f = function () {
                };
                f.prototype = proto;
                return new f();
            }
        }


        /**
         * �����࣬�ṩһЩ�򵥳��õķ�����
         * @class Base
         */
        return {

            /**
             * @property {String} version ��ǰ�汾�š�
             */
            version: '0.1.2',

            /**
             * @property {jQuery|Zepto} $ ����������jQuery����Zepto����
             */
            $: $,

            Deferred: promise.Deferred,

            isPromise: promise.isPromise,

            when: promise.when,

            /**
             * @description  �򵥵�������������
             *
             * * `webkit`  webkit�汾�ţ���������Ϊ��webkit�ںˣ�������Ϊ`undefined`��
             * * `chrome`  chrome������汾�ţ���������Ϊchrome��������Ϊ`undefined`��
             * * `ie`  ie������汾�ţ���������Ϊ��ie��������Ϊ`undefined`��**�ݲ�֧��ie10+**
             * * `firefox`  firefox������汾�ţ���������Ϊ��firefox��������Ϊ`undefined`��
             * * `safari`  safari������汾�ţ���������Ϊ��safari��������Ϊ`undefined`��
             * * `opera`  opera������汾�ţ���������Ϊ��opera��������Ϊ`undefined`��
             *
             * @property {Object} [browser]
             */
            browser: (function (ua) {
                var ret = {},
                    webkit = ua.match(/WebKit\/([\d.]+)/),
                    chrome = ua.match(/Chrome\/([\d.]+)/) ||
                        ua.match(/CriOS\/([\d.]+)/),

                    ie = ua.match(/MSIE\s([\d\.]+)/) ||
                        ua.match(/(?:trident)(?:.*rv:([\w.]+))?/i),
                    firefox = ua.match(/Firefox\/([\d.]+)/),
                    safari = ua.match(/Safari\/([\d.]+)/),
                    opera = ua.match(/OPR\/([\d.]+)/);

                webkit && (ret.webkit = parseFloat(webkit[1]));
                chrome && (ret.chrome = parseFloat(chrome[1]));
                ie && (ret.ie = parseFloat(ie[1]));
                firefox && (ret.firefox = parseFloat(firefox[1]));
                safari && (ret.safari = parseFloat(safari[1]));
                opera && (ret.opera = parseFloat(opera[1]));

                return ret;
            })(navigator.userAgent),

            /**
             * @description  ����ϵͳ�������
             *
             * * `android`  �����android����������£���ֵΪ��Ӧ��android�汾�ţ�����Ϊ`undefined`��
             * * `ios` �����ios����������£���ֵΪ��Ӧ��ios�汾�ţ�����Ϊ`undefined`��
             * @property {Object} [os]
             */
            os: (function (ua) {
                var ret = {},

                    // osx = !!ua.match( /\(Macintosh\; Intel / ),
                    android = ua.match(/(?:Android);?[\s\/]+([\d.]+)?/),
                    ios = ua.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);

                // osx && (ret.osx = true);
                android && (ret.android = parseFloat(android[1]));
                ios && (ret.ios = parseFloat(ios[1].replace(/_/g, '.')));

                return ret;
            })(navigator.userAgent),

            /**
             * ʵ��������֮��ļ̳С�
             * @method inherits
             * @grammar Base.inherits( super ) => child
             * @grammar Base.inherits( super, protos ) => child
             * @grammar Base.inherits( super, protos, statics ) => child
             * @param  {Class} super ����
             * @param  {Object | Function} [protos] ������߶�����������а���constructor�����ཫ���ô�����ֵ��
             * @param  {Function} [protos.constructor] ���๹��������ָ���Ļ�����������ʱ��ֱ��ִ�и��๹�����ķ�����
             * @param  {Object} [statics] ��̬���Ի򷽷���
             * @return {Class} �������ࡣ
             * @example
             * function Person() {
             *     console.log( 'Super' );
             * }
             * Person.prototype.hello = function() {
             *     console.log( 'hello' );
             * };
             *
             * var Manager = Base.inherits( Person, {
             *     world: function() {
             *         console.log( 'World' );
             *     }
             * });
             *
             * // ��Ϊû��ָ��������������Ĺ���������ִ�С�
             * var instance = new Manager();    // => Super
             *
             * // �̳��Ӹ���ķ���
             * instance.hello();    // => hello
             * instance.world();    // => World
             *
             * // �����__super__����ָ����
             * console.log( Manager.__super__ === Person );    // => true
             */
            inherits: function (Super, protos, staticProtos) {
                var child;

                if (typeof protos === 'function') {
                    child = protos;
                    protos = null;
                } else if (protos && protos.hasOwnProperty('constructor')) {
                    child = protos.constructor;
                } else {
                    child = function () {
                        return Super.apply(this, arguments);
                    };
                }

                // ���ƾ�̬����
                $.extend(true, child, Super, staticProtos || {});

                /* jshint camelcase: false */

                // �������__super__����ָ���ࡣ
                child.__super__ = Super.prototype;

                // ����ԭ�ͣ����ԭ�ͷ��������ԡ�
                // ��ʱ��Object.createʵ�֡�
                child.prototype = createObject(Super.prototype);
                protos && $.extend(true, child.prototype, protos);

                return child;
            },

            /**
             * һ�������κ�����ķ���������������ֵ��Ĭ�ϵ�callback.
             * @method noop
             */
            noop: noop,

            /**
             * ����һ���µķ������˷�������ָ����`context`��ִ�С�
             * @grammar Base.bindFn( fn, context ) => Function
             * @method bindFn
             * @example
             * var doSomething = function() {
             *         console.log( this.name );
             *     },
             *     obj = {
             *         name: 'Object Name'
             *     },
             *     aliasFn = Base.bind( doSomething, obj );
             *
             *  aliasFn();    // => Object Name
             *
             */
            bindFn: bindFn,

            /**
             * ����Console.log������ڵĻ�����������һ��[�պ���loop](#WebUploader:Base.log)��
             * @grammar Base.log( args... ) => undefined
             * @method log
             */
            log: (function () {
                if (window.console) {
                    return bindFn(console.log, console);
                }
                return noop;
            })(),

            nextTick: (function () {

                return function (cb) {
                    setTimeout(cb, 1);
                };

                // @bug ����������ڵ�ǰ����ʱ��ͣ�ˡ�
                // var next = window.requestAnimationFrame ||
                //     window.webkitRequestAnimationFrame ||
                //     window.mozRequestAnimationFrame ||
                //     function( cb ) {
                //         window.setTimeout( cb, 1000 / 60 );
                //     };

                // // fix: Uncaught TypeError: Illegal invocation
                // return bindFn( next, window );
            })(),

            /**
             * ��[uncurrythis](http://www.2ality.com/2011/11/uncurrying-this.html)������slice������
             * �����������������ת�����������
             * @grammar Base.slice( target, start[, end] ) => Array
             * @method slice
             * @example
             * function doSomthing() {
             *     var args = Base.slice( arguments, 1 );
             *     console.log( args );
             * }
             *
             * doSomthing( 'ignored', 'arg2', 'arg3' );    // => Array ["arg2", "arg3"]
             */
            slice: uncurryThis([].slice),

            /**
             * ����Ψһ��ID
             * @method guid
             * @grammar Base.guid() => String
             * @grammar Base.guid( prefx ) => String
             */
            guid: (function () {
                var counter = 0;

                return function (prefix) {
                    var guid = (+new Date()).toString(32),
                        i = 0;

                    for (; i < 5; i++) {
                        guid += Math.floor(Math.random() * 65535).toString(32);
                    }

                    return (prefix || 'wu_') + guid + (counter++).toString(32);
                };
            })(),

            /**
             * ��ʽ���ļ���С, ����ɴ���λ���ַ���
             * @method formatSize
             * @grammar Base.formatSize( size ) => String
             * @grammar Base.formatSize( size, pointLength ) => String
             * @grammar Base.formatSize( size, pointLength, units ) => String
             * @param {Number} size �ļ���С
             * @param {Number} [pointLength=2] ��ȷ����С��������
             * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] ��λ���顣���ֽڣ���ǧ�ֽڣ�һֱ����ָ���������λ��������ָֻ���˵���K(ǧ�ֽ�)��ͬʱ�ļ���С����M, �˷����������������ʾ�ɶ���K.
             * @example
             * console.log( Base.formatSize( 100 ) );    // => 100B
             * console.log( Base.formatSize( 1024 ) );    // => 1.00K
             * console.log( Base.formatSize( 1024, 0 ) );    // => 1K
             * console.log( Base.formatSize( 1024 * 1024 ) );    // => 1.00M
             * console.log( Base.formatSize( 1024 * 1024 * 1024 ) );    // => 1.00G
             * console.log( Base.formatSize( 1024 * 1024 * 1024, 0, ['B', 'KB', 'MB'] ) );    // => 1024MB
             */
            formatSize: function (size, pointLength, units) {
                var unit;

                units = units || ['B', 'K', 'M', 'G', 'TB'];

                while ((unit = units.shift()) && size > 1024) {
                    size = size / 1024;
                }

                return (unit === 'B' ? size : size.toFixed(pointLength || 2)) +
                    unit;
            }
        };
    });
    /**
     * �¼������࣬���Զ���ʹ�ã�Ҳ������չ������ʹ�á�
     * @fileOverview Mediator
     */
    define('mediator', [
        'base'
    ], function (Base) {
        var $ = Base.$,
            slice = [].slice,
            separator = /\s+/,
            protos;

        // �����������˳��¼�handlers.
        function findHandlers(arr, name, callback, context) {
            return $.grep(arr, function (handler) {
                return handler &&
                    (!name || handler.e === name) &&
                    (!callback || handler.cb === callback ||
                        handler.cb._cb === callback) &&
                    (!context || handler.ctx === context);
            });
        }

        function eachEvent(events, callback, iterator) {
            // ��֧�ֶ���ֻ֧�ֶ��event�ÿո����
            $.each((events || '').split(separator), function (_, key) {
                iterator(key, callback);
            });
        }

        function triggerHanders(events, args) {
            var stoped = false,
                i = -1,
                len = events.length,
                handler;

            while (++i < len) {
                handler = events[i];

                if (handler.cb.apply(handler.ctx2, args) === false) {
                    stoped = true;
                    break;
                }
            }

            return !stoped;
        }

        protos = {

            /**
             * ���¼���
             *
             * `callback`������ִ��ʱ��arguments������Դ��trigger��ʱ��Я���Ĳ�������
             * ```javascript
             * var obj = {};
             *
             * // ʹ��obj���¼���Ϊ
             * Mediator.installTo( obj );
             *
             * obj.on( 'testa', function( arg1, arg2 ) {
             *     console.log( arg1, arg2 ); // => 'arg1', 'arg2'
             * });
             *
             * obj.trigger( 'testa', 'arg1', 'arg2' );
             * ```
             *
             * ���`callback`�У�ĳһ������`return false`�ˣ������������`callback`�����ᱻִ�е���
             * �л�Ӱ�쵽`trigger`�����ķ���ֵ��Ϊ`false`��
             *
             * `on`�������������һ�������¼�`all`, �������е��¼�����������Ӧ����ͬʱ����`callback`�е�arguments��һ����ͬ����
             * ���ǵ�һ������Ϊ`type`����¼��ǰ��ʲô�¼��ڴ���������`callback`�����ȼ��Ƚŵͣ���������`callback`ִ����󴥷���
             * ```javascript
             * obj.on( 'all', function( type, arg1, arg2 ) {
             *     console.log( type, arg1, arg2 ); // => 'testa', 'arg1', 'arg2'
             * });
             * ```
             *
             * @method on
             * @grammar on( name, callback[, context] ) => self
             * @param  {String}   name     �¼�����֧�ֶ���¼��ÿո����
             * @param  {Function} callback �¼�������
             * @param  {Object}   [context]  �¼��������������ġ�
             * @return {self} ��������������ʽ
             * @chainable
             * @class Mediator
             */
            on: function (name, callback, context) {
                var me = this,
                    set;

                if (!callback) {
                    return this;
                }

                set = this._events || (this._events = []);

                eachEvent(name, callback, function (name, callback) {
                    var handler = {e: name};

                    handler.cb = callback;
                    handler.ctx = context;
                    handler.ctx2 = context || me;
                    handler.id = set.length;

                    set.push(handler);
                });

                return this;
            },

            /**
             * ���¼����ҵ�handlerִ������Զ�����󶨡�
             * @method once
             * @grammar once( name, callback[, context] ) => self
             * @param  {String}   name     �¼���
             * @param  {Function} callback �¼�������
             * @param  {Object}   [context]  �¼��������������ġ�
             * @return {self} ��������������ʽ
             * @chainable
             */
            once: function (name, callback, context) {
                var me = this;

                if (!callback) {
                    return me;
                }

                eachEvent(name, callback, function (name, callback) {
                    var once = function () {
                        me.off(name, once);
                        return callback.apply(context || me, arguments);
                    };

                    once._cb = callback;
                    me.on(name, once, context);
                });

                return me;
            },

            /**
             * ����¼���
             * @method off
             * @grammar off( [name[, callback[, context] ] ] ) => self
             * @param  {String}   [name]     �¼���
             * @param  {Function} [callback] �¼�������
             * @param  {Object}   [context]  �¼��������������ġ�
             * @return {self} ��������������ʽ
             * @chainable
             */
            off: function (name, cb, ctx) {
                var events = this._events;

                if (!events) {
                    return this;
                }

                if (!name && !cb && !ctx) {
                    this._events = [];
                    return this;
                }

                eachEvent(name, cb, function (name, cb) {
                    $.each(findHandlers(events, name, cb, ctx), function () {
                        delete events[this.id];
                    });
                });

                return this;
            },

            /**
             * �����¼�
             * @method trigger
             * @grammar trigger( name[, args...] ) => self
             * @param  {String}   type     �¼���
             * @param  {*} [...] �������
             * @return {Boolean} ���handler��return false�ˣ��򷵻�false, ���򷵻�true
             */
            trigger: function (type) {
                var args, events, allEvents;

                if (!this._events || !type) {
                    return this;
                }

                args = slice.call(arguments, 1);
                events = findHandlers(this._events, type);
                allEvents = findHandlers(this._events, 'all');

                return triggerHanders(events, args) &&
                    triggerHanders(allEvents, arguments);
            }
        };

        /**
         * �н��ߣ��������Ǹ�������������ͨ��[installTo](#WebUploader:Mediator:installTo)������ʹ�κζ���߱��¼���Ϊ��
         * ��ҪĿ���Ǹ���ģ����ģ��֮��ĺ�����������϶ȡ�
         *
         * @class Mediator
         */
        return $.extend({

            /**
             * ����ͨ������ӿڣ�ʹ�κζ���߱��¼����ܡ�
             * @method installTo
             * @param  {Object} obj ��Ҫ�߱��¼���Ϊ�Ķ���
             * @return {Object} ����obj.
             */
            installTo: function (obj) {
                return $.extend(obj, protos);
            }

        }, protos);
    });
    /**
     * @fileOverview Uploader�ϴ���
     */
    define('uploader', [
        'base',
        'mediator'
    ], function (Base, Mediator) {

        var $ = Base.$;

        /**
         * �ϴ�����ࡣ
         * @class Uploader
         * @constructor
         * @grammar new Uploader( opts ) => Uploader
         * @example
         * var uploader = WebUploader.Uploader({
         *     swf: 'path_of_swf/Uploader.swf',
         *
         *     // �����Ƭ�ϴ���
         *     chunked: true
         * });
         */
        function Uploader(opts) {
            this.options = $.extend(true, {}, Uploader.options, opts);
            this._init(this.options);
        }

        // default Options
        // widgets������Ӧ��չ
        Uploader.options = {};
        Mediator.installTo(Uploader.prototype);

        // ������Ӵ�����ʽ������
        $.each({
            upload: 'start-upload',
            stop: 'stop-upload',
            getFile: 'get-file',
            getFiles: 'get-files',
            addFile: 'add-file',
            addFiles: 'add-file',
            sort: 'sort-files',
            removeFile: 'remove-file',
            skipFile: 'skip-file',
            retry: 'retry',
            isInProgress: 'is-in-progress',
            makeThumb: 'make-thumb',
            getDimension: 'get-dimension',
            addButton: 'add-btn',
            getRuntimeType: 'get-runtime-type',
            refresh: 'refresh',
            disable: 'disable',
            enable: 'enable',
            reset: 'reset'
        }, function (fn, command) {
            Uploader.prototype[fn] = function () {
                return this.request(command, arguments);
            };
        });

        $.extend(Uploader.prototype, {
            state: 'pending',

            _init: function (opts) {
                var me = this;

                me.request('init', opts, function () {
                    me.state = 'ready';
                    me.trigger('ready');
                });
            },

            /**
             * ��ȡ��������Uploader�����
             * @method option
             * @grammar option( key ) => *
             * @grammar option( key, val ) => self
             * @example
             *
             * // ��ʼ״̬ͼƬ�ϴ�ǰ����ѹ��
             * var uploader = new WebUploader.Uploader({
             *     resize: null;
             * });
             *
             * // �޸ĺ�ͼƬ�ϴ�ǰ�����Խ�ͼƬѹ����1600 * 1600
             * uploader.options( 'resize', {
             *     width: 1600,
             *     height: 1600
             * });
             */
            option: function (key, val) {
                var opts = this.options;

                // setter
                if (arguments.length > 1) {

                    if ($.isPlainObject(val) &&
                        $.isPlainObject(opts[key])) {
                        $.extend(opts[key], val);
                    } else {
                        opts[key] = val;
                    }

                } else {    // getter
                    return key ? opts[key] : opts;
                }
            },

            /**
             * ��ȡ�ļ�ͳ����Ϣ������һ������һ����Ϣ�Ķ���
             * * `successNum` �ϴ��ɹ����ļ���
             * * `uploadFailNum` �ϴ�ʧ�ܵ��ļ���
             * * `cancelNum` ��ɾ�����ļ���
             * * `invalidNum` ��Ч���ļ���
             * * `queueNum` ���ڶ����е��ļ���
             * @method getStats
             * @grammar getStats() => Object
             */
            getStats: function () {
                // return this._mgr.getStats.apply( this._mgr, arguments );
                var stats = this.request('get-stats');

                return {
                    successNum: stats.numOfSuccess,

                    // who care?
                    // queueFailNum: 0,
                    cancelNum: stats.numOfCancel,
                    invalidNum: stats.numOfInvalid,
                    uploadFailNum: stats.numOfUploadFailed,
                    queueNum: stats.numOfQueue
                };
            },

            // ��Ҫ��д�˷�������֧��opts.onEvent��instance.onEvent�Ĵ�����
            trigger: function (type/*, args...*/) {
                var args = [].slice.call(arguments, 1),
                    opts = this.options,
                    name = 'on' + type.substring(0, 1).toUpperCase() +
                        type.substring(1);

                if (
                    // ����ͨ��on����ע���handler.
                    Mediator.trigger.apply(this, arguments) === false ||

                    // ����opts.onEvent
                    $.isFunction(opts[name]) &&
                    opts[name].apply(this, args) === false ||

                    // ����this.onEvent
                    $.isFunction(this[name]) &&
                    this[name].apply(this, args) === false ||

                    // �㲥����uploader���¼���
                    Mediator.trigger.apply(Mediator,
                        [this, type].concat(args)) === false) {

                    return false;
                }

                return true;
            },

            // widgets/widget.js������˷�������ϸ�ĵ���
            request: Base.noop
        });

        /**
         * ����Uploaderʵ������ͬ��new Uploader( opts );
         * @method create
         * @class Base
         * @static
         * @grammar Base.create( opts ) => Uploader
         */
        Base.create = Uploader.create = function (opts) {
            return new Uploader(opts);
        };

        // ��¶Uploader������ͨ��������չҵ���߼���
        Base.Uploader = Uploader;

        return Uploader;
    });
    /**
     * @fileOverview Runtime������������Runtime��ѡ��, ����
     */
    define('runtime/runtime', [
        'base',
        'mediator'
    ], function (Base, Mediator) {

        var $ = Base.$,
            factories = {},

            // ��ȡ����ĵ�һ��key
            getFirstKey = function (obj) {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        return key;
                    }
                }
                return null;
            };

        // �ӿ��ࡣ
        function Runtime(options) {
            this.options = $.extend({
                container: document.body
            }, options);
            this.uid = Base.guid('rt_');
        }

        $.extend(Runtime.prototype, {

            getContainer: function () {
                var opts = this.options,
                    parent, container;

                if (this._container) {
                    return this._container;
                }

                parent = $(opts.container || document.body);
                container = $(document.createElement('div'));

                container.attr('id', 'rt_' + this.uid);
                container.css({
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden'
                });

                parent.append(container);
                parent.addClass('webuploader-container');
                this._container = container;
                return container;
            },

            init: Base.noop,
            exec: Base.noop,

            destroy: function () {
                if (this._container) {
                    this._container.parentNode.removeChild(this.__container);
                }

                this.off();
            }
        });

        Runtime.orders = 'html5,flash';


        /**
         * ���Runtimeʵ�֡�
         * @param {String} type    ����
         * @param {Runtime} factory ����Runtimeʵ�֡�
         */
        Runtime.addRuntime = function (type, factory) {
            factories[type] = factory;
        };

        Runtime.hasRuntime = function (type) {
            return !!(type ? factories[type] : getFirstKey(factories));
        };

        Runtime.create = function (opts, orders) {
            var type, runtime;

            orders = orders || Runtime.orders;
            $.each(orders.split(/\s*,\s*/g), function () {
                if (factories[this]) {
                    type = this;
                    return false;
                }
            });

            type = type || getFirstKey(factories);

            if (!type) {
                throw new Error('Runtime Error');
            }

            runtime = new factories[type](opts);
            return runtime;
        };

        Mediator.installTo(Runtime.prototype);
        return Runtime;
    });

    /**
     * @fileOverview Runtime������������Runtime��ѡ��, ����
     */
    define('runtime/client', [
        'base',
        'mediator',
        'runtime/runtime'
    ], function (Base, Mediator, Runtime) {

        var cache;

        cache = (function () {
            var obj = {};

            return {
                add: function (runtime) {
                    obj[runtime.uid] = runtime;
                },

                get: function (ruid, standalone) {
                    var i;

                    if (ruid) {
                        return obj[ruid];
                    }

                    for (i in obj) {
                        // ��Щ���Ͳ������ã�����filepicker.
                        if (standalone && obj[i].__standalone) {
                            continue;
                        }

                        return obj[i];
                    }

                    return null;
                },

                remove: function (runtime) {
                    delete obj[runtime.uid];
                }
            };
        })();

        function RuntimeClient(component, standalone) {
            var deferred = Base.Deferred(),
                runtime;

            this.uid = Base.guid('client_');

            // ����runtimeû�г�ʼ��֮ǰ��ע��һЩ�����ڳ�ʼ����ִ�С�
            this.runtimeReady = function (cb) {
                return deferred.done(cb);
            };

            this.connectRuntime = function (opts, cb) {

                // already connected.
                if (runtime) {
                    throw new Error('already connected!');
                }

                deferred.done(cb);

                if (typeof opts === 'string' && cache.get(opts)) {
                    runtime = cache.get(opts);
                }

                // ��filePickerֻ�ܶ������ڣ����ܹ��á�
                runtime = runtime || cache.get(null, standalone);

                // ��Ҫ����
                if (!runtime) {
                    runtime = Runtime.create(opts, opts.runtimeOrder);
                    runtime.__promise = deferred.promise();
                    runtime.once('ready', deferred.resolve);
                    runtime.init();
                    cache.add(runtime);
                    runtime.__client = 1;
                } else {
                    // ����cache
                    Base.$.extend(runtime.options, opts);
                    runtime.__promise.then(deferred.resolve);
                    runtime.__client++;
                }

                standalone && (runtime.__standalone = standalone);
                return runtime;
            };

            this.getRuntime = function () {
                return runtime;
            };

            this.disconnectRuntime = function () {
                if (!runtime) {
                    return;
                }

                runtime.__client--;

                if (runtime.__client <= 0) {
                    cache.remove(runtime);
                    delete runtime.__promise;
                    runtime.destroy();
                }

                runtime = null;
            };

            this.exec = function () {
                if (!runtime) {
                    return;
                }

                var args = Base.slice(arguments);
                component && args.unshift(component);

                return runtime.exec.apply(this, args);
            };

            this.getRuid = function () {
                return runtime && runtime.uid;
            };

            this.destroy = (function (destroy) {
                return function () {
                    destroy && destroy.apply(this, arguments);
                    this.trigger('destroy');
                    this.off();
                    this.exec('destroy');
                    this.disconnectRuntime();
                };
            })(this.destroy);
        }

        Mediator.installTo(RuntimeClient.prototype);
        return RuntimeClient;
    });
    /**
     * @fileOverview ������Ϣ
     */
    define('lib/dnd', [
        'base',
        'mediator',
        'runtime/client'
    ], function (Base, Mediator, RuntimeClent) {

        var $ = Base.$;

        function DragAndDrop(opts) {
            opts = this.options = $.extend({}, DragAndDrop.options, opts);

            opts.container = $(opts.container);

            if (!opts.container.length) {
                return;
            }

            RuntimeClent.call(this, 'DragAndDrop');
        }

        DragAndDrop.options = {
            accept: null,
            disableGlobalDnd: false
        };

        Base.inherits(RuntimeClent, {
            constructor: DragAndDrop,

            init: function () {
                var me = this;

                me.connectRuntime(me.options, function () {
                    me.exec('init');
                    me.trigger('ready');
                });
            },

            destroy: function () {
                this.disconnectRuntime();
            }
        });

        Mediator.installTo(DragAndDrop.prototype);

        return DragAndDrop;
    });
    /**
     * @fileOverview ������ࡣ
     */
    define('widgets/widget', [
        'base',
        'uploader'
    ], function (Base, Uploader) {

        var $ = Base.$,
            _init = Uploader.prototype._init,
            IGNORE = {},
            widgetClass = [];

        function isArrayLike(obj) {
            if (!obj) {
                return false;
            }

            var length = obj.length,
                type = $.type(obj);

            if (obj.nodeType === 1 && length) {
                return true;
            }

            return type === 'array' || type !== 'function' && type !== 'string' &&
                (length === 0 || typeof length === 'number' && length > 0 &&
                    (length - 1) in obj);
        }

        function Widget(uploader) {
            this.owner = uploader;
            this.options = uploader.options;
        }

        $.extend(Widget.prototype, {

            init: Base.noop,

            // ��Backbone���¼���������������uploaderʵ���ϵ��¼�
            // widgetֱ���޷������¼����¼�ֻ��ͨ��uploader������
            invoke: function (apiName, args) {

                /*
                    {
                        'make-thumb': 'makeThumb'
                    }
                 */
                var map = this.responseMap;

                // �����API��Ӧ���������
                if (!map || !(apiName in map) || !(map[apiName] in this) ||
                    !$.isFunction(this[map[apiName]])) {

                    return IGNORE;
                }

                return this[map[apiName]].apply(this, args);

            },

            /**
             * �������������`callback`����`handler`�з���`promise`ʱ������һ��������`handler`�е�promise����ɺ���ɵ���`promise`��
             * @method request
             * @grammar request( command, args ) => * | Promise
             * @grammar request( command, args, callback ) => Promise
             * @for  Uploader
             */
            request: function () {
                return this.owner.request.apply(this.owner, arguments);
            }
        });

        // ��չUploader.
        $.extend(Uploader.prototype, {

            // ��д_init������ʼ��widgets
            _init: function () {
                var me = this,
                    widgets = me._widgets = [];

                $.each(widgetClass, function (_, klass) {
                    widgets.push(new klass(me));
                });

                return _init.apply(me, arguments);
            },

            request: function (apiName, args, callback) {
                var i = 0,
                    widgets = this._widgets,
                    len = widgets.length,
                    rlts = [],
                    dfds = [],
                    widget, rlt, promise, key;

                args = isArrayLike(args) ? args : [args];

                for (; i < len; i++) {
                    widget = widgets[i];
                    rlt = widget.invoke(apiName, args);

                    if (rlt !== IGNORE) {

                        // Deferred����
                        if (Base.isPromise(rlt)) {
                            dfds.push(rlt);
                        } else {
                            rlts.push(rlt);
                        }
                    }
                }

                // �����callback�������첽��ʽ��
                if (callback || dfds.length) {
                    promise = Base.when.apply(Base, dfds);
                    key = promise.pipe ? 'pipe' : 'then';

                    // ����Ҫ����ɾ����ɾ���˻���ѭ����
                    // ��ִ֤��˳����callback��������һ��tick��ִ�С�
                    return promise[key](function () {
                        var deferred = Base.Deferred(),
                            args = arguments;

                        setTimeout(function () {
                            deferred.resolve.apply(deferred, args);
                        }, 1);

                        return deferred.promise();
                    })[key](callback || Base.noop);
                } else {
                    return rlts[0];
                }
            }
        });

        /**
         * ������
         * @param  {object} widgetProto ���ԭ�ͣ����캯��ͨ��constructor���Զ���
         * @param  {object} responseMap API�����뺯��ʵ�ֵ�ӳ��
         * @example
         *     Uploader.register( {
         *         init: function( options ) {},
         *         makeThumb: function() {}
         *     }, {
         *         'make-thumb': 'makeThumb'
         *     } );
         */
        Uploader.register = Widget.register = function (responseMap, widgetProto) {
            var map = {init: 'init'},
                klass;

            if (arguments.length === 1) {
                widgetProto = responseMap;
                widgetProto.responseMap = map;
            } else {
                widgetProto.responseMap = $.extend(map, responseMap);
            }

            klass = Base.inherits(Widget, widgetProto);
            widgetClass.push(klass);

            return klass;
        };

        return Widget;
    });
    /**
     * @fileOverview DragAndDrop Widget��
     */
    define('widgets/filednd', [
        'base',
        'uploader',
        'lib/dnd',
        'widgets/widget'
    ], function (Base, Uploader, Dnd) {
        var $ = Base.$;

        Uploader.options.dnd = '';

        /**
         * @property {Selector} [dnd=undefined]  ָ��Drag And Drop��ק�������������ָ������������
         * @namespace options
         * @for Uploader
         */

        /**
         * @event dndAccept
         * @param {DataTransferItemList} items DataTransferItem
         * @description ��ֹ���¼����Ծܾ�ĳЩ���͵��ļ����������Ŀǰֻ�� chrome �ṩ������ API����ֻ��ͨ�� mime-type ��֤��
         * @for  Uploader
         */
        return Uploader.register({
            init: function (opts) {

                if (!opts.dnd ||
                    this.request('predict-runtime-type') !== 'html5') {
                    return;
                }

                var me = this,
                    deferred = Base.Deferred(),
                    options = $.extend({}, {
                        disableGlobalDnd: opts.disableGlobalDnd,
                        container: opts.dnd,
                        accept: opts.accept
                    }),
                    dnd;

                dnd = new Dnd(options);

                dnd.once('ready', deferred.resolve);
                dnd.on('drop', function (files) {
                    me.request('add-file', [files]);
                });

                // ����ļ��Ƿ�ȫ��������ӡ�
                dnd.on('accept', function (items) {
                    return me.owner.trigger('dndAccept', items);
                });

                dnd.init();

                return deferred.promise();
            }
        });
    });

    /**
     * @fileOverview ������Ϣ
     */
    define('lib/filepaste', [
        'base',
        'mediator',
        'runtime/client'
    ], function (Base, Mediator, RuntimeClent) {

        var $ = Base.$;

        function FilePaste(opts) {
            opts = this.options = $.extend({}, opts);
            opts.container = $(opts.container || document.body);
            RuntimeClent.call(this, 'FilePaste');
        }

        Base.inherits(RuntimeClent, {
            constructor: FilePaste,

            init: function () {
                var me = this;

                me.connectRuntime(me.options, function () {
                    me.exec('init');
                    me.trigger('ready');
                });
            },

            destroy: function () {
                this.exec('destroy');
                this.disconnectRuntime();
                this.off();
            }
        });

        Mediator.installTo(FilePaste.prototype);

        return FilePaste;
    });
    /**
     * @fileOverview ������ࡣ
     */
    define('widgets/filepaste', [
        'base',
        'uploader',
        'lib/filepaste',
        'widgets/widget'
    ], function (Base, Uploader, FilePaste) {
        var $ = Base.$;

        /**
         * @property {Selector} [paste=undefined]  ָ������paste�¼��������������ָ���������ô˹��ܡ��˹���Ϊͨ��ճ������ӽ�����ͼƬ����������Ϊ`document.body`.
         * @namespace options
         * @for Uploader
         */
        return Uploader.register({
            init: function (opts) {

                if (!opts.paste ||
                    this.request('predict-runtime-type') !== 'html5') {
                    return;
                }

                var me = this,
                    deferred = Base.Deferred(),
                    options = $.extend({}, {
                        container: opts.paste,
                        accept: opts.accept
                    }),
                    paste;

                paste = new FilePaste(options);

                paste.once('ready', deferred.resolve);
                paste.on('paste', function (files) {
                    me.owner.request('add-file', [files]);
                });
                paste.init();

                return deferred.promise();
            }
        });
    });
    /**
     * @fileOverview Blob
     */
    define('lib/blob', [
        'base',
        'runtime/client'
    ], function (Base, RuntimeClient) {

        function Blob(ruid, source) {
            var me = this;

            me.source = source;
            me.ruid = ruid;

            RuntimeClient.call(me, 'Blob');

            this.uid = source.uid || this.uid;
            this.type = source.type || '';
            this.size = source.size || 0;

            if (ruid) {
                me.connectRuntime(ruid);
            }
        }

        Base.inherits(RuntimeClient, {
            constructor: Blob,

            slice: function (start, end) {
                return this.exec('slice', start, end);
            },

            getSource: function () {
                return this.source;
            }
        });

        return Blob;
    });
    /**
     * Ϊ��ͳһ��Flash��File��HTML5��File�����ڡ�
     * ������Ҫ����Flash�����File��Ҳ���������HTML5�汾��Fileһ�¡�
     * @fileOverview File
     */
    define('lib/file', [
        'base',
        'lib/blob'
    ], function (Base, Blob) {

        var uid = 1,
            rExt = /\.([^.]+)$/;

        function File(ruid, file) {
            var ext;

            Blob.apply(this, arguments);
            this.name = file.name || ('untitled' + uid++);
            ext = rExt.exec(file.name) ? RegExp.$1.toLowerCase() : '';

            // todo ֧�����������ļ���ת����

            // �����mimetype, �����ļ�������û���ҳ���׺����
            if (!ext && this.type) {
                ext = /\/(jpg|jpeg|png|gif|bmp)$/i.exec(this.type) ?
                    RegExp.$1.toLowerCase() : '';
                this.name += '.' + ext;
            }

            // ���û��ָ��mimetype, ����֪���ļ���׺��
            if (!this.type && ~'jpg,jpeg,png,gif,bmp'.indexOf(ext)) {
                this.type = 'image/' + (ext === 'jpg' ? 'jpeg' : ext);
            }

            this.ext = ext;
            this.lastModifiedDate = file.lastModifiedDate ||
                (new Date()).toLocaleString();
        }

        return Base.inherits(Blob, File);
    });

    /**
     * @fileOverview ������Ϣ
     */
    define('lib/filepicker', [
        'base',
        'runtime/client',
        'lib/file'
    ], function (Base, RuntimeClent, File) {

        var $ = Base.$;

        function FilePicker(opts) {
            opts = this.options = $.extend({}, FilePicker.options, opts);

            opts.container = $(opts.id);

            if (!opts.container.length) {
                throw new Error('��ťָ������');
            }

            opts.innerHTML = opts.innerHTML || opts.label ||
                opts.container.html() || '';

            opts.button = $(opts.button || document.createElement('div'));
            opts.button.html(opts.innerHTML);
            opts.container.html(opts.button);

            RuntimeClent.call(this, 'FilePicker', true);
        }

        FilePicker.options = {
            button: null,
            container: null,
            label: null,
            innerHTML: null,
            multiple: true,
            accept: null,
            name: 'file'
        };

        Base.inherits(RuntimeClent, {
            constructor: FilePicker,

            init: function () {
                var me = this,
                    opts = me.options,
                    button = opts.button;

                button.addClass('webuploader-pick');

                me.on('all', function (type) {
                    var files;

                    switch (type) {
                        case 'mouseenter':
                            button.addClass('webuploader-pick-hover');
                            break;

                        case 'mouseleave':
                            button.removeClass('webuploader-pick-hover');
                            break;

                        case 'change':
                            files = me.exec('getFiles');
                            me.trigger('select', $.map(files, function (file) {
                                file = new File(me.getRuid(), file);

                                // ��¼��Դ��
                                file._refer = opts.container;
                                return file;
                            }), opts.container);
                            break;
                    }
                });

                me.connectRuntime(opts, function () {
                    me.refresh();
                    me.exec('init', opts);
                    me.trigger('ready');
                });

                $(window).on('resize', function () {
                    me.refresh();
                });
            },

            refresh: function () {
                var shimContainer = this.getRuntime().getContainer(),
                    button = this.options.button,
                    width = button.outerWidth ?
                        button.outerWidth() : button.width(),

                    height = button.outerHeight ?
                        button.outerHeight() : button.height(),

                    pos = button.offset();

                width && height && shimContainer.css({
                    bottom: 'auto',
                    right: 'auto',
                    width: width + 'px',
                    height: height + 'px'
                }).offset(pos);
            },

            enable: function () {
                var btn = this.options.button;

                btn.removeClass('webuploader-pick-disable');
                this.refresh();
            },

            disable: function () {
                var btn = this.options.button;

                this.getRuntime().getContainer().css({
                    top: '-99999px'
                });

                btn.addClass('webuploader-pick-disable');
            },

            destroy: function () {
                if (this.runtime) {
                    this.exec('destroy');
                    this.disconnectRuntime();
                }
            }
        });

        return FilePicker;
    });

    /**
     * @fileOverview �ļ�ѡ�����
     */
    define('widgets/filepicker', [
        'base',
        'uploader',
        'lib/filepicker',
        'widgets/widget'
    ], function (Base, Uploader, FilePicker) {
        var $ = Base.$;

        $.extend(Uploader.options, {

            /**
             * @property {Selector | Object} [pick=undefined]
             * @namespace options
             * @for Uploader
             * @description ָ��ѡ���ļ��İ�ť��������ָ���򲻴�����ť��
             *
             * * `id` {Seletor} ָ��ѡ���ļ��İ�ť��������ָ���򲻴�����ť��
             * * `label` {String} ����� `innerHTML` ����
             * * `innerHTML` {String} ָ����ť���֡���ָ��ʱ���ȴ�ָ���������п��Ƿ��Դ����֡�
             * * `multiple` {Boolean} �Ƿ���ͬʱѡ�����ļ�������
             */
            pick: null,

            /**
             * @property {Arroy} [accept=null]
             * @namespace options
             * @for Uploader
             * @description ָ��������Щ���͵��ļ��� ����Ŀǰ����extתmimeType������������Ҫ�ֿ�ָ����
             *
             * * `title` {String} ��������
             * * `extensions` {String} ������ļ���׺�������㣬����ö��ŷָ
             * * `mimeTypes` {String} ����ö��ŷָ
             *
             * �磺
             *
             * ```
             * {
             *     title: 'Images',
             *     extensions: 'gif,jpg,jpeg,bmp,png',
             *     mimeTypes: 'image/*'
             * }
             * ```
             */
            accept: null/*{
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }*/
        });

        return Uploader.register({
            'add-btn': 'addButton',
            refresh: 'refresh',
            disable: 'disable',
            enable: 'enable'
        }, {

            init: function (opts) {
                this.pickers = [];
                return opts.pick && this.addButton(opts.pick);
            },

            refresh: function () {
                $.each(this.pickers, function () {
                    this.refresh();
                });
            },

            /**
             * @method addButton
             * @for Uploader
             * @grammar addButton( pick ) => Promise
             * @description
             * ����ļ�ѡ��ť�����һ����ť��������Ҫ���ô˷�������ӡ�������[options.pick](#WebUploader:Uploader:options)һ�¡�
             * @example
             * uploader.addButton({
             *     id: '#btnContainer',
             *     innerHTML: 'ѡ���ļ�'
             * });
             */
            addButton: function (pick) {
                var me = this,
                    opts = me.options,
                    accept = opts.accept,
                    options, picker, deferred;

                if (!pick) {
                    return;
                }

                deferred = Base.Deferred();
                $.isPlainObject(pick) || (pick = {
                    id: pick
                });

                options = $.extend({}, pick, {
                    accept: $.isPlainObject(accept) ? [accept] : accept,
                    swf: opts.swf,
                    runtimeOrder: opts.runtimeOrder
                });

                picker = new FilePicker(options);

                picker.once('ready', deferred.resolve);
                picker.on('select', function (files) {
                    me.owner.request('add-file', [files]);
                });
                picker.init();

                this.pickers.push(picker);

                return deferred.promise();
            },

            disable: function () {
                $.each(this.pickers, function () {
                    this.disable();
                });
            },

            enable: function () {
                $.each(this.pickers, function () {
                    this.enable();
                });
            }
        });
    });
    /**
     * @fileOverview Image
     */
    define('lib/image', [
        'base',
        'runtime/client',
        'lib/blob'
    ], function (Base, RuntimeClient, Blob) {
        var $ = Base.$;

        // ��������
        function Image(opts) {
            this.options = $.extend({}, Image.options, opts);
            RuntimeClient.call(this, 'Image');

            this.on('load', function () {
                this._info = this.exec('info');
                this._meta = this.exec('meta');
            });
        }

        // Ĭ��ѡ�
        Image.options = {

            // Ĭ�ϵ�ͼƬ��������
            quality: 90,

            // �Ƿ�ü�
            crop: false,

            // �Ƿ���ͷ����Ϣ
            preserveHeaders: true,

            // �Ƿ�����Ŵ�
            allowMagnify: true
        };

        // �̳�RuntimeClient.
        Base.inherits(RuntimeClient, {
            constructor: Image,

            info: function (val) {

                // setter
                if (val) {
                    this._info = val;
                    return this;
                }

                // getter
                return this._info;
            },

            meta: function (val) {

                // setter
                if (val) {
                    this._meta = val;
                    return this;
                }

                // getter
                return this._meta;
            },

            loadFromBlob: function (blob) {
                var me = this,
                    ruid = blob.getRuid();

                this.connectRuntime(ruid, function () {
                    me.exec('init', me.options);
                    me.exec('loadFromBlob', blob);
                });
            },

            resize: function () {
                var args = Base.slice(arguments);
                return this.exec.apply(this, ['resize'].concat(args));
            },

            getAsDataUrl: function (type) {
                return this.exec('getAsDataUrl', type);
            },

            getAsBlob: function (type) {
                var blob = this.exec('getAsBlob', type);

                return new Blob(this.getRuid(), blob);
            }
        });

        return Image;
    });
    /**
     * @fileOverview ͼƬ����, ����Ԥ��ͼƬ���ϴ�ǰѹ��ͼƬ
     */
    define('widgets/image', [
        'base',
        'uploader',
        'lib/image',
        'widgets/widget'
    ], function (Base, Uploader, Image) {

        var $ = Base.$,
            throttle;

        // ����Ҫ������ļ���С��������һ�β��ܴ���̫�࣬�Ῠ��
        throttle = (function (max) {
            var occupied = 0,
                waiting = [],
                tick = function () {
                    var item;

                    while (waiting.length && occupied < max) {
                        item = waiting.shift();
                        occupied += item[0];
                        item[1]();
                    }
                };

            return function (emiter, size, cb) {
                waiting.push([size, cb]);
                emiter.once('destroy', function () {
                    occupied -= size;
                    setTimeout(tick, 1);
                });
                setTimeout(tick, 1);
            };
        })(5 * 1024 * 1024);

        $.extend(Uploader.options, {

            /**
             * @property {Object} [thumb]
             * @namespace options
             * @for Uploader
             * @description ������������ͼ��ѡ�
             *
             * Ĭ��Ϊ��
             *
             * ```javascript
             * {
             *     width: 110,
             *     height: 110,
             *
             *     // ͼƬ������ֻ��typeΪ`image/jpeg`��ʱ�����Ч��
             *     quality: 70,
             *
             *     // �Ƿ�����Ŵ������Ҫ����Сͼ��ʱ��ʧ�棬��ѡ��Ӧ������Ϊfalse.
             *     allowMagnify: true,
             *
             *     // �Ƿ�����ü���
             *     crop: true,
             *
             *     // �Ƿ���ͷ��meta��Ϣ��
             *     preserveHeaders: false,
             *
             *     // Ϊ�յĻ�����ԭ��ͼƬ��ʽ��
             *     // ����ǿ��ת����ָ�������͡�
             *     type: 'image/jpeg'
             * }
             * ```
             */
            thumb: {
                width: 110,
                height: 110,
                quality: 70,
                allowMagnify: true,
                crop: true,
                preserveHeaders: false,

                // Ϊ�յĻ�����ԭ��ͼƬ��ʽ��
                // ����ǿ��ת����ָ�������͡�
                // IE 8���� base64 ��С���ܳ��� 32K ����Ԥ��ʧ�ܣ����� jpeg �����ͼƬ�ܿ�
                // �ܻᳬ�� 32k, �����������ó�Ԥ����ʱ���� image/jpeg
                type: 'image/jpeg'
            },

            /**
             * @property {Object} [compress]
             * @namespace options
             * @for Uploader
             * @description ����ѹ����ͼƬ��ѡ������ѡ��Ϊ`false`, ��ͼƬ���ϴ�ǰ������ѹ����
             *
             * Ĭ��Ϊ��
             *
             * ```javascript
             * {
             *     width: 1600,
             *     height: 1600,
             *
             *     // ͼƬ������ֻ��typeΪ`image/jpeg`��ʱ�����Ч��
             *     quality: 90,
             *
             *     // �Ƿ�����Ŵ������Ҫ����Сͼ��ʱ��ʧ�棬��ѡ��Ӧ������Ϊfalse.
             *     allowMagnify: false,
             *
             *     // �Ƿ�����ü���
             *     crop: false,
             *
             *     // �Ƿ���ͷ��meta��Ϣ��
             *     preserveHeaders: true
             * }
             * ```
             */
            compress: {
                width: 1600,
                height: 1600,
                quality: 90,
                allowMagnify: false,
                crop: false,
                preserveHeaders: true
            }
        });

        return Uploader.register({
            'make-thumb': 'makeThumb',
            'before-send-file': 'compressImage'
        }, {


            /**
             * ��������ͼ���˹���Ϊ�첽��������Ҫ����`callback`��
             * ͨ�������ͼƬ����������ô˷���������Ԥ��ͼ����ǿ����Ч����
             *
             * `callback`�п��Խ��յ�����������
             * * ��һ��Ϊerror�������������ͼ�д��󣬴�error��Ϊ�档
             * * �ڶ���Ϊret, ����ͼ��Data URLֵ��
             *
             * **ע��**
             * Date URL��IE6/7�в�֧�֣����Բ��õ��ô˷����ˣ�ֱ����ʾһ���ݲ�֧��Ԥ��ͼƬ���ˡ�
             *
             *
             * @method makeThumb
             * @grammar makeThumb( file, callback ) => undefined
             * @grammar makeThumb( file, callback, width, height ) => undefined
             * @for Uploader
             * @example
             *
             * uploader.on( 'fileQueued', function( file ) {
             *     var $li = ...;
             *
             *     uploader.makeThumb( file, function( error, ret ) {
             *         if ( error ) {
             *             $li.text('Ԥ������');
             *         } else {
             *             $li.append('<img alt="" src="' + ret + '" />');
             *         }
             *     });
             *
             * });
             */
            makeThumb: function (file, cb, width, height) {
                var opts, image;

                file = this.request('get-file', file);

                // ֻԤ��ͼƬ��ʽ��
                if (!file.type.match(/^image/)) {
                    cb(true);
                    return;
                }

                opts = $.extend({}, this.options.thumb);

                // ����������object.
                if ($.isPlainObject(width)) {
                    opts = $.extend(opts, width);
                    width = null;
                }

                width = width || opts.width;
                height = height || opts.height;

                image = new Image(opts);

                image.once('load', function () {
                    file._info = file._info || image.info();
                    file._meta = file._meta || image.meta();
                    image.resize(width, height);
                });

                image.once('complete', function () {
                    cb(false, image.getAsDataUrl(opts.type));
                    image.destroy();
                });

                image.once('error', function () {
                    cb(true);
                    image.destroy();
                });

                throttle(image, file.source.size, function () {
                    file._info && image.info(file._info);
                    file._meta && image.meta(file._meta);
                    image.loadFromBlob(file.source);
                });
            },

            compressImage: function (file) {
                var opts = this.options.compress || this.options.resize,
                    compressSize = opts && opts.compressSize || 300 * 1024,
                    image, deferred;

                file = this.request('get-file', file);

                // ֻԤ��ͼƬ��ʽ��
                if (!opts || !~'image/jpeg,image/jpg'.indexOf(file.type) ||
                    file.size < compressSize ||
                    file._compressed) {
                    return;
                }

                opts = $.extend({}, opts);
                deferred = Base.Deferred();

                image = new Image(opts);

                deferred.always(function () {
                    image.destroy();
                    image = null;
                });
                image.once('error', deferred.reject);
                image.once('load', function () {
                    file._info = file._info || image.info();
                    file._meta = file._meta || image.meta();
                    image.resize(opts.width, opts.height);
                });

                image.once('complete', function () {
                    var blob, size;

                    // �ƶ��� UC / qq ���������ͼģʽ��
                    // ctx.getImageData �����ͼ��ʱ��ᱨ Exception
                    // INDEX_SIZE_ERR: DOM Exception 1
                    try {
                        blob = image.getAsBlob(opts.type);

                        size = file.size;

                        // ���ѹ���󣬱�ԭ����������ѹ����ġ�
                        if (blob.size < size) {
                            // file.source.destroy && file.source.destroy();
                            file.source = blob;
                            file.size = blob.size;

                            file.trigger('resize', blob.size, size);
                        }

                        // ��ǣ������ظ�ѹ����
                        file._compressed = true;
                        deferred.resolve();
                    } catch (e) {
                        // ������ֱ�Ӽ����������ϴ�ԭʼͼƬ
                        deferred.resolve();
                    }
                });

                file._info && image.info(file._info);
                file._meta && image.meta(file._meta);

                image.loadFromBlob(file.source);
                return deferred.promise();
            }
        });
    });
    /**
     * @fileOverview �ļ����Է�װ
     */
    define('file', [
        'base',
        'mediator'
    ], function (Base, Mediator) {

        var $ = Base.$,
            idPrefix = 'WU_FILE_',
            idSuffix = 0,
            rExt = /\.([^.]+)$/,
            statusMap = {};

        function gid() {
            return idPrefix + idSuffix++;
        }

        /**
         * �ļ���
         * @class File
         * @constructor ���캯��
         * @grammar new File( source ) => File
         * @param {Lib.File} source [lib.File](#Lib.File)ʵ��, ��source�����Ǵ���Runtime��Ϣ�ġ�
         */
        function WUFile(source) {

            /**
             * �ļ�����������չ������׺��
             * @property name
             * @type {string}
             */
            this.name = source.name || 'Untitled';

            /**
             * �ļ�������ֽڣ�
             * @property size
             * @type {uint}
             * @default 0
             */
            this.size = source.size || 0;

            /**
             * �ļ�MIMETYPE���ͣ����ļ����͵Ķ�Ӧ��ϵ��ο�[http://t.cn/z8ZnFny](http://t.cn/z8ZnFny)
             * @property type
             * @type {string}
             * @default 'application'
             */
            this.type = source.type || 'application';

            /**
             * �ļ�����޸�����
             * @property lastModifiedDate
             * @type {int}
             * @default ��ǰʱ���
             */
            this.lastModifiedDate = source.lastModifiedDate || (new Date() * 1);

            /**
             * �ļ�ID��ÿ���������ΨһID�����ļ����޹�
             * @property id
             * @type {string}
             */
            this.id = gid();

            /**
             * �ļ���չ����ͨ���ļ�����ȡ������test.png����չ��Ϊpng
             * @property ext
             * @type {string}
             */
            this.ext = rExt.exec(this.name) ? RegExp.$1 : '';


            /**
             * ״̬����˵�����ڲ�ͬ��status�ﾳ���в�ͬ����;��
             * @property statusText
             * @type {string}
             */
            this.statusText = '';

            // �洢�ļ�״̬����ֹͨ������ֱ���޸�
            statusMap[this.id] = WUFile.Status.INITED;

            this.source = source;
            this.loaded = 0;

            this.on('error', function (msg) {
                this.setStatus(WUFile.Status.ERROR, msg);
            });
        }

        $.extend(WUFile.prototype, {

            /**
             * ����״̬��״̬�仯ʱ�ᴥ��`change`�¼���
             * @method setStatus
             * @grammar setStatus( status[, statusText] );
             * @param {File.Status|String} status [�ļ�״ֵ̬](#WebUploader:File:File.Status)
             * @param {String} [statusText=''] ״̬˵��������errorʱʹ�ã���http, abort,server�������������ʲôԭ�����ļ�����
             */
            setStatus: function (status, text) {

                var prevStatus = statusMap[this.id];

                typeof text !== 'undefined' && (this.statusText = text);

                if (status !== prevStatus) {
                    statusMap[this.id] = status;
                    /**
                     * �ļ�״̬�仯
                     * @event statuschange
                     */
                    this.trigger('statuschange', status, prevStatus);
                }

            },

            /**
             * ��ȡ�ļ�״̬
             * @return {File.Status}
             * @example
             �ļ�״̬����������¼������ͣ�
             {
                         // ��ʼ��
                        INITED:     0,
                        // �������
                        QUEUED:     1,
                        // �����ϴ�
                        PROGRESS:     2,
                        // �ϴ�����
                        ERROR:         3,
                        // �ϴ��ɹ�
                        COMPLETE:     4,
                        // �ϴ�ȡ��
                        CANCELLED:     5
                    }
             */
            getStatus: function () {
                return statusMap[this.id];
            },

            /**
             * ��ȡ�ļ�ԭʼ��Ϣ��
             * @return {*}
             */
            getSource: function () {
                return this.source;
            },

            destory: function () {
                delete statusMap[this.id];
            }
        });

        Mediator.installTo(WUFile.prototype);

        /**
         * �ļ�״ֵ̬������������¼������ͣ�
         * * `inited` ��ʼ״̬
         * * `queued` �Ѿ��������, �ȴ��ϴ�
         * * `progress` �ϴ���
         * * `complete` �ϴ���ɡ�
         * * `error` �ϴ�����������
         * * `interrupt` �ϴ��жϣ���������
         * * `invalid` �ļ����ϸ񣬲��������ϴ������Զ��Ӷ������Ƴ���
         * * `cancelled` �ļ����Ƴ���
         * @property {Object} Status
         * @namespace File
         * @class File
         * @static
         */
        WUFile.Status = {
            INITED: 'inited',    // ��ʼ״̬
            QUEUED: 'queued',    // �Ѿ��������, �ȴ��ϴ�
            PROGRESS: 'progress',    // �ϴ���
            ERROR: 'error',    // �ϴ�����������
            COMPLETE: 'complete',    // �ϴ���ɡ�
            CANCELLED: 'cancelled',    // �ϴ�ȡ����
            INTERRUPT: 'interrupt',    // �ϴ��жϣ���������
            INVALID: 'invalid'    // �ļ����ϸ񣬲��������ϴ���
        };

        return WUFile;
    });

    /**
     * @fileOverview �ļ�����
     */
    define('queue', [
        'base',
        'mediator',
        'file'
    ], function (Base, Mediator, WUFile) {

        var $ = Base.$,
            STATUS = WUFile.Status;

        /**
         * �ļ�����, �����洢����״̬�е��ļ���
         * @class Queue
         * @extends Mediator
         */
        function Queue() {

            /**
             * ͳ���ļ�����
             * * `numOfQueue` �����е��ļ�����
             * * `numOfSuccess` �ϴ��ɹ����ļ���
             * * `numOfCancel` ���Ƴ����ļ���
             * * `numOfProgress` �����ϴ��е��ļ���
             * * `numOfUploadFailed` �ϴ�������ļ�����
             * * `numOfInvalid` ��Ч���ļ�����
             * @property {Object} stats
             */
            this.stats = {
                numOfQueue: 0,
                numOfSuccess: 0,
                numOfCancel: 0,
                numOfProgress: 0,
                numOfUploadFailed: 0,
                numOfInvalid: 0
            };

            // �ϴ����У��������ȴ��ϴ����ļ�
            this._queue = [];

            // �洢�����ļ�
            this._map = {};
        }

        $.extend(Queue.prototype, {

            /**
             * �����ļ�����Զ���β��
             *
             * @method append
             * @param  {File} file   �ļ�����
             */
            append: function (file) {
                this._queue.push(file);
                this._fileAdded(file);
                return this;
            },

            /**
             * �����ļ�����Զ���ͷ��
             *
             * @method prepend
             * @param  {File} file   �ļ�����
             */
            prepend: function (file) {
                this._queue.unshift(file);
                this._fileAdded(file);
                return this;
            },

            /**
             * ��ȡ�ļ�����
             *
             * @method getFile
             * @param  {String} fileId   �ļ�ID
             * @return {File}
             */
            getFile: function (fileId) {
                if (typeof fileId !== 'string') {
                    return fileId;
                }
                return this._map[fileId];
            },

            /**
             * �Ӷ�����ȡ��һ��ָ��״̬���ļ���
             * @grammar fetch( status ) => File
             * @method fetch
             * @param {String} status [�ļ�״ֵ̬](#WebUploader:File:File.Status)
             * @return {File} [File](#WebUploader:File)
             */
            fetch: function (status) {
                var len = this._queue.length,
                    i, file;

                status = status || STATUS.QUEUED;

                for (i = 0; i < len; i++) {
                    file = this._queue[i];

                    if (status === file.getStatus()) {
                        return file;
                    }
                }

                return null;
            },

            /**
             * �Զ��н��������ܹ������ļ��ϴ�˳��
             * @grammar sort( fn ) => undefined
             * @method sort
             * @param {Function} fn ���򷽷�
             */
            sort: function (fn) {
                if (typeof fn === 'function') {
                    this._queue.sort(fn);
                }
            },

            /**
             * ��ȡָ�����͵��ļ��б�, �б���ÿһ����ԱΪ[File](#WebUploader:File)����
             * @grammar getFiles( [status1[, status2 ...]] ) => Array
             * @method getFiles
             * @param {String} [status] [�ļ�״ֵ̬](#WebUploader:File:File.Status)
             */
            getFiles: function () {
                var sts = [].slice.call(arguments, 0),
                    ret = [],
                    i = 0,
                    len = this._queue.length,
                    file;

                for (; i < len; i++) {
                    file = this._queue[i];

                    if (sts.length && !~$.inArray(file.getStatus(), sts)) {
                        continue;
                    }

                    ret.push(file);
                }

                return ret;
            },

            _fileAdded: function (file) {
                var me = this,
                    existing = this._map[file.id];

                if (!existing) {
                    this._map[file.id] = file;

                    file.on('statuschange', function (cur, pre) {
                        me._onFileStatusChange(cur, pre);
                    });
                }

                file.setStatus(STATUS.QUEUED);
            },

            _onFileStatusChange: function (curStatus, preStatus) {
                var stats = this.stats;

                switch (preStatus) {
                    case STATUS.PROGRESS:
                        stats.numOfProgress--;
                        break;

                    case STATUS.QUEUED:
                        stats.numOfQueue--;
                        break;

                    case STATUS.ERROR:
                        stats.numOfUploadFailed--;
                        break;

                    case STATUS.INVALID:
                        stats.numOfInvalid--;
                        break;
                }

                switch (curStatus) {
                    case STATUS.QUEUED:
                        stats.numOfQueue++;
                        break;

                    case STATUS.PROGRESS:
                        stats.numOfProgress++;
                        break;

                    case STATUS.ERROR:
                        stats.numOfUploadFailed++;
                        break;

                    case STATUS.COMPLETE:
                        stats.numOfSuccess++;
                        break;

                    case STATUS.CANCELLED:
                        stats.numOfCancel++;
                        break;

                    case STATUS.INVALID:
                        stats.numOfInvalid++;
                        break;
                }
            }

        });

        Mediator.installTo(Queue.prototype);

        return Queue;
    });
    /**
     * @fileOverview ����
     */
    define('widgets/queue', [
        'base',
        'uploader',
        'queue',
        'file',
        'lib/file',
        'runtime/client',
        'widgets/widget'
    ], function (Base, Uploader, Queue, WUFile, File, RuntimeClient) {

        var $ = Base.$,
            rExt = /\.\w+$/,
            Status = WUFile.Status;

        return Uploader.register({
            'sort-files': 'sortFiles',
            'add-file': 'addFiles',
            'get-file': 'getFile',
            'fetch-file': 'fetchFile',
            'get-stats': 'getStats',
            'get-files': 'getFiles',
            'remove-file': 'removeFile',
            'retry': 'retry',
            'reset': 'reset',
            'accept-file': 'acceptFile'
        }, {

            init: function (opts) {
                var me = this,
                    deferred, len, i, item, arr, accept, runtime;

                if ($.isPlainObject(opts.accept)) {
                    opts.accept = [opts.accept];
                }

                // accept�е�������ƥ������
                if (opts.accept) {
                    arr = [];

                    for (i = 0, len = opts.accept.length; i < len; i++) {
                        item = opts.accept[i].extensions;
                        item && arr.push(item);
                    }

                    if (arr.length) {
                        accept = '\\.' + arr.join(',')
                            .replace(/,/g, '$|\\.')
                            .replace(/\*/g, '.*') + '$';
                    }

                    me.accept = new RegExp(accept, 'i');
                }

                me.queue = new Queue();
                me.stats = me.queue.stats;

                // �����ǰ����html5����ʱ���Ǿ����ˡ�
                // ��ִ�к�������
                if (this.request('predict-runtime-type') !== 'html5') {
                    return;
                }

                // ����һ�� html5 ����ʱ�� placeholder
                // �������ⲿ���ԭ�� File �����ʱ������ȷ����һ�¹� webuploader ʹ�á�
                deferred = Base.Deferred();
                runtime = new RuntimeClient('Placeholder');
                runtime.connectRuntime({
                    runtimeOrder: 'html5'
                }, function () {
                    me._ruid = runtime.getRuid();
                    deferred.resolve();
                });
                return deferred.promise();
            },


            // Ϊ��֧���ⲿֱ�����һ��ԭ��File����
            _wrapFile: function (file) {
                if (!(file instanceof WUFile)) {

                    if (!(file instanceof File)) {
                        if (!this._ruid) {
                            throw new Error('Can\'t add external files.');
                        }
                        file = new File(this._ruid, file);
                    }

                    file = new WUFile(file);
                }

                return file;
            },

            // �ж��ļ��Ƿ���Ա��������
            acceptFile: function (file) {
                var invalid = !file || file.size < 6 || this.accept &&

                    // ����������к�׺��������׺����������
                    rExt.exec(file.name) && !this.accept.test(file.name);

                return !invalid;
            },


            /**
             * @event beforeFileQueued
             * @param {File} file File����
             * @description ���ļ����������֮ǰ���������¼���handler����ֵΪ`false`������ļ����ᱻ��ӽ�����С�
             * @for  Uploader
             */

            /**
             * @event fileQueued
             * @param {File} file File����
             * @description ���ļ�����������Ժ󴥷���
             * @for  Uploader
             */

            _addFile: function (file) {
                var me = this;

                file = me._wrapFile(file);

                // ���������ж��������������� `beforeFileQueued`
                if (!me.owner.trigger('beforeFileQueued', file)) {
                    return;
                }

                // ���Ͳ�ƥ�䣬�����ʹ����¼��������ء�
                if (!me.acceptFile(file)) {
                    me.owner.trigger('error', 'Q_TYPE_DENIED', file);
                    return;
                }

                me.queue.append(file);
                me.owner.trigger('fileQueued', file);
                return file;
            },

            getFile: function (fileId) {
                return this.queue.getFile(fileId);
            },

            /**
             * @event filesQueued
             * @param {File} files ���飬����ΪԭʼFile(lib/File������
             * @description ��һ���ļ���ӽ������Ժ󴥷���
             * @for  Uploader
             */

            /**
             * @method addFiles
             * @grammar addFiles( file ) => undefined
             * @grammar addFiles( [file1, file2 ...] ) => undefined
             * @param {Array of File or File} [files] Files ���� ����
             * @description ����ļ�������
             * @for  Uploader
             */
            addFiles: function (files) {
                var me = this;

                if (!files.length) {
                    files = [files];
                }

                files = $.map(files, function (file) {
                    return me._addFile(file);
                });

                me.owner.trigger('filesQueued', files);

                if (me.options.auto) {
                    me.request('start-upload');
                }
            },

            getStats: function () {
                return this.stats;
            },

            /**
             * @event fileDequeued
             * @param {File} file File����
             * @description ���ļ����Ƴ����к󴥷���
             * @for  Uploader
             */

            /**
             * @method removeFile
             * @grammar removeFile( file ) => undefined
             * @grammar removeFile( id ) => undefined
             * @param {File|id} file File�������File�����id
             * @description �Ƴ�ĳһ�ļ���
             * @for  Uploader
             * @example
             *
             * $li.on('click', '.remove-this', function() {
             *     uploader.removeFile( file );
             * })
             */
            removeFile: function (file) {
                var me = this;

                file = file.id ? file : me.queue.getFile(file);

                file.setStatus(Status.CANCELLED);
                me.owner.trigger('fileDequeued', file);
            },

            /**
             * @method getFiles
             * @grammar getFiles() => Array
             * @grammar getFiles( status1, status2, status... ) => Array
             * @description ����ָ��״̬���ļ����ϣ�������������������״̬���ļ���
             * @for  Uploader
             * @example
             * console.log( uploader.getFiles() );    // => all files
             * console.log( uploader.getFiles('error') )    // => all error files.
             */
            getFiles: function () {
                return this.queue.getFiles.apply(this.queue, arguments);
            },

            fetchFile: function () {
                return this.queue.fetch.apply(this.queue, arguments);
            },

            /**
             * @method retry
             * @grammar retry() => undefined
             * @grammar retry( file ) => undefined
             * @description �����ϴ�������ָ���ļ������ߴӳ�����ļ���ʼ�����ϴ���
             * @for  Uploader
             * @example
             * function retry() {
             *     uploader.retry();
             * }
             */
            retry: function (file, noForceStart) {
                var me = this,
                    files, i, len;

                if (file) {
                    file = file.id ? file : me.queue.getFile(file);
                    file.setStatus(Status.QUEUED);
                    noForceStart || me.request('start-upload');
                    return;
                }

                files = me.queue.getFiles(Status.ERROR);
                i = 0;
                len = files.length;

                for (; i < len; i++) {
                    file = files[i];
                    file.setStatus(Status.QUEUED);
                }

                me.request('start-upload');
            },

            /**
             * @method sort
             * @grammar sort( fn ) => undefined
             * @description ��������е��ļ������ϴ�֮ǰ�������Կ����ϴ�˳��
             * @for  Uploader
             */
            sortFiles: function () {
                return this.queue.sort.apply(this.queue, arguments);
            },

            /**
             * @method reset
             * @grammar reset() => undefined
             * @description ����uploader��Ŀǰֻ�����˶��С�
             * @for  Uploader
             * @example
             * uploader.reset();
             */
            reset: function () {
                this.queue = new Queue();
                this.stats = this.queue.stats;
            }
        });

    });
    /**
     * @fileOverview ��ӻ�ȡRuntime�����Ϣ�ķ�����
     */
    define('widgets/runtime', [
        'uploader',
        'runtime/runtime',
        'widgets/widget'
    ], function (Uploader, Runtime) {

        Uploader.support = function () {
            return Runtime.hasRuntime.apply(Runtime, arguments);
        };

        return Uploader.register({
            'predict-runtime-type': 'predictRuntmeType'
        }, {

            init: function () {
                if (!this.predictRuntmeType()) {
                    throw Error('Runtime Error');
                }
            },

            /**
             * Ԥ��Uploader�������ĸ�`Runtime`
             * @grammar predictRuntmeType() => String
             * @method predictRuntmeType
             * @for  Uploader
             */
            predictRuntmeType: function () {
                var orders = this.options.runtimeOrder || Runtime.orders,
                    type = this.type,
                    i, len;

                if (!type) {
                    orders = orders.split(/\s*,\s*/g);

                    for (i = 0, len = orders.length; i < len; i++) {
                        if (Runtime.hasRuntime(orders[i])) {
                            this.type = type = orders[i];
                            break;
                        }
                    }
                }

                return type;
            }
        });
    });
    /**
     * @fileOverview Transport
     */
    define('lib/transport', [
        'base',
        'runtime/client',
        'mediator'
    ], function (Base, RuntimeClient, Mediator) {

        var $ = Base.$;

        function Transport(opts) {
            var me = this;

            opts = me.options = $.extend(true, {}, Transport.options, opts || {});
            RuntimeClient.call(this, 'Transport');

            this._blob = null;
            this._formData = opts.formData || {};
            this._headers = opts.headers || {};

            this.on('progress', this._timeout);
            this.on('load error', function () {
                me.trigger('progress', 1);
                clearTimeout(me._timer);
            });
        }

        Transport.options = {
            server: '',
            method: 'POST',

            // ����ʱ���Ƿ�����Я��cookie, ֻ��html5 runtime����Ч
            withCredentials: false,
            fileVal: 'file',
            timeout: 2 * 60 * 1000,    // 2����
            formData: {},
            headers: {},
            sendAsBinary: false
        };

        $.extend(Transport.prototype, {

            // ���Blob, ֻ�����һ�Σ����һ����Ч��
            appendBlob: function (key, blob, filename) {
                var me = this,
                    opts = me.options;

                if (me.getRuid()) {
                    me.disconnectRuntime();
                }

                // ���ӵ�blob������ͬһ��runtime.
                me.connectRuntime(blob.ruid, function () {
                    me.exec('init');
                });

                me._blob = blob;
                opts.fileVal = key || opts.fileVal;
                opts.filename = filename || opts.filename;
            },

            // ��������ֶ�
            append: function (key, value) {
                if (typeof key === 'object') {
                    $.extend(this._formData, key);
                } else {
                    this._formData[key] = value;
                }
            },

            setRequestHeader: function (key, value) {
                if (typeof key === 'object') {
                    $.extend(this._headers, key);
                } else {
                    this._headers[key] = value;
                }
            },

            send: function (method) {
                this.exec('send', method);
                this._timeout();
            },

            abort: function () {
                clearTimeout(this._timer);
                return this.exec('abort');
            },

            destroy: function () {
                this.trigger('destroy');
                this.off();
                this.exec('destroy');
                this.disconnectRuntime();
            },

            getResponse: function () {
                return this.exec('getResponse');
            },

            getResponseAsJson: function () {
                return this.exec('getResponseAsJson');
            },

            getStatus: function () {
                return this.exec('getStatus');
            },

            _timeout: function () {
                var me = this,
                    duration = me.options.timeout;

                if (!duration) {
                    return;
                }

                clearTimeout(me._timer);
                me._timer = setTimeout(function () {
                    me.abort();
                    me.trigger('error', 'timeout');
                }, duration);
            }

        });

        // ��Transport�߱��¼����ܡ�
        Mediator.installTo(Transport.prototype);

        return Transport;
    });
    /**
     * @fileOverview �����ļ��ϴ���ء�
     */
    define('widgets/upload', [
        'base',
        'uploader',
        'file',
        'lib/transport',
        'widgets/widget'
    ], function (Base, Uploader, WUFile, Transport) {

        var $ = Base.$,
            isPromise = Base.isPromise,
            Status = WUFile.Status;

        // ���Ĭ��������
        $.extend(Uploader.options, {


            /**
             * @property {Boolean} [prepareNextFile=false]
             * @namespace options
             * @for Uploader
             * @description �Ƿ��������ļ�����ʱ��ǰ����һ���ļ�׼���á�
             * ����һ���ļ���׼�������ȽϺ�ʱ������ͼƬѹ����md5���л���
             * �������ǰ�ڵ�ǰ�ļ������ڴ������Խ�ʡ�����ʱ��
             */
            prepareNextFile: false,

            /**
             * @property {Boolean} [chunked=false]
             * @namespace options
             * @for Uploader
             * @description �Ƿ�Ҫ��Ƭ������ļ��ϴ���
             */
            chunked: false,

            /**
             * @property {Boolean} [chunkSize=5242880]
             * @namespace options
             * @for Uploader
             * @description ���Ҫ��Ƭ���ֶ��һƬ�� Ĭ�ϴ�СΪ5M.
             */
            chunkSize: 5 * 1024 * 1024,

            /**
             * @property {Boolean} [chunkRetry=2]
             * @namespace options
             * @for Uploader
             * @description ���ĳ����Ƭ��������������������Զ��ش����ٴΣ�
             */
            chunkRetry: 2,

            /**
             * @property {Boolean} [threads=3]
             * @namespace options
             * @for Uploader
             * @description �ϴ�������������ͬʱ����ϴ���������
             */
            threads: 3,


            /**
             * @property {Object} [formData]
             * @namespace options
             * @for Uploader
             * @description �ļ��ϴ�����Ĳ�����ÿ�η��Ͷ��ᷢ�ʹ˶����еĲ�����
             */
            formData: null

            /**
             * @property {Object} [fileVal='file']
             * @namespace options
             * @for Uploader
             * @description �����ļ��ϴ����name��
             */

            /**
             * @property {Object} [method='POST']
             * @namespace options
             * @for Uploader
             * @description �ļ��ϴ���ʽ��`POST`����`GET`��
             */

            /**
             * @property {Object} [sendAsBinary=false]
             * @namespace options
             * @for Uploader
             * @description �Ƿ��Ѷ����Ƶ����ķ�ʽ�����ļ������������ϴ�����`php://input`��Ϊ�ļ����ݣ�
             * ����������$_GET�����С�
             */
        });

        // �����ļ���Ƭ��
        function CuteFile(file, chunkSize) {
            var pending = [],
                blob = file.source,
                total = blob.size,
                chunks = chunkSize ? Math.ceil(total / chunkSize) : 1,
                start = 0,
                index = 0,
                len;

            while (index < chunks) {
                len = Math.min(chunkSize, total - start);

                pending.push({
                    file: file,
                    start: start,
                    end: chunkSize ? (start + len) : total,
                    total: total,
                    chunks: chunks,
                    chunk: index++
                });
                start += len;
            }

            file.blocks = pending.concat();
            file.remaning = pending.length;

            return {
                file: file,

                has: function () {
                    return !!pending.length;
                },

                fetch: function () {
                    return pending.shift();
                }
            };
        }

        Uploader.register({
            'start-upload': 'start',
            'stop-upload': 'stop',
            'skip-file': 'skipFile',
            'is-in-progress': 'isInProgress'
        }, {

            init: function () {
                var owner = this.owner;

                this.runing = false;

                // ��¼��ǰ���ڴ������ݣ���threads���
                this.pool = [];

                // ���漴���ϴ����ļ���
                this.pending = [];

                // ���ٻ��ж��ٷ�Ƭû������ϴ���
                this.remaning = 0;
                this.__tick = Base.bindFn(this._tick, this);

                owner.on('uploadComplete', function (file) {
                    // ��������ȡ���ˡ�
                    file.blocks && $.each(file.blocks, function (_, v) {
                        v.transport && (v.transport.abort(), v.transport.destroy());
                        delete v.transport;
                    });

                    delete file.blocks;
                    delete file.remaning;
                });
            },

            /**
             * @event startUpload
             * @description ����ʼ�ϴ�����ʱ������
             * @for  Uploader
             */

            /**
             * ��ʼ�ϴ����˷������Դӳ�ʼ״̬���ÿ�ʼ�ϴ����̣�Ҳ���Դ���ͣ״̬���ã������ϴ����̡�
             * @grammar upload() => undefined
             * @method upload
             * @for  Uploader
             */
            start: function () {
                var me = this;

                // �Ƴ�invalid���ļ�
                $.each(me.request('get-files', Status.INVALID), function () {
                    me.request('remove-file', this);
                });

                if (me.runing) {
                    return;
                }

                me.runing = true;

                // �������ͣ�ģ�������
                $.each(me.pool, function (_, v) {
                    var file = v.file;

                    if (file.getStatus() === Status.INTERRUPT) {
                        file.setStatus(Status.PROGRESS);
                        me._trigged = false;
                        v.transport && v.transport.send();
                    }
                });

                me._trigged = false;
                me.owner.trigger('startUpload');
                Base.nextTick(me.__tick);
            },

            /**
             * @event stopUpload
             * @description ����ʼ�ϴ�������ͣʱ������
             * @for  Uploader
             */

            /**
             * ��ͣ�ϴ�����һ������Ϊ�Ƿ��ж��ϴ���ǰ�����ϴ����ļ���
             * @grammar stop() => undefined
             * @grammar stop( true ) => undefined
             * @method stop
             * @for  Uploader
             */
            stop: function (interrupt) {
                var me = this;

                if (me.runing === false) {
                    return;
                }

                me.runing = false;

                interrupt && $.each(me.pool, function (_, v) {
                    v.transport && v.transport.abort();
                    v.file.setStatus(Status.INTERRUPT);
                });

                me.owner.trigger('stopUpload');
            },

            /**
             * �ж�`Uplaode`r�Ƿ������ϴ��С�
             * @grammar isInProgress() => Boolean
             * @method isInProgress
             * @for  Uploader
             */
            isInProgress: function () {
                return !!this.runing;
            },

            getStats: function () {
                return this.request('get-stats');
            },

            /**
             * ����һ���ļ��ϴ���ֱ�ӱ��ָ���ļ�Ϊ���ϴ�״̬��
             * @grammar skipFile( file ) => undefined
             * @method skipFile
             * @for  Uploader
             */
            skipFile: function (file, status) {
                file = this.request('get-file', file);

                file.setStatus(status || Status.COMPLETE);
                file.skipped = true;

                // ��������ϴ���
                file.blocks && $.each(file.blocks, function (_, v) {
                    var _tr = v.transport;

                    if (_tr) {
                        _tr.abort();
                        _tr.destroy();
                        delete v.transport;
                    }
                });

                this.owner.trigger('uploadSkip', file);
            },

            /**
             * @event uploadFinished
             * @description �������ļ��ϴ�����ʱ������
             * @for  Uploader
             */
            _tick: function () {
                var me = this,
                    opts = me.options,
                    fn, val;

                // ��һ��promise��û�н�������ȴ���ɺ���ִ�С�
                if (me._promise) {
                    return me._promise.always(me.__tick);
                }

                // ����λ�ã��һ����ļ�Ҫ����Ļ���
                if (me.pool.length < opts.threads && (val = me._nextBlock())) {
                    me._trigged = false;

                    fn = function (val) {
                        me._promise = null;

                        // �п�����reject�����ģ�����Ҫ���val�����͡�
                        val && val.file && me._startSend(val);
                        Base.nextTick(me.__tick);
                    };

                    me._promise = isPromise(val) ? val.always(fn) : fn(val);

                    // û��Ҫ�ϴ����ˣ���û�����ڴ�����ˡ�
                } else if (!me.remaning && !me.getStats().numOfQueue) {
                    me.runing = false;

                    me._trigged || Base.nextTick(function () {
                        me.owner.trigger('uploadFinished');
                    });
                    me._trigged = true;
                }
            },

            _nextBlock: function () {
                var me = this,
                    act = me._act,
                    opts = me.options,
                    next, done;

                // �����ǰ�ļ�����û����Ҫ����ģ���ֱ�ӷ���ʣ�µġ�
                if (act && act.has() &&
                    act.file.getStatus() === Status.PROGRESS) {

                    // �Ƿ���ǰ׼����һ���ļ�
                    if (opts.prepareNextFile && !me.pending.length) {
                        me._prepareNextFile();
                    }

                    return act.fetch();

                    // ��������������У���׼����һ���ļ������ȴ���ɺ󷵻��¸���Ƭ��
                } else if (me.runing) {

                    // ����������У���ֱ���ڻ�����ȡ��û����ȥqueue��ȡ��
                    if (!me.pending.length && me.getStats().numOfQueue) {
                        me._prepareNextFile();
                    }

                    next = me.pending.shift();
                    done = function (file) {
                        if (!file) {
                            return null;
                        }

                        act = CuteFile(file, opts.chunked ? opts.chunkSize : 0);
                        me._act = act;
                        return act.fetch();
                    };

                    // �ļ����ܻ���prepare�У�Ҳ�п����Ѿ���ȫ׼�����ˡ�
                    return isPromise(next) ?
                        next[next.pipe ? 'pipe' : 'then'](done) :
                        done(next);
                }
            },


            /**
             * @event uploadStart
             * @param {File} file File����
             * @description ĳ���ļ���ʼ�ϴ�ǰ������һ���ļ�ֻ�ᴥ��һ�Ρ�
             * @for  Uploader
             */
            _prepareNextFile: function () {
                var me = this,
                    file = me.request('fetch-file'),
                    pending = me.pending,
                    promise;

                if (file) {
                    promise = me.request('before-send-file', file, function () {

                        // �п����ļ���skip���ˡ��ļ���skip����״̬�Ӷ�����Queued.
                        if (file.getStatus() === Status.QUEUED) {
                            me.owner.trigger('uploadStart', file);
                            file.setStatus(Status.PROGRESS);
                            return file;
                        }

                        return me._finishFile(file);
                    });

                    // �������pending�У����滻���ļ�����
                    promise.done(function () {
                        var idx = $.inArray(promise, pending);

                        ~idx && pending.splice(idx, 1, file);
                    });

                    // befeore-send-file�Ĺ��Ӿ��д�������
                    promise.fail(function (reason) {
                        file.setStatus(Status.ERROR, reason);
                        me.owner.trigger('uploadError', file, reason);
                        me.owner.trigger('uploadComplete', file);
                    });

                    pending.push(promise);
                }
            },

            // �ó�λ���ˣ�������������Ƭ��ʼ�ϴ�
            _popBlock: function (block) {
                var idx = $.inArray(block, this.pool);

                this.pool.splice(idx, 1);
                block.file.remaning--;
                this.remaning--;
            },

            // ��ʼ�ϴ������Ա����������promise��reject�ˣ����ʾ�����˷�Ƭ��
            _startSend: function (block) {
                var me = this,
                    file = block.file,
                    promise;

                me.pool.push(block);
                me.remaning++;

                // ���û�з�Ƭ����ֱ��ʹ��ԭʼ�ġ�
                // ���ᶪʧcontent-type��Ϣ��
                block.blob = block.chunks === 1 ? file.source :
                    file.source.slice(block.start, block.end);

                // hook, ÿ����Ƭ����֮ǰ����Ҫ��Щ�첽�����顣
                promise = me.request('before-send', block, function () {

                    // �п����ļ��Ѿ��ϴ������ˣ����Բ���Ҫ�ٴ����ˡ�
                    if (file.getStatus() === Status.PROGRESS) {
                        me._doSend(block);
                    } else {
                        me._popBlock(block);
                        Base.nextTick(me.__tick);
                    }
                });

                // ���Ϊfail�ˣ��������˷�Ƭ��
                promise.fail(function () {
                    if (file.remaning === 1) {
                        me._finishFile(file).always(function () {
                            block.percentage = 1;
                            me._popBlock(block);
                            me.owner.trigger('uploadComplete', file);
                            Base.nextTick(me.__tick);
                        });
                    } else {
                        block.percentage = 1;
                        me._popBlock(block);
                        Base.nextTick(me.__tick);
                    }
                });
            },


            /**
             * @event uploadBeforeSend
             * @param {Object} object
             * @param {Object} data Ĭ�ϵ��ϴ�������������չ�˶����������ϴ�������
             * @description ��ĳ���ļ��ķֿ��ڷ���ǰ��������Ҫ����ѯ���Ƿ�Ҫ��Ӹ������������ļ��ڿ����Ƭ�ϴ���ǰ���´��¼����ܻᴥ����Ρ�
             * @for  Uploader
             */

            /**
             * @event uploadAccept
             * @param {Object} object
             * @param {Object} ret ����˵ķ������ݣ�json��ʽ���������˲���json��ʽ����ret._raw��ȡ���ݣ����н�����
             * @description ��ĳ���ļ��ϴ����������Ӧ�󣬻����ʹ��¼���ѯ�ʷ������Ӧ�Ƿ���Ч��������¼�handler����ֵΪ`false`, ����ļ�������`server`���͵�`uploadError`�¼���
             * @for  Uploader
             */

            /**
             * @event uploadProgress
             * @param {File} file File����
             * @param {Number} percentage �ϴ�����
             * @description �ϴ������д�����Я���ϴ����ȡ�
             * @for  Uploader
             */


            /**
             * @event uploadError
             * @param {File} file File����
             * @param {String} reason �����code
             * @description ���ļ��ϴ�����ʱ������
             * @for  Uploader
             */

            /**
             * @event uploadSuccess
             * @param {File} file File����
             * @param {Object} response ����˷��ص�����
             * @description ���ļ��ϴ��ɹ�ʱ������
             * @for  Uploader
             */

            /**
             * @event uploadComplete
             * @param {File} [file] File����
             * @description ���ܳɹ�����ʧ�ܣ��ļ��ϴ����ʱ������
             * @for  Uploader
             */

            // ���ϴ�������
            _doSend: function (block) {
                var me = this,
                    owner = me.owner,
                    opts = me.options,
                    file = block.file,
                    tr = new Transport(opts),
                    data = $.extend({}, opts.formData),
                    headers = $.extend({}, opts.headers),
                    requestAccept, ret;

                block.transport = tr;

                tr.on('destroy', function () {
                    delete block.transport;
                    me._popBlock(block);
                    Base.nextTick(me.__tick);
                });

                // �㲥�ϴ����ȡ����ļ�Ϊ��λ��
                tr.on('progress', function (percentage) {
                    var totalPercent = 0,
                        uploaded = 0;

                    // ����û��abort����progress����ִ�н����ˡ�
                    // if ( !file.blocks ) {
                    //     return;
                    // }

                    totalPercent = block.percentage = percentage;

                    if (block.chunks > 1) {    // �����ļ��������ٶȡ�
                        $.each(file.blocks, function (_, v) {
                            uploaded += (v.percentage || 0) * (v.end - v.start);
                        });

                        totalPercent = uploaded / file.size;
                    }

                    owner.trigger('uploadProgress', file, totalPercent || 0);
                });

                // ����ѯ�ʣ��Ƿ񷵻صĽ�����д���ġ�
                requestAccept = function (reject) {
                    var fn;

                    ret = tr.getResponseAsJson() || {};
                    ret._raw = tr.getResponse();
                    fn = function (value) {
                        reject = value;
                    };

                    // �������Ӧ�ˣ�������ɹ��ˣ�ѯ���Ƿ���Ӧ��ȷ��
                    if (!owner.trigger('uploadAccept', block, ret, fn)) {
                        reject = reject || 'server';
                    }

                    return reject;
                };

                // �������ԣ�Ȼ��㲥�ļ��ϴ�����
                tr.on('error', function (type, flag) {
                    block.retried = block.retried || 0;

                    // �Զ�����
                    if (block.chunks > 1 && ~'http,abort'.indexOf(type) &&
                        block.retried < opts.chunkRetry) {

                        block.retried++;
                        tr.send();

                    } else {

                        // http status 500 ~ 600
                        if (!flag && type === 'server') {
                            type = requestAccept(type);
                        }

                        file.setStatus(Status.ERROR, type);
                        owner.trigger('uploadError', file, type);
                        owner.trigger('uploadComplete', file);
                    }
                });

                // �ϴ��ɹ�
                tr.on('load', function () {
                    var reason;

                    // �����Ԥ�ڣ�ת���ϴ�����
                    if ((reason = requestAccept())) {
                        tr.trigger('error', reason, true);
                        return;
                    }

                    // ȫ���ϴ���ɡ�
                    if (file.remaning === 1) {
                        me._finishFile(file, ret);
                    } else {
                        tr.destroy();
                    }
                });

                // ����Ĭ�ϵ��ϴ��ֶΡ�
                data = $.extend(data, {
                    id: file.id,
                    name: file.name,
                    type: file.type,
                    lastModifiedDate: file.lastModifiedDate,
                    size: file.size
                });

                block.chunks > 1 && $.extend(data, {
                    chunks: block.chunks,
                    chunk: block.chunk
                });

                // �ڷ���֮���������ֶ�ʲô�ġ�����
                // ���Ĭ�ϵ��ֶβ���ʹ�ã�����ͨ���������¼�����չ
                owner.trigger('uploadBeforeSend', block, data, headers);

                // ��ʼ���͡�
                tr.appendBlob(opts.fileVal, block.blob, file.name);
                tr.append(data);
                tr.setRequestHeader(headers);
                tr.send();
            },

            // ����ϴ���
            _finishFile: function (file, ret, hds) {
                var owner = this.owner;

                return owner
                    .request('after-send-file', arguments, function () {
                        file.setStatus(Status.COMPLETE);
                        owner.trigger('uploadSuccess', file, ret, hds);
                    })
                    .fail(function (reason) {

                        // ����ⲿ�Ѿ����Ϊinvalidʲô�ģ����ٸ�״̬��
                        if (file.getStatus() === Status.PROGRESS) {
                            file.setStatus(Status.ERROR, reason);
                        }

                        owner.trigger('uploadError', file, reason);
                    })
                    .always(function () {
                        owner.trigger('uploadComplete', file);
                    });
            }

        });
    });
    /**
     * @fileOverview ������֤�������ļ��ܴ�С�Ƿ񳬳������ļ��Ƿ񳬳����ļ��Ƿ��ظ���
     */

    define('widgets/validator', [
        'base',
        'uploader',
        'file',
        'widgets/widget'
    ], function (Base, Uploader, WUFile) {

        var $ = Base.$,
            validators = {},
            api;

        /**
         * @event error
         * @param {String} type �������͡�
         * @description ��validate��ͨ��ʱ���������ʹ����¼�����ʽ֪ͨ�����ߡ�ͨ��`upload.on('error', handler)`���Բ��񵽴������Ŀǰ�����´�������ض�����������ʹ�����
         *
         * * `Q_EXCEED_NUM_LIMIT` ��������`fileNumLimit`�ҳ��Ը�`uploader`��ӵ��ļ������������ֵʱ���͡�
         * * `Q_EXCEED_SIZE_LIMIT` ��������`Q_EXCEED_SIZE_LIMIT`�ҳ��Ը�`uploader`��ӵ��ļ��ܴ�С�������ֵʱ���͡�
         * @for  Uploader
         */

        // ��¶�������api
        api = {

            // �����֤��
            addValidator: function (type, cb) {
                validators[type] = cb;
            },

            // �Ƴ���֤��
            removeValidator: function (type) {
                delete validators[type];
            }
        };

        // ��Uploader��ʼ����ʱ������Validators�ĳ�ʼ��
        Uploader.register({
            init: function () {
                var me = this;
                $.each(validators, function () {
                    this.call(me.owner);
                });
            }
        });

        /**
         * @property {int} [fileNumLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description ��֤�ļ�������, ���������������С�
         */
        api.addValidator('fileNumLimit', function () {
            var uploader = this,
                opts = uploader.options,
                count = 0,
                max = opts.fileNumLimit >> 0,
                flag = true;

            if (!max) {
                return;
            }

            uploader.on('beforeFileQueued', function (file) {

                if (count >= max && flag) {
                    flag = false;
                    this.trigger('error', 'Q_EXCEED_NUM_LIMIT', max, file);
                    setTimeout(function () {
                        flag = true;
                    }, 1);
                }

                return count >= max ? false : true;
            });

            uploader.on('fileQueued', function () {
                count++;
            });

            uploader.on('fileDequeued', function () {
                count--;
            });

            uploader.on('uploadFinished', function () {
                count = 0;
            });
        });


        /**
         * @property {int} [fileSizeLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description ��֤�ļ��ܴ�С�Ƿ񳬳�����, ���������������С�
         */
        api.addValidator('fileSizeLimit', function () {
            var uploader = this,
                opts = uploader.options,
                count = 0,
                max = opts.fileSizeLimit >> 0,
                flag = true;

            if (!max) {
                return;
            }

            uploader.on('beforeFileQueued', function (file) {
                var invalid = count + file.size > max;

                if (invalid && flag) {
                    flag = false;
                    this.trigger('error', 'Q_EXCEED_SIZE_LIMIT', max, file);
                    setTimeout(function () {
                        flag = true;
                    }, 1);
                }

                return invalid ? false : true;
            });

            uploader.on('fileQueued', function (file) {
                count += file.size;
            });

            uploader.on('fileDequeued', function (file) {
                count -= file.size;
            });

            uploader.on('uploadFinished', function () {
                count = 0;
            });
        });

        /**
         * @property {int} [fileSingleSizeLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description ��֤�����ļ���С�Ƿ񳬳�����, ���������������С�
         */
        api.addValidator('fileSingleSizeLimit', function () {
            var uploader = this,
                opts = uploader.options,
                max = opts.fileSingleSizeLimit;

            if (!max) {
                return;
            }

            uploader.on('beforeFileQueued', function (file) {

                if (file.size > max) {
                    file.setStatus(WUFile.Status.INVALID, 'exceed_size');
                    this.trigger('error', 'F_EXCEED_SIZE', file);
                    return false;
                }

            });

        });

        /**
         * @property {int} [duplicate=undefined]
         * @namespace options
         * @for Uploader
         * @description ȥ�أ� �����ļ����֡��ļ���С������޸�ʱ��������hash Key.
         */
        api.addValidator('duplicate', function () {
            var uploader = this,
                opts = uploader.options,
                mapping = {};

            if (opts.duplicate) {
                return;
            }

            function hashString(str) {
                var hash = 0,
                    i = 0,
                    len = str.length,
                    _char;

                for (; i < len; i++) {
                    _char = str.charCodeAt(i);
                    hash = _char + (hash << 6) + (hash << 16) - hash;
                }

                return hash;
            }

            uploader.on('beforeFileQueued', function (file) {
                var hash = file.__hash || (file.__hash = hashString(file.name +
                    file.size + file.lastModifiedDate));

                // �Ѿ��ظ���
                if (mapping[hash]) {
                    this.trigger('error', 'F_DUPLICATE', file);
                    return false;
                }
            });

            uploader.on('fileQueued', function (file) {
                var hash = file.__hash;

                hash && (mapping[hash] = true);
            });

            uploader.on('fileDequeued', function (file) {
                var hash = file.__hash;

                hash && (delete mapping[hash]);
            });
        });

        return api;
    });

    /**
     * @fileOverview Runtime������������Runtime��ѡ��, ����
     */
    define('runtime/compbase', [], function () {

        function CompBase(owner, runtime) {

            this.owner = owner;
            this.options = owner.options;

            this.getRuntime = function () {
                return runtime;
            };

            this.getRuid = function () {
                return runtime.uid;
            };

            this.trigger = function () {
                return owner.trigger.apply(owner, arguments);
            };
        }

        return CompBase;
    });
    /**
     * @fileOverview Html5Runtime
     */
    define('runtime/html5/runtime', [
        'base',
        'runtime/runtime',
        'runtime/compbase'
    ], function (Base, Runtime, CompBase) {

        var type = 'html5',
            components = {};

        function Html5Runtime() {
            var pool = {},
                me = this,
                destory = this.destory;

            Runtime.apply(me, arguments);
            me.type = type;


            // ��������ĵ����ߣ�ʵ������RuntimeClient
            me.exec = function (comp, fn/*, args...*/) {
                var client = this,
                    uid = client.uid,
                    args = Base.slice(arguments, 2),
                    instance;

                if (components[comp]) {
                    instance = pool[uid] = pool[uid] ||
                        new components[comp](client, me);

                    if (instance[fn]) {
                        return instance[fn].apply(instance, args);
                    }
                }
            };

            me.destory = function () {
                // @todo ɾ�������е�����ʵ��
                return destory && destory.apply(this, arguments);
            };
        }

        Base.inherits(Runtime, {
            constructor: Html5Runtime,

            // ����Ҫ������������ֱ��ִ��callback
            init: function () {
                var me = this;
                setTimeout(function () {
                    me.trigger('ready');
                }, 1);
            }

        });

        // ע��Components
        Html5Runtime.register = function (name, component) {
            var klass = components[name] = Base.inherits(CompBase, component);
            return klass;
        };

        // ע��html5����ʱ��
        // ֻ����֧�ֵ�ǰ����ע�ᡣ
        if (window.Blob && window.FileReader && window.DataView) {
            Runtime.addRuntime(type, Html5Runtime);
        }

        return Html5Runtime;
    });
    /**
     * @fileOverview Blob Htmlʵ��
     */
    define('runtime/html5/blob', [
        'runtime/html5/runtime',
        'lib/blob'
    ], function (Html5Runtime, Blob) {

        return Html5Runtime.register('Blob', {
            slice: function (start, end) {
                var blob = this.owner.source,
                    slice = blob.slice || blob.webkitSlice || blob.mozSlice;

                blob = slice.call(blob, start, end);

                return new Blob(this.getRuid(), blob);
            }
        });
    });
    /**
     * @fileOverview FilePaste
     */
    define('runtime/html5/dnd', [
        'base',
        'runtime/html5/runtime',
        'lib/file'
    ], function (Base, Html5Runtime, File) {

        var $ = Base.$,
            prefix = 'webuploader-dnd-';

        return Html5Runtime.register('DragAndDrop', {
            init: function () {
                var elem = this.elem = this.options.container;

                this.dragEnterHandler = Base.bindFn(this._dragEnterHandler, this);
                this.dragOverHandler = Base.bindFn(this._dragOverHandler, this);
                this.dragLeaveHandler = Base.bindFn(this._dragLeaveHandler, this);
                this.dropHandler = Base.bindFn(this._dropHandler, this);
                this.dndOver = false;

                elem.on('dragenter', this.dragEnterHandler);
                elem.on('dragover', this.dragOverHandler);
                elem.on('dragleave', this.dragLeaveHandler);
                elem.on('drop', this.dropHandler);

                if (this.options.disableGlobalDnd) {
                    $(document).on('dragover', this.dragOverHandler);
                    $(document).on('drop', this.dropHandler);
                }
            },

            _dragEnterHandler: function (e) {
                var me = this,
                    denied = me._denied || false,
                    items;

                e = e.originalEvent || e;

                if (!me.dndOver) {
                    me.dndOver = true;

                    // ע��ֻ�� chrome ֧�֡�
                    items = e.dataTransfer.items;

                    if (items && items.length) {
                        me._denied = denied = !me.trigger('accept', items);
                    }

                    me.elem.addClass(prefix + 'over');
                    me.elem[denied ? 'addClass' :
                        'removeClass'](prefix + 'denied');
                }


                e.dataTransfer.dropEffect = denied ? 'none' : 'copy';

                return false;
            },

            _dragOverHandler: function (e) {
                // ֻ������ڵġ�
                var parentElem = this.elem.parent().get(0);
                if (parentElem && !$.contains(parentElem, e.currentTarget)) {
                    return false;
                }

                clearTimeout(this._leaveTimer);
                this._dragEnterHandler.call(this, e);

                return false;
            },

            _dragLeaveHandler: function () {
                var me = this,
                    handler;

                handler = function () {
                    me.dndOver = false;
                    me.elem.removeClass(prefix + 'over ' + prefix + 'denied');
                };

                clearTimeout(me._leaveTimer);
                me._leaveTimer = setTimeout(handler, 100);
                return false;
            },

            _dropHandler: function (e) {
                var me = this,
                    ruid = me.getRuid(),
                    parentElem = me.elem.parent().get(0);

                // ֻ������ڵġ�
                if (parentElem && !$.contains(parentElem, e.currentTarget)) {
                    return false;
                }

                me._getTansferFiles(e, function (results) {
                    me.trigger('drop', $.map(results, function (file) {
                        return new File(ruid, file);
                    }));
                });

                me.dndOver = false;
                me.elem.removeClass(prefix + 'over');
                return false;
            },

            // ������� callback ��ȥ�鿴�ļ��У�����ֻ�ܵ�ǰ�ļ��С�
            _getTansferFiles: function (e, callback) {
                var results = [],
                    promises = [],
                    items, files, dataTransfer, file, item, i, len, canAccessFolder;

                e = e.originalEvent || e;

                dataTransfer = e.dataTransfer;
                items = dataTransfer.items;
                files = dataTransfer.files;

                canAccessFolder = !!(items && items[0].webkitGetAsEntry);

                for (i = 0, len = files.length; i < len; i++) {
                    file = files[i];
                    item = items && items[i];

                    if (canAccessFolder && item.webkitGetAsEntry().isDirectory) {

                        promises.push(this._traverseDirectoryTree(
                            item.webkitGetAsEntry(), results));
                    } else {
                        results.push(file);
                    }
                }

                Base.when.apply(Base, promises).done(function () {

                    if (!results.length) {
                        return;
                    }

                    callback(results);
                });
            },

            _traverseDirectoryTree: function (entry, results) {
                var deferred = Base.Deferred(),
                    me = this;

                if (entry.isFile) {
                    entry.file(function (file) {
                        results.push(file);
                        deferred.resolve();
                    });
                } else if (entry.isDirectory) {
                    entry.createReader().readEntries(function (entries) {
                        var len = entries.length,
                            promises = [],
                            arr = [],    // Ϊ�˱�֤˳��
                            i;

                        for (i = 0; i < len; i++) {
                            promises.push(me._traverseDirectoryTree(
                                entries[i], arr));
                        }

                        Base.when.apply(Base, promises).then(function () {
                            results.push.apply(results, arr);
                            deferred.resolve();
                        }, deferred.reject);
                    });
                }

                return deferred.promise();
            },

            destroy: function () {
                var elem = this.elem;

                elem.off('dragenter', this.dragEnterHandler);
                elem.off('dragover', this.dragEnterHandler);
                elem.off('dragleave', this.dragLeaveHandler);
                elem.off('drop', this.dropHandler);

                if (this.options.disableGlobalDnd) {
                    $(document).off('dragover', this.dragOverHandler);
                    $(document).off('drop', this.dropHandler);
                }
            }
        });
    });

    /**
     * @fileOverview FilePaste
     */
    define('runtime/html5/filepaste', [
        'base',
        'runtime/html5/runtime',
        'lib/file'
    ], function (Base, Html5Runtime, File) {

        return Html5Runtime.register('FilePaste', {
            init: function () {
                var opts = this.options,
                    elem = this.elem = opts.container,
                    accept = '.*',
                    arr, i, len, item;

                // accetp��mimeTypes������ƥ������
                if (opts.accept) {
                    arr = [];

                    for (i = 0, len = opts.accept.length; i < len; i++) {
                        item = opts.accept[i].mimeTypes;
                        item && arr.push(item);
                    }

                    if (arr.length) {
                        accept = arr.join(',');
                        accept = accept.replace(/,/g, '|').replace(/\*/g, '.*');
                    }
                }
                this.accept = accept = new RegExp(accept, 'i');
                this.hander = Base.bindFn(this._pasteHander, this);
                elem.on('paste', this.hander);
            },

            _pasteHander: function (e) {
                var allowed = [],
                    ruid = this.getRuid(),
                    items, item, blob, i, len;

                e = e.originalEvent || e;
                items = e.clipboardData.items;

                for (i = 0, len = items.length; i < len; i++) {
                    item = items[i];

                    if (item.kind !== 'file' || !(blob = item.getAsFile())) {
                        continue;
                    }

                    allowed.push(new File(ruid, blob));
                }

                if (allowed.length) {
                    // ����ֹ���ļ�ճ��������ճ�������¼�ð��
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger('paste', allowed);
                }
            },

            destroy: function () {
                this.elem.off('paste', this.hander);
            }
        });
    });

    /**
     * @fileOverview FilePicker
     */
    define('runtime/html5/filepicker', [
        'base',
        'runtime/html5/runtime'
    ], function (Base, Html5Runtime) {

        var $ = Base.$;

        return Html5Runtime.register('FilePicker', {
            init: function () {
                var container = this.getRuntime().getContainer(),
                    me = this,
                    owner = me.owner,
                    opts = me.options,
                    lable = $(document.createElement('label')),
                    input = $(document.createElement('input')),
                    arr, i, len, mouseHandler;

                input.attr('type', 'file');
                input.attr('name', opts.name);
                input.addClass('webuploader-element-invisible');

                lable.on('click', function () {
                    input.trigger('click');
                });

                lable.css({
                    opacity: 0,
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    cursor: 'pointer',
                    background: '#ffffff'
                });

                if (opts.multiple) {
                    input.attr('multiple', 'multiple');
                }

                // @todo Firefox��֧�ֵ���ָ����׺
                if (opts.accept && opts.accept.length > 0) {
                    arr = [];

                    for (i = 0, len = opts.accept.length; i < len; i++) {
                        arr.push(opts.accept[i].mimeTypes);
                    }

                    input.attr('accept', arr.join(','));
                }

                container.append(input);
                container.append(lable);

                mouseHandler = function (e) {
                    owner.trigger(e.type);
                };

                input.on('change', function (e) {
                    var fn = arguments.callee,
                        clone;

                    me.files = e.target.files;

                    // reset input
                    clone = this.cloneNode(true);
                    this.parentNode.replaceChild(clone, this);

                    input.off();
                    input = $(clone).on('change', fn)
                        .on('mouseenter mouseleave', mouseHandler);

                    owner.trigger('change');
                });

                lable.on('mouseenter mouseleave', mouseHandler);

            },


            getFiles: function () {
                return this.files;
            },

            destroy: function () {
                // todo
            }
        });
    });
    /**
     * Terms:
     *
     * Uint8Array, FileReader, BlobBuilder, atob, ArrayBuffer
     * @fileOverview Image�ؼ�
     */
    define('runtime/html5/util', [
        'base'
    ], function (Base) {

        var urlAPI = window.createObjectURL && window ||
            window.URL && URL.revokeObjectURL && URL ||
            window.webkitURL,
            createObjectURL = Base.noop,
            revokeObjectURL = createObjectURL;

        if (urlAPI) {

            // ����ȫ�ķ�ʽ���ã�����android������ܰ�context�ĳ������Ķ���
            createObjectURL = function () {
                return urlAPI.createObjectURL.apply(urlAPI, arguments);
            };

            revokeObjectURL = function () {
                return urlAPI.revokeObjectURL.apply(urlAPI, arguments);
            };
        }

        return {
            createObjectURL: createObjectURL,
            revokeObjectURL: revokeObjectURL,

            dataURL2Blob: function (dataURI) {
                var byteStr, intArray, ab, i, mimetype, parts;

                parts = dataURI.split(',');

                if (~parts[0].indexOf('base64')) {
                    byteStr = atob(parts[1]);
                } else {
                    byteStr = decodeURIComponent(parts[1]);
                }

                ab = new ArrayBuffer(byteStr.length);
                intArray = new Uint8Array(ab);

                for (i = 0; i < byteStr.length; i++) {
                    intArray[i] = byteStr.charCodeAt(i);
                }

                mimetype = parts[0].split(':')[1].split(';')[0];

                return this.arrayBufferToBlob(ab, mimetype);
            },

            dataURL2ArrayBuffer: function (dataURI) {
                var byteStr, intArray, i, parts;

                parts = dataURI.split(',');

                if (~parts[0].indexOf('base64')) {
                    byteStr = atob(parts[1]);
                } else {
                    byteStr = decodeURIComponent(parts[1]);
                }

                intArray = new Uint8Array(byteStr.length);

                for (i = 0; i < byteStr.length; i++) {
                    intArray[i] = byteStr.charCodeAt(i);
                }

                return intArray.buffer;
            },

            arrayBufferToBlob: function (buffer, type) {
                var builder = window.BlobBuilder || window.WebKitBlobBuilder,
                    bb;

                // android��֧��ֱ��new Blob, ֻ�ܽ���blobbuilder.
                if (builder) {
                    bb = new builder();
                    bb.append(buffer);
                    return bb.getBlob(type);
                }

                return new Blob([buffer], type ? {type: type} : {});
            },

            // �������Ҫ��Ϊ�˽��android����canvas.toDataUrl��֧��jpeg.
            // ��õ��Ľ����png.
            canvasToDataUrl: function (canvas, type, quality) {
                return canvas.toDataURL(type, quality / 100);
            },

            // imagemeat�Ḵд�������������û�ѡ������Ǹ��ļ��˵Ļ���
            parseMeta: function (blob, callback) {
                callback(false, {});
            },

            // imagemeat�Ḵд�������������û�ѡ������Ǹ��ļ��˵Ļ���
            updateImageHead: function (data) {
                return data;
            }
        };
    });
    /**
     * Terms:
     *
     * Uint8Array, FileReader, BlobBuilder, atob, ArrayBuffer
     * @fileOverview Image�ؼ�
     */
    define('runtime/html5/imagemeta', [
        'runtime/html5/util'
    ], function (Util) {

        var api;

        api = {
            parsers: {
                0xffe1: []
            },

            maxMetaDataSize: 262144,

            parse: function (blob, cb) {
                var me = this,
                    fr = new FileReader();

                fr.onload = function () {
                    cb(false, me._parse(this.result));
                    fr = fr.onload = fr.onerror = null;
                };

                fr.onerror = function (e) {
                    cb(e.message);
                    fr = fr.onload = fr.onerror = null;
                };

                blob = blob.slice(0, me.maxMetaDataSize);
                fr.readAsArrayBuffer(blob.getSource());
            },

            _parse: function (buffer, noParse) {
                if (buffer.byteLength < 6) {
                    return;
                }

                var dataview = new DataView(buffer),
                    offset = 2,
                    maxOffset = dataview.byteLength - 4,
                    headLength = offset,
                    ret = {},
                    markerBytes, markerLength, parsers, i;

                if (dataview.getUint16(0) === 0xffd8) {

                    while (offset < maxOffset) {
                        markerBytes = dataview.getUint16(offset);

                        if (markerBytes >= 0xffe0 && markerBytes <= 0xffef ||
                            markerBytes === 0xfffe) {

                            markerLength = dataview.getUint16(offset + 2) + 2;

                            if (offset + markerLength > dataview.byteLength) {
                                break;
                            }

                            parsers = api.parsers[markerBytes];

                            if (!noParse && parsers) {
                                for (i = 0; i < parsers.length; i += 1) {
                                    parsers[i].call(api, dataview, offset,
                                        markerLength, ret);
                                }
                            }

                            offset += markerLength;
                            headLength = offset;
                        } else {
                            break;
                        }
                    }

                    if (headLength > 6) {
                        if (buffer.slice) {
                            ret.imageHead = buffer.slice(2, headLength);
                        } else {
                            // Workaround for IE10, which does not yet
                            // support ArrayBuffer.slice:
                            ret.imageHead = new Uint8Array(buffer)
                                .subarray(2, headLength);
                        }
                    }
                }

                return ret;
            },

            updateImageHead: function (buffer, head) {
                var data = this._parse(buffer, true),
                    buf1, buf2, bodyoffset;


                bodyoffset = 2;
                if (data.imageHead) {
                    bodyoffset = 2 + data.imageHead.byteLength;
                }

                if (buffer.slice) {
                    buf2 = buffer.slice(bodyoffset);
                } else {
                    buf2 = new Uint8Array(buffer).subarray(bodyoffset);
                }

                buf1 = new Uint8Array(head.byteLength + 2 + buf2.byteLength);

                buf1[0] = 0xFF;
                buf1[1] = 0xD8;
                buf1.set(new Uint8Array(head), 2);
                buf1.set(new Uint8Array(buf2), head.byteLength + 2);

                return buf1.buffer;
            }
        };

        Util.parseMeta = function () {
            return api.parse.apply(api, arguments);
        };

        Util.updateImageHead = function () {
            return api.updateImageHead.apply(api, arguments);
        };

        return api;
    });
    /**
     * ���������ڣ�https://github.com/blueimp/JavaScript-Load-Image
     * ��ʱ��Ŀ��ֻ����orientation.
     *
     * ȥ���� Exif Sub IFD Pointer, GPS Info IFD Pointer, Exif Thumbnail.
     * @fileOverview EXIF����
     */

    // Sample
    // ====================================
    // Make : Apple
    // Model : iPhone 4S
    // Orientation : 1
    // XResolution : 72 [72/1]
    // YResolution : 72 [72/1]
    // ResolutionUnit : 2
    // Software : QuickTime 7.7.1
    // DateTime : 2013:09:01 22:53:55
    // ExifIFDPointer : 190
    // ExposureTime : 0.058823529411764705 [1/17]
    // FNumber : 2.4 [12/5]
    // ExposureProgram : Normal program
    // ISOSpeedRatings : 800
    // ExifVersion : 0220
    // DateTimeOriginal : 2013:09:01 22:52:51
    // DateTimeDigitized : 2013:09:01 22:52:51
    // ComponentsConfiguration : YCbCr
    // ShutterSpeedValue : 4.058893515764426
    // ApertureValue : 2.5260688216892597 [4845/1918]
    // BrightnessValue : -0.3126686601998395
    // MeteringMode : Pattern
    // Flash : Flash did not fire, compulsory flash mode
    // FocalLength : 4.28 [107/25]
    // SubjectArea : [4 values]
    // FlashpixVersion : 0100
    // ColorSpace : 1
    // PixelXDimension : 2448
    // PixelYDimension : 3264
    // SensingMethod : One-chip color area sensor
    // ExposureMode : 0
    // WhiteBalance : Auto white balance
    // FocalLengthIn35mmFilm : 35
    // SceneCaptureType : Standard
    define('runtime/html5/imagemeta/exif', [
        'base',
        'runtime/html5/imagemeta'
    ], function (Base, ImageMeta) {

        var EXIF = {};

        EXIF.ExifMap = function () {
            return this;
        };

        EXIF.ExifMap.prototype.map = {
            'Orientation': 0x0112
        };

        EXIF.ExifMap.prototype.get = function (id) {
            return this[id] || this[this.map[id]];
        };

        EXIF.exifTagTypes = {
            // byte, 8-bit unsigned int:
            1: {
                getValue: function (dataView, dataOffset) {
                    return dataView.getUint8(dataOffset);
                },
                size: 1
            },

            // ascii, 8-bit byte:
            2: {
                getValue: function (dataView, dataOffset) {
                    return String.fromCharCode(dataView.getUint8(dataOffset));
                },
                size: 1,
                ascii: true
            },

            // short, 16 bit int:
            3: {
                getValue: function (dataView, dataOffset, littleEndian) {
                    return dataView.getUint16(dataOffset, littleEndian);
                },
                size: 2
            },

            // long, 32 bit int:
            4: {
                getValue: function (dataView, dataOffset, littleEndian) {
                    return dataView.getUint32(dataOffset, littleEndian);
                },
                size: 4
            },

            // rational = two long values,
            // first is numerator, second is denominator:
            5: {
                getValue: function (dataView, dataOffset, littleEndian) {
                    return dataView.getUint32(dataOffset, littleEndian) /
                        dataView.getUint32(dataOffset + 4, littleEndian);
                },
                size: 8
            },

            // slong, 32 bit signed int:
            9: {
                getValue: function (dataView, dataOffset, littleEndian) {
                    return dataView.getInt32(dataOffset, littleEndian);
                },
                size: 4
            },

            // srational, two slongs, first is numerator, second is denominator:
            10: {
                getValue: function (dataView, dataOffset, littleEndian) {
                    return dataView.getInt32(dataOffset, littleEndian) /
                        dataView.getInt32(dataOffset + 4, littleEndian);
                },
                size: 8
            }
        };

        // undefined, 8-bit byte, value depending on field:
        EXIF.exifTagTypes[7] = EXIF.exifTagTypes[1];

        EXIF.getExifValue = function (dataView, tiffOffset, offset, type, length,
                                      littleEndian) {

            var tagType = EXIF.exifTagTypes[type],
                tagSize, dataOffset, values, i, str, c;

            if (!tagType) {
                Base.log('Invalid Exif data: Invalid tag type.');
                return;
            }

            tagSize = tagType.size * length;

            // Determine if the value is contained in the dataOffset bytes,
            // or if the value at the dataOffset is a pointer to the actual data:
            dataOffset = tagSize > 4 ? tiffOffset + dataView.getUint32(offset + 8,
                littleEndian) : (offset + 8);

            if (dataOffset + tagSize > dataView.byteLength) {
                Base.log('Invalid Exif data: Invalid data offset.');
                return;
            }

            if (length === 1) {
                return tagType.getValue(dataView, dataOffset, littleEndian);
            }

            values = [];

            for (i = 0; i < length; i += 1) {
                values[i] = tagType.getValue(dataView,
                    dataOffset + i * tagType.size, littleEndian);
            }

            if (tagType.ascii) {
                str = '';

                // Concatenate the chars:
                for (i = 0; i < values.length; i += 1) {
                    c = values[i];

                    // Ignore the terminating NULL byte(s):
                    if (c === '\u0000') {
                        break;
                    }
                    str += c;
                }

                return str;
            }
            return values;
        };

        EXIF.parseExifTag = function (dataView, tiffOffset, offset, littleEndian,
                                      data) {

            var tag = dataView.getUint16(offset, littleEndian);
            data.exif[tag] = EXIF.getExifValue(dataView, tiffOffset, offset,
                dataView.getUint16(offset + 2, littleEndian),    // tag type
                dataView.getUint32(offset + 4, littleEndian),    // tag length
                littleEndian);
        };

        EXIF.parseExifTags = function (dataView, tiffOffset, dirOffset,
                                       littleEndian, data) {

            var tagsNumber, dirEndOffset, i;

            if (dirOffset + 6 > dataView.byteLength) {
                Base.log('Invalid Exif data: Invalid directory offset.');
                return;
            }

            tagsNumber = dataView.getUint16(dirOffset, littleEndian);
            dirEndOffset = dirOffset + 2 + 12 * tagsNumber;

            if (dirEndOffset + 4 > dataView.byteLength) {
                Base.log('Invalid Exif data: Invalid directory size.');
                return;
            }

            for (i = 0; i < tagsNumber; i += 1) {
                this.parseExifTag(dataView, tiffOffset,
                    dirOffset + 2 + 12 * i,    // tag offset
                    littleEndian, data);
            }

            // Return the offset to the next directory:
            return dataView.getUint32(dirEndOffset, littleEndian);
        };

        // EXIF.getExifThumbnail = function(dataView, offset, length) {
        //     var hexData,
        //         i,
        //         b;
        //     if (!length || offset + length > dataView.byteLength) {
        //         Base.log('Invalid Exif data: Invalid thumbnail data.');
        //         return;
        //     }
        //     hexData = [];
        //     for (i = 0; i < length; i += 1) {
        //         b = dataView.getUint8(offset + i);
        //         hexData.push((b < 16 ? '0' : '') + b.toString(16));
        //     }
        //     return 'data:image/jpeg,%' + hexData.join('%');
        // };

        EXIF.parseExifData = function (dataView, offset, length, data) {

            var tiffOffset = offset + 10,
                littleEndian, dirOffset;

            // Check for the ASCII code for "Exif" (0x45786966):
            if (dataView.getUint32(offset + 4) !== 0x45786966) {
                // No Exif data, might be XMP data instead
                return;
            }
            if (tiffOffset + 8 > dataView.byteLength) {
                Base.log('Invalid Exif data: Invalid segment size.');
                return;
            }

            // Check for the two null bytes:
            if (dataView.getUint16(offset + 8) !== 0x0000) {
                Base.log('Invalid Exif data: Missing byte alignment offset.');
                return;
            }

            // Check the byte alignment:
            switch (dataView.getUint16(tiffOffset)) {
                case 0x4949:
                    littleEndian = true;
                    break;

                case 0x4D4D:
                    littleEndian = false;
                    break;

                default:
                    Base.log('Invalid Exif data: Invalid byte alignment marker.');
                    return;
            }

            // Check for the TIFF tag marker (0x002A):
            if (dataView.getUint16(tiffOffset + 2, littleEndian) !== 0x002A) {
                Base.log('Invalid Exif data: Missing TIFF marker.');
                return;
            }

            // Retrieve the directory offset bytes, usually 0x00000008 or 8 decimal:
            dirOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
            // Create the exif object to store the tags:
            data.exif = new EXIF.ExifMap();
            // Parse the tags of the main image directory and retrieve the
            // offset to the next directory, usually the thumbnail directory:
            dirOffset = EXIF.parseExifTags(dataView, tiffOffset,
                tiffOffset + dirOffset, littleEndian, data);

            // ���Զ�ȡ����ͼ
            // if ( dirOffset ) {
            //     thumbnailData = {exif: {}};
            //     dirOffset = EXIF.parseExifTags(
            //         dataView,
            //         tiffOffset,
            //         tiffOffset + dirOffset,
            //         littleEndian,
            //         thumbnailData
            //     );

            //     // Check for JPEG Thumbnail offset:
            //     if (thumbnailData.exif[0x0201]) {
            //         data.exif.Thumbnail = EXIF.getExifThumbnail(
            //             dataView,
            //             tiffOffset + thumbnailData.exif[0x0201],
            //             thumbnailData.exif[0x0202] // Thumbnail data length
            //         );
            //     }
            // }
        };

        ImageMeta.parsers[0xffe1].push(EXIF.parseExifData);
        return EXIF;
    });
    /**
     * @fileOverview Image
     */
    define('runtime/html5/image', [
        'base',
        'runtime/html5/runtime',
        'runtime/html5/util'
    ], function (Base, Html5Runtime, Util) {

        var BLANK = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';

        return Html5Runtime.register('Image', {

            // flag: ����Ƿ��޸Ĺ���
            modified: false,

            init: function () {
                var me = this,
                    img = new Image();

                img.onload = function () {

                    me._info = {
                        type: me.type,
                        width: this.width,
                        height: this.height
                    };

                    // ��ȡmeta��Ϣ��
                    if (!me._metas && 'image/jpeg' === me.type) {
                        Util.parseMeta(me._blob, function (error, ret) {
                            me._metas = ret;
                            me.owner.trigger('load');
                        });
                    } else {
                        me.owner.trigger('load');
                    }
                };

                img.onerror = function () {
                    me.owner.trigger('error');
                };

                me._img = img;
            },

            loadFromBlob: function (blob) {
                var me = this,
                    img = me._img;

                me._blob = blob;
                me.type = blob.type;
                img.src = Util.createObjectURL(blob.getSource());
                me.owner.once('load', function () {
                    Util.revokeObjectURL(img.src);
                });
            },

            resize: function (width, height) {
                var canvas = this._canvas ||
                    (this._canvas = document.createElement('canvas'));

                this._resize(this._img, canvas, width, height);
                this._blob = null;    // û���ˣ�����ɾ���ˡ�
                this.modified = true;
                this.owner.trigger('complete');
            },

            getAsBlob: function (type) {
                var blob = this._blob,
                    opts = this.options,
                    canvas;

                type = type || this.type;

                // blob��Ҫ�������ɡ�
                if (this.modified || this.type !== type) {
                    canvas = this._canvas;

                    if (type === 'image/jpeg') {

                        blob = Util.canvasToDataUrl(canvas, 'image/jpeg',
                            opts.quality);

                        if (opts.preserveHeaders && this._metas &&
                            this._metas.imageHead) {

                            blob = Util.dataURL2ArrayBuffer(blob);
                            blob = Util.updateImageHead(blob,
                                this._metas.imageHead);
                            blob = Util.arrayBufferToBlob(blob, type);
                            return blob;
                        }
                    } else {
                        blob = Util.canvasToDataUrl(canvas, type);
                    }

                    blob = Util.dataURL2Blob(blob);
                }

                return blob;
            },

            getAsDataUrl: function (type) {
                var opts = this.options;

                type = type || this.type;

                if (type === 'image/jpeg') {
                    return Util.canvasToDataUrl(this._canvas, type, opts.quality);
                } else {
                    return this._canvas.toDataURL(type);
                }
            },

            getOrientation: function () {
                return this._metas && this._metas.exif &&
                    this._metas.exif.get('Orientation') || 1;
            },

            info: function (val) {

                // setter
                if (val) {
                    this._info = val;
                    return this;
                }

                // getter
                return this._info;
            },

            meta: function (val) {

                // setter
                if (val) {
                    this._meta = val;
                    return this;
                }

                // getter
                return this._meta;
            },

            destroy: function () {
                var canvas = this._canvas;
                this._img.onload = null;

                if (canvas) {
                    canvas.getContext('2d')
                        .clearRect(0, 0, canvas.width, canvas.height);
                    canvas.width = canvas.height = 0;
                    this._canvas = null;
                }

                // �ͷ��ڴ档�ǳ���Ҫ�������ͷŲ���image���ڴ档
                this._img.src = BLANK;
                this._img = this._blob = null;
            },

            _resize: function (img, cvs, width, height) {
                var opts = this.options,
                    naturalWidth = img.width,
                    naturalHeight = img.height,
                    orientation = this.getOrientation(),
                    scale, w, h, x, y;

                // values that require 90 degree rotation
                if (~[5, 6, 7, 8].indexOf(orientation)) {

                    // ����width, height��ֵ��
                    width ^= height;
                    height ^= width;
                    width ^= height;
                }

                scale = Math[opts.crop ? 'max' : 'min'](width / naturalWidth,
                    height / naturalHeight);

                // ������Ŵ�
                opts.allowMagnify || (scale = Math.min(1, scale));

                w = naturalWidth * scale;
                h = naturalHeight * scale;

                if (opts.crop) {
                    cvs.width = width;
                    cvs.height = height;
                } else {
                    cvs.width = w;
                    cvs.height = h;
                }

                x = (cvs.width - w) / 2;
                y = (cvs.height - h) / 2;

                opts.preserveHeaders || this._rotate2Orientaion(cvs, orientation);

                this._renderImageToCanvas(cvs, img, x, y, w, h);
            },

            _rotate2Orientaion: function (canvas, orientation) {
                var width = canvas.width,
                    height = canvas.height,
                    ctx = canvas.getContext('2d');

                switch (orientation) {
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        canvas.width = height;
                        canvas.height = width;
                        break;
                }

                switch (orientation) {
                    case 2:    // horizontal flip
                        ctx.translate(width, 0);
                        ctx.scale(-1, 1);
                        break;

                    case 3:    // 180 rotate left
                        ctx.translate(width, height);
                        ctx.rotate(Math.PI);
                        break;

                    case 4:    // vertical flip
                        ctx.translate(0, height);
                        ctx.scale(1, -1);
                        break;

                    case 5:    // vertical flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.scale(1, -1);
                        break;

                    case 6:    // 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(0, -height);
                        break;

                    case 7:    // horizontal flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(width, -height);
                        ctx.scale(-1, 1);
                        break;

                    case 8:    // 90 rotate left
                        ctx.rotate(-0.5 * Math.PI);
                        ctx.translate(-width, 0);
                        break;
                }
            },

            // https://github.com/stomita/ios-imagefile-megapixel/
            // blob/master/src/megapix-image.js
            _renderImageToCanvas: (function () {

                // �������ios, ����Ҫ��ô���ӣ�
                if (!Base.os.ios) {
                    return function (canvas, img, x, y, w, h) {
                        canvas.getContext('2d').drawImage(img, x, y, w, h);
                    };
                }

                /**
                 * Detecting vertical squash in loaded image.
                 * Fixes a bug which squash image vertically while drawing into
                 * canvas for some images.
                 */
                function detectVerticalSquash(img, iw, ih) {
                    var canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d'),
                        sy = 0,
                        ey = ih,
                        py = ih,
                        data, alpha, ratio;


                    canvas.width = 1;
                    canvas.height = ih;
                    ctx.drawImage(img, 0, 0);
                    data = ctx.getImageData(0, 0, 1, ih).data;

                    // search image edge pixel position in case
                    // it is squashed vertically.
                    while (py > sy) {
                        alpha = data[(py - 1) * 4 + 3];

                        if (alpha === 0) {
                            ey = py;
                        } else {
                            sy = py;
                        }

                        py = (ey + sy) >> 1;
                    }

                    ratio = (py / ih);
                    return (ratio === 0) ? 1 : ratio;
                }

                // fix ie7 bug
                // http://stackoverflow.com/questions/11929099/
                // html5-canvas-drawimage-ratio-bug-ios
                if (Base.os.ios >= 7) {
                    return function (canvas, img, x, y, w, h) {
                        var iw = img.naturalWidth,
                            ih = img.naturalHeight,
                            vertSquashRatio = detectVerticalSquash(img, iw, ih);

                        return canvas.getContext('2d').drawImage(img, 0, 0,
                            iw * vertSquashRatio, ih * vertSquashRatio,
                            x, y, w, h);
                    };
                }

                /**
                 * Detect subsampling in loaded image.
                 * In iOS, larger images than 2M pixels may be
                 * subsampled in rendering.
                 */
                function detectSubsampling(img) {
                    var iw = img.naturalWidth,
                        ih = img.naturalHeight,
                        canvas, ctx;

                    // subsampling may happen overmegapixel image
                    if (iw * ih > 1024 * 1024) {
                        canvas = document.createElement('canvas');
                        canvas.width = canvas.height = 1;
                        ctx = canvas.getContext('2d');
                        ctx.drawImage(img, -iw + 1, 0);

                        // subsampled image becomes half smaller in rendering size.
                        // check alpha channel value to confirm image is covering
                        // edge pixel or not. if alpha value is 0
                        // image is not covering, hence subsampled.
                        return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
                    } else {
                        return false;
                    }
                }


                return function (canvas, img, x, y, width, height) {
                    var iw = img.naturalWidth,
                        ih = img.naturalHeight,
                        ctx = canvas.getContext('2d'),
                        subsampled = detectSubsampling(img),
                        doSquash = this.type === 'image/jpeg',
                        d = 1024,
                        sy = 0,
                        dy = 0,
                        tmpCanvas, tmpCtx, vertSquashRatio, dw, dh, sx, dx;

                    if (subsampled) {
                        iw /= 2;
                        ih /= 2;
                    }

                    ctx.save();
                    tmpCanvas = document.createElement('canvas');
                    tmpCanvas.width = tmpCanvas.height = d;

                    tmpCtx = tmpCanvas.getContext('2d');
                    vertSquashRatio = doSquash ?
                        detectVerticalSquash(img, iw, ih) : 1;

                    dw = Math.ceil(d * width / iw);
                    dh = Math.ceil(d * height / ih / vertSquashRatio);

                    while (sy < ih) {
                        sx = 0;
                        dx = 0;
                        while (sx < iw) {
                            tmpCtx.clearRect(0, 0, d, d);
                            tmpCtx.drawImage(img, -sx, -sy);
                            ctx.drawImage(tmpCanvas, 0, 0, d, d,
                                x + dx, y + dy, dw, dh);
                            sx += d;
                            dx += dw;
                        }
                        sy += d;
                        dy += dh;
                    }
                    ctx.restore();
                    tmpCanvas = tmpCtx = null;
                };
            })()
        });
    });
    /**
     * @fileOverview Transport
     * @todo ֧��chunked���䣬���ƣ�
     * ���Խ����ļ��ֳ�С�飬�������䣬������ߴ��ļ��ɹ��ʣ���ʧ�ܵ�ʱ��Ҳֻ��Ҫ�ش���С���֣�
     * ������Ҫ��ͷ�ٴ�һ�Ρ�����ϵ�����Ҳ��Ҫ��chunked��ʽ��
     */
    define('runtime/html5/transport', [
        'base',
        'runtime/html5/runtime'
    ], function (Base, Html5Runtime) {

        var noop = Base.noop,
            $ = Base.$;

        return Html5Runtime.register('Transport', {
            init: function () {
                this._status = 0;
                this._response = null;
            },

            send: function () {
                var owner = this.owner,
                    opts = this.options,
                    xhr = this._initAjax(),
                    blob = owner._blob,
                    server = opts.server,
                    formData, binary, fr;

                if (opts.sendAsBinary) {
                    server += (/\?/.test(server) ? '&' : '?') +
                        $.param(owner._formData);

                    binary = blob.getSource();
                } else {
                    formData = new FormData();
                    $.each(owner._formData, function (k, v) {
                        formData.append(k, v);
                    });

                    formData.append(opts.fileVal, blob.getSource(),
                        opts.filename || owner._formData.name || '');
                }

                if (opts.withCredentials && 'withCredentials' in xhr) {
                    xhr.open(opts.method, server, true);
                    xhr.withCredentials = true;
                } else {
                    xhr.open(opts.method, server);
                }

                this._setRequestHeader(xhr, opts.headers);

                if (binary) {
                    xhr.overrideMimeType('application/octet-stream');

                    // androidֱ�ӷ���blob�ᵼ�·���˽��յ����ǿ��ļ���
                    // bug���顣
                    // https://code.google.com/p/android/issues/detail?id=39882
                    // ��������fileReader��ȡ������ͨ��arraybuffer�ķ�ʽ���͡�
                    if (Base.os.android) {
                        fr = new FileReader();

                        fr.onload = function () {
                            xhr.send(this.result);
                            fr = fr.onload = null;
                        };

                        fr.readAsArrayBuffer(binary);
                    } else {
                        xhr.send(binary);
                    }
                } else {
                    xhr.send(formData);
                }
            },

            getResponse: function () {
                return this._response;
            },

            getResponseAsJson: function () {
                return this._parseJson(this._response);
            },

            getStatus: function () {
                return this._status;
            },

            abort: function () {
                var xhr = this._xhr;

                if (xhr) {
                    xhr.upload.onprogress = noop;
                    xhr.onreadystatechange = noop;
                    xhr.abort();

                    this._xhr = xhr = null;
                }
            },

            destroy: function () {
                this.abort();
            },

            _initAjax: function () {
                var me = this,
                    xhr = new XMLHttpRequest(),
                    opts = this.options;

                if (opts.withCredentials && !('withCredentials' in xhr) &&
                    typeof XDomainRequest !== 'undefined') {
                    xhr = new XDomainRequest();
                }

                xhr.upload.onprogress = function (e) {
                    var percentage = 0;

                    if (e.lengthComputable) {
                        percentage = e.loaded / e.total;
                    }

                    return me.trigger('progress', percentage);
                };

                xhr.onreadystatechange = function () {

                    if (xhr.readyState !== 4) {
                        return;
                    }

                    xhr.upload.onprogress = noop;
                    xhr.onreadystatechange = noop;
                    me._xhr = null;
                    me._status = xhr.status;

                    if (xhr.status >= 200 && xhr.status < 300) {
                        me._response = xhr.responseText;
                        return me.trigger('load');
                    } else if (xhr.status >= 500 && xhr.status < 600) {
                        me._response = xhr.responseText;
                        return me.trigger('error', 'server');
                    }


                    return me.trigger('error', me._status ? 'http' : 'abort');
                };

                me._xhr = xhr;
                return xhr;
            },

            _setRequestHeader: function (xhr, headers) {
                $.each(headers, function (key, val) {
                    xhr.setRequestHeader(key, val);
                });
            },

            _parseJson: function (str) {
                var json;

                try {
                    json = JSON.parse(str);
                } catch (ex) {
                    json = {};
                }

                return json;
            }
        });
    });
    /**
     * @fileOverview ֻ��html5ʵ�ֵ��ļ��汾��
     */
    define('preset/html5only', [
        'base',

        // widgets
        'widgets/filednd',
        'widgets/filepaste',
        'widgets/filepicker',
        'widgets/image',
        'widgets/queue',
        'widgets/runtime',
        'widgets/upload',
        'widgets/validator',

        // runtimes
        // html5
        'runtime/html5/blob',
        'runtime/html5/dnd',
        'runtime/html5/filepaste',
        'runtime/html5/filepicker',
        'runtime/html5/imagemeta/exif',
        'runtime/html5/image',
        'runtime/html5/transport'
    ], function (Base) {
        return Base;
    });
    define('webuploader', [
        'preset/html5only'
    ], function (preset) {
        return preset;
    });
    return require('webuploader');
});
