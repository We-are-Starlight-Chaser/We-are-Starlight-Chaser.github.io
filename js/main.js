/**
 * [main.js] - 主逻辑脚本
 * We Are Starlight Chaser
 * 
 * 此文件是网站的主 JavaScript 文件
 * 包含星空背景动画、主题切换、数据加载等核心功能
 * "关于团队"和"其他项目"功能已分离到独立页面
 * 依赖：jQuery 3.x, geu_functions.js
 */

$(document).ready(function () {

    // ============================================
    // 全局变量
    // ============================================

    const App = {
        config: {},
        theme: 'dark',
        starfield: null
    };

    // ============================================
    // 星空背景动画
    // ============================================

    /**
     * 星空背景类
     * 使用 Canvas 绘制动态星空效果
     */
    class Starfield {
        constructor(canvasId, options = {}) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;

            this.ctx = this.canvas.getContext('2d');
            this.stars = [];
            this.mouseX = 0;
            this.mouseY = 0;

            // 配置选项
            this.options = Object.assign({
                starCount: 200,
                connectionDistance: 100,
                mouseInteraction: true
            }, options);

            this.init();
        }

        /**
         * 初始化 Canvas 和星星
         */
        init() {
            this.resize();
            this.createStars();
            this.bindEvents();
            this.animate();
        }

        /**
         * 调整 Canvas 尺寸
         */
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        /**
         * 创建星星
         */
        createStars() {
            this.stars = [];
            for (let i = 0; i < this.options.starCount; i++) {
                this.stars.push(new Star(this.canvas));
            }
        }

        /**
         * 绑定事件
         */
        bindEvents() {
            // 窗口大小改变时重新调整
            $(window).on('resize', () => {
                this.resize();
                this.createStars();
            });

            // 鼠标移动交互
            if (this.options.mouseInteraction) {
                $(window).on('mousemove', (e) => {
                    this.mouseX = e.clientX;
                    this.mouseY = e.clientY;
                });
            }
        }

        /**
         * 动画循环
         */
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // 更新和绘制星星
            this.stars.forEach(star => {
                star.update(this.mouseX, this.mouseY);
                star.draw(this.ctx);
            });

            // 绘制连线
            this.drawConnections();

            requestAnimationFrame(() => this.animate());
        }

        /**
         * 绘制星星之间的连线
         */
        drawConnections() {
            this.ctx.strokeStyle = 'rgba(103, 80, 164, 0.1)';
            this.ctx.lineWidth = 0.5;

            for (let i = 0; i < this.stars.length; i++) {
                for (let j = i + 1; j < this.stars.length; j++) {
                    const dx = this.stars[i].x - this.stars[j].x;
                    const dy = this.stars[i].y - this.stars[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.options.connectionDistance) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
                        this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
                        this.ctx.stroke();
                    }
                }
            }
        }
    }

    /**
     * 星星类
     */
    class Star {
        constructor(canvas) {
            this.canvas = canvas;
            this.reset();
        }

        /**
         * 重置星星属性
         */
        reset() {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random();
            this.fadeSpeed = 0.01 + Math.random() * 0.02;
        }

        /**
         * 更新星星位置
         * @param {number} mouseX - 鼠标 X 坐标
         * @param {number} mouseY - 鼠标 Y 坐标
         */
        update(mouseX, mouseY) {
            this.x += this.speedX;
            this.y += this.speedY;

            // 鼠标交互 - 星星会被鼠标吸引
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                this.x -= dx * 0.01;
                this.y -= dy * 0.01;
            }

            // 边界检查
            if (this.x < 0 || this.x > this.canvas.width ||
                this.y < 0 || this.y > this.canvas.height) {
                this.reset();
            }

            // 闪烁效果
            this.opacity += this.fadeSpeed;
            if (this.opacity > 1 || this.opacity < 0.2) {
                this.fadeSpeed = -this.fadeSpeed;
            }
        }

        /**
         * 绘制星星
         * @param {CanvasRenderingContext2D} ctx - Canvas 上下文
         */
        draw(ctx) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // ============================================
    // 主题切换功能
    // ============================================

    /**
     * 初始化主题
     */
    function initTheme() {
        // 从本地存储读取主题设置
        const savedTheme = StarlightChaser.utils.storage.get('theme', 'dark');
        App.theme = savedTheme;

        // 应用主题
        applyTheme(App.theme);

        // 绑定主题切换按钮
        $('#themeToggle').on('click', toggleTheme);
    }

    /**
     * 应用主题
     * @param {string} theme - 主题名称 (dark/light)
     */
    function applyTheme(theme) {
        $('html').attr('data-theme', theme);
        $('#themeIcon').text(theme === 'dark' ? 'light_mode' : 'dark_mode');
        StarlightChaser.utils.storage.set('theme', theme);
    }

    /**
     * 切换主题
     */
    function toggleTheme() {
        App.theme = App.theme === 'dark' ? 'light' : 'dark';
        applyTheme(App.theme);
    }

    // ============================================
    // 导航栏功能
    // ============================================

    /**
     * 初始化导航栏
     */
    function initNavigation() {
        // 滚动时添加阴影效果
        $(window).on('scroll', StarlightChaser.utils.throttle(function () {
            const $appBar = $('#appBar');
            if ($(window).scrollTop() > 50) {
                $appBar.addClass('scrolled');
            } else {
                $appBar.removeClass('scrolled');
            }
        }, 100));

        // 移动端菜单切换
        $('#mobileMenuBtn').on('click', function () {
            $('#navLinks').toggleClass('active');
        });

        // 平滑滚动
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            const target = $(this).attr('href');
            if (target && target !== '#') {
                StarlightChaser.ui.scrollTo(target);
                $('#navLinks').removeClass('active');
            }
        });
    }

    // ============================================
    // 数据加载功能
    // ============================================

    /**
     * 加载网站配置
     */
    async function loadSiteConfig() {
        try {
            const config = await StarlightChaser.api.loadJSON('./json/site_config.json');
            App.config = config;
            return config;
        } catch (error) {
            console.warn('加载网站配置失败:', error);
            return null;
        }
    }

    /**
     * 加载最新项目信息
     */
    async function loadLatestProject() {
        try {
            const data = await StarlightChaser.api.loadJSON('./json/something_was_new.json');
            renderLatestProject(data);
        } catch (error) {
            console.warn('加载最新项目信息失败:', error);
        }
    }

    /**
     * 渲染最新项目信息
     * @param {Object} data - 项目数据
     */
    function renderLatestProject(data) {
        if (!data || !data.project) return;

        const project = data.project;
        const badge = data.badge;

        // 更新徽章
        if (badge) {
            $('#heroBadge').html(`
                <span class="material-icons">${badge.icon || 'verified'}</span>
                <span>${badge.text}</span>
            `);
        }

        // 更新项目信息
        const $latestProject = $('#latestProject');
        $latestProject.html(`
            <div class="latest-project-name">${project.full_name}</div>
            <div class="latest-project-description">
                ${project.description}<br>
                ${project.sub_description}
            </div>
            <div class="hero-actions">
                <a href="${project.download_url}" class="btn btn-filled">
                    <span class="material-icons">download</span>
                    立即下载
                </a>
                <a href="${project.github_url}" class="btn btn-outline" target="_blank">
                    <span class="material-icons">code</span>
                    查看源码
                </a>
            </div>
        `);
    }

    /**
     * 加载"什么是 SMSM"信息
     */
    async function loadWhatIsSMSM() {
        try {
            const data = await StarlightChaser.api.loadJSON('./json/what_is_something.json');
            renderWhatIsSMSM(data);
        } catch (error) {
            console.warn('加载 SMSM 介绍失败:', error);
        }
    }

    /**
     * 渲染"什么是 SMSM"
     * @param {Object} data - 介绍数据
     */
    function renderWhatIsSMSM(data) {
        if (!data) return;

        // 更新副标题
        if (data.subtitle) {
            $('#aboutSubtitle').text(data.subtitle);
        }
    }

    /**
     * 加载功能列表
     */
    async function loadFeatures() {
        try {
            const data = await StarlightChaser.api.loadJSON('./json/what_can_something_do.json');
            renderFeatures(data);
        } catch (error) {
            console.warn('加载功能列表失败:', error);
        }
    }

    /**
     * 渲染功能列表
     * @param {Object} data - 功能数据
     */
    function renderFeatures(data) {
        if (!data || !data.features) return;

        const $grid = $('#featuresGrid');
        if ($grid.length === 0) return;

        const html = data.features.map(feature => `
            <div class="card" data-feature-id="${feature.id}">
                <div class="card-icon">
                    <span class="material-icons">${feature.icon}</span>
                </div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `).join('');

        $grid.html(html);

        // 为新添加的卡片添加涟漪效果
        $grid.find('.card').ripple();
    }

    /**
     * 加载新闻动态
     */
    async function loadNews() {
        const $container = $('#newsContainer');

        try {
            const data = await StarlightChaser.api.loadJSON('./json/developments.json');
            renderNews(data.news || []);
        } catch (error) {
            console.warn('加载新闻失败:', error);
            // 使用默认数据
            $container.html('<p class="text-center" style="color: var(--md-outline);">暂无动态</p>');
        }
    }

    /**
     * 渲染新闻列表
     * @param {Array} news - 新闻数组
     */
    function renderNews(news) {
        const $container = $('#newsContainer');

        if (!news || news.length === 0) {
            $container.html('<p class="text-center" style="color: var(--md-outline);">暂无动态</p>');
            return;
        }

        const html = news.map(item => `
            <div class="news-item" data-news-id="${item.id}" data-url="${item.url}">
                <div class="news-header">
                    <h3 class="news-title">${item.title}</h3>
                    <span class="news-date">${item.date}</span>
                </div>
                <p class="news-excerpt">${item.excerpt}</p>
            </div>
        `).join('');

        $container.html(html);

        // 绑定点击事件
        $container.find('.news-item').on('click', function () {
            const url = $(this).data('url');
            if (url && url !== '#') {
                window.open(url, '_blank');
            }
        });
    }

    // ============================================
    // 更新提示功能
    // ============================================

    /**
     * 加载更新信息
     */
    async function loadUpdateInfo() {
        try {
            const data = await StarlightChaser.api.loadJSON('./json/update_info.json');

            if (data.enabled && data.auto_show) {
                setTimeout(() => {
                    showUpdateWidget(data);
                }, data.show_delay || 3000);
            }
        } catch (error) {
            console.warn('加载更新信息失败:', error);
        }
    }

    /**
     * 显示更新提示小部件
     * @param {Object} data - 更新信息数据
     */
    function showUpdateWidget(data) {
        const $widget = $('#updateWidget');

        $widget.find('.update-info h4').text(data.title);
        $widget.find('#updateVersion').text(`SMSM ${data.latest_version} 可用`);
        $widget.find('#updateDescription').text(data.description);

        $widget.css('display', 'flex');

        // 绑定查看按钮
        $widget.find('.btn-filled').on('click', function () {
            window.open(data.download_url, '_blank');
        });
    }

    // ============================================
    // 初始化
    // ============================================

    /**
     * 初始化应用
     */
    async function init() {
        console.log('🌟 Starlight Chaser - 初始化开始');

        // 初始化星空背景
        App.starfield = new Starfield('starfield', {
            starCount: 200,
            connectionDistance: 100,
            mouseInteraction: true
        });

        // 初始化主题
        initTheme();

        // 初始化导航
        initNavigation();

        // 加载网站配置
        await loadSiteConfig();

        // 加载各模块数据
        await Promise.all([
            loadLatestProject(),
            loadWhatIsSMSM(),
            loadFeatures(),
            loadNews(),
            loadUpdateInfo()
        ]);

        console.log('🌟 Starlight Chaser - 初始化完成');
    }

    // 启动应用
    init();
});