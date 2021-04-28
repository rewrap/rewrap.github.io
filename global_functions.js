function redirect(href) {
    window.open(href, "_self")
}

function emailPrompt() {
    var copyText = document.getElementById("hiddenEmail");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    window.alert("'rewrapvinyl@gmail.com' copied to clipboard.");
}