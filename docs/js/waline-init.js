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
    
    // 检查 Waline 是否已正确加载
    if (typeof Waline === 'undefined' || typeof Waline.init === 'undefined') {
      console.error('Waline is not loaded correctly. Make sure waline.js is included before this script.');
      return;
    }
    
    try {
      // 使用正确的初始化方式
      const walineInstance = Waline.init({
        el: '#waline-comment',
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
        pageview: false,
        comment: true,
        reaction: false,
        search: false,
        login: 'enable',
        copyright: false,
        imageUploader: true,
        dark: 'html[data-md-color-scheme="slate"]',
        locale: {
          placeholder: '来随意叭叭，信息都不留也行~\n如果留下邮箱的话，被回复时会有📧通知~',
          sofa: '还没有评论，快来抢沙发吧！'
        }
      });
      
      console.log('Waline initialized successfully.');
      
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
  
  // 初始化函数
  function init() {
    // 如果 Waline 已加载，直接初始化
    if (typeof Waline !== 'undefined' && typeof Waline.init !== 'undefined') {
      initializeWaline();
    } 
    // 否则添加重试机制
    else {
      let retryCount = 0;
      const maxRetries = 5;
      const retryInterval = 500; // 毫秒
      
      const retry = () => {
        retryCount++;
        if (retryCount > maxRetries) {
          console.error('Waline initialization failed after retries');
          return;
        }
        
        console.log(`Retrying Waline initialization (attempt ${retryCount}/${maxRetries})`);
        
        if (typeof Waline !== 'undefined' && typeof Waline.init !== 'undefined') {
          initializeWaline();
        } else {
          setTimeout(retry, retryInterval);
        }
      };
      
      setTimeout(retry, retryInterval);
    }
  }
  
  // 启动初始化
  init();
  
  // 监听主题切换事件
  document.addEventListener('md-theme-changed', initializeWaline);
});