const URL = "http://localhost:3000";
let basicItemCnt = 10;

// carousel, best, hot items
function getItems(type) {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/${type}`).then((response) => {
            resolve(response.json());
        });
    });
}

// basic items
const getBasicItems = (idx, cnt) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/basic?idx=${idx}&cnt=${cnt}`).then((response) => {
            resolve(response.json());
        });
    });
}

const initPage = () => {
    const containerDOM = document.querySelector(".container");
    const containerBasicItemDOM = document.querySelector(".container--basic-item");
    containerDOM.appendChild(margin(20));

    Promise.all([
        getItems("carousel"),
        getItems("best"),
        getItems("hot"),
        getBasicItems(0, 10)
    ]).then(data => {
        const carousels = data[0].items;
        const bests = data[1].items;
        const hots = data[2].items;
        const basics = data[3].items;
        
        // best, carousel box
        containerDOM.appendChild(promotionBox(carousel(), bestItem()));
        const c = new Carousel(containerDOM.lastChild.firstChild, carousels);
        c.init();
        c.render();
        containerDOM.appendChild(box(hots.slice(0, 5)));
        
        // carousel test
        

        // default 10개 표시
        containerBasicItemDOM.appendChild(subject("모든 상품 품절주의!"));
        containerBasicItemDOM.appendChild(box(basics.slice(0, 5)));
        containerBasicItemDOM.appendChild(box(basics.slice(5, 10)));
        
        const moreBtn = more();
        document.querySelector(".container--more").appendChild(moreBtn);
        moreBtn.addEventListener("click", () => {
            getBasicItems(basicItemCnt, 5).then(data => containerBasicItemDOM.appendChild(box(data.items)));
            basicItemCnt += 5;
        });
    });
}

window.addEventListener("DOMContentLoaded", initPage);