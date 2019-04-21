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
     * @fileOverview FlashRuntime
     */
    define('runtime/flash/runtime', [
        'base',
        'runtime/runtime',
        'runtime/compbase'
    ], function (Base, Runtime, CompBase) {

        var $ = Base.$,
            type = 'flash',
            components = {};


        function getFlashVersion() {
            var version;

            try {
                version = navigator.plugins['Shockwave Flash'];
                version = version.description;
            } catch (ex) {
                try {
                    version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                        .GetVariable('$version');
                } catch (ex2) {
                    version = '0.0';
                }
            }
            version = version.match(/\d+/g);
            return parseFloat(version[0] + '.' + version[1], 10);
        }

        function FlashRuntime() {
            var pool = {},
                clients = {},
                destory = this.destory,
                me = this,
                jsreciver = Base.guid('webuploader_');

            Runtime.apply(me, arguments);
            me.type = type;


            // ��������ĵ����ߣ�ʵ������RuntimeClient
            me.exec = function (comp, fn/*, args...*/) {
                var client = this,
                    uid = client.uid,
                    args = Base.slice(arguments, 2),
                    instance;

                clients[uid] = client;

                if (components[comp]) {
                    if (!pool[uid]) {
                        pool[uid] = new components[comp](client, me);
                    }

                    instance = pool[uid];

                    if (instance[fn]) {
                        return instance[fn].apply(instance, args);
                    }
                }

                return me.flashExec.apply(client, arguments);
            };

            function handler(evt, obj) {
                var type = evt.type || evt,
                    parts, uid;

                parts = type.split('::');
                uid = parts[0];
                type = parts[1];

                // console.log.apply( console, arguments );

                if (type === 'Ready' && uid === me.uid) {
                    me.trigger('ready');
                } else if (clients[uid]) {
                    clients[uid].trigger(type.toLowerCase(), evt, obj);
                }

                // Base.log( evt, obj );
            }

            // flash�Ľ�������
            window[jsreciver] = function () {
                var args = arguments;

                // Ϊ���ܲ���õ���
                setTimeout(function () {
                    handler.apply(null, args);
                }, 1);
            };

            this.jsreciver = jsreciver;

            this.destory = function () {
                // @todo ɾ�������е�����ʵ��
                return destory && destory.apply(this, arguments);
            };

            this.flashExec = function (comp, fn) {
                var flash = me.getFlash(),
                    args = Base.slice(arguments, 2);

                return flash.exec(this.uid, comp, fn, args);
            };

            // @todo
        }

        Base.inherits(Runtime, {
            constructor: FlashRuntime,

            init: function () {
                var container = this.getContainer(),
                    opts = this.options,
                    html;

                // if not the minimal height, shims are not initialized
                // in older browsers (e.g FF3.6, IE6,7,8, Safari 4.0,5.0, etc)
                container.css({
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    width: '9px',
                    height: '9px',
                    overflow: 'hidden'
                });

                // insert flash object
                html = '<object id="' + this.uid + '" type="application/' +
                    'x-shockwave-flash" data="' + opts.swf + '" ';

                if (Base.browser.ie) {
                    html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                }

                html += 'width="100%" height="100%" style="outline:0">' +
                    '<param name="movie" value="' + opts.swf + '" />' +
                    '<param name="flashvars" value="uid=' + this.uid +
                    '&jsreciver=' + this.jsreciver + '" />' +
                    '<param name="wmode" value="transparent" />' +
                    '<param name="allowscriptaccess" value="always" />' +
                    '</object>';

                container.html(html);
            },

            getFlash: function () {
                if (this._flash) {
                    return this._flash;
                }

                this._flash = $('#' + this.uid).get(0);
                return this._flash;
            }

        });

        FlashRuntime.register = function (name, component) {
            component = components[name] = Base.inherits(CompBase, $.extend({

                // @todo fix this later
                flashExec: function () {
                    var owner = this.owner,
                        runtime = this.getRuntime();

                    return runtime.flashExec.apply(owner, arguments);
                }
            }, component));

            return component;
        };

        if (getFlashVersion() >= 11.4) {
            Runtime.addRuntime(type, FlashRuntime);
        }

        return FlashRuntime;
    });
    /**
     * @fileOverview FilePicker
     */
    define('runtime/flash/filepicker', [
        'base',
        'runtime/flash/runtime'
    ], function (Base, FlashRuntime) {
        var $ = Base.$;

        return FlashRuntime.register('FilePicker', {
            init: function (opts) {
                var copy = $.extend({}, opts),
                    len, i;

                // �޸�Flash��û������title��������޷�����flash�ļ�ѡ����bug.
                len = copy.accept && copy.accept.length;
                for (i = 0; i < len; i++) {
                    if (!copy.accept[i].title) {
                        copy.accept[i].title = 'Files';
                    }
                }

                delete copy.button;
                delete copy.container;

                this.flashExec('FilePicker', 'init', copy);
            },

            destroy: function () {
                // todo
            }
        });
    });
    /**
     * @fileOverview  Transport flashʵ��
     */
    define('runtime/flash/transport', [
        'base',
        'runtime/flash/runtime',
        'runtime/client'
    ], function (Base, FlashRuntime, RuntimeClient) {
        var $ = Base.$;

        return FlashRuntime.register('Transport', {
            init: function () {
                this._status = 0;
                this._response = null;
                this._responseJson = null;
            },

            send: function () {
                var owner = this.owner,
                    opts = this.options,
                    xhr = this._initAjax(),
                    blob = owner._blob,
                    server = opts.server,
                    binary;

                xhr.connectRuntime(blob.ruid);

                if (opts.sendAsBinary) {
                    server += (/\?/.test(server) ? '&' : '?') +
                        $.param(owner._formData);

                    binary = blob.uid;
                } else {
                    $.each(owner._formData, function (k, v) {
                        xhr.exec('append', k, v);
                    });

                    xhr.exec('appendBlob', opts.fileVal, blob.uid,
                        opts.filename || owner._formData.name || '');
                }

                this._setRequestHeader(xhr, opts.headers);
                xhr.exec('send', {
                    method: opts.method,
                    url: server
                }, binary);
            },

            getStatus: function () {
                return this._status;
            },

            getResponse: function () {
                return this._response;
            },

            getResponseAsJson: function () {
                return this._responseJson;
            },

            abort: function () {
                var xhr = this._xhr;

                if (xhr) {
                    xhr.exec('abort');
                    xhr.destroy();
                    this._xhr = xhr = null;
                }
            },

            destroy: function () {
                this.abort();
            },

            _initAjax: function () {
                var me = this,
                    xhr = new RuntimeClient('XMLHttpRequest');

                xhr.on('uploadprogress progress', function (e) {
                    return me.trigger('progress', e.loaded / e.total);
                });

                xhr.on('load', function () {
                    var status = xhr.exec('getStatus'),
                        err = '';

                    xhr.off();
                    me._xhr = null;

                    if (status >= 200 && status < 300) {
                        me._response = xhr.exec('getResponse');
                        me._responseJson = xhr.exec('getResponseAsJson');
                    } else if (status >= 500 && status < 600) {
                        me._response = xhr.exec('getResponse');
                        me._responseJson = xhr.exec('getResponseAsJson');
                        err = 'server';
                    } else {
                        err = 'http';
                    }

                    xhr.destroy();
                    xhr = null;

                    return err ? me.trigger('error', err) : me.trigger('load');
                });

                xhr.on('error', function () {
                    xhr.off();
                    me._xhr = null;
                    me.trigger('error', 'http');
                });

                me._xhr = xhr;
                return xhr;
            },

            _setRequestHeader: function (xhr, headers) {
                $.each(headers, function (key, val) {
                    xhr.exec('setRequestHeader', key, val);
                });
            }
        });
    });
    /**
     * @fileOverview û��ͼ����İ汾��
     */
    define('preset/withoutimage', [
        'base',

        // widgets
        'widgets/filednd',
        'widgets/filepaste',
        'widgets/filepicker',
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
        'runtime/html5/transport',

        // flash
        'runtime/flash/filepicker',
        'runtime/flash/transport'
    ], function (Base) {
        return Base;
    });
    define('webuploader', [
        'preset/withoutimage'
    ], function (preset) {
        return preset;
    });
    return require('webuploader');
});
