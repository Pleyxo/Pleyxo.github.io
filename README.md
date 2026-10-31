# 双语学术个人主页模板

这是一个可直接部署到 GitHub Pages 的静态个人主页，适合本科生、研究生和科研工作者展示个人简介、研究成果、获奖荣誉、项目经历、校园经历、照片与联系方式。

主页支持：

- 中英文切换
- 电脑端与移动端自适应
- 科研成果摘要、关键词、论文状态与配图展示
- 获奖证书图片展示及点击放大
- 项目经历的桌面表格和移动端卡片展示
- GitHub Pages 免费部署

在线示例：<https://pleyxo.github.io/>

## 1. 快速开始

### 方法一：直接在 GitHub 上修改

1. Fork 本仓库。
2. 如果希望主页地址为 `https://你的用户名.github.io/`，将仓库重命名为：

   ```text
   你的GitHub用户名.github.io
   ```

3. 进入仓库的 `Settings` → `Pages`。
4. 在 `Build and deployment` 中选择从分支部署，选择 `main` 分支和根目录 `/ (root)`。
5. 保存后等待 GitHub Pages 完成部署。

修改文件时，可以在 GitHub 文件页面点击铅笔图标；上传图片时，进入对应文件夹后选择 `Add file` → `Upload files`。

### 方法二：下载到本地修改

```bash
git clone https://github.com/你的用户名/你的用户名.github.io.git
cd 你的用户名.github.io
```

使用 VS Code 等编辑器修改后提交：

```bash
git add .
git commit -m "Customize personal homepage"
git push origin main
```

本项目不需要安装 Node.js、数据库或后端服务。直接双击 `index.html`，或使用 VS Code Live Server，即可在本地预览。

## 2. 文件结构

```text
.
├── index.html                 # 页面结构、默认英文文字、链接和图片路径
├── css/
│   └── style.css             # 颜色、字体、卡片、布局与移动端样式
├── js/
│   ├── main.js               # 中英文切换、区块顺序、动画、灯箱和联系方式
│   └── translations.js       # 所有中英文文字
└── assets/
    ├── images/
    │   ├── avatar.jpg        # 头像
    │   ├── research/         # 科研成果图片
    │   └── honors/           # 获奖证书图片
    └── files/                # 简历和项目压缩包，需要自行创建
```

## 3. 修改文字时最重要的规则

页面中的双语文字使用 `data-i18n` 键关联。例如：

```html
<h2 data-i18n="about-title">About Me</h2>
```

对应的中英文位于 `js/translations.js`：

```js
en: {
  "about-title": "About Me"
},
zh: {
  "about-title": "关于我"
}
```

请遵循以下规则：

1. 修改中文时，修改 `js/translations.js` 中的 `zh` 部分。
2. 修改英文时，同时修改 `js/translations.js` 中的 `en` 部分和 `index.html` 标签内的默认英文。
3. 不要随意修改 `data-i18n="..."` 中的键名；如果修改，HTML 和中英文翻译中的键名必须完全一致。
4. 翻译文字中如果需要保留粗体，可以使用 `<strong>文字</strong>`。

当前页面默认首先显示 `index.html` 中的英文，点击右上角“中文”按钮后，才会加载 `translations.js` 中的中文。

## 4. 各部分文字在哪里修改

### 4.1 姓名、首页简介和研究方向

在 `index.html` 中搜索：

- `hero-greeting`：问候语
- `hero-subtitle`：专业和方向概述
- `hero-desc1`：学校与身份
- `hero-desc2`：研究方向

同时在 `js/translations.js` 中修改相同键名的中英文内容。

姓名还会出现在以下位置：

- `index.html` 中的首页大标题
- `nav-logo`：左上角姓名
- `contact-name-value`：联系区域姓名
- `footer-brand`：页脚姓名
- `footer-copyright`：版权文字
- `js/main.js` 中的中英文页面标题 `document.title`

### 4.2 “关于我”和学术技能

在 `js/translations.js` 中搜索：

```text
about-heading
about-p1
about-p2
about-p3
skills-title
skills-tag1 ... skills-tag9
```

如需增加一个技能标签：

1. 在 `index.html` 的 `.skill-group` 中复制一行：

   ```html
   <span class="skill-tag" data-i18n="skills-tag10">Your Skill</span>
   ```

2. 在 `translations.js` 的 `en` 和 `zh` 中分别新增 `skills-tag10`。

### 4.3 首页统计数字

在 `index.html` 中搜索 `data-target`：

```html
<span class="stat-number" data-target="2">0</span>
```

把 `data-target` 改成实际数量。标签名称由以下键控制：

```text
about-stat1-label
about-stat2-label
about-stat3-label
```

建议同时更新 `translations.js` 中的 `about-stat1-num`、`about-stat2-num` 和 `about-stat3-num`，保持数据一致。

### 4.4 联系方式和社交链接

以下内容不是全部由翻译文件控制，需要直接修改：

