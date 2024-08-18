function initDoc() {
    generateSidenav();
    generateBlockquotes();
}
function generateSidenav() {
    var root = [];
    var h1id = "";
    var h2id = "";
    document.querySelector(".content").querySelectorAll("h1,h2,h3").forEach(function (element) {
        var h1 = root[root.length - 1];
        switch (element.tagName) {
            case "H1":
                element.id = element.innerHTML.toLowerCase().replaceAll(" ", "-");
                h1id = element.id;
                root.push({ id: element.id, text: element.innerHTML, h2: [] });
                break;
            case "H2":
                element.id = "".concat(h1id, "-").concat(element.innerHTML.toLowerCase().replaceAll(" ", "-"));
                h2id = element.id;
                h1.h2.push({ id: element.id, text: element.innerHTML, h3: [] });
                break;
            case "H3":
                element.id = "".concat(h2id, "-").concat(element.innerHTML.toLowerCase().replaceAll(" ", "-"));
                h1.h2[h1.h2.length - 1].h3.push({ id: element.id, text: element.innerHTML });
                break;
        }
    });
    var sidenav = document.getElementById("sidenav");
    sidenav.innerHTML += "<ul>";
    for (var _i = 0, root_1 = root; _i < root_1.length; _i++) {
        var h1 = root_1[_i];
        sidenav.innerHTML += "<li><a href=\"#".concat(h1.id, "\"></a></li><ul>");
        for (var _a = 0, _b = h1.h2; _a < _b.length; _a++) {
            var h2 = _b[_a];
            sidenav.innerHTML += "<li style=\"padding-left: 20px\"><a href=\"#".concat(h2.id, "\">").concat(h2.text, "</a></li><ul>");
            for (var _c = 0, _d = h2.h3; _c < _d.length; _c++) {
                var h3 = _d[_c];
                sidenav.innerHTML += "<li style=\"padding-left: 40px\"><a href=\"#".concat(h3.id, "\">").concat(h3.text, "</a></li>");
            }
            sidenav.innerHTML += "</ul>";
        }
        sidenav.innerHTML += "</ul>";
    }
    sidenav.innerHTML += "</ul>";
}
function generateBlockquotes() {
    document.querySelectorAll('blockquote').forEach(function (e) {
        var checker = function (tag, className, color, key, title) {
            if (e.innerText.startsWith(tag)) {
                e.innerHTML = e.innerHTML.replace(tag, "");
                e.innerHTML = "<div style='display: flex; align-items: center; color: ".concat(color, "'><span class=\"material-symbols-outlined\" style='margin: 5px'>").concat(key, "</span><span style='font-weight: bold'>").concat(title, "</span></div><div style='margin-left: 10px'>").concat(e.innerHTML, "</div>");
                e.classList.add(className);
                return true;
            }
            return false;
        };
        if (checker("[!NOTE]", "note", "#1f6feb", "info", "Note"))
            return;
        if (checker("[!TIP]", "tip", "#3fb950", "lightbulb", "Tip"))
            return;
        if (checker("[!IMPORTANT]", "important", "#ab7df8", "notification_important", "Important"))
            return;
        if (checker("[!WARNING]", "warning", "#d29922", "warning", "Warning"))
            return;
        checker("[!CAUTION]", "caution", "#f85149", "error", "Caution");
    });
}
