var elements = document.getElementsByTagName('*');
var names = /Omar Mir Seddique|Joseph Whitman|Patrick Henry Sherrill|James Huberty|Nikolas Cruz|Stephen Paddock|Omar Mateen|Seung-Hui Cho|Adam Lanza|Devin Patrick Kelley|George Hennard|Tashfeen Mali|Syed Rizwan Farook|Eric Harris|Dylan Klebold|Jiverly Antares Wong|Jiverly Wong|Jiverly Voong|Robert Lewis Dear, Jr|Ivan Lopez|Gavin Eugene Long|Micah Xavier Johnson|Nidal Hasan|Nidal Malik Hasan|James Hodgkinson|Jared Lee Loughner|Michael Kenneth McLendon|James Edward "Pop" Pough|James Edward Pough|Aaron Alexis|Jeffrey Weise|Chris Harper-Mercer|James Eagan Holmes|James Holmes|Dylann Roof|Dylann Storm Roof/g
var namesArray = names.toString().toLowerCase().split("/g")[0].split("/")[1].split("|")
// var blacklist = ["james holmes", "holmes", "eagan"];
var thePoliticians = [
  "Blunt.png",
	"Buck.png",
	"Burr.png",
	"Cassidy.png",
	"Comstock.png",
	"Ernst.png",
	"Gianforte.png",
	"Hill.png",
	"McCain.png",
	"Poliquin.png",
	"Portman.png",
	"Rubio.png",
	"Sessions.png",
	"Simpson.png",
	"Smucker.png",
	"Tillis.png",
	"Young.png",
	"Young2.png",
	"Young3.png"
    ]
function redactnow(){
	// called on page load. Searches all img alt text and srcs for the strings in blacklist, replaces with kittens
	var pagepics=document.getElementsByTagName("img"), i=0, img;
	while (img = pagepics[i++])
	{

		if (img.hasAttribute('redactlistreplaced')){
			// already replaced
		}
		else {
			// not yet replaced
			var alttext = String(img.alt).toLowerCase();
			var imgsrc = String(img.src).toLowerCase();

			if (img.parentElement.nodeName != 'BODY'){
				// check parent innerHTML for blackilist
				var parenttag = img.parentElement.innerHTML.toLowerCase();
			}
			else {
				// prevent parse of entire doc
				var parenttag = '';
			};

			var imgwidth = img.clientHeight;
			var imgheight = img.clientHeight;

			namesArray.forEach(function(blist) {
				if ((alttext.indexOf(blist) != -1) || (imgsrc.indexOf(blist) != -1) || (parenttag.indexOf(blist) != -1)){

					// append old src
					img.setAttribute("redactlistreplaced", img.src);

					// remove srcsets, forcing browser to the kitten - eg, BBC News
					if (img.hasAttribute('srcset')){
						img.removeAttribute('srcset');
					};
					// remove source srcsets if children of same parent <picture> element - eg, the Guardian
					if (img.parentElement.nodeName == 'PICTURE'){
						var theparent = img.parentNode;
						for(var child=theparent.firstChild; child!==null; child=child.nextSibling) {
						    if (child.nodeName == "SOURCE"){
							    child.removeAttribute('src');
							    child.removeAttribute('srcset');
						    };
						};

					};
					// knock out lazyloader data URLs so it doesn't overwrite kittens
					if (img.hasAttribute('data-src')){
						img.removeAttribute('data-src');
					};
					if (img.hasAttribute('data-hi-res-src')){
						img.removeAttribute('data-hi-res-src');
					};
					if (img.hasAttribute('data-low-res-src')){
						img.removeAttribute('data-low-res-src');
					};

					// fix for wapo lazyloading huge sidebar pix..
					if (window.location.href.indexOf('washingtonpost.com') != -1){
					// console.log('wapo');
						if (img.classList.contains('unprocessed')){
							// console.log('loreslazy');
							img.classList.remove('unprocessed');

						};
					};


					// var randk = Math.floor(Math.random() * 32) + 1
					var random =  thePoliticians[Math.floor(Math.random()*thePoliticians.length)];
					// console.log(random)
					img.src = chrome.runtime.getURL(random);
					img.width = imgwidth;
					img.height = imgheight;

					// makaReplacements++;
				};
			});
		};
	}
};

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
                // console.log(val)
                var lastNames = n[n.length - 1];
                lastNames = new RegExp(lastNames, 'g');
                // console.log(lastNames)
            }

            var replacedText = text.replace(names, 'Redacted');
                replacedText = replacedText.replace(lastNames,'Redacted')

            var imgObj = document.getElementsByTagName('img')
            var imgArr = Object.values(imgObj);

            // console.log(typeof(imgArr))
            // console.log(imgObj)
            if (replacedText !== text) {
                redactnow();
                // element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
