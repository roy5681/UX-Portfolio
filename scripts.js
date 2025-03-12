// 滾動進度條
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// 導航欄滾動效果
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 滾動動畫
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// 技能進度條動畫
document.querySelectorAll('.skill-progress').forEach((progress, index) => {
    const percentage = progress.dataset.percentage;
    progress.style.setProperty('--item-index', index);
    
    const animate = () => {
        progress.style.width = percentage + '%';
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(animate, index * 200);
            skillObserver.unobserve(progress);
        }
    });
    
    skillObserver.observe(progress);
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 作品卡片翻轉效果
document.querySelectorAll('.work-item').forEach(item => {
    const inner = item.querySelector('.work-item-inner');
    
    item.addEventListener('click', function(e) {
        // 如果點擊的是"了解更多"按鈕，不執行翻轉
        if (e.target.classList.contains('case-link')) {
            return;
        }
        
        // 阻止事件冒泡
        e.preventDefault();
        e.stopPropagation();
        
        // 執行翻轉
        inner.style.transform = 
            inner.style.transform === 'rotateY(180deg)' 
                ? 'rotateY(0deg)' 
                : 'rotateY(180deg)';
    });
}); 
