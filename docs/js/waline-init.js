// docs/js/waline-init.js

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 兼容性检查函数
  function initializeWaline() {
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
      const walineInstance = new Waline({
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
        pageview: false,
        comment: true,
        reaction: true,
        search: false,
        login: 'enable',
        copyright: false,
        meta: ['nick', 'mail', 'link'],
        requiredMeta: ['nick'],
        wordLimit: 500,
        imageUploader: true,
        dark: 'html[data-md-color-scheme="slate"]',
        locale: {
          placeholder: '留下你的评论... (支持 Markdown 语法)',
          sofa: '还没有评论，快来抢沙发吧！'
        }
      });
      
      console.log('Waline v3 initialized successfully.');
      
      // 显示评论框
      commentContainer.style.display = 'block';
      
      // 隐藏加载指示器
      const loadingEl = document.getElementById('waline-loading');
      if (loadingEl) {
        loadingEl.style.display = 'none';
      }
      
      // 存储实例以便调试
      window.walineInstance = walineInstance;
      
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
  
  // 尝试初始化
  initializeWaline();
  
  // 添加重试机制
  let retryCount = 0;
  const maxRetries = 3;
  
  function checkWalineLoaded() {
    if (typeof Waline !== 'undefined') {
      initializeWaline();
    } else if (retryCount < maxRetries) {
      retryCount++;
      setTimeout(checkWalineLoaded, 500);
    } else {
      console.error('Waline failed to load after multiple attempts');
    }
  }
  
  // 如果第一次初始化失败，启动重试
  if (typeof Waline === 'undefined') {
    setTimeout(checkWalineLoaded, 500);
  }
});