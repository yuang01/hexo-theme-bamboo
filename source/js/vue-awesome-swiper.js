
/*!
 * vue-awesome-swiper v4.1.1
 * Copyright (c) Surmon. All rights reserved.
 * Released under the MIT License.
 * Surmon <https://github.com/surmon-china>
 */

(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports,require('swiper'),require('vue')):typeof define==='function'&&define.amd?define(['exports','swiper','vue'],f):(g=g||self,f(g.VueAwesomeSwiper={},g.Swiper,g.Vue));}(this,(function(exports, SwiperClass, Vue){'use strict';SwiperClass=SwiperClass&&Object.prototype.hasOwnProperty.call(SwiperClass,'default')?SwiperClass['default']:SwiperClass;Vue=Vue&&Object.prototype.hasOwnProperty.call(Vue,'default')?Vue['default']:Vue;/**
 * @file vue-awesome-swiper
 * @module constants
 * @author Surmon <https://github.com/surmon-china>
 */
var CoreNames;
(function (CoreNames) {
    CoreNames["SwiperComponent"] = "Swiper";
    CoreNames["SwiperSlideComponent"] = "SwiperSlide";
    CoreNames["SwiperDirective"] = "swiper";
    CoreNames["SwiperInstance"] = "$swiper";
})(CoreNames || (CoreNames = {}));
var DEFAULT_CLASSES = Object.freeze({
    containerClass: 'swiper-container',
    wrapperClass: 'swiper-wrapper',
    slideClass: 'swiper-slide'
});
var ComponentEvents;
(function (ComponentEvents) {
    ComponentEvents["Ready"] = "ready";
    ComponentEvents["ClickSlide"] = "clickSlide";
})(ComponentEvents || (ComponentEvents = {}));
var ComponentPropNames;
(function (ComponentPropNames) {
    ComponentPropNames["AutoUpdate"] = "autoUpdate";
    ComponentPropNames["AutoDestroy"] = "autoDestroy";
    ComponentPropNames["DeleteInstanceOnDestroy"] = "deleteInstanceOnDestroy";
    ComponentPropNames["CleanupStylesOnDestroy"] = "cleanupStylesOnDestroy";
})(ComponentPropNames || (ComponentPropNames = {}));
// https://swiperjs.com/api/#events
var SWIPER_EVENTS = [
    'init',
    'beforeDestroy',
    'slideChange',
    'slideChangeTransitionStart',
    'slideChangeTransitionEnd',
    'slideNextTransitionStart',
    'slideNextTransitionEnd',
    'slidePrevTransitionStart',
    'slidePrevTransitionEnd',
    'transitionStart',
    'transitionEnd',
    'touchStart',
    'touchMove',
    'touchMoveOpposite',
    'sliderMove',
    'touchEnd',
    'click',
    'tap',
    'doubleTap',
    'imagesReady',
    'progress',
    'reachBeginning',
    'reachEnd',
    'fromEdge',
    'setTranslate',
    'setTransition',
    'resize',
    'observerUpdate',
    'beforeLoopFix',
    'loopFix'
];/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}/**
 * @file vue-awesome-swiper
 * @module utils
 * @author Surmon <https://github.com/surmon-china>
 */
var kebabcase = function (string) {
    return string
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase();
};/**
 * @file vue-awesome-swiper
 * @module event
 * @author Surmon <https://github.com/surmon-china>
 */
var handleClickSlideEvent = function (swiper, event, emit) {
    var _a, _b, _c;
    if (swiper && !(swiper.destroyed)) {
        var eventPath = ((_a = event.composedPath) === null || _a === void 0 ? void 0 : _a.call(event)) || event.path;
        if ((event === null || event === void 0 ? void 0 : event.target) && eventPath) {
            var slides_1 = Array.from(swiper.slides);
            var paths = Array.from(eventPath);
            // Click slide || slide[children]
            if (slides_1.includes(event.target) || paths.some(function (item) { return slides_1.includes(item); })) {
                var clickedIndex = swiper.clickedIndex;
                var reallyIndex = Number((_c = (_b = swiper.clickedSlide) === null || _b === void 0 ? void 0 : _b.dataset) === null || _c === void 0 ? void 0 : _c.swiperSlideIndex);
                var reallyIndexValue = Number.isInteger(reallyIndex) ? reallyIndex : null;
                emit(ComponentEvents.ClickSlide, clickedIndex, reallyIndexValue);
                emit(kebabcase(ComponentEvents.ClickSlide), clickedIndex, reallyIndexValue);
            }
        }
    }
};
var bindSwiperEvents = function (swiper, emit) {
    SWIPER_EVENTS.forEach(function (eventName) {
        swiper.on(eventName, function () {
            var arguments$1 = arguments;

            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments$1[_i];
            }
            emit.apply(void 0, __spreadArrays([eventName], args));
            var kebabcaseName = kebabcase(eventName);
            if (kebabcaseName !== eventName) {
                emit.apply(void 0, __spreadArrays([kebabcaseName], args));
            }
        });
    });
};/**
 * @file vue-awesome-swiper
 * @module directive
 * @author Surmon <https://github.com/surmon-china>
 */
var INSTANCE_NAME_KEY = 'instanceName';
function getDirective(SwiperClass, globalOptions) {
    var getStandardisedOptionByAttrs = function (vnode, key) {
        var _a, _b, _c, _d;
        var value = (_b = (_a = vnode.data) === null || _a === void 0 ? void 0 : _a.attrs) === null || _b === void 0 ? void 0 : _b[key];
        return value !== undefined
            ? value
            : (_d = (_c = vnode.data) === null || _c === void 0 ? void 0 : _c.attrs) === null || _d === void 0 ? void 0 : _d[kebabcase(key)];
    };
    // Get swiper instace name in directive
    var getSwiperInstanceName = function (element, binding, vnode) {
        return (binding.arg ||
            getStandardisedOptionByAttrs(vnode, INSTANCE_NAME_KEY) ||
            element.id ||
            CoreNames.SwiperInstance);
    };
    var getSwiperInstance = function (element, binding, vnode) {
        var instanceName = getSwiperInstanceName(element, binding, vnode);
        return vnode.context[instanceName] || null;
    };
    var getSwipeOptions = function (binding) {
        return binding.value || globalOptions;
    };
    var getBooleanValueByInput = function (input) {
        return [true, undefined, null, ''].includes(input);
    };
    // Emit event in Vue directive
    var getEventEmiter = function (vnode) {
        var _a, _b;
        var handlers = ((_a = vnode.data) === null || _a === void 0 ? void 0 : _a.on) || ((_b = vnode.componentOptions) === null || _b === void 0 ? void 0 : _b.listeners);
        return function (name) {
            var arguments$1 = arguments;

            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments$1[_i];
            }
            var _a;
            var handle = (_a = handlers) === null || _a === void 0 ? void 0 : _a[name];
            if (handle) {
                handle.fns.apply(handle, args);
            }
        };
    };
    return {
        // Init
        bind: function (element, binding, vnode) {
            // auto class name
            if (element.className.indexOf(DEFAULT_CLASSES.containerClass) === -1) {
                element.className += ((element.className ? ' ' : '') + DEFAULT_CLASSES.containerClass);
            }
            // bind click event
            element.addEventListener('click', function (event) {
                var emitEvent = getEventEmiter(vnode);
                var swiper = getSwiperInstance(element, binding, vnode);
                handleClickSlideEvent(swiper, event, emitEvent);
            });
        },
        // DOM inserted
        inserted: function (element, binding, vnode) {
            var context = vnode.context;
            var swiperOptions = getSwipeOptions(binding);
            var instanceName = getSwiperInstanceName(element, binding, vnode);
            var emitEvent = getEventEmiter(vnode);
            var vueContext = context;
            var swiper = vueContext === null || vueContext === void 0 ? void 0 : vueContext[instanceName];
            // Swiper will destroy but not delete instance, when used <keep-alive>
            if (!swiper || swiper.destroyed) {
                swiper = new SwiperClass(element, swiperOptions);
                vueContext[instanceName] = swiper;
                bindSwiperEvents(swiper, emitEvent);
                emitEvent(ComponentEvents.Ready, swiper);
                // MARK: Reinstance when the nexttick with <keep-alive>
                // Vue.nextTick(instancing) | setTimeout(instancing)
            }
        },
        // On options changed or DOM updated
        componentUpdated: function (element, binding, vnode) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            var autoUpdate = getStandardisedOptionByAttrs(vnode, ComponentPropNames.AutoUpdate);
            if (getBooleanValueByInput(autoUpdate)) {
                var swiper = getSwiperInstance(element, binding, vnode);
                if (swiper) {
                    var swiperOptions = getSwipeOptions(binding);
                    var isLoop = swiperOptions.loop;
                    if (isLoop) {
                        (_b = (_a = swiper) === null || _a === void 0 ? void 0 : _a.loopDestroy) === null || _b === void 0 ? void 0 : _b.call(_a);
                    }
                    (_c = swiper === null || swiper === void 0 ? void 0 : swiper.update) === null || _c === void 0 ? void 0 : _c.call(swiper);
                    (_e = (_d = swiper.navigation) === null || _d === void 0 ? void 0 : _d.update) === null || _e === void 0 ? void 0 : _e.call(_d);
                    (_g = (_f = swiper.pagination) === null || _f === void 0 ? void 0 : _f.render) === null || _g === void 0 ? void 0 : _g.call(_f);
                    (_j = (_h = swiper.pagination) === null || _h === void 0 ? void 0 : _h.update) === null || _j === void 0 ? void 0 : _j.call(_h);
                    if (isLoop) {
                        (_l = (_k = swiper) === null || _k === void 0 ? void 0 : _k.loopCreate) === null || _l === void 0 ? void 0 : _l.call(_k);
                        (_m = swiper === null || swiper === void 0 ? void 0 : swiper.update) === null || _m === void 0 ? void 0 : _m.call(swiper);
                    }
                }
            }
        },
        // Destroy this directive
        unbind: function (element, binding, vnode) {
            var _a;
            var autoDestroy = getStandardisedOptionByAttrs(vnode, ComponentPropNames.AutoDestroy);
            if (getBooleanValueByInput(autoDestroy)) {
                var swiper = getSwiperInstance(element, binding, vnode);
                if (swiper && swiper.initialized) {
                    (_a = swiper === null || swiper === void 0 ? void 0 : swiper.destroy) === null || _a === void 0 ? void 0 : _a.call(swiper, getBooleanValueByInput(getStandardisedOptionByAttrs(vnode, ComponentPropNames.DeleteInstanceOnDestroy)), getBooleanValueByInput(getStandardisedOptionByAttrs(vnode, ComponentPropNames.CleanupStylesOnDestroy)));
                }
            }
        }
    };
}/**
 * @file vue-awesome-swiper
 * @module SwiperComponent
 * @author Surmon <https://github.com/surmon-china>
 */
