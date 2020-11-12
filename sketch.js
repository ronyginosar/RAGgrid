var w = [];
var letterDivz = [];

// let displayText = "מערכות משטחים"
// let displayText = "abcief ghdjkl";
let displayText = "abcief ghdjkl".toUpperCase();

let bg;
// let font;
var logowidth;
var logoheight;
// let logowidth = 400;
// let logoheight = 350;
let margins = 10;
// Font settings
let fontMinWidth = 1;
let fontMaxWidth = 150;
// let fontMinWidth = 100;
// let fontMaxWidth = 500;
let fontMinHeight = 100;
let fontMaxHeight = 500;
// Font changing global vars
// var widest;
// var narrowest;
// var widthList = [];
var minw;
var maxw;
var acc_width = 0;
var wordLenght;
// let minwidth = 50;


let testcolors = ['rgb(0,0,255)', 'rgb(0,200,255)', 'rgb(100,200,100)',
	'rgb(255,200,100)', 'rgb(100,0,100)', 'rgb(255,200,0)', 'rgb(255,0,100)',
	'rgb(255,50,50)' , 'rgb(0,100,255)', 'rgb(100,0,255)', 'rgb(200,0,200)',
	'rgb(200,100,0)'] ;

// function preload() {
// 	// NOTE: This is only for text bounds calc. the actual font is in css
//   font = loadFont('assets/RAG-Marom-Roni01GX.ttf');
// }

function setup() {
	createCanvas(windowWidth, windowHeight);
	// canvas = createCanvas(window.innerWidth, window.innerHeight);
	logoheight = windowHeight - margins*2;
	// TODO : how to mapping in low tech?

	// TODO?:
	maxlogowidth = windowWidth - margins*2;
	logowidth = int(maxlogowidth);///fontMaxWidth);
	// console.log(logowidth);
	// logowidth = windowWidth/fontMaxWidth * 6 ; // windowWidth - margins*2;
	// let scale = (fontMaxWidth * 6 ) / (windowWidth - margins*2);
	// // console.log(windowWidth , (fontMaxWidth * 6 ) / scale );
	// logowidth = (fontMaxWidth * 6) ;
	// console.log(windowWidth , logowidth );

	minw = logowidth * 0.05;
	maxw = logowidth * 0.4;

	bg = color('rgb(0,0,0)');
	// bg = color('rgb(255,255,255)');
	frameRate(1);

	// 1. input text to array, word per row via space char
	w = displayText.split(' ').slice();//.reverse() // for latin - remove ".slice().reverse()"
	wordLenght = w[0].length;
	// TODO make input

	// init div array of arrays, according to amnt of words
	// letterDivz.push([],[]);
	w.forEach((word) => {
		letterDivz.push([]);
	});

	// 2. turn into array of arrays, create divs for each letter
	// for latin - remove .reverse()*2
	w.reverse().forEach((word, w_index) => {
		w[w_index] = word.split('');
		w[w_index].reverse().forEach((letter, l_index) => {
			div_index = (w_index * wordLenght) + l_index
			divName = div_index.toString();
			var divL = createDiv(letter).id(divName);
			letterDivz[w_index][l_index] = divL;
		});
	});
}

