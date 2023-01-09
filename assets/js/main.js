window.addEventListener('load', function () {

    function contentAnimation(data) {

        let page_name = data.next.namespace;

        menuToggleActive(page_name);
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 1);

        if (page_name == 'index') {
            homeShow();
        } else if (page_name == 'work') {
            workShow();
        } else if (page_name == 'vacancy') {
            vacancyShow();
        } else if (page_name == 'about') {
            aboutShow();
        } else if (page_name == 'project') {
            projectShow();
        } else if (page_name == 'english') {
            englishShow();
        }

    }

    function pageTransition(data) {
        if (data.trigger != 'back' && data.trigger != 'popstate' && data.trigger != 'forward') {
            sessionStorage.setItem('link', data.trigger.dataset.barbaTrigger);
        }
        var tl = gsap.timeline();

        tl.to('.transition li', { duration: 1, scaleX: 1, transformOrigin: "left", stagger: .2 })
        tl.to('.transition li', { duration: 1, scaleX: 0, transformOrigin: "right", stagger: .2, delay: .2 })

        document.querySelector('.transition').classList.remove('loading_transition');
    }




    function delay(n) {
        n = n || 1600;
        return new Promise(done => {
            setTimeout(() => {
                done();
            }, n)
        });
    }


    barba.init({
        transitions: [{
            name: 'default-transition',
            async leave(data) {
                const done = this.async();
                pageTransition(data);
                await delay(1600);
                done();
            },
            async enter(data) {
                contentAnimation(data);
            },
            async once(data) {
                contentAnimation(data);
            }
        }]
    });
})


barba.hooks.afterOnce((data) => {
    var tl = gsap.timeline();


    if(data.next.namespace == 'index' || data.next.namespace == 'english') {

        document.querySelector('.transition').classList.add('loading_transition');
        document.querySelector('body').classList.add('body_scroll');
        setTimeout(function(){
            setTimeout(function () {
                document.querySelector('body').classList.add('page_show');
                document.querySelector('body').classList.remove('body_scroll');
            }, 1000)

            tl.to('.transition li', { duration: 1, scaleX: 0, transformOrigin: "right", stagger: .2, delay: .2 })
        }, 4000)
    } else {
        tl.to('.transition li', { duration: 1, scaleX: 0, transformOrigin: "right", stagger: .2, delay: .2 })

        document.querySelector('body').classList.add('page_show');
    }
})