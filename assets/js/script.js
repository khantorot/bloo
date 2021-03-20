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

document.addEventListener('scroll', function (e) {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const page_name = document.querySelector('main').getAttribute('data-barba-namespace');
    const footer_container = document.querySelector('.footer_container');
    
    
    if (page_name == 'index' || page_name == 'english') {
        if (scrolled >= document.documentElement.clientHeight * 2) {
            footer_container.style.zIndex = 1;  
            document.querySelector('video').style.filter = 'grayscale(1) opacity(0.4)';
        } else {
            footer_container.style.zIndex = -4;
            document.querySelector('video').style.filter = 'grayscale(0) opacity(1)'
        }
    } else {
        if (scrolled >= document.documentElement.clientHeight) {
            footer_container.style.zIndex = 1;  
        } else {
            footer_container.style.zIndex = -4;
        }
    }
})


const logo = document.querySelector('.logo');
const body = document.querySelector('body');

if (localStorage.getItem('mode') == 'true') {
    body.classList.add('dark_mode');
}

logo.addEventListener('click', function(){
    body.classList.toggle('dark_mode');
    let dark = (body.classList.contains('dark_mode')) ? true : false;
    localStorage.setItem('mode', dark);
})






function homeShow() {
    const slider = new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        dragVelocity: 2,
        draggable: 1,
        responsive: [
            {
              breakpoint: 900,
              settings: {

                slidesToShow: 2.5,
              }
            }
          ]
    })

    document.querySelector('.glider').addEventListener('scroll', function (e) {
        const glider_box = document.querySelector('.glider_box');
        const glider_info = document.querySelector('.glider_info');

        if (glider_box.classList.contains('visible')) {
            glider_info.style.opacity = 1;
            glider_info.style.zIndex = 1;
        } else if (glider_box.classList.contains('left-1')) {
            glider_info.style.zIndex = -1;
            glider_info.style.opacity = 0.3;
        } else {
            glider_info.style.opacity = 0;
            glider_info.style.zIndex = -1;
        }
    })

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
    }, 5000)
}


let categores = ["брендинг", "вебсайт", "приложения", "ecommerce", "искусство"];

let projects = {
    0: {
        "name": "Innovation",
        "category": "брендинг",
        "info": "Some text about this project, like lorem",
        "date": "03.12.2002",
        "image": "work1.jpg",
        "images": ["work1.jpg", "work2.jpg", "work3.jpg", "work4.jpg", "work5.jpg"],
        "link": "https://khantorot.github.io/innovation/"
    },
    1: {
        "name": "Starpi",
        "category": "вебсайт",
        "info": "Some text about this project, like lorem",
        "date": "03.12.2002",
        "image": "work2.jpg",
        "images": ["work5.jpg", "work1.jpg", "work2.jpg", "work3.jpg", "work4.jpg" ],
        "link": "https://khantorot.github.io/stapi/"
    },
    2: {
        "name": "Sabina",
        "category": "приложения",
        "info": "Some text about this project, like lorem",
        "date": "03.12.2002",
        "image": "work3.jpg",
        "images": ["work1.jpg", "work2.jpg", "work3.jpg", "work4.jpg", "work5.jpg"],
        "link": "https://khantorot.github.io/sabina/"
    },
    3: {
        "name": "Ecommerce",
        "category": "ecommerce",
        "info": "Some text about this project, like lorem",
        "date": "03.12.2002",
        "image": "work4.jpg",
        "images": ["work1.jpg", "work2.jpg", "work3.jpg", "work4.jpg", "work5.jpg"],
        "link": "https://khantorot.github.io/ecommerce/"
    },
    4: {
        "name": "Room",
        "category": "искусство",
        "info": "Some text about this project, like lorem",
        "date": "03.12.2002",
        "image": "work5.jpg",
        "images": ["work1.jpg", "work2.jpg", "work3.jpg", "work4.jpg", "work5.jpg"],
        "link": "https://khantorot.github.io/room/"
    }
}


