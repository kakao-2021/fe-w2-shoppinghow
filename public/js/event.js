/* 더보기 클릭 시 아이템 한줄 씩 추가하는 함수 */
let index = 0;
let jsonArr;
function addMoreContent() {
    const clickedElement = DOM('#expand').querySelector();
    clickedElement.addEventListener('click', () => {
        let expanded = DOM('#row-more').querySelector();
        fetch('http://localhost:80/best')
            .then(res => res.json())
            .then(json => json.slice(index, index + 5))
            .then(data => data.forEach(element => {
                addHTML(expanded, `
                        <ul id="grid-ul-2" class="grid-ul">
                        <li class="grid-banner">
                        <img class="banner-img" src=${element.src}>
                        <p class="title">${element.title}</p>
                        <p class="subtext">${element.text}</p>
                        <img class="theme-btn" src="/images/theme.png"></li>
                        </ul>
                `)
            }))
            .then(data => clickSaveStorage())
            .then(index += 5)
    });
}
addMoreContent();

/* 최근본 상품 탭 - 팝업 레이어 마우스 오버, 아웃 이벤트 함수 */
function showPopupLayer() {
    const recentBtn = DOM('#recent-btn').querySelector();
    recentBtn.addEventListener('mouseover', () => {
        let current = DOM('.inner-popup').querySelector();
        if (current.classList.contains("none"))
            current.classList.remove("none");
    });
}
function hidePopupLayer() {
    const recentBtn = DOM('#recent-btn').querySelector();
    recentBtn.addEventListener('mouseout', () => {
        let current = DOM('.inner-popup').querySelector();
        current.classList.add("none");
    });
}
showPopupLayer();
hidePopupLayer();


/* 배너 사진 클릭 시 로컬 스토리지에 담는 이벤트 함수 */
function clickSaveStorage() {
    const bannerImage = DOM('.banner-img').querySelectorAll();
    console.log(bannerImage);
    bannerImage.forEach(function (element) {
        element.addEventListener('click', function () {
            let imgsrc = this.getAttribute('src');
            console.log(imgsrc);
        });
    });
}