// ==UserScript==
// @name         twittch videospeed display
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  display the videospeed
// @author       ichigatsu
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nyanco.me
// @grant        none
// @updateURL    https://github.com/manyu-a/tpm_script/raw/main/twch_vidspd.user.js
// ==/UserScript==

// https://www.twitch.tv/
// https://www.google.co.jp/


function SEL(){ return document.querySelector('[data-a-target="stream-title"]')}
function TAR(){ return document.querySelector('.vsc-controller').shadowRoot.querySelector("#controller > span.draggable").textContent}

// document.querySelector(TAR).shadowRoot.querySelector("#controller")
function waitForElement(selector, callback, intervalMs = 200, timeoutMs = 0) {
    const startTimeInMs = Date.now();
    findLoop();

    function findLoop() {
        if (selector() != null) {
            callback();
            return;
        } else {
            setTimeout(() => {
                if (timeoutMs && Date.now() - startTimeInMs > timeoutMs) return;
                findLoop();
            }, intervalMs);
        }
    }
}
//

function dis(){
	const sel_i = SEL();
	var test = document.createElement("p"); //新しい要素を"タグ名"で作成し、変数test に代入
	var str = document.createTextNode(TAR()); //テキストノードを追加し変数str に代入
	test.appendChild(str); //変数test にテキストノードを追加
	test.setAttribute('target','_blank'); //変数test に target="_blank" を設定
	test.classList.add("add-txt"); //変数test にクラス名"add-txt"を追加
	sel_i.appendChild(test); //#lga要素に変数test を追加
	const test2 = test.cloneNode(true);
	document.querySelector('[data-a-target="player-seekbar-current-time"]').after(test2);
}

function rewrite(){
	const sel_i = document.querySelectorAll(".add-txt");
	sel_i.forEach(e => (e.textContent = TAR()) );
}

(function() {
    'use strict';
	window.addEventListener('load', function(){
		waitForElement(SEL,() => {waitForElement(TAR, dis)} );
		document.addEventListener("keyup", event => {
		if (event.isComposing || event.keyCode === 229) {
			return;
		}
		// 何かを行う
			rewrite();
		});
	});
    // Your code here...
})();