| 内容 | 文件 | 搜索内容 |
| --- | --- | --- |
| 邮箱链接与显示文字 | `index.html` | 当前邮箱地址或 `mailto:` |
| 手机号 | `index.html` | `tel:` |
| GitHub 主页 | `index.html` | `github.com/Pleyxo` |
| Bilibili 主页 | `index.html` | `space.bilibili.com` |
| 微信号 | `js/main.js` | `const wechatId` |
| 复制邮箱按钮 | `js/main.js` | `const email` |
| 学校与所在地 | `js/translations.js` | `contact-school-value`、`contact-location-value` |

邮箱在 `index.html` 中出现多次，建议全局搜索旧邮箱并全部替换。

## 5. 更换和上传图片

建议文件名只使用英文小写字母、数字和连字符，例如：

```text
my-paper-figure-1.png
robot-project.jpg
national-scholarship-2026.jpg
```

不要在文件名中使用空格、中文或特殊符号。图片上传后，还必须在 `index.html` 中把 `src="..."` 改成对应路径。

### 5.1 更换头像

最简单的方法是将新头像命名为：

```text
avatar.jpg
```

然后覆盖：

```text
assets/images/avatar.jpg
```

如果使用不同文件名，需要修改 `index.html`：

```html
<img src="assets/images/你的头像文件名.jpg" alt="Avatar" />
```

建议使用正方形图片。

### 5.2 上传科研成果图片

将论文或科研成果的图片上传到：

```text
assets/images/research/
```

然后修改相应科研卡片中的路径：

```html
<img src="assets/images/research/paper-1-figure-1.png" alt="Result figure 1" />
<img src="assets/images/research/paper-1-figure-2.png" alt="Result figure 2" />
```

每项科研成果目前展示两张图。图片数量可以增加或减少，只需在该成果的 `.research-figures` 中增加或删除 `<figure>`。

### 5.3 上传获奖证书

将证书上传到：

```text
assets/images/honors/
```

在 `index.html` 的 `#honors` 区域找到对应 `.honor-card`，修改：

```html
<img src="assets/images/honors/your-certificate.jpg" alt="Certificate" />
```

### 5.4 上传画廊照片

建议新建目录：

```text
assets/images/gallery/
```

上传图片后，将 `index.html` 的 `#gallery` 区域中 `placehold.co` 开头的占位图链接替换为本地路径：

```html
<img src="assets/images/gallery/photo-1.jpg" alt="Photo description" />
```

画廊标题由 `gallery-cap1` 至 `gallery-cap6` 控制，需要在 `translations.js` 中同步修改中英文。

### 5.5 上传简历和项目文件

创建目录：

```text
assets/files/
```

可使用以下默认文件名：

```text
assets/files/resume.pdf
assets/files/projects.zip
```

若文件名不同，修改 `index.html` 下载按钮的 `href`：

```html
<a href="assets/files/your-resume.pdf" download>...</a>
```

## 6. 修改科研成果

科研成果位于 `index.html` 的：

```html
<section id="research">
```

每项成果是一个完整的：

```html
<article class="research-card fade-in">
```

修改现有成果时，需要处理以下内容：

| 内容 | 修改位置 |
| --- | --- |
| 会议名称 | `index.html` 中的 `.research-venue` |
| 投稿状态 | `.research-status`，文字来自 `research-status-submitted` 或 `research-status-accepted` |
| 论文标题 | `research-...-title` |
| 摘要 | `research-...-abstract` |
| 关键词 | `research-...-keywords` |
| 两张图片 | `.research-figures` 中的两个 `src` |

新增一项科研成果时：

1. 复制完整的 `research-card`。
2. 修改左侧编号，例如 `03`。
3. 为新内容创建不重复的翻译键，例如：

   ```text
   research-new-title
   research-new-abstract
   research-new-keywords
   ```

4. 在 `translations.js` 的 `en` 和 `zh` 中都加入这些键。
5. 将配图上传到 `assets/images/research/` 并修改两个 `src`。
6. 更新首页科研成果统计数字。

状态标签可使用现有样式：

```html
<span class="research-status research-status-submitted">Submitted</span>
<span class="research-status research-status-accepted">Accepted</span>
```

如需其他状态，可复制相关 CSS，并在 `css/style.css` 中定义新的颜色。

## 7. 修改项目经历

项目经历在不同屏幕下有两套 HTML：

- `.project-table`：电脑端表格
- `.project-card-list`：移动端卡片

因此新增、删除或修改项目时，必须同时修改两处，否则电脑和手机看到的内容会不一致。

新增第 5 个项目时，可以参考现有第 4 项：

1. 在表格 `<tbody>` 中复制一个完整 `<tr>`，编号改为 `5`。
2. 在 `.project-card-list` 中复制一个完整 `.project-card`，编号改为 `05`。
3. 创建以下翻译键：

   ```text
   exp-5-name
   exp-5-teacher
   exp-5-role
   exp-5-result
   exp-card5-title
   exp-card5-role
   exp-card5-desc
   ```

4. 在 `translations.js` 的中英文区域分别填写内容。
5. 更新首页项目经历统计数字。