function projectShow() {
    let project_out = '';
    let next_project = '';
    let name = localStorage.getItem('link');

    if (name == null) {
        project_out += 'error';
    }
    for (key in projects) {
        if (name == projects[key].name) {
            let last = Number(Object.keys(projects).length - 1);
            let next = (+key == last) ? 0 : +key + 1;

            project_out += '<div class="img_block">';
            projects[key].images.forEach(element => {
                project_out += '<img src="./content/images/' + element + '">';
            });
            project_out += '</div>';
            project_out += '<div class="info_block">';
            project_out += '<h4>' + projects[key].name + '</h4>';
            project_out += '<span class="category_span">' + projects[key].category + '</span>';
            project_out += '<span class="date_span">' + projects[key].date + '</span>';
            project_out += '<p>' + projects[key].info + '</p>';
            project_out += '<a href="' + projects[key].link + '" target="_blank">посмотреть проект</a>';
            project_out += '</div>';

            next_project += '<h4>See more</h4>';
            next_project += '<div class="next_project">' + projects[next].name + '</div>';
        }
    }
    document.querySelector('.project_section').innerHTML = project_out;

    setTimeout(function () {
        document.querySelector('.next_page_btn').innerHTML = next_project;

        document.querySelector('.next_project').addEventListener('click', function () {
            localStorage.setItem('link', this.innerHTML);
            document.querySelector('.transition').classList.remove('transition_hide');
            setTimeout(function () {
                window.scrollTo(0, 0);
                projectShow();
            }, 1000)
            setTimeout(function () {
                document.querySelector('.transition').classList.add('transition_hide')
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
        project_out += '<div class="project_img"><img src="./content/images/' + projects[key].image + '" alt="' + projects[key].name + '"></div>';
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










let vacancy = {
    0: {
        "name": "Vue Frontend Developer",
        "info": [
            [
                "What to do and be able to?",
                [
                    "Develop sites and services in Vue",
                    "Support existing projects of the company",
                    "Experience in developing complex systems and server code and working with databases",
                    "Good knowledge of state management (ngrx) and excellent understanding of rxjs"
                ]
            ],
            [
                "Technology",
                [
                    "Typescript",
                    "Vue",
                    "Redux",
                    "Universal",
                    "Universal",
                    "Ionic",
                    "In the future, subprojects on Electron"
                ]
            ],
            [
                "The plus will be+",
                [
                    "Experience in architecture design",
                    "Ability to optimize performance",
                    "Public speaking experience",
                    "Training and management of junior developers",
                    "Code support (review, refactoring, analysis, bug fix)"
                ]
            ],
            [
                "Terms",
                [
                    "Red October office",
                    "Working day from 11 to 20",
                    "Large and interesting projects",
                    "Young team and great parties"
                ]
            ],
            [
                "Wage",
                [
                    "Based on the results of the interview, depending on the level and experience of the candidate",
                ]
            ],
        ]
    },
    1: {
        "name": "Digital Designer",
        "info": [
            [
                "What to do and be able to?",
                [
                    "Develop sites and services in Vue",
                    "Support existing projects of the company",
                    "Experience in developing complex systems and server code and working with databases",
                    "Good knowledge of state management (ngrx) and excellent understanding of rxjs"
                ]
            ],
            [
                "Technology",
                [
                    "Typescript",
                    "Vue",
                    "Redux",
                    "Universal",
                    "Universal",
                    "Ionic",
                    "In the future, subprojects on Electron"
                ]
            ],
            [
                "The plus will be+",
                [
                    "Experience in architecture design",
                    "Ability to optimize performance",
                    "Public speaking experience",
                    "Training and management of junior developers",
                    "Code support (review, refactoring, analysis, bug fix)"
                ]
            ],
            [
                "Terms",
                [
                    "Red October office",
                    "Working day from 11 to 20",
                    "Large and interesting projects",
                    "Young team and great parties"
                ],
            ],
            [
                "Wage",
                [
                    "1000$ - 3000$",
                ]
            ],
        ]
    },
    3: {
        "name": "Product Manager",
        "info": [
            [
                "What to do and be able to?",
                [
                    "Develop sites and services in Vue",
                    "Support existing projects of the company",
                    "Experience in developing complex systems and server code and working with databases",
                    "Good knowledge of state management (ngrx) and excellent understanding of rxjs"
                ]
            ],
            [
                "Technology",
                [
                    "Typescript",
                    "Vue",
                    "Redux",
                    "Universal",
                    "Universal",
                    "Ionic",
                    "In the future, subprojects on Electron"
                ]
            ],
            [
                "The plus will be+",
                [
                    "Experience in architecture design",
                    "Ability to optimize performance",
                    "Public speaking experience",
                    "Training and management of junior developers",
                    "Code support (review, refactoring, analysis, bug fix)"
                ]
            ],
            [
                "Terms",
                [
                    "Red October office",
                    "Working day from 11 to 20",
                    "Large and interesting projects",
                    "Young team and great parties"
                ]
            ],
            [
                "Wage",
                [
                    "Based on the results of the interview, depending on the level and experience of the candidate",
                ]
            ],
        ]
    }
}




let team = {
    0: {
        "name": "Дайки Аомине",
        "role": "Синий",
        "img": "team.jpg",
    },
    1: {
        "name": "Рета Кисе",
        "role": "Жёлтый",
        "img": "team1.jpg",
    },
    2: {
        "name": "Шинтаро Мидорима",
        "role": "Зелёный",
        "img": "team2.jpg",
    },
    3: {
        "name": "Ацуши Мурасакибара",
        "role": "Фиолетовый",
        "img": "team3.jpg",
    },
    4: {
        "name": "Сейджуро Акаши",
        "role": "Красный",
        "img": "team4.jpg",
    },
    5: {
        "name": "Сацуки Момои",
        "role": "Розовый",
        "img": "team5.jpg",
    },
    6: {
        "name": "Хан Соло",
        "role": "Черный) ",
        "img": "team7.jpg",
    },
    7: {
        "name": "это ты?",
        "role": "Белый",
        "img": "team6.jpg",
    },
}




function aboutShow() {
    let out_team = '';

    for (key in team) {
        out_team += '<div class="person">';
        out_team += '<div class="img_wrap"><img src="./content/images/'+ team[key].img +'" alt="'+ team[key].name +'"></div>';
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
        out_vacancy += '<div class="arrow"><span></span></div></a>';
    }
    document.querySelector('.vacancy_container').innerHTML = out_vacancy;
}

function vacancyShow() {
    let name = localStorage.getItem('link');
    let vacancy_out = '';

    if (name == null)
        vacancy_out = '<h3>Ты нам нужен!</h3>';
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

    const slider = new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        dragVelocity: 2,
        draggable: 1,
        responsive: [
            {
              breakpoint: 900,
              settings: {

                slidesToShow: 2.5,
              }
            }
          ]
    })

    document.querySelector('.glider').addEventListener('scroll', function (e) {
        const glider_box = document.querySelector('.glider_box');
        const glider_info = document.querySelector('.glider_info');

        if (glider_box.classList.contains('visible')) {
            glider_info.style.opacity = 1;
            glider_info.style.zIndex = 1;
        } else if (glider_box.classList.contains('left-1')) {
            glider_info.style.zIndex = -1;
            glider_info.style.opacity = 0.3;
        } else {
            glider_info.style.opacity = 0;
            glider_info.style.zIndex = -1;
        }
    })

    document.querySelector('video').play();

    let text = document.getElementById('title_element');
    let word = text.getElementsByTagName('span');
    let s = 0;

    let text_timer = setInterval(function () {
        word[s].style.transform = 'translateY(-100%)';
        s = (s + 1) % word.length;
        word[s].style.transform = 'translateY(0px)';
    }, 1000);

    setTimeout(function () {
        clearInterval(text_timer);
    }, 5000);



    let acc = document.getElementsByClassName("accordion");
    let a;

    for (a = 0; a < acc.length; a++) {
        acc[a].addEventListener("click", function () {
            this.classList.toggle("active_accordion");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    let out_team = '';

    for (key in team) {
        out_team += '<div class="person">';
        out_team += '<div class="img_wrap"><img src="./content/images/'+ team[key].img +'" alt="'+ team[key].name +'"></div>';
        out_team += '<h4>' + team[key].name + '</h4>';
        out_team += '<p>' + team[key].role + '</p>';
        out_team += "</div>";
    }
    document.querySelector('.person_container').innerHTML = out_team;

    
}
