
let mob = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;


function menuToggleActive(page_name) {
    const menu_items = document.querySelectorAll('.menu a');
    const menu_item_active = document.querySelector('.menu_item_active');

    if (page_name != 'index' && page_name != 'about' && page_name != 'work' && page_name != 'contact') {
        menu_item_active.style.opacity = 0;
    } else {
        menu_items.forEach(element => {
            if (element.getAttribute('data-barba-trigger') == page_name) {
                let element_data = element.getBoundingClientRect();
                menu_item_active.style.width = element_data.width + 'px';
                menu_item_active.style.left = element_data.left + 'px';
                menu_item_active.style.opacity = 1;
            }
        });
    }
}

window.addEventListener('resize', function () {
    const page_name = document.querySelector('main').getAttribute('data-barba-namespace');
    menuToggleActive(page_name)
})


const logo = document.querySelector('.logo');
const root = document.querySelector(':root');

if (sessionStorage.getItem('mode') == 'true') {
    root.classList.add('dark_mode');
}

logo.addEventListener('click', function () {
    root.classList.toggle('dark_mode');
    let dark = (root.classList.contains('dark_mode')) ? true : false;
    sessionStorage.setItem('mode', dark);
})


document.addEventListener('scroll', function (e) {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const footer_container = document.querySelector('.footer_container');


    if (scrolled >= document.documentElement.clientHeight * 1.5) {
        footer_container.style.zIndex = 1;
    } else {
        footer_container.style.zIndex = -4;
    }
})


function homeShow() {
    let out = '';

    for (key in projects) {
        if (key <= 3) {
            out += '<div class="work_item">';
            out += '<a href="./project.html" data-barba-trigger="' + projects[key].name + '">';
            out += '<div class="text_wrap">' + projects[key].name + '</div>';
            out += '<div class="img_wrap"><img src="./content/images/work/' + projects[key].image + '" alt="' + projects[key].name + '"></div>';
            out += '</a>';
            out += '</div>';
        } else {
            break;
        }
    }
    document.querySelector('.work_container').innerHTML += out;





    document.querySelector('video').play();

    let text = document.getElementById('title_element');
    let word = text.getElementsByTagName('span');
    let i = 0;

    let text_timer = setInterval(function () {
        word[i].style.transform = 'translateY(-100%)';
        i = (i + 1) % word.length;
        word[i].style.transform = 'translateY(0px)';
    }, 1000);

    setTimeout(function () {
        clearInterval(text_timer);
    }, 4000);

}







function projectShow() {
    let project_out = '';
    let next_project = '';
    let name = sessionStorage.getItem('link');

    if (name == null) {
        project_out += '';
    }
    for (key in projects) {
        if (name == projects[key].name) {

            document.title = projects[key].name + ' - Bloo';

            let last = Number(Object.keys(projects).length - 1);
            let next = (+key == last) ? 0 : +key + 1;

            project_out += '<div class="img_block">';
            projects[key].images.forEach(element => {
                project_out += '<img src="./content/images/work/' + element + '">';
            });
            project_out += '</div>';
            project_out += '<div class="info_block">';
            project_out += '<span class="category_span">' + projects[key].category + '</span>';
            project_out += '<span class="date_span">' + projects[key].date + '</span>';
            project_out += '<h4>' + projects[key].name + '</h4>';
            project_out += '<p>' + projects[key].info + '</p>';
            project_out += '<a href="' + projects[key].link + '" target="_blank">посмотреть проект</a>';
            project_out += '</div>';

            next_project += '<h4>Следующий проект</h4>';
            next_project += '<div class="next_project">' + projects[next].name + '</div>';
        }
    }
    document.querySelector('.project_section').innerHTML = project_out;

    setTimeout(function () {
        document.querySelector('.next_page_btn').innerHTML = next_project;

        document.querySelector('.next_project').addEventListener('click', function () {
            sessionStorage.setItem('link', this.innerHTML);

            var tl = gsap.timeline();

            tl.to('.transition li', { duration: 1, scaleX: 1, transformOrigin: "left", stagger: .2 })
            tl.to('.transition li', { duration: 1, scaleX: 0, transformOrigin: "right", stagger: .1, delay: .2 })
            setTimeout(function () {
                window.scrollTo(0, 0);
                projectShow();
            }, 1500)
            setTimeout(function () {
                var tl = gsap.timeline();

                tl.to('.top p', { duration: 2, translateX: 0, opacity: 1 })
                tl.to('.bottom a', { duration: 2, translateX: 0, opacity: 1 })
            }, 2000);
        })
    }, 1000)
}










function workShow() {
    let categores_out = '';
    categores.forEach(element => {
        categores_out += '<span class="filter_elem">' + element + '</span>';
    });
    document.querySelector('.filter').innerHTML = categores_out;

    let project_out = '';

    for (key in projects) {
        project_out += '<a href="./project.html" data-barba-trigger="' + projects[key].name + '" class="project">';
        project_out += '<div class="project_img"><img src="./content/images/work/' + projects[key].image + '" alt="' + projects[key].name + '"></div>';
        project_out += '<div class="project_info">';
        project_out += '<h4>' + projects[key].name + '</h4>';
        project_out += '</div>';
        project_out += '</a>';
    }
    document.querySelector('.projects').innerHTML = project_out;



    let project = document.querySelectorAll('.project');
    let filter_elem = document.querySelectorAll('.filter_elem');

    document.querySelector('.filter').addEventListener('click', function (e) {
        if (e.target.classList.contains('filter_elem')) {
            for (key in projects) {
                project[key].classList.add('hide_project');

                if (projects[key].category == e.target.innerHTML) {
                    project[key].classList.remove('hide_project');
                }
            }
            filter_elem.forEach(element => {
                element.classList.remove('filter_elem_active')
            });
            e.target.classList.add('filter_elem_active');
        }
    })


    document.addEventListener('click', function (e) {
        if (!(e.target.classList.contains('filter_elem'))) {
            filter_elem.forEach(element => {
                element.classList.remove('filter_elem_active')
            });
            for (key in projects) {
                project[key].classList.remove('hide_project');
            }
        }
    })
}









