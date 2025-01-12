"use strict";

$.ajaxSettings.async = false;
const jsonNameList = ["cornerNumberToChichu", "cornerChichuToNumber", "cornerAlgToStandard", "cornerAlgToInfo", "cornerAlgToNightmare", "cornerAlgToInfoYuanzi", "cornerAlgToInfoManmade", "cornerAlgToYuanzi", "cornerAlgToInfoBalance", "cornerAlgToBalance", "cornerPosToCode", "cornerCodeToPos", "sourceToUrl"];
const jsonLoaded = jsonNameList.map((name) => $.getJSON(`assets/json/${name}.json`, (json) => {
    window[`${name}`] = json;
}));

function algSearch() {
    let idValueOrigin = document.getElementById("cornerinput").value;
    if (typeof idValueOrigin === "undefined") {
        return;
    }
    idValueOrigin = idValueOrigin.toUpperCase();
    const id = [idValueOrigin[0], idValueOrigin[1], idValueOrigin[2]];
    let codecookie = "DEGCGAAJWIXKOOMREDCXTQLMKHIRZZPSBBLSQNJYHFFYWTNP";
    if (getCookie("code") !== "") {
        codecookie = getCookie("code");
    }
    for (const i in cornerChichuToNumber) {
        for (let j = 0; j <= 2; j++) {
            if (codecookie[cornerChichuToNumber[i]] === idValueOrigin[j]) {
                id[j] = i;
            }
        }
    }
    document.getElementById("cornerinput1").value = cornerCodeToPos[id[0]];
    document.getElementById("cornerinput2").value = cornerCodeToPos[id[1]];
    document.getElementById("cornerinput3").value = cornerCodeToPos[id[2]];
    const idValue = cornerAlgToStandard[`${id[0]}${id[1]}${id[2]}`];
    const div1 = document.getElementById("div1");
    if (cornerAlgToInfo.hasOwnProperty(idValue)) {
        let cornerAlgToInfoStyle = {};
        let cornerAlgToStyle = {};
        if (document.getElementById("cornerstyle").value === "nightmare") {
            cornerAlgToInfoStyle = cornerAlgToInfo;
            cornerAlgToStyle = cornerAlgToNightmare;
        }
        if (document.getElementById("cornerstyle").value === "yuanzi") {
            cornerAlgToInfoStyle = cornerAlgToInfoYuanzi;
            cornerAlgToStyle = cornerAlgToYuanzi;
        }
        if (document.getElementById("cornerstyle").value === "balance") {
            cornerAlgToInfoStyle = cornerAlgToInfoBalance;
            cornerAlgToStyle = cornerAlgToBalance;
        }
        if (document.getElementById("cornerstyle").value === "manmade") {
            cornerAlgToInfoStyle = cornerAlgToInfoManmade;
        }
        document.getElementById("cornerinput").blur();
        const rows = cornerAlgToInfoStyle[idValue].length;
        let tab = "";
        if (document.getElementById("cornerstyle").value === "manmade") {
            tab = `<table id="table"><thead><tr><th>${arrLang[lang]["no"]}</th><th>${arrLang[lang]["algorithm"]}</th><th>${arrLang[lang]["commutator"]}</th><th>${arrLang[lang]["thumbPosition"]}</th><th>${arrLang[lang]["source"]}</th></tr></thead><tbody>`;
        } else {
            tab = `<table id="table"><thead><tr><th>${arrLang[lang]["no"]}</th><th>${arrLang[lang]["algorithm"]}</th><th>${arrLang[lang]["commutator"]}</th><th>${arrLang[lang]["thumbPosition"]}</th></tr></thead><tbody>`;
        }
        for (let i = 0; i < rows; i++) {
            if (document.getElementById("cornerstyle").value !== "manmade" && cornerAlgToInfoStyle[idValue][i] === cornerAlgToStyle[idValue]) {
                tab += "<tr bgcolor=\"#D0D0D0\">";
            } else {
                tab += "<tr>";
            }
            tab += `<td>${i + 1}</td>`;
            if (document.getElementById("cornerstyle").value === "manmade") {
                tab += `<td>${cornerAlgToInfoStyle[idValue][i][0]}</td>`;
                tab += `<td>${commutator(cornerAlgToInfoStyle[idValue][i][0])}</td>`;
                tab += `<td>${fingerbeginfrom(cornerAlgToInfoStyle[idValue][i][0])}</td>`;
                let sourceElement = "";
                for (const source of cornerAlgToInfoStyle[idValue][i][1]) {
                    if (source in sourceToUrl) {
                        sourceElement = `${sourceElement}<a href="${sourceToUrl[source][sourceToUrl[source].length - 1]}" target="_blank">${source}</a>`;
                    } else {
                        sourceElement = `${sourceElement}${source}`;
                    }
                    if (source !== cornerAlgToInfoStyle[idValue][i][1][cornerAlgToInfoStyle[idValue][i][1].length - 1]) {
                        sourceElement += "<br>";
                    }
                }
                tab += `<td class="help">${cornerAlgToInfoStyle[idValue][i][1].length} <span class="help-content">${sourceElement}</span></td>`;
            } else {
                tab += `<td>${cornerAlgToInfoStyle[idValue][i]}</td>`;
                tab += `<td>${commutator(cornerAlgToInfoStyle[idValue][i])}</td>`;
                tab += `<td>${fingerbeginfrom(cornerAlgToInfoStyle[idValue][i])}</td>`;
            }
            tab += "</tr>";
        }
        tab += "</tbody></table>";
        div1.innerHTML = tab;
    } else {
        div1.innerHTML = "";
    }
    const r = $("#table").width() / $("#div1").width();
    if (r > 1) {
        $("#table").css("font-size", 16 / r);
    }
}

