const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#primary-nav');
function closeMenu(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');document.body.style.overflow=''}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);document.body.style.overflow=open?'':'hidden'});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -30px'});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element))}else{document.querySelectorAll('.reveal').forEach(element=>element.classList.add('is-visible'))}
