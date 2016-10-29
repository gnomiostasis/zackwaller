/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var globalx = 0;
var globaly = 0;
var totalpoints = 100;
$(function () {
    makeNewPointyLoop(0);
});
function makeNewPointyLoop(count)
{
    if (count < totalpoints)
    {
        count++;
        new PointerThingy({left: getRandomNum() + "%"});
        setTimeout(function(){
            makeNewPointyLoop(count)
        }, 100);
    }

}
function getRandomNum() {
    return Math.floor(Math.random() * 100);
}
function PointerThingy(configs)
{

    var self = this;
    self.div = null;
    function constructor() {
        createDiv();
        addEvents();
    }
    function createDiv()
    {
        self.div = $("<div>").addClass("pointything").css({
            "left": configs.left
        });
        $("body").append(self.div);
    }
    function addEvents()
    {
        trackCursor();
        updateCursorLoop();
        fallDown();
    }
    function updateCursorLoop()
    {
        self.pointCursor();
        setTimeout(updateCursorLoop, 100);
    }
    function trackCursor()
    {
        $(document).mousemove(function (e) {
            globalx = e.pageX;
            globaly = e.pageY;
//            self.pointCursor();
        });
    }
    self.pointCursor = function () {
        var position = self.div.position();
        var divx = position.left;
        var divy = position.top;
        var mousey = globaly;
        var mousex = globalx;

        /**/
        var width = divx - mousex;
        var height = divy - mousey;
        var hyp = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        var sintheta = Math.sin(height / hyp) * 100;
        var costheta = Math.sin(width / hyp) * 100;
        var theta = sintheta;
        if (costheta < 0)
        {
            sintheta = 180 + sintheta * -1;
        }

        self.div.css({"transform": "rotate(" + sintheta + "deg)"});
    }
    function fallDown() {
        self.div.animate({top: '105%'}, 10000, function () {
            self.div.css({top: "0px"});
            fallDown();
        });
    }
    constructor();
}