function algSearchByPos() {
    const id = [];
    id[0] = cornerPosToCode[document.getElementById("cornerinput1").value];
    id[1] = cornerPosToCode[document.getElementById("cornerinput2").value];
    id[2] = cornerPosToCode[document.getElementById("cornerinput3").value];
    const idValue = cornerAlgToStandard[`${id[0]}${id[1]}${id[2]}`];
    const cornerinput = [];
    if (typeof id[0] === "undefined") {
        id[0] = "";
    }
    if (typeof id[1] === "undefined") {
        id[1] = "";
    }
    if (typeof id[2] === "undefined") {
        id[2] = "";
    }
    let codecookie = "DEGCGAAJWIXKOOMREDCXTQLMKHIRZZPSBBLSQNJYHFFYWTNP";
    if (getCookie("code") !== "") {
        codecookie = getCookie("code");
    }
    for (let i = 0; i <= 2; i++) {
        if (id[i] === "") {
            cornerinput[i] = "";
        } else if (codecookie[cornerChichuToNumber[id[i]]] === "") {
            cornerinput[i] = id[i];
        } else {
            cornerinput[i] = codecookie[cornerChichuToNumber[id[i]]];
        }
    }
    document.getElementById("cornerinput").value = `${cornerinput[0]}${cornerinput[1]}${cornerinput[2]}`;
    const div1 = document.getElementById("div1");
    if (cornerAlgToInfo.hasOwnProperty(idValue)) {
        let cornerAlgToInfoStyle = {};
        let cornerAlgToStyle = {};
        if (document.getElementById("cornerstyle").value === "nightmare") {
            cornerAlgToInfoStyle = cornerAlgToInfo;
            cornerAlgToStyle = cornerAlgToNightmare;
        }
        if (document.getElementById("cornerstyle").value === "yuanzi") {
            cornerAlgToInfoStyle = cornerAlgToInfoYuanzi;
            cornerAlgToStyle = cornerAlgToYuanzi;
        }
        if (document.getElementById("cornerstyle").value === "balance") {
            cornerAlgToInfoStyle = cornerAlgToInfoBalance;
            cornerAlgToStyle = cornerAlgToBalance;
        }
        if (document.getElementById("cornerstyle").value === "manmade") {
            cornerAlgToInfoStyle = cornerAlgToInfoManmade;
        }
        const rows = cornerAlgToInfoStyle[idValue].length;
        let tab = "";
        if (document.getElementById("cornerstyle").value === "manmade") {
            tab = `<table id="table"><thead><tr><th>${arrLang[lang]["no"]}</th><th>${arrLang[lang]["algorithm"]}</th><th>${arrLang[lang]["commutator"]}</th><th>${arrLang[lang]["thumbPosition"]}</th><th>${arrLang[lang]["source"]}</th></tr></thead><tbody>`;
        } else {
            tab = `<table id="table"><thead><tr><th>${arrLang[lang]["no"]}</th><th>${arrLang[lang]["algorithm"]}</th><th>${arrLang[lang]["commutator"]}</th><th>${arrLang[lang]["thumbPosition"]}</th></tr></thead><tbody>`;
        }
        for (let i = 0; i < rows; i++) {
            if (document.getElementById("cornerstyle").value !== "manmade" && cornerAlgToInfoStyle[idValue][i] === cornerAlgToStyle[idValue]) {
                tab += "<tr bgcolor=\"#D0D0D0\">";
            } else {
                tab += "<tr>";
            }
            tab += `<td>${i + 1}</td>`;
            if (document.getElementById("cornerstyle").value === "manmade") {
                tab += `<td>${cornerAlgToInfoStyle[idValue][i][0]}</td>`;
                tab += `<td>${commutator(cornerAlgToInfoStyle[idValue][i][0])}</td>`;
                tab += `<td>${fingerbeginfrom(cornerAlgToInfoStyle[idValue][i][0])}</td>`;
                let sourceElement = "";
                for (const source of cornerAlgToInfoStyle[idValue][i][1]) {
                    if (source in sourceToUrl) {
                        sourceElement = `${sourceElement}<a href="${sourceToUrl[source][sourceToUrl[source].length - 1]}" target="_blank">${source}</a>`;
                    } else {
                        sourceElement = `${sourceElement}${source}`;
                    }
                    if (source !== cornerAlgToInfoStyle[idValue][i][1][cornerAlgToInfoStyle[idValue][i][1].length - 1]) {
                        sourceElement += "<br>";
                    }
                }
                tab += `<td class="help">${cornerAlgToInfoStyle[idValue][i][1].length} <span class="help-content">${sourceElement}</span></td>`;
            } else {
                tab += `<td>${cornerAlgToInfoStyle[idValue][i]}</td>`;
                tab += `<td>${commutator(cornerAlgToInfoStyle[idValue][i])}</td>`;
                tab += `<td>${fingerbeginfrom(cornerAlgToInfoStyle[idValue][i])}</td>`;
            }
            tab += "</tr>";
        }
        tab += "</tbody></table>";
        div1.innerHTML = tab;
    } else {
        div1.innerHTML = "";
    }
    const r = $("#table").width() / $("#div1").width();
    if (r > 1) {
        $("#table").css("font-size", 16 / r);
    }
}

function fontAwesome() {
    $("select").find("option[key='cornerStyleNightmare']").html(`&#128128; ${$("select").find("option[key='cornerStyleNightmare']").html()}`);
    $("select").find("option[key='cornerStyleBalance']").html(`&#62030; ${$("select").find("option[key='cornerStyleBalance']").html()}`);
    $("select").find("option[key='cornerStyleYuanzi']").html(`&thinsp;&#xf5d2;&thinsp; ${$("select").find("option[key='cornerStyleYuanzi']").html()}`);
    $("select").find("option[key='cornerStyleManmade']").html(`&thinsp;&#xf2bd; ${$("select").find("option[key='cornerStyleManmade']").html()}`);
}