var SlotNames;
(function (SlotNames) {
    SlotNames["ParallaxBg"] = "parallax-bg";
    SlotNames["Pagination"] = "pagination";
    SlotNames["Scrollbar"] = "scrollbar";
    SlotNames["PrevButton"] = "button-prev";
    SlotNames["NextButton"] = "button-next";
})(SlotNames || (SlotNames = {}));
function getSwiperComponent(SwiperClass) {
    var _a;
    return Vue.extend({
        name: CoreNames.SwiperComponent,
        props: (_a = {
                defaultOptions: {
                    type: Object,
                    required: false,
                    default: function () { return ({}); }
                },
                // eslint-disable-next-line vue/require-default-prop
                options: {
                    type: Object,
                    required: false
                }
            },
            _a[ComponentPropNames.AutoUpdate] = {
                type: Boolean,
                default: true
            },
            // https://github.com/surmon-china/vue-awesome-swiper/pull/550/files
            _a[ComponentPropNames.AutoDestroy] = {
                type: Boolean,
                default: true
            },
            // https://github.com/surmon-china/vue-awesome-swiper/pull/388
            _a[ComponentPropNames.DeleteInstanceOnDestroy] = {
                type: Boolean,
                required: false,
                default: true
            },
            _a[ComponentPropNames.CleanupStylesOnDestroy] = {
                type: Boolean,
                required: false,
                default: true
            },
            _a),
        data: function () {
            var _a;
            return _a = {},
                _a[CoreNames.SwiperInstance] = null,
                _a;
        },
        computed: {
            swiperInstance: {
                cache: false,
                set: function (swiper) {
                    this[CoreNames.SwiperInstance] = swiper;
                },
                get: function () {
                    return this[CoreNames.SwiperInstance];
                }
            },
            swiperOptions: function () {
                return this.options || this.defaultOptions;
            },
            wrapperClass: function () {
                return this.swiperOptions.wrapperClass || DEFAULT_CLASSES.wrapperClass;
            }
        },
        methods: {
            // Feature: click event
            handleSwiperClick: function (event) {
                handleClickSlideEvent(this.swiperInstance, event, this.$emit.bind(this));
            },
            autoReLoopSwiper: function () {
                var _a, _b;
                if (this.swiperInstance && this.swiperOptions.loop) {
                    // https://github.com/surmon-china/vue-awesome-swiper/issues/593
                    // https://github.com/surmon-china/vue-awesome-swiper/issues/544
                    // https://github.com/surmon-china/vue-awesome-swiper/pull/545/files
                    var swiper = this.swiperInstance;
                    (_a = swiper === null || swiper === void 0 ? void 0 : swiper.loopDestroy) === null || _a === void 0 ? void 0 : _a.call(swiper);
                    (_b = swiper === null || swiper === void 0 ? void 0 : swiper.loopCreate) === null || _b === void 0 ? void 0 : _b.call(swiper);
                }
            },
            updateSwiper: function () {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if (this[ComponentPropNames.AutoUpdate] && this.swiperInstance) {
                    this.autoReLoopSwiper();
                    (_b = (_a = this.swiperInstance) === null || _a === void 0 ? void 0 : _a.update) === null || _b === void 0 ? void 0 : _b.call(_a);
                    (_d = (_c = this.swiperInstance.navigation) === null || _c === void 0 ? void 0 : _c.update) === null || _d === void 0 ? void 0 : _d.call(_c);
                    (_f = (_e = this.swiperInstance.pagination) === null || _e === void 0 ? void 0 : _e.render) === null || _f === void 0 ? void 0 : _f.call(_e);
                    (_h = (_g = this.swiperInstance.pagination) === null || _g === void 0 ? void 0 : _g.update) === null || _h === void 0 ? void 0 : _h.call(_g);
                }
            },
            destroySwiper: function () {
                var _a, _b;
                if (this[ComponentPropNames.AutoDestroy] && this.swiperInstance) {
                    // https://github.com/surmon-china/vue-awesome-swiper/pull/341
                    // https://github.com/surmon-china/vue-awesome-swiper/issues/340
                    if (this.swiperInstance.initialized) {
                        (_b = (_a = this.swiperInstance) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a, this[ComponentPropNames.DeleteInstanceOnDestroy], this[ComponentPropNames.CleanupStylesOnDestroy]);
                    }
                }
            },
            initSwiper: function () {
                this.swiperInstance = new SwiperClass(this.$el, this.swiperOptions);
                bindSwiperEvents(this.swiperInstance, this.$emit.bind(this));
                this.$emit(ComponentEvents.Ready, this.swiperInstance);
            }
        },
        mounted: function () {
            if (!this.swiperInstance) {
                this.initSwiper();
            }
        },
        // Update swiper when the parent component activated with `keep-alive`.
        activated: function () {
            this.updateSwiper();
        },
        updated: function () {
            this.updateSwiper();
        },
        beforeDestroy: function () {
            // https://github.com/surmon-china/vue-awesome-swiper/commit/2924a9d4d3d1cf51c0d46076410b1f804b2b8a43#diff-7f4e0261ac562c0f354cb91a1ca8864f
            this.$nextTick(this.destroySwiper);
        },
        render: function (createElement) {
            return createElement('div', {
                staticClass: DEFAULT_CLASSES.containerClass,
                on: {
                    click: this.handleSwiperClick
                }
            }, [
                this.$slots[SlotNames.ParallaxBg],
                createElement('div', {
                    class: this.wrapperClass
                }, this.$slots.default),
                this.$slots[SlotNames.Pagination],
                this.$slots[SlotNames.PrevButton],
                this.$slots[SlotNames.NextButton],
                this.$slots[SlotNames.Scrollbar]
            ]);
        }
    });
}/**
 * @file vue-awesome-swiper
 * @module SwiperSlideComponent
 * @author Surmon <https://github.com/surmon-china>
 */