function aboutShow() {
    let out_team = '';

    for (key in team) {
        out_team += '<div class="person">';
        out_team += '<img src="./content/images/team/' + team[key].img + '" alt="' + team[key].name + '">';
        out_team += '<h4>' + team[key].name + '</h4>';
        out_team += '<p>' + team[key].role + '</p>';
        out_team += "</div>";
    }
    document.querySelector('.person_container').innerHTML = out_team;

    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active_accordion");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }


    let out_vacancy = '';
    for (key in vacancy) {
        out_vacancy += '<a href="./vacancy.html" class="vacancy_item" data-barba-trigger="' + vacancy[key].name + '">';
        out_vacancy += '<p>' + vacancy[key].name + '</p>';
        out_vacancy += '</a>';
    }
    document.querySelector('.vacancy_container').innerHTML = out_vacancy;
}

function vacancyShow() {
    let name = sessionStorage.getItem('link');
    let vacancy_out = '';

    if (name == null)
        name = vacancy[0].name;
    for (key in vacancy) {
        if (name == vacancy[key].name) {
            vacancy_out += '<h2>' + vacancy[key].name + '</h2>'

            for (let i = 0; i < vacancy[key].info.length; i++) {
                vacancy_out += '<div class="vacancy_box">';
                vacancy_out += '<h4>' + vacancy[key].info[i][0] + '</h4>';
                vacancy_out += '<ul>';
                for (let j = 0; j < vacancy[key].info[i][1].length; j++) {
                    vacancy_out += '<li>' + vacancy[key].info[i][1][j] + '</li>';
                }
                vacancy_out += '</ul>';
                vacancy_out += '</div>'
            }
        }
    }

    document.querySelector('.vacancy_wrap').innerHTML = vacancy_out;
}





















function englishShow() {
    menuToggleActive('index');

    let linkNav = document.querySelectorAll('[href^="#"]'),
        V = 0.222;
    for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function (e) {
            e.preventDefault();
            let w = window.pageYOffset,
                hash = this.href.replace(/[^#]*(.*)/, '$1');
            t = document.querySelector(hash).getBoundingClientRect().top,
                start = null;
            requestAnimationFrame(step);

            function step(time) {
                if (start === null) start = time;
                let progress = time - start,
                    r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
                window.scrollTo(0, r);
                if (r != w + t) {
                    requestAnimationFrame(step)
                } else {
                    location.hash = hash
                }
            }
        }, false);
    }


    const highlightScroll = () => {
        const scrollPos = window.pageYOffset + 100
        const links = document.querySelectorAll('.menu_items a')

        links.forEach((link, index) => {
            const sections = document.querySelectorAll('.init_section')
            const activeSection = sections[index]
            const compare = activeSection.offsetTop <= scrollPos && (activeSection.offsetTop + activeSection.offsetHeight > scrollPos)

            if (scrollPos > 100) {
                if (compare) {
                    menuToggleActive(link.getAttribute('data-barba-trigger'))
                }
            }

        })
    }
    window.addEventListener('scroll', highlightScroll)






    document.querySelector('video').play();


    let text = document.getElementById('title_element');
    let word = text.getElementsByTagName('span');
    let x = 0;

    let text_timer = setInterval(function () {
        word[x].style.transform = 'translateY(-100%)';
        x = (x + 1) % word.length;
        word[x].style.transform = 'translateY(0px)';
    }, 1000);

    setTimeout(function () {
        clearInterval(text_timer);
    }, 4000);






    let categores_out = '';
    categores.forEach(element => {
        let inner = '';

        if (element == 'бренд') {
            inner = 'brand'
        } else if (element == 'приложение') {
            inner = 'apps';
        } else if (element == 'дизайн') {
            inner = 'design';
        } else if (element == 'cайт') {
            inner = 'site';
        }

        categores_out += '<span class="filter_elem" data-name="'+ element +'">' + inner + '</span>';
    });
    document.querySelector('.filter').innerHTML = categores_out;

    let project_out = '';

    for (key in projects) {
        project_out += '<a href="' + projects[key].link + '" target="_blank" class="project">';
        project_out += '<div class="project_img"><img src="./content/images/work/' + projects[key].image + '" alt="' + projects[key].name + '"></div>';
        project_out += '<div class="project_info">';
        project_out += '<h4>' + projects[key].name + '</h4>';
        project_out += '</div>';
        project_out += '</a>';
    }
    document.querySelector('.projects').innerHTML = project_out;



    let project = document.querySelectorAll('.project');
    let filter_elem = document.querySelectorAll('.filter_elem');

    document.querySelector('.filter').addEventListener('click', function (e) {
        if (e.target.classList.contains('filter_elem')) {
            for (key in projects) {
                project[key].classList.add('hide_project');

                if (projects[key].category == e.target.getAttribute('data-name')) {
                    project[key].classList.remove('hide_project');
                }
            }
            filter_elem.forEach(element => {
                element.classList.remove('filter_elem_active')
            });
            e.target.classList.add('filter_elem_active');
        }
    })


    document.addEventListener('click', function (e) {
        if (!(e.target.classList.contains('filter_elem'))) {
            filter_elem.forEach(element => {
                element.classList.remove('filter_elem_active')
            });
            for (key in projects) {
                project[key].classList.remove('hide_project');
            }
        }
    })

}
