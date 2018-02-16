var elements = document.getElementsByTagName('*');
var names = /Joseph Whitman|Patrick Henry Sherrill|James Huberty|Nikolas Cruz|Stephen Paddock|Omar Mateen|Seung-Hui Cho|Adam Lanza|Devin Patrick Kelley|George Hennard|Tashfeen Mali|Syed Rizwan Farook|Eric Harris|Dylan Klebold|Jiverly Antares Wong|Jiverly Wong|Jiverly Voong|Robert Lewis Dear, Jr|Ivan Lopez|Gavin Eugene Long|Micah Xavier Johnson|Nidal Hasan|Nidal Malik Hasan|James Hodgkinson|Jared Lee Loughner|Michael Kenneth McLendon|James Edward "Pop" Pough|James Edward Pough|Aaron Alexis|Jeffrey Weise|Chris Harper-Mercer|James Eagan Holmes|James Holmes|Dylann Roof|Dylann Storm Roof/g

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];
        var text = node.nodeValue;
        if (node.nodeType === 3) {
            var matches = text.match(names)
            if(matches !== null) {
                var val = matches.toString()
                var n = val.split(" ");
                var lastNames = n[n.length - 1];
                lastNames = new RegExp(lastNames, 'g');
            }

            var replacedText = text.replace(names, 'Redacted');
                replacedText = replacedText.replace(lastNames,'Redacted')
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
// var array = document.getElementsByTagName('img')
// var arr = [].slice.call(array);
// arr.forEach(function(element) {
//   console.log(element);
// });
