import parseDOM from './parseDOM';
function text(element) {
    return element.textContent || element.innerText;
}
export default function parseHTML(source) {
    if (!source) {
        return null;
    }
    return source
        .split('<div class="doc-highlight"><pre><code')
        .map(function (i) {
        if (i.indexOf('class="hljs-name"') !== -1) {
            return "<div class=\"doc-highlight\"><pre><code" + i;
        }
        return i;
    })
        .map(function (i) {
        if (i.match(/<\/code><\/pre><\/div>/)) {
            return i.split(/<\/code><\/pre><\/div>/).map(function (j) {
                if (j.indexOf('class="hljs-name"') !== -1) {
                    return j + "</code></pre></div>";
                }
                return j;
            });
        }
        return i;
    })
        .flat()
        .map(function (i) {
        var content = text(parseDOM(i));
        if (content.indexOf('ReactDOM.render') !==
            -1) {
            return {
                type: 'code',
                content: text(parseDOM(i))
            };
        }
        return {
            type: 'markdown',
            content: i
        };
    });
}
