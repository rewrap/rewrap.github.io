function redirect(href, event) {
    if (event && (event.which == 2 || event.button == 4)) {
        window.open(href, "__blank");
    } else {
        window.open(href, "_self");
    }
}

function backToTop() {
    document.getElementById("subNav").scrollIntoView({ behavior: "smooth", block: "end" });
}

function emailPrompt() {
    var copyText = document.getElementById("hiddenEmail");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    window.alert("'rewrapvinyl@gmail.com' copied to clipboard.");
}