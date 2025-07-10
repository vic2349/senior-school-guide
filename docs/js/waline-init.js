// docs/js/waline-init.js

// 在脚本开头添加
if (!window.location.pathname || !document.getElementById('waline-comment')) {
  return;
}

// 确保 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 检查页面是否有评论容器
  const commentContainer = document.getElementById('waline-comment');
  const pageviewContainer = document.getElementById('waline-pageview');
  
  // 只有存在评论容器或浏览量容器时才加载 Waline
  if (commentContainer || pageviewContainer) {
    // 动态加载 Waline 客户端
    import('https://unpkg.com/@waline/client@v2/dist/waline.mjs').then(({ init }) => {
      // 配置 Waline
      const waline = init({
        el: commentContainer ? '#waline-comment' : null,
        serverURL: 'https://waline1.619-project.eu.org', // 替换为你的服务地址
        path: window.location.pathname,
        lang: 'zh-CN',
        emoji: [
          'https://cdn.jsdelivr.net/npm/sticker-heo@2022.7.5/Sticker-100/',
          'https://npm.elemecdn.com/@waline/emojis@1.2.0/qq',
          'https://npm.elemecdn.com/@waline/emojis@1.2.0/tieba',
          'https://npm.elemecdn.com/@waline/emojis@1.2.0/weibo',
          'https://npm.elemecdn.com/@waline/emojis@1.2.0/bilibili',
          'https://file.66619.eu.org/beluga-emoji',
          'https://file.66619.eu.org/ikun-emoji'
        ],
        pageview: true, // 开启浏览量统计
        comment: commentContainer ? true : false, // 根据容器决定是否开启评论
        reaction: true, // 开启表情反应
        search: false, // 禁用搜索
        login: 'enable', // 启用登录
        copyright: false, // 隐藏底部版权
        meta: ['nick', 'mail', 'link'], // 评论者信息
        imageUploader: true // 允许图片上传
      });
      
      // 更新浏览量显示
      if (pageviewContainer) {
        waline.updateCount().then(count => {
          // 格式化浏览量显示
          const formattedCount = new Intl.NumberFormat().format(count);
          
          // 更新页面上的浏览量显示
          const countElement = document.getElementById('waline-pageview-count');
          if (countElement) {
            countElement.textContent = formattedCount;
          }
          
          // 显示容器
          pageviewContainer.style.display = 'block';
          
          // 添加到页面标题
          updatePageTitle(formattedCount);
        }).catch(error => {
          console.error('Waline 浏览量统计错误:', error);
          pageviewContainer.style.display = 'none';
        });
      }
    }).catch(error => {
      console.error('Waline 加载失败:', error);
    });
  }
  
  // 更新页面标题添加浏览量计数
  function updatePageTitle(count) {
    const titleElement = document.querySelector('.md-typeset h1');
    if (titleElement && !titleElement.querySelector('.pageview-badge')) {
      const badge = document.createElement('span');
      badge.className = 'pageview-badge';
      badge.innerHTML = `<span class="twemoji">👁️</span>${count}`;
      badge.style.cssText = `
        display: inline-block;
        margin-left: 12px;
        font-size: 0.8em;
        vertical-align: middle;
        background: rgba(0,0,0,0.05);
        padding: 2px 8px;
        border-radius: 12px;
        font-weight: normal;
      `;
      titleElement.appendChild(badge);
    }
  }
  
  // 创建浏览量显示元素（如果不存在）
  if (!pageviewContainer && commentContainer) {
    createPageviewElement();
  }
  
  function createPageviewElement() {
    const pageMeta = document.querySelector('.md-content__meta');
    if (pageMeta) {
      const pageviewEl = document.createElement('div');
      pageviewEl.id = 'waline-pageview';
      pageviewEl.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 10px;
        font-size: 0.8rem;
        color: var(--md-default-fg-color--light);
      `;
      
      pageviewEl.innerHTML = `
        <span class="twemoji" style="font-size: 1.2em; display: flex;">👁️</span>
        <span>本文已被浏览 <span id="waline-pageview-count">0</span> 次</span>
      `;
      
      pageMeta.appendChild(pageviewEl);
    }
  }
});