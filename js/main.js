'use strict';

// ========== DOM 引用 ==========
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// ========== 当前语言 (默认英文) ==========
let currentLang = 'en';

// ========== 语言切换函数 (全局) ==========
function switchLanguage() {
  currentLang = currentLang === 'en' ? 'zh' : 'en';

  // 更新所有 data-i18n 元素的文本
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[currentLang][key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });

  // 更新所有 data-i18n-placeholder 输入框的占位符
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[currentLang][key]) {
      el.placeholder = translations[currentLang][key];
    }
  });

  // 更新语言切换按钮文本
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.textContent = currentLang === 'en' ? '中文' : 'English';
  }

  // 更新 HTML lang 属性
  document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';

  // 更新页面标题
  document.title = currentLang === 'en'
    ? 'Xiuyi Yang · Personal Page'
    : '杨修一 · 个人主页';

  // 重新触发统计数字动画（如果重新切回英文且有统计数字可见）
  if (currentLang === 'en') {
    document.querySelectorAll('.stat-number').forEach(el => {
      el.dataset.animated = '';
    });
  }
}

// ========== 导航栏滚动效果 ==========
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 60);
  backToTop.classList.toggle('visible', scrollY > 400);
  updateActiveNavLink();
});

// ========== 高亮当前导航项 ==========
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${current}`);
  });
}

// ========== 移动端菜单 ==========
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ========== 滚动淡入动画 (Intersection Observer) ==========
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);

      // 如果是统计数字，触发计数动画
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(animateCounter);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => observer.observe(el));

// ========== 统计数字计数动画 ==========
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (!target || el.dataset.animated) return;
  el.dataset.animated = 'true';

  const duration = 1600;
  const step = Math.max(1, Math.floor(target / 40));
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = current;
    }
  }, duration / (target / step));
}

// ========== 项目筛选 ==========
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ========== 图库灯箱 ==========
function openLightbox(item) {
  const img = item.querySelector('img');
  lightboxImg.src = img.src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ========== 微信点击显示微信号 ==========
function showWechat() {
  const wechatId = 'Pleyxo';
  // 尝试复制到剪贴板
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(wechatId).then(() => {
      showToast('✅ WeChat ID: ' + wechatId + ' (已复制)');
    }).catch(() => {
      showToast('💬 WeChat ID: ' + wechatId);
    });
  } else {
    showToast('💬 WeChat ID: ' + wechatId);
  }
}

// ========== 回到顶部按钮 ==========
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== 联系方式表单 ==========
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const successKey = currentLang === 'en'
      ? 'contact-form-success'
      : 'contact-form-success';
    showToast('✅ ' + (translations[currentLang]['contact-form-success'] || 'Message sent! Thank you!'));
    contactForm.reset();
  });
}

// ========== Toast 提示组件 ==========
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('visible'));

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ========== 初始化 ==========
console.log('🌟 Personal page loaded. Current language: ' + currentLang);
console.log('💡 Place images in assets/images/, files in assets/files/');
