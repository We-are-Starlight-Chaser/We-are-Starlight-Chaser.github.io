# We Are Starlight Chaser

> 🌟 我们是逐星者 - 为 Minecraft 社区打造简单易用的工具

[![Material Design](https://img.shields.io/badge/Design-Material%20Design%203-6750A4)](https://m3.material.io/)
[![jQuery](https://img.shields.io/badge/jQuery-3.6.0-0769AD)](https://jquery.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 项目简介

这是 **We Are Starlight Chaser（逐星者）** 团队的官方网站，使用 Material Design 3 风格设计，展示我们的开源项目和团队信息。

### 主要项目

- **SMSM** (Simple Minecraft Server Manager) - 面向 Windows 系统的开源 Minecraft 本地服务器管理器

## 🚀 在线预览

访问 [https://we-are-starlight-chaser.github.io](https://we-are-starlight-chaser.github.io) 查看在线版本

## 📁 项目结构

```
/WASC/                              # 项目根目录
├── asset/                          # 资源文件夹
│   ├── image/                      # 图片资源
│   ├── video/                      # 视频资源
│   └── audio/                      # 音频资源
├── css/                            # 样式文件
│   ├── dashboard/                  # 仪表盘相关 CSS
│   ├── page/                       # 页面特定样式
│   ├── color.css                   # 颜色定义
│   ├── geusable.css                # 可复用通用样式
│   └── main.css                    # 主样式文件
├── dashboard/                      # 仪表盘页面
├── err/                            # 错误页面
│   └── 404.html                    # 404 错误页面
├── js/                             # JavaScript 脚本
│   ├── geu_functions.js            # 通用函数脚本
│   └── main.js                     # 主逻辑脚本
├── json/                           # JSON 数据文件
│   ├── something_was_new.json      # 最新项目信息
│   ├── what_is_something.json      # SMSM 介绍
│   ├── what_can_something_do.json  # 功能列表
│   ├── our_team.json               # 团队信息
│   ├── developments.json           # 新闻动态
│   ├── github_projects.json        # GitHub 项目配置
│   ├── update_info.json            # 更新信息
│   └── site_config.json            # 网站全局配置
├── pages/                          # HTML 页面文件
├── index.html                      # 网站首页
├── LICENSE                         # 开源许可证
└── README.MD                       # 项目说明文档
```

## ✨ 功能特性

### 🎨 Material Design 3 风格
- 使用 Material Design 3 设计规范
- 支持深色/浅色主题切换
- 流畅的动画效果和交互体验

### 🌟 星空背景动画
- Canvas 绘制的动态星空背景
- 星星闪烁和连线效果
- 鼠标交互 - 星星会被鼠标吸引

### 📊 GitHub Star 数量展示
- 自动从 GitHub API 获取项目 Star 数量
- 数字动画效果
- 支持手动刷新数据

### 📱 响应式设计
- 完美适配桌面端和移动端
- 移动端汉堡菜单
- 自适应布局

### ⚙️ JSON 数据配置
- 所有内容通过 JSON 文件配置
- 易于维护和更新
- 无需修改 HTML 即可更新内容

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式设计
- **JavaScript (ES6+)** - 交互逻辑
- **jQuery 3.6.0** - DOM 操作和 AJAX
- **Material Icons** - 图标库
- **Google Fonts** - 字体

<!-- ## 🚀 快速开始

### 本地运行

1. 克隆仓库
```bash
git clone [url]
```

2. 进入项目目录
```bash
cd [url]
```

3. 使用本地服务器运行（推荐）
```bash
# 使用 Python
python -m http.server 8080

# 或使用 Node.js
npx serve .

# 或使用 VS Code Live Server 插件
```

4. 在浏览器中访问 `http://localhost:8080`

 -->
<!-- ### 部署同款 GitHub Pages -->

------------------
#### 如果你想部署同款 GitHub Pages，那么以下配置文件说明可能会帮到你！

## 📝 配置文件说明

### developments.json

##### 项目动态/新闻配置文件：

> 此文件用于配置"项目动态"区域的新闻列表数据
包括新闻标题、日期、摘要和链接

```json
{
    "title": "项目动态",
    "subtitle": "最新进展与版本更新",
    "news": [       //新闻列表，在这里添加新闻
        {
            "id": 1,
            "title": "动态标题",
            "date": "日期",
            "excerpt": "摘要，不建议过长",
            "url": "链接",
            "is_highlight": true
        }      
    ]
}
```

### github_projects.json

##### GitHub 项目 Star 数量配置文件：

>   此文件用于配置展示在网站上的 GitHub 项目信息
    包括项目名称、描述、Star 数量、Fork 数量等
    **注意：star_count 和 fork_count 可以设置为 null，**
    _系统会自动从 GitHub API 获取实时数据_

```json
{
    "title": "我们的开源项目",  // 页面标题
    "subtitle": "在 GitHub 上探索我们的作品，为喜欢的项目点亮 Star",    //页面副标题
    "show_star_count": true,    // 是否显示 Star 数量
    "show_fork_count": true,    // 是否显示 Fork 数量
    "update_interval": 300000,  // 项目数据更新间隔（毫秒）
    "projects": [               // 项目列表，在这里添加项目
        {
            "id": 1,            // 项目 ID
            "name": "SMSM",     // 项目名称（缩写）
            "full_name": "Simple Minecraft Server Manager",     // 项目全名
            "description": "项目描述",      
            "github_url": "项目 GitHub 链接",   // 项目 GitHub 链接
            "language": "项目语言",             // 项目语言
            "language_color": "#178600",        // 语言颜色（设置一个你喜欢的颜色~）
            "star_count": null,     // null 表示从 API 获取
            "fork_count": null,     // null 表示从 API 获取
            "is_featured": true,    // 是否显示
            "display_order": 1      // 项目显示顺序
        }
    ],
    "display_options": {    // 卡片样式配置，不建议修改，因为没写完（绝对没有摸鱼 ！）
        "card_style": "material",   // 卡片样式
        "show_language_badge": true,    // 是否显示语言徽章
        "animate_numbers": true,    // 是否启用数字动画
        "refresh_button": true      // 是否显示刷新按钮
    }
}
```

### our_team.json

##### 开发团队信息配置文件：

>   此文件用于配置"开发团队"区域的成员信息
    包括成员头像、角色、技能标签等

```json
{
    "title": "开发团队",                // 团队区域标题
    "subtitle": "团队介绍副标题",       // 团队区域副标题
    "members": [                        // 团队成员列表
        {
            "id": 1,                    // 成员ID
            "name": "用户名",           // 成员用户名
            "display_name": "显示名称", // 成员显示名称
            "role": "角色",             // 成员角色
            "role_badge_color": "#7D5260",      // 角色徽章颜色
            "subtitle": "英文角色",     // 英文角色副标题
            "description": "成员描述",  // 成员详细描述
            "avatar": {                 // 头像配置
                "type": "gradient",     // 头像类型（gradient/image）
                "gradient": "linear-gradient(135deg, #6750A4, #4A4458)",    // 渐变色
                "initials": "XM",       // 首字母缩写
                "image": ""             // 图片路径（如果type为image）
            },
            "tech_stack": ["C#", "Java", "WPF"] // 技术栈
        }
    ]
}
```

### site_config.json

##### 网站全局配置文件：
___注意！除非你知道你在做什么！不然 我们 不-建-议 你擅自修改此配置文件！___

>   此文件用于配置网站的全局设置
    包括网站标题、描述、主题、导航链接等

```json
{
    "site": {                       // 网站基本信息
        "title": "网站标题",        // 网站主标题
        "subtitle": "网站副标题",   // 网站副标题
        "description": "网站描述",  // 网站描述
        "language": "zh-CN",        // 网站语言
        "theme": {                  // 主题配置
            "default": "dark",      // 默认主题（dark/light）
            "allow_switch": true    // 是否允许切换主题
        }
    },
    "navigation": {                 // 导航栏配置
        "brand": {                  // 品牌信息
            "name": "品牌名称",     // 品牌名称
            "icon": "rocket_launch" // 品牌图标
        },
        "links": [                  // 导航链接
            {
                "id": 1,            // 链接ID
                "text": "链接文本", // 链接显示文本
                "url": "链接URL",   // 链接URL
                "icon": "",         // 链接图标
                "external": false   // 是否为外部链接
            }
        ]
    },
    "footer": {                     // 页脚配置
        "copyright": "版权信息",    // 版权信息
        "tagline": "标语",          // 标语
        "links": [                  // 页脚链接
            {
                "text": "链接文本",
                "url": "链接URL"
            }
        ],
        "social_links": [               // 社交媒体链接
            {
                "platform": "github",   // 平台名称
                "url": "链接URL",
                "icon": "github"        // 图标
            }
        ]
    },
    "starfield": {                  // 星空背景配置
        "enabled": true,            // 是否启用
        "star_count": 200,          // 星星数量
        "connection_distance": 100, // 连接距离
        "mouse_interaction": true   // 鼠标交互
    },
    "pages": {      // 页面配置
        "team": {                   // 团队页面
            "path": "./pages/team.html",    // 页面路径
            "title": "页面标题"     // 页面标题
        },
        "projects": {               // 项目页面
            "path": "./pages/projects.html",
            "title": "开源项目"
        }
    }
}
```

### something_was_new.json

##### 最新项目信息配置文件：

>   此文件用于配置首页展示的"当前项目"区域数据
    包括项目名称、版本、描述、下载链接等信息

```json
{
    "project": {                    // 项目信息
        "name": "项目简称",          // 项目简称
        "full_name": "项目全称",     // 项目全称
        "version": "版本号",         // 当前版本
        "description": "项目描述",   // 项目描述
        "sub_description": "子描述", // 子描述
        "github_url": "GitHub链接",  // GitHub仓库链接
        "download_url": "下载链接",  // 下载链接
        "release_date": "发布日期",  // 发布日期
        "is_new": true              // 是否为新项目
    },
    "badge": {                      // 徽章配置
        "text": "徽章文本",          // 徽章显示文本
        "icon": "verified"          // 徽章图标
    }
}
```

### update_info.json

##### 版本更新信息配置文件：

>   此文件用于配置右下角更新提示小部件的数据

```json
{
    "enabled": true,                // 是否启用更新提示
    "auto_show": true,              // 是否自动显示
    "show_delay": 3000,             // 显示延迟（毫秒）
    "current_version": "上一版本",   // 上一版本号
    "latest_version": "最新版本",    // 最新版本号
    "title": "提示标题",            // 提示标题
    "description": "更新描述",      // 更新描述
    "download_url": "下载链接",     // 下载链接
    "button_text": "按钮文本"       // 按钮显示文本
}
```

### what_can_something_do.json

##### SMSM 功能列表配置文件：

>   此文件用于配置"SMSM 能做什么"区域的功能卡片数据
    每个功能卡片包含图标、标题和详细描述

```json
{
    "title": "功能区域标题",         // 功能区域标题
    "features": [                   // 功能列表
        {
            "id": 1,                // 功能ID
            "icon": "dns",          // 功能图标
            "title": "功能标题",     // 功能标题
            "description": "功能详细描述" // 功能详细描述
        }
    ]
}
```

### what_is_something.json

##### SMSM 项目介绍配置文件：

>   此文件用于配置"什么是 SMSM"区域的数据
    包括项目标题、副标题、介绍图片等

```json
{
    "title": "区域标题",            // 区域标题
    "subtitle": "区域副标题",       // 区域副标题
    "image": {                      // 图片配置
        "src": "图片路径",          // 图片源路径
        "alt": "替代文本",          // 替代文本
        "fallback_text": "加载失败提示" // 加载失败时显示的文本
    },
    "features_summary": [           // 功能摘要列表
        "功能点1",
        "功能点2",
        "功能点3",
        "功能点4"
    ]
}
```


--------------

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证开源

## 👥 团队成员

- **xiaomu18** - 项目发起人 / 后端开发
- **YBTsa** - UI/UX 设计
- **STRAYLIGHT** - 前端开发

## 📮 联系我们

- GitHub: [@We-Are-Starlight-Chaser](https://github.com/We-Are-Starlight-Chaser)

---

<p align="center">
  Made with ♥ by We Are Starlight Chaser
</p>