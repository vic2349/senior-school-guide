// docs/js/waline-init.js

document.addEventListener('DOMContentLoaded', function() {
  try {
    // 只检查评论容器
    const commentContainer = document.getElementById('waline-comment');
    
    if (!commentContainer) {
      console.log('Waline: No comment container found, skipping initialization.');
      return;
    }
    
    // 动态加载 Waline
    import('https://npm.elemecdn.com/@waline/client@v2/dist/waline.mjs').then(({ init }) => {
      // 配置 Waline (关闭浏览量功能)
      init({
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
        email: true, // 开启邮件通知
        notify: true, // 开启提醒通知
        imageUploader: true // 允许图片上传
      });
    }).catch(error => {
      console.error('Waline 加载失败:', error);
    });
  } catch (error) {
    console.error('Waline 初始化错误:', error);
  }
});