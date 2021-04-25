export default function parseDOM(str) {
    var element = document.createElement('div');
    element.innerHTML = str;
    return element;
}
