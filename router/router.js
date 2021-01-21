module.exports = function(app, fs) {
    let carouselData;
    let bestData; 
    let hotData;
    let basicData;
    let categoryData;
    let wordData;

    fs.readFile(__dirname + "/../data/carousel_promotion.json", "utf8", function(err, data) {
        carouselData = data;
    });
    fs.readFile(__dirname + "/../data/best_promotion.json", "utf8", function(err, data) {
        bestData = data;
    });
    fs.readFile(__dirname + "/../data/hot.json", "utf8", function(err, data) {
        hotData = data;
    });
    fs.readFile(__dirname + "/../data/basic.json", "utf8", function(err, data) {
        basicData = data;
    });
    fs.readFile(__dirname + "/../data/category.json", "utf8", function(err, data) {
        categoryData = data;
    });
    fs.readFile(__dirname + "/../data/word.json", "utf8", function(err, data) {
        wordData = data;
    });
    /* app.get("/", function(req, res) {
        res.render("index.html");
    }); */
    
    app.get("/hot", (req, res) => {
        res.end(hotData);
    });
    app.get("/carousel", (req, res) => {
        res.end(carouselData);
    });
    app.get("/best", (req, res) => {
        res.end(bestData);
    });
    app.get("/basic", (req, res) => {
        const idx = +req.query.idx;
        const cnt = +req.query.cnt;
        
        const items = JSON.parse(basicData).items;
        const basic = {
            items: []
        }
        basic.items = items.slice(idx, idx + cnt);
        res.end(JSON.stringify(basic));
    });
    app.get("/category", (req, res) => {
        res.end(categoryData);
    });
    app.get("/word", (req, res) => {
        const keyword = req.query.keyword;
        
    });
}