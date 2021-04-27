function redirect(href) {
    window.open(href, "_self")
}

function emailPrompt() {
    var copyText = document.getElementById("hiddenEmail");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    var openEmail = window.confirm("'rewrapvinyl@gmail.com' copied to clipboard. Press ok to open email provider or cancel to return to website");
    if(openEmail == true) {
        window.open("mailto:rewrapvinyl@gmail.com", "_blank", "noopener");
    } else {
        //don't do anything lol
    }

}