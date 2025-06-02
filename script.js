document.addEventListener('DOMContentLoaded', function () {
            const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
            const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
            const mobileNavPanel = document.querySelector('.mobile-nav-panel');
            const mobileMenuClose = document.querySelector('.mobile-menu-close');
            const body = document.body;

            function openMobileMenu() {
                mobileNavOverlay.style.display = 'block';
                mobileNavPanel.style.display = 'block';
                setTimeout(() => { 
                    mobileNavPanel.classList.add('open');
                    body.style.overflow = 'hidden'; 
                }, 10);
            }

            function closeMobileMenu() {
                mobileNavPanel.classList.remove('open');
                body.style.overflow = '';
                setTimeout(() => { 
                    mobileNavOverlay.style.display = 'none';
                    mobileNavPanel.style.display = 'none';
                }, 300);
            }

            if (mobileMenuTrigger) {
                mobileMenuTrigger.addEventListener('click', openMobileMenu);
            }
            if (mobileMenuClose) {
                mobileMenuClose.addEventListener('click', closeMobileMenu);
            }
            if (mobileNavOverlay) {
                mobileNavOverlay.addEventListener('click', closeMobileMenu);
            }

            const desktopNavLinks = document.querySelector('.navbar .nav-links');
            const mobileMainNav = document.querySelector('.mobile-nav-panel .mobile-main-nav');
            const mobileActionsArea = document.querySelector('.mobile-nav-panel .mobile-actions-area');
            const desktopNavActions = document.querySelector('.navbar .nav-actions');

            if (desktopNavLinks && mobileMainNav) {
                desktopNavLinks.querySelectorAll(':scope > li').forEach(item => {
                    const link = item.querySelector(':scope > a');
                    const dropdown = item.querySelector(':scope > .dropdown-menu');
                    
                    const mobileItem = document.createElement('li');
                    
                    if (dropdown) {
                        const trigger = document.createElement('div');
                        trigger.classList.add('mobile-dropdown-trigger');
                        trigger.innerHTML = link.innerHTML; 
                        
                        const mobileDropdownContent = document.createElement('div');
                        mobileDropdownContent.classList.add('mobile-dropdown-content');
                        
                        dropdown.querySelectorAll('.link-column ul li a, .dropdown-promo-section a.promo-learn-more').forEach(subLink => {
                            const mobileSubLink = document.createElement('a');
                            mobileSubLink.href = subLink.href;
                            mobileSubLink.textContent = subLink.textContent.trim();
                             if (subLink.querySelector('.external-link-icon')) {
                                mobileSubLink.innerHTML += ' <svg class="external-link-icon" style="width:10px; height:10px; vertical-align:middle;" viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>';
                            }
                            mobileDropdownContent.appendChild(mobileSubLink);
                        });

                        mobileItem.appendChild(trigger);
                        mobileItem.appendChild(mobileDropdownContent);

                        trigger.addEventListener('click', () => {
                            trigger.classList.toggle('open');
                            mobileDropdownContent.classList.toggle('open');
                        });

                    } else {
                        const mobileLink = document.createElement('a');
                        mobileLink.href = link.href;
                        mobileLink.innerHTML = link.innerHTML;
                        mobileItem.appendChild(mobileLink);
                    }
                    mobileMainNav.appendChild(mobileItem);
                });
            }

            if (desktopNavActions && mobileActionsArea) {
                const langSwitcherDesktop = desktopNavActions.querySelector('.lang-switcher-container .lang-switcher');
                if (langSwitcherDesktop) {
                    const mobileLangSwitcher = langSwitcherDesktop.cloneNode(true);
                    mobileLangSwitcher.classList.add('mobile-lang-switcher-display'); // For potential different styling
                    mobileLangSwitcher.addEventListener('click', (e) => {
                        e.preventDefault();
                        alert('Mobile language selection UI would open here.');
                    });
                    mobileActionsArea.appendChild(mobileLangSwitcher);
                }

                const loginBtnDesktop = desktopNavActions.querySelector('.btn-login');
                const openAccBtnDesktop = desktopNavActions.querySelector('.btn-open-account');

                if (loginBtnDesktop) {
                    const mobileLoginBtn = loginBtnDesktop.cloneNode(true);
                    mobileActionsArea.appendChild(mobileLoginBtn);
                }
                if (openAccBtnDesktop) {
                    const mobileOpenAccBtn = openAccBtnDesktop.cloneNode(true);
                    mobileActionsArea.appendChild(mobileOpenAccBtn);
                }
            }

            // New code to control dropdown hover with delay
            if (desktopNavLinks) {
                desktopNavLinks.querySelectorAll(':scope > li').forEach(item => {
                    let timeoutId;

                    item.addEventListener('mouseenter', () => {
                        clearTimeout(timeoutId);
                        item.classList.add('open');
                    });

                    item.addEventListener('mouseleave', () => {
                        timeoutId = setTimeout(() => {
                            item.classList.remove('open');
                        }, 200);
                    });
                });
            }
        });
