// docs/js/waline-init.js

// Waline 初始化函数
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
    // 配置 Waline (关闭浏览量功能)
    const waline = Waline.init({
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
      pageview: false, // 关闭浏览量统计
      comment: true, // 开启评论
      reaction: true, // 开启表情反应
      search: false, // 禁用搜索
      login: 'enable', // 启用登录
      copyright: false, // 隐藏底部版权
      imageUploader: true // 允许图片上传
    });
    
    console.log('Waline initialized successfully.');
  } catch (error) {
    console.error('Waline initialization failed:', error);
  }
}

// 页面加载完成后初始化 Waline
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // 文档已经加载完成或正在加载
  setTimeout(initWaline, 0);
} else {
  // 等待文档加载完成
  document.addEventListener('DOMContentLoaded', initWaline);
}