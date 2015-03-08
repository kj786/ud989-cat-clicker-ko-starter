/*global ko, ViewModel, console:false */
/*jshint quotmark: false */
"use strict";
var initialCats = [
    {
        'imgSrc': "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
        'name': "Cat0",
        'nickNames': ["fluffy0", "sleepy0", "cloony0", "gooney0"],
        'imgAttribution': "flickr0",
        'clickCount': 0
    },
    {
        'imgSrc': "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
        'name': "Cat1",
        'nickNames': ["fluffy1", "sleepy1", "cloony1", "gooney1"],
        'imgAttribution': "flickr1",
        'clickCount': 0
    },
    {
        'imgSrc': "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
        'name': "Cat2",
        'nickNames': ["fluffy2", "sleepy2", "cloony2", "gooney2"],
        'imgAttribution': "flickr2",
        'clickCount': 0
    },
    {
        'imgSrc': "http://jasonlefkowitz.net/wp-content/uploads/2013/07/Cute-Cats-cats-33440930-1280-800.jpg",
        'name': "Cat3",
        'nickNames': ["fluffy3", "sleepy3", "cloony3", "gooney3"],
        'imgAttribution': "flickr3",
        'clickCount': 0
    },
    {
        'imgSrc': "https://secure.static.tumblr.com/4b03ac38e2c61852a24802a7c8fe47fd/y7g6izb/3Vtmwx7p6/tumblr_static_kittens-wallpaper-cats-animals_00429319.jpg",
        'name': "Cat4",
        'nickNames': ["fluffy4", "sleepy4", "cloony4", "gooney4"],
        'imgAttribution': "flickr4",
        'clickCount': 0
    }
];

var Cat = function(data){
    this.levels = {
        level: 0,
        list: [
            {status: "newborn",
             clicks: 0},
            {status: "infant",
             clicks: 10},
            {status: "child",
             clicks: 20},
            {status: "teen",
             clicks: 30},
            {status: "adolescent",
             clicks: 40},
            {status: "adult",
             clicks: 50},
            {status: "grand",
             clicks: 60},
            {status: "great grand",
             clicks: 70}
        ]
    };

    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.nickNames = ko.observableArray(data.nickNames);

    this.level = ko.computed(function(){
        var level = this.levels.level;
        if (this.clickCount() === this.levels.list[level].clicks) {
            if (level < this.levels.list.length - 1) {
                this.levels.level++;
            }
        }
        return this.levels.list[level].status;
    }, this);

    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
};

var ViewModel = function(){
    var self = this;
    this.catList = ko.observableArray([]);
    initialCats.forEach(function(catItem){
        self.catList.push(new Cat(catItem));
    });
    this.currentCat = ko.observable(this.catList()[0]);

    this.incrementCounter = function() {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    this.selectCat = function(selectedCat){
        self.currentCat(selectedCat);
    };
};

ko.applyBindings(new ViewModel());