function draw() {
	// inits for every loop
	// background(bg);
	rect(10,10,logowidth,logoheight);
	widthList = [];

	// 3. create Letter object for each letter
	w.reverse().forEach((word, w_index) => {
		w[w_index].reverse().forEach((letter, l_index) => {
			div_index = (w_index * wordLenght) + l_index; // test
			divL = letterDivz[w_index][l_index];

			// lh = random(logoheight * 0.1, logoheight * 0.4);
			lh = 150;
			y = margins; // 1st row height
			upperw = null;

			if (w_index == 0){ //} && l_index != 0){

				if (l_index != 0){
					// acc_width update according to prev letter
					// console.log(select('#' + (l_index-1).toString()).size().width);
					// acc_width += select('#' + (l_index-1).toString()).size().width;
					acc_width += letterDivz[w_index][l_index-1].size().width;
				}
				// TODO is there a letter that is too narow to stretch?
				// exclude it

				// update lw regarding other letters before
				// only relevant in first row hence here

				// TODO: should be relyant on fontsize, not logowidth
				// TODO: how to do smarter?
				minw = logowidth * 0.05 ;
				maxw = max((logowidth - acc_width) * 0.4, logowidth * 0.1);
				// maxmax makes sure no one is too narrow, we dont want logowidth - acc_width to be smaller than min

				lw = int(random(minw, maxw));

				// last letter width fills to the end of logosize:
				if(l_index == wordLenght-1){
					lw = (logowidth - acc_width);
				}


				// console.log("max varz:", (logowidth - acc_width) * 0.2, logowidth * 0.1);
				// console.log(int(minw), int(maxw), lw);

				// widthList.push(lw);
			}

			if (w_index >= 1){ // ammend params for later rows
				// y, lw update according to prev row
				upperSize = letterDivz[w_index-1][l_index].size();
				// letter_up = abs(((w_index-1) * wordLenght) - l_index); // first part is just in case we want more words latter
				// upperSize = select('#' + letter_up.toString()).size();
				// upperSize = select('#' + letter_up.toString()).size();

				// console.log("indise UPPER", letterDivz[w_index-1][l_index].html() ,upperSize.width); // TEST PRINTS
				y += upperSize.height;
				lw = upperSize.width;
				upperw = letterDivz[w_index-1][l_index].style("font-variation-settings");
				// console.log("indise UPPER", letterDivz[w_index-1][l_index].html() ,upperw); // TEST PRINTS


				// update acc_width or init it for new row
				if (l_index == 0){ acc_width = 0; }
				else {
					acc_width += letterDivz[w_index-1][l_index-1].size().width;
					// acc_width += select('#' + (l_index-1).toString()).size().width;
				}
			}
			x = margins + acc_width;

			// console.log("inside builder" , int(lw));
			let l = new Letter(int(x), int(y), int(lw), int(lh), color(testcolors[div_index]), divL, upperw);
			l.display();

		});
	});






	// TEST PRINTS
	// console.log(divName.html() , "w" , lw, "h", lh);
	// console.log(divName.html() , "x " , x, "y ", y);


	// NOTES:
	// keeping here for maybe later:
	// bounds = font.textBounds(select('#'+(i.toString())).html(), 0, 0, fontsize);
	// console.log(bounds, bounds.w , bounds.h);

	// TODO:
	// Dail back on the random.
	// randomize select one letter to grow (not 2,6)
	// all the rest - stay in place.


	noLoop();

	// ----
	// Export to SVG
	// save("mySVG.svg"); // give file name
	// print("saved svg");
	// noLoop(); // we just want to export once

}

class Letter {
	constructor(ix, iy, iw, ih, ic, d, vw){
		this.x = ix; // location
		this.y = iy;
		this.w = iw; // size
		this.h = ih;
		this.c = ic; // color
		this.div = d; // div container
		this.varwdth = vw; // variable wdth value
	}

	animate(){
		// TODO:

	}

	display(){ // control DOM letters
		// div size and location
		// this.div.style('width', this.w +'px');
		this.div.style('height', this.h +'px');
		this.div.position(this.x, this.y);

		// div font settings
		this.div.style('line-height', this.h +'px');
		this.div.style('font-size', this.h +'px'); //this.h * 0.75;
		// this.div.style('color', this.c);
		this.div.style('color', 'white'); // test
		this.div.style('background', this.c); // test

		if (this.varwdth == null){
			// map w to variable width
			// console.log("inside letter" , this.w); // TEST
			// let wmap = map(this.w,int(minw),int(maxw),fontMinWidth,fontMaxWidth,true);
			let wmap = map(this.w,int(minw),int(maxw),fontMinWidth,fontMaxWidth,true);
			wmap = "'wdth'"+' '+ int(wmap).toString();
			this.div.style('font-variation-settings', wmap);
		} else if (this.varwdth) {
			// console.log(this.varwdth);
			this.div.style('font-variation-settings', this.varwdth);
			this.div.style('width', this.w +'px'); // fill up rest of upper width
		}

	}
// end of Letter class
}
