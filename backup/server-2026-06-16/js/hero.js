export function initHeroScroll() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const scrollThreshold = 150; 
    const mobileMaxWidth = 360; 
    let hasScrolled = false; 

    function onScroll() {
        if (window.innerWidth <= mobileMaxWidth && !hasScrolled) {
            if (window.scrollY > scrollThreshold) {
                hero.classList.add('scroll-shrink');
                hasScrolled = true; 
                window.removeEventListener('scroll', onScroll); 
            }
        }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll); 
}