var SwiperSlideComponent = Vue.extend({
    name: CoreNames.SwiperSlideComponent,
    computed: {
        slideClass: function () {
            var _a, _b;
            return ((_b = (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.swiperOptions) === null || _b === void 0 ? void 0 : _b.slideClass) || DEFAULT_CLASSES.slideClass;
        }
    },
    methods: {
        update: function () {
            var _a;
            var parent = this.$parent;
            // https://github.com/surmon-china/vue-awesome-swiper/issues/632
            if (parent[ComponentPropNames.AutoUpdate]) {
                (_a = parent === null || parent === void 0 ? void 0 : parent.swiperInstance) === null || _a === void 0 ? void 0 : _a.update();
            }
        }
    },
    mounted: function () {
        this.update();
    },
    updated: function () {
        this.update();
    },
    render: function (createElement) {
        return createElement('div', {
            class: this.slideClass
        }, this.$slots.default);
    }
});/**
 * @file vue-awesome-swiper
 * @module exporter
 * @author Surmon <https://github.com/surmon-china>
 */
var getInstaller = function (SwiperClass) {
    var install = function (Vue, globalOptions) {
        if (install.installed)
            { return; }
        var SwiperComponent = getSwiperComponent(SwiperClass);
        if (globalOptions) {
            SwiperComponent.options.props.defaultOptions.default = function () { return globalOptions; };
        }
        Vue.component(CoreNames.SwiperComponent, SwiperComponent);
        Vue.component(CoreNames.SwiperSlideComponent, SwiperSlideComponent);
        Vue.directive(CoreNames.SwiperDirective, getDirective(SwiperClass, globalOptions));
        install.installed = true;
    };
    return install;
};
function exporter(SwiperClass) {
    var _a;
    return _a = {
            version: '4.1.1',
            install: getInstaller(SwiperClass),
            directive: getDirective(SwiperClass)
        },
        _a[CoreNames.SwiperComponent] = getSwiperComponent(SwiperClass),
        _a[CoreNames.SwiperSlideComponent] = SwiperSlideComponent,
        _a;
}/**
 * @file vue-awesome-swiper
 * @module default-export
 * @author Surmon <https://github.com/surmon-china>
 */
var VueAwesomeSwiper = exporter(SwiperClass);
var version = VueAwesomeSwiper.version;
var install = VueAwesomeSwiper.install;
var directive = VueAwesomeSwiper.directive;
var Swiper = VueAwesomeSwiper.Swiper;
var SwiperSlide = VueAwesomeSwiper.SwiperSlide;exports.Swiper=Swiper;exports.SwiperSlide=SwiperSlide;exports.default=VueAwesomeSwiper;exports.directive=directive;exports.install=install;exports.version=version;Object.defineProperty(exports,'__esModule',{value:true});})));