// docs/js/waline-init.js

// Waline v3 初始化函数
function initWaline() {
  // 只检查评论容器
  const commentContainer = document.getElementById('waline-comment');
  
  if (!commentContainer) {
    console.log('Waline: No comment container found, skipping initialization.');
    return;
  }
  
  // 检查 Waline 是否已加载
  if (typeof Waline === 'undefined') {
    console.error('Waline is not loaded. Make sure waline.js is included before this script.');
    return;
  }
  
  try {
    // Waline v3 配置
    const waline = new Waline({
      el: '#waline-comment',
      serverURL: 'https://waline1.619-project.eu.org', // 替换为你的服务地址
      path: window.location.pathname,
      lang: 'zh-CN',
      emoji: [
        'https://unpkg.com/@waline/emojis@1.2.0/weibo',
        'https://unpkg.com/@waline/emojis@1.2.0/bilibili',
        'https://unpkg.com/@waline/emojis@1.2.0/qq',
        'https://unpkg.com/@waline/emojis@1.2.0/tw-emoji'
      ],
      pageview: false, // 关闭浏览量统计
      comment: true, // 开启评论
      reaction: true, // 开启表情反应
      search: false, // 禁用搜索
      login: 'enable', // 启用登录
      copyright: false, // 隐藏底部版权
      imageUploader: true, // 允许图片上传
      dark: 'html[data-md-color-scheme="slate"]', // 自动切换暗黑模式
      locale: {
        placeholder: '留下你的评论... 啥信息都不填也可以评论！',
        sofa: '还没有评论，快来抢沙发吧！'
      }
    });
    
    console.log('Waline v3 initialized successfully.');
    
    // 添加加载状态切换
    const loadingEl = document.getElementById('waline-loading');
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
    commentContainer.style.display = 'block';
    
  } catch (error) {
    console.error('Waline initialization failed:', error);
    
    // 显示错误信息
    const errorEl = document.createElement('div');
    errorEl.className = 'waline-error';
    errorEl.innerHTML = `
      <div class="admonition error">
        <p class="admonition-title">评论加载失败</p>
        <p>无法加载评论系统，请稍后再试或刷新页面。</p>
        <p><small>错误信息: ${error.message}</small></p>
      </div>
    `;
    
    commentContainer.parentNode.insertBefore(errorEl, commentContainer.nextSibling);
  }
}

// 页面加载完成后初始化 Waline
if (document.readyState === 'complete') {
  initWaline();
} else {
  document.addEventListener('DOMContentLoaded', initWaline);
}

// 监听主题切换
document.addEventListener('md-theme-changed', initWaline);