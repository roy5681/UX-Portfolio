// 設置作品項目的動畫延遲
document.addEventListener('DOMContentLoaded', () => {
    // 為作品項目添加索引
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    // 為技能標籤添加索引
    const skillItems = document.querySelectorAll('.skills span');
    skillItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    // 為案例研究內容添加索引
    const caseItems = document.querySelectorAll('.case-content > *');
    caseItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    // 為流程步驟添加索引
    const processSteps = document.querySelectorAll('.process-steps .step');
    processSteps.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
});

// 滾動觸發動畫
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // 如果只想觸發一次，可以取消觀察
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 添加滾動觀察
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));
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

// 導航欄滾動效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // 添加滾動類別
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // 隱藏/顯示導航欄
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        // 向下滾動超過100px時隱藏導航欄
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // 向上滾動時顯示導航欄
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// 更新活動導航項
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const targetId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// 監聽滾動事件以更新活動導航項
window.addEventListener('scroll', updateActiveNavItem);
window.addEventListener('load', updateActiveNavItem);

// 頁面載入動畫
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 滑鼠移動視差效果
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        hero.style.transform = `
            perspective(1000px)
            rotateY(${mouseX * 5}deg)
            rotateX(${-mouseY * 5}deg)
        `;
    }
});

// 自定義游標效果
const cursor = document.createElement('div');
cursor.className = 'floating-cursor';
document.body.appendChild(cursor);

const cursorText = document.createElement('div');
cursorText.className = 'cursor-text';
document.body.appendChild(cursorText);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorText.style.left = e.clientX + 'px';
    cursorText.style.top = (e.clientY - 20) + 'px';
});

// 為可點擊元素添加游標效果
document.querySelectorAll('a, button, .work-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorText.textContent = item.dataset.cursorText || '點擊';
        cursorText.style.opacity = '1';
    });

    item.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorText.style.opacity = '0';
    });
});

// 技能進度條動畫
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.skill-progress');
            const percentage = progress.dataset.percentage || '80';
            progress.style.transform = `scaleX(${percentage / 100})`;
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// 動態數字計數器
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2秒
    const step = target / (duration / 16); // 60fps
    let current = 0;

    function update() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    update();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// 滾動進度指示器
const progressBar = document.querySelector('.progress-bar');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// 動態背景效果
function createDynamicBackground() {
    const canvas = document.createElement('canvas');
    canvas.className = 'dynamic-bg';
    document.querySelector('.hero').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1
        };
    }
    
    function initParticles() {
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
        
        requestAnimationFrame(drawParticles);
    }
    
    resize();
    initParticles();
    drawParticles();
    
    window.addEventListener('resize', resize);
}

createDynamicBackground();

// 3D卡片效果增強
document.querySelectorAll('.work-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = (centerX - x) / 30;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${angleX}deg)
            rotateY(${angleY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}); 