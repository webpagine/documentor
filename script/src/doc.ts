function initDoc() {
    generateSidenav()
    generateBlockquotes()

    window.addEventListener("scroll", scrollEvent)
}

function scrollEvent() {
    let elements = document.getElementsByTagName("main")[0].querySelectorAll("h1,h2,h3")

    elements.forEach(element => {
        element.classList.remove("current")
        document.getElementById(`sidenav-${element.id}`).classList.remove("current")
    })

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i]

        if (element.getBoundingClientRect().top < 0) continue

        element.classList.add("current")
        document.getElementById(`sidenav-${element.id}`).classList.add("current")

        break
    }
}

function generateIdFromElement(element: Element) {
    return element.innerHTML.toLowerCase().replace(/[^a-zA-Z\s-]/g, "").replaceAll(" ", "-")
}

function generateSidenav() {
    let root = []

    let h1id = ""
    let h2id = ""

    document.querySelector(".content").querySelectorAll("h1,h2,h3").forEach((element) => {
        let h1 = root[root.length - 1]

        switch (element.tagName) {
            case "H1":
                element.id = generateIdFromElement(element)
                h1id = element.id

                root.push({id: element.id, text: element.innerHTML, h2: []})

                break
            case "H2":
                element.id = `${h1id}-${generateIdFromElement(element)}`
                h2id = element.id

                h1.h2.push({id: element.id, text: element.innerHTML, h3: []})
                break
            case "H3":
                element.id = `${h2id}-${generateIdFromElement(element)}`

                h1.h2[h1.h2.length - 1].h3.push({id: element.id, text: element.innerHTML})
                break
        }
    })

    let sidenav = document.getElementById("sidenav")
    sidenav.innerHTML += "<ul>"
    for (let h1 of root) {
        sidenav.innerHTML += `<li><a id="sidenav-${h1.id}" href="#${h1.id}"></a></li><ul>`
        for (let h2 of h1.h2) {
            sidenav.innerHTML += `<li id="sidenav-${h2.id}" style="padding-left: 20px"><a href="#${h2.id}">${h2.text}</a></li><ul>`
            for (let h3 of h2.h3) {
                sidenav.innerHTML += `<li id="sidenav-${h3.id}" style="padding-left: 40px"><a href="#${h3.id}">${h3.text}</a></li>`
            }
            sidenav.innerHTML += "</ul>"
        }
        sidenav.innerHTML += "</ul>"
    }
    sidenav.innerHTML += "</ul>"
}

function generateBlockquotes() {
    document.querySelectorAll('blockquote').forEach((e) => {
        const checker = (tag: string, className: string, color: string, key: string, title: string) => {
            if (e.innerText.startsWith(tag)) {
                e.innerHTML = e.innerHTML.replace(tag, "")
                e.innerHTML = `<div style='display: flex; align-items: center; color: ${color}'><span class=\"material-symbols-outlined\" style='margin: 5px'>${key}</span><span style='font-weight: bold'>${title}</span></div><div style='margin-left: 10px'>${e.innerHTML}</div>`
                e.classList.add(className);
                return true
            }
            return false
        }

        if (checker("[!NOTE]", "note", "#1f6feb", "info", "Note")) return
        if (checker("[!TIP]", "tip", "#3fb950", "lightbulb", "Tip")) return
        if (checker("[!IMPORTANT]", "important", "#ab7df8", "notification_important", "Important")) return
        if (checker("[!WARNING]", "warning", "#d29922", "warning", "Warning")) return
        checker("[!CAUTION]", "caution", "#f85149", "error", "Caution")
    })
}

function setSidenavVisible() {
    const sidenav = document.getElementById("sidenav")
    const sidenavButton = document.getElementById("sidenav-show") as HTMLInputElement
    if (sidenavButton.checked) {
        sidenav.style.display = "none"
    } else {
        sidenav.style.display = "block"
    }
}
