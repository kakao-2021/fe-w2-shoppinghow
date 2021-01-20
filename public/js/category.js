import { DOMSearchAPI } from "./DOM_search_api.js";

const transJsonToString = function (data) {
    const ret = {};
    function bfs(root) {
        const q = [];
        q.push([root, 0]);
        while(q.length) {
            const front = q.shift();
            const node = front[0];
            const h = front[1];

            if(!node.data) continue;
            const res = node.data.reduce((acc, cur) => {
                if(cur.data) q.push([cur, h + 1]);
                return [...acc, cur.title];
            }, []);

            if(ret[h]) ret[h].push(res);
            else ret[h] = [res];
        }
    }
    bfs(data);
    console.log(ret);
    return ret;
}
// string to html
const func = function(data) {
    const tpl = {
        // 0: large, 1: medium, 2: small
        0(title, ...idxs) { return `<div name="${idxs.join("-")}" class="category--large__item">${title}</div>`; },
        1(title, ...idxs) { return `<div name="${idxs.join("-")}" class="category--medium__item">${title}</div>`; },
        2(title, ...idxs) { return `<div name="${idxs.join("-")}" class="category--small__item">${title}</div>`; }
    };
    const ret = {};    
}
const transStringToHTML = function (data) {
    const ret = {
        large: `<div class="category--large--picked">`,
        medium: [],
        small: []
    };

    data.large.forEach((largeItem, i) => {
        ret.large += `<div name="${i}"class="category--large__item">${largeItem}</div>`;
        let mediumHTML = `<div name="${i}" class="category--medium">`
        ret.small.push([]);
        data.medium[i].forEach((mediumItem, j) => {
            mediumHTML += `<div name="${i}-${j}" class="category--medium__item">${mediumItem}</div>`;
            let smallHTML = `<div name="${i}-${j}" class="category--small">`;
            data.small[i][j].forEach((smallItem, k) => {
                smallHTML += `<div name="${i}-${j}-${k}" class="category--small__item">${smallItem}</div>`;
            })
            smallHTML += "</div>";
            ret.small[i].push(smallHTML);
        })
        mediumHTML += "</div>";
        ret.medium.push(mediumHTML);
    });
    ret.large += "</div>";
    return ret;
}

const transHTMLToDOM = function (data) {
    // 카테고리 전체 창 요소
    const box = document.createElement("div");
    box.setAttribute("class", "category--box horizontal d-off");

    // box 하위에 html 코드 삽입
    let html = data.large;
    html += data.medium.reduce((acc, cur) => acc + cur, "");
    data.small.forEach((arr) => {
        html += arr.reduce((acc, cur) => acc + cur, "");
    });
    box.innerHTML = html;

    return box;
}

const setCategoryElement = function (data) {
    const categoryInfo = {
        boxDOM: data,

        mediumDOMs: new Map(),
        smallDOMs: new Map(),

        largeItemDOMs: new Map(),
        mediumItemDOMs: new Map(),
        smallItemDOMs: new Map(),

        number: [0, 0, 0]
    }

    // box를 root로 탐색한다. 
    const dom = new DOMSearchAPI(data);
    const mediumDOMs = dom.querySelectorAll(".category--medium");
    const smallDOMs = dom.querySelectorAll(".category--small");

    const largeItemDOMs = dom.querySelectorAll(".category--large__item");
    const mediumItemDOMs = dom.querySelectorAll(".category--medium__item");
    const smallItemDOMs = dom.querySelectorAll(".category--small__item");

    // categoryInfo 객체의 map에 저장
    for (let mediumDOM of mediumDOMs) categoryInfo.mediumDOMs.set(mediumDOM.getAttribute("name"), mediumDOM);
    for (let smallDOM of smallDOMs) categoryInfo.smallDOMs.set(smallDOM.getAttribute("name"), smallDOM);

    for (let largeItemDOM of largeItemDOMs) categoryInfo.largeItemDOMs.set(largeItemDOM.getAttribute("name"), largeItemDOM);
    for (let mediumItemDOM of mediumItemDOMs) categoryInfo.mediumItemDOMs.set(mediumItemDOM.getAttribute("name"), mediumItemDOM);
    for (let smallItemDOM of smallItemDOMs) categoryInfo.smallItemDOMs.set(smallItemDOM.getAttribute("name"), smallItemDOM);

    // 초기화
    categoryInfo.mediumDOMs.get("0").className = "category--medium--picked";
    categoryInfo.smallDOMs.get("0-0").className = "category--small--picked";
    
    categoryInfo.largeItemDOMs.get("0").className = "category--large__item--picked";
    categoryInfo.mediumItemDOMs.get("0-0").className = "category--medium__item--picked";


    return categoryInfo;
}

const addEventHandler = function (categoryInfo) {
    categoryInfo.refresh = function (number) {
        const ijk = number.split("-");
        switch (ijk.length) {
            case 1: // large item
                categoryInfo.mediumItemDOMs.get(categoryInfo.number.slice(0, 2).join("-")).className = "category--medium__item";
                categoryInfo.smallItemDOMs.get(categoryInfo.number.join("-")).className = "category--small__item";

                categoryInfo.mediumDOMs.get(categoryInfo.number.slice(0, 1).join("-")).className = "category--medium";
                categoryInfo.smallDOMs.get(categoryInfo.number.slice(0, 2).join("-")).className = "category--small";

                categoryInfo.largeItemDOMs.get(categoryInfo.number.slice(0, 1).join("")).className = "category--large__item";
                categoryInfo.largeItemDOMs.get(number).className = "category--large__item--picked";

                categoryInfo.number = [number, 0, 0];
                categoryInfo.mediumDOMs.get(categoryInfo.number.slice(0, 1).join("-")).className = "category--medium--picked";
                categoryInfo.smallDOMs.get(categoryInfo.number.slice(0, 2).join("-")).className = "category--small--picked";
                categoryInfo.mediumItemDOMs.get(categoryInfo.number.slice(0, 2).join("-")).className = "category--medium__item--picked";
                break;
            case 2: // medium item
                categoryInfo.smallDOMs.get(categoryInfo.number.slice(0, 2).join("-")).className = "category--small";
                categoryInfo.smallDOMs.get(number).className = "category--small--picked";

                categoryInfo.mediumItemDOMs.get(categoryInfo.number.slice(0, 2).join("-")).className = "category--medium__item";
                categoryInfo.mediumItemDOMs.get(number).className = "category--medium__item--picked";

                categoryInfo.smallItemDOMs.get(categoryInfo.number.join("-")).className = "category--small__item";

                categoryInfo.number = [...number.split("-"), 0];
                break;
            case 3:
                categoryInfo.smallItemDOMs.get(categoryInfo.number.join("-")).className = "category--small__item";
                categoryInfo.smallItemDOMs.get(number).className = "category--small__item--picked";
                
                categoryInfo.number = [...number.split("-")];
                break;
        }
    }
    categoryInfo.boxDOM.addEventListener("mouseover", (e) => {
        const target = e.target; // 캐싱
        const number = target.getAttribute("name");
        if(number) {
            categoryInfo.refresh(number);
        }
    });

    return categoryInfo;
}

const pipe = (...funcs) => data => {
    return funcs.reduce((acc, func) => {
        return func(acc);
    }, data);
};

export const initCategory = function (data) {
    return pipe(
        transJsonToString,
        func,
        transHTMLToDOM,
        setCategoryElement,
        addEventHandler,
    )(data);
};