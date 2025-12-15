const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({behavior:'smooth', block:'start'});

    
        const navList = document.querySelector('.navbar ul');
        if(navList.classList.contains('open')) {
            navList.classList.remove('open');
            document.getElementById('menu-button').textContent = '☰';
        }
    });
});


const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('fade-in');
            obs.unobserve(entry.target);
        }
    });
},{threshold:0.2});
sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        if(scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight){
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href').substring(1) === section.getAttribute('id')){
                    link.classList.add('active');
                }
            });
        }
    });
    let scrollTop = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - window.innerHeight;
    let scrolled = (scrollTop / height) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + "%";
});
const menuBtn = document.getElementById('menu-button');
const navList = document.querySelector('.navbar ul');
menuBtn.addEventListener('click', () => {
    navList.classList.toggle('open');
    menuBtn.textContent = navList.classList.contains('open') ? '✕' : '☰';
});

const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const message = form.querySelector('#message').value;

    if(name === "" || email === "" || message === ""){
        alert("Please fill all fields!");
        return;
    }
    alert("Thank you! Your message has been sent.");
    form.reset();
});
