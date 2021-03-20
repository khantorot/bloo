window.addEventListener('load', function () {

    setTimeout(function(){
        document.querySelector('.menu').classList.add('menu_show');
    }, 1800)

    function contentAnimation(data) {
        let page_name = data.next.namespace;

        // console.log('contentAnimation');
        // console.log('page name - ' + page_name);
        // console.log(data)
        menuToggleActive(page_name);
        window.scrollTo(0, 0);

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


        document.querySelector('.transition').classList.add('transition_hide');
        
        
    }

    function pageTransition(data) {
        if ( data.trigger != 'back' && data.trigger != 'popstate' && data.trigger != 'forward'){
            localStorage.setItem('link', data.trigger.dataset.barbaTrigger);
        }
        document.querySelector('.transition').classList.remove('transition_hide');
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

    console.log('Hello @diana_korkunova');
})
