import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// 定义路由配置
const routes = [
  { path: '/', component: () => <div>首页</div> },
  { path: '/about', component: () => <div>关于页面</div> },
  { path: '/contact', component: () => <div>联系我们页面</div> }
];

// 自定义 Router 组件
const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // 监听 popstate 事件，当用户点击浏览器的前进或后退按钮时触发
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 根据当前路径匹配对应的路由组件
  const matchedRoute = routes.find(route => route.path === currentPath);

  // 如果没有匹配到路由，显示 404 页面
  const Component = matchedRoute ? matchedRoute.component : () => <div>404 Not Found</div>;

  return <Component />;
};

// 自定义 Link 组件，支持 pushState 和 replaceState
const Link = ({ to, children, replace = false }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (replace) {
      // 使用 replaceState 替换当前历史记录状态
      window.history.replaceState({}, '', to);
    } else {
      // 使用 pushState 向历史记录栈中添加新状态
      window.history.pushState({}, '', to);
    }
    // 手动触发 popstate 事件更新 Router 组件中的状态
    const event = new PopStateEvent('popstate');
    window.dispatchEvent(event);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

// 应用组件
const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/about">关于</Link></li>
          <li><Link to="/contact">联系我们</Link></li>
          <li><Link to="/about" replace>替换当前历史记录到关于页面</Link></li>
        </ul>
      </nav>
      <Router />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);