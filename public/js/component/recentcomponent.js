import {myDomApi} from "../util/mydomapi.js"

const recentBtn = myDomApi.myQuerySelector("button.category-recent");
const popupLayer = myDomApi.myQuerySelector("div.recent-container");

const displayRecentContainer = () => popupLayer.className = "recent-container display";
const nonDisplayRecentContainer = () => popupLayer.className = "recent-container non-display";

recentBtn.addEventListener("mouseover", displayRecentContainer);
popupLayer.addEventListener("mouseover", displayRecentContainer);
recentBtn.addEventListener("mouseout", nonDisplayRecentContainer);
popupLayer.addEventListener("mouseout", nonDisplayRecentContainer);

const createRecentContainer = () => {
  let recentContainer = myDomApi.myQuerySelector("div.img-container");
  let shoppingList = JSON.parse(localStorage.getItem("shopping"));
  if(shoppingList !== null) {
    let imgList = Object.keys(shoppingList);
    for(let idx=0; idx<Math.min(9, imgList.length); idx++){
      recentContainer.innerHTML += `<img class="recent-img" src="${imgList[idx]}"></img>`
    }
  } 
}

export {createRecentContainer}