如果项目有 GitHub 链接，可以使用：

```html
<a class="project-link" href="https://github.com/你的用户名/项目仓库" target="_blank" rel="noopener noreferrer">
  <i class="fab fa-github"></i> GitHub
</a>
```

## 8. 修改获奖荣誉

荣誉区域位于 `index.html` 的 `#honors`。每项荣誉是一个 `.honor-card`。

新增荣誉时：

1. 将证书图片上传到 `assets/images/honors/`。
2. 复制一份完整的 `.honor-card`。
3. 修改图片路径和 `alt` 描述。
4. 创建新的翻译键，例如：

   ```text
   honor-10-level
   honor-10-name
   honor-10-date
   ```

5. 在 `translations.js` 的 `en` 和 `zh` 中分别添加内容。
6. 更新首页获奖数量。

证书卡片已经绑定点击放大功能，不需要额外编写 JavaScript。

## 9. 修改“经历”、画廊和下载区域

校园或组织经历位于 `#org-section`，主要翻译键包括：

```text
org-name
org-period
org-location
org-role
org-achievement
```

下载区域也位于 `#org-section` 内，相关键以 `res-` 开头。

画廊位于 `#gallery`，标题和说明以 `gallery-` 开头。

## 10. 调整页面区块顺序

导航链接顺序在 `index.html` 顶部的 `.nav-menu` 中调整。

页面实际展示顺序还受到 `js/main.js` 开头代码控制：

```js
experienceSection.before(researchSection, honorsSection);
gallerySection.before(organizationSection);
```

当前主要顺序是：

```text
科研成果 → 获奖荣誉 → 项目经历 → 经历 → 画廊
```

如果只移动 HTML，而没有检查这几行 JavaScript，页面加载后可能会被重新排序。调整区块顺序时，应同时修改或删除对应的 DOM 排序代码，并同步调整导航栏顺序。

## 11. 修改配色和样式

全局颜色在 `css/style.css` 文件开头的 CSS 变量中设置。常用变量包括：

```css
--primary
--secondary
--bg
--bg-alt
--surface
--text
--text-light
--border
```

常见组件样式位置：

| 组件 | CSS 类名 |
| --- | --- |
| 首页 | `.hero` |
| 技能标签 | `.skill-tag` |
| 项目表格 | `.table-wrapper`、`.project-table` |
| 科研卡片 | `.research-card` |
| 论文状态 | `.research-status-*` |
| 荣誉卡片 | `.honor-card` |
| 画廊 | `.gallery-grid`、`.gallery-item` |

移动端样式位于 `@media` 查询中。修改布局后，建议同时检查电脑和手机宽度。

## 12. 提交前检查清单

- [ ] 中英文姓名、学校、简介和研究方向均已替换
- [ ] 邮箱、手机号、微信号及社交链接均已替换
- [ ] `js/main.js` 中的页面标题、微信号和复制邮箱已替换
- [ ] 头像已替换
- [ ] 科研成果的标题、摘要、关键词、状态和图片已替换
- [ ] 项目经历的桌面表格和移动端卡片均已修改
- [ ] 荣誉证书图片和文字已替换
- [ ] 首页统计数字与实际条目数量一致
- [ ] 画廊占位图已替换为自己的照片
- [ ] 简历和下载文件已上传，链接可以打开
- [ ] 中文和英文翻译键保持一致
- [ ] 所有图片路径区分大小写并与实际文件名完全一致

## 13. 常见问题

### 修改中文后页面仍显示英文

主页默认显示英文。点击右上角“中文”查看中文内容。如果希望默认显示中文，需要进一步修改 `js/main.js` 的默认语言和页面初始化逻辑。

### 图片在本地正常，GitHub Pages 上不显示

GitHub Pages 区分文件名大小写。请检查：

- `Photo.jpg` 与 `photo.jpg` 是否写错
- 图片是否已经提交并推送
- `src` 是否使用仓库内相对路径
- 路径中是否误用了 Windows 反斜杠 `\`

正确写法：

```html
<img src="assets/images/gallery/photo.jpg" alt="Photo" />
```

### 推送后网站没有立即更新

GitHub Pages 通常需要短暂时间重新部署。可在仓库的 `Actions` 页面查看部署状态，并尝试强制刷新浏览器缓存。

### 新增文字后切换语言时没有变化

检查新元素是否带有 `data-i18n`，并确认相同键名同时存在于 `translations.js` 的 `en` 和 `zh` 中。

## 14. 核心修改原则

如果只是把本主页替换成另一个人的主页，通常只需要修改：

1. `js/translations.js`：绝大部分中英文文字。
2. `index.html`：姓名、联系方式、链接、图片路径和新增卡片结构。
3. `js/main.js`：页面标题、微信号、复制邮箱和区块顺序。
4. `assets/images/`：头像、科研图片、证书和画廊照片。
5. `assets/files/`：简历和可下载文件。

修改完成后提交到 `main` 分支，GitHub Pages 会自动更新主页。
