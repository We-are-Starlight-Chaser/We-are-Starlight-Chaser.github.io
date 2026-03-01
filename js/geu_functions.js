/**
 * [geu_functions.js] - 通用函数脚本
 * We Are Starlight Chaser
 * 
 * 此文件包含网站中可复用的通用 JavaScript 函数
 * 包括工具函数、动画效果、数据处理等
 * 依赖：jQuery 3.x
 */

// ============================================
// 全局命名空间
// ============================================

const StarlightChaser = {
    version: '1.0.0',
    config: {},
    utils: {},
    ui: {},
    api: {}
};

// ============================================
// 工具函数 (Utils)
// ============================================

/**
 * 格式化数字，添加千位分隔符
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
StarlightChaser.utils.formatNumber = function (num) {
    if (num === null || num === undefined) return '-';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 格式化日期
 * @param {string|Date} date - 日期字符串或 Date 对象
 * @param {string} format - 格式模板 (默认: YYYY-MM-DD)
 * @returns {string} 格式化后的日期字符串
 */
StarlightChaser.utils.formatDate = function (date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '-';

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
};

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
StarlightChaser.utils.debounce = function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 限制时间（毫秒）
 * @returns {Function} 节流后的函数
 */
StarlightChaser.utils.throttle = function (func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * 深拷贝对象
 * @param {Object} obj - 要拷贝的对象
 * @returns {Object} 拷贝后的对象
 */
StarlightChaser.utils.deepClone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

/**
 * 获取 URL 参数
 * @param {string} name - 参数名
 * @returns {string|null} 参数值
 */
StarlightChaser.utils.getUrlParam = function (name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

/**
 * 设置 Cookie
 * @param {string} name - Cookie 名称
 * @param {string} value - Cookie 值
 * @param {number} days - 过期天数
 */
StarlightChaser.utils.setCookie = function (name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

/**
 * 获取 Cookie
 * @param {string} name - Cookie 名称
 * @returns {string|null} Cookie 值
 */
StarlightChaser.utils.getCookie = function (name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
};

/**
 * 本地存储封装
 */
StarlightChaser.utils.storage = {
    /**
     * 设置本地存储
     * @param {string} key - 键名
     * @param {*} value - 值
     */
    set: function (key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage 不可用:', e);
        }
    },

    /**
     * 获取本地存储
     * @param {string} key - 键名
     * @param {*} defaultValue - 默认值
     * @returns {*} 存储的值
     */
    get: function (key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('LocalStorage 读取失败:', e);
            return defaultValue;
        }
    },

    /**
     * 移除本地存储
     * @param {string} key - 键名
     */
    remove: function (key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage 移除失败:', e);
        }
    }
};

// ============================================
// UI 函数
// ============================================

/**
 * 显示 Toast 提示
 * @param {string} message - 提示消息
 * @param {string} type - 类型 (success, error, warning, info)
 * @param {number} duration - 显示时长（毫秒）
 */
StarlightChaser.ui.showToast = function (message, type = 'info', duration = 3000) {
    const toast = $(`
        <div class="toast toast-${type}">
            <span class="material-icons">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info'}</span>
            <span>${message}</span>
        </div>
    `);

    $('body').append(toast);

    setTimeout(() => {
        toast.addClass('show');
    }, 10);

    setTimeout(() => {
        toast.removeClass('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
};

/**
 * 创建涟漪效果
 * @param {Event} event - 点击事件
 * @param {jQuery} $element - 目标元素
 */
StarlightChaser.ui.createRipple = function (event, $element) {
    const rect = $element[0].getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const $ripple = $('<span class="ripple"></span>').css({
        width: size,
        height: size,
        left: x,
        top: y
    });

    $element.append($ripple);
    setTimeout(() => $ripple.remove(), 600);
};

/**
 * 平滑滚动到指定元素
 * @param {string} target - 目标选择器
 * @param {number} offset - 偏移量
 */
StarlightChaser.ui.scrollTo = function (target, offset = 80) {
    const $target = $(target);
    if ($target.length) {
        $('html, body').animate({
            scrollTop: $target.offset().top - offset
        }, 500);
    }
};

/**
 * 显示加载状态
 * @param {jQuery} $container - 容器元素
 * @param {number} height - 骨架屏高度
 */
StarlightChaser.ui.showLoading = function ($container, height = 100) {
    $container.html(`<div class="skeleton" style="height: ${height}px;"></div>`);
};

/**
 * 隐藏加载状态
 * @param {jQuery} $container - 容器元素
 * @param {string} content - 要显示的内容
 */
StarlightChaser.ui.hideLoading = function ($container, content) {
    $container.html(content);
};

// ============================================
// API 函数
// ============================================

/**
 * 发送 AJAX 请求
 * @param {Object} options - 请求配置
 * @returns {Promise} Promise 对象
 */
StarlightChaser.api.request = function (options) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: options.url,
            method: options.method || 'GET',
            data: options.data || null,
            dataType: options.dataType || 'json',
            success: resolve,
            error: reject
        });
    });
};

/**
 * 加载 JSON 配置文件
 * @param {string} path - JSON 文件路径
 * @returns {Promise} Promise 对象
 */
StarlightChaser.api.loadJSON = function (path) {
    return this.request({
        url: path,
        method: 'GET',
        dataType: 'json'
    });
};

// ============================================
// jQuery 插件扩展
// ============================================

(function ($) {
    /**
     * 涟漪效果插件
     */
    $.fn.ripple = function () {
        return this.each(function () {
            const $this = $(this);
            $this.on('click', function (e) {
                StarlightChaser.ui.createRipple(e, $this);
            });
        });
    };

    /**
     * 数字动画插件
     * @param {number} target - 目标数字
     * @param {number} duration - 动画时长
     */
    $.fn.animateNumber = function (target, duration = 1000) {
        return this.each(function () {
            const $this = $(this);
            const start = parseInt($this.text().replace(/,/g, '')) || 0;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // 使用 easeOutQuart 缓动函数
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(start + (target - start) * easeProgress);

                $this.text(StarlightChaser.utils.formatNumber(current));

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            requestAnimationFrame(update);
        });
    };
})(jQuery);

// ============================================
// 初始化
// ============================================

$(document).ready(function () {
    // 为所有按钮和卡片添加涟漪效果
    $('.btn, .card, .nav-link').ripple();

    console.log('🌟 Starlight Chaser - 通用函数库已加载');
});