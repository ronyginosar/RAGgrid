let displayText = "מערכות משטחים"
// let displayText = "abcief ghdjkl";
// let displayText = "abcief ghdjkl".toUpperCase();

let bg;
let margins = 10;
var logowidth;
var logoheight;

// Font settings
// let fontMinWidth = 1; // Gingham
// let fontMaxWidth = 150; // Gingham
let fontMinWidth = 100; // Marom
let fontMaxWidth = 500; // Marom
let fontMinHeight = 100;
let fontMaxHeight = 500;

// Font changing global vars
var minDivWidth;
var maxDivWidth;
var acc_width = 0; // accumulated width
var wordLenght; // number of letters in row
var w = []; // word-letter array of arrays
var letterDivz = []; // array of arrays containing the letter divz

// test colors
let testcolors = ['rgb(0,0,255)', 'rgb(0,200,255)', 'rgb(100,200,100)',
	'rgb(255,200,100)', 'rgb(100,0,100)', 'rgb(255,200,0)', 'rgb(255,0,100)',
	'rgb(255,50,50)' , 'rgb(0,100,255)', 'rgb(100,0,255)', 'rgb(200,0,200)',
	'rgb(200,100,0)'] ;


function setup() {
	createCanvas(windowWidth, windowHeight);
	logoheight = windowHeight - margins*2 ;

	// TODO decide on how to do this with fontwidth...:
	maxlogowidth = windowWidth - margins*2 ;
	logowidth = int(maxlogowidth);
	// logowidth = (fontMaxWidth * 6) ;
	// console.log(windowWidth , logowidth);

	// calculate div extreme values for wght mapping later
	minDivWidth = logowidth * 0.05;
	maxDivWidth = logowidth * 0.6;

	// bg = color('rgb(0,0,0)');
	bg = color('rgb(255,255,255)'); // Test
	frameRate(1);

	// 1. input text to array, word per row via space char
	// TODO make input
	w = displayText.split(' ').slice();
	wordLenght = w[0].length;

	// init div array of arrays, according to amnt of words
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
	// end of setup
}

function draw() {
	// inits for every loop
	background(bg);
	rect(10,10,logowidth,logoheight);
	widthList = [];
	acc_width = 0;

	// 3. create Letter object for each letter
	w.reverse().forEach((word, w_index) => {
		w[w_index].reverse().forEach((letter, l_index) => {
			div_index = (w_index * wordLenght) + l_index; // test
			divL = letterDivz[w_index][l_index];

			// TODO: lh....
			// lh = random(logoheight * 0.1, logoheight * 0.4);
			lh = 150;
			y = margins; // 1st row height
			upperw = null;

			if (w_index == 0){
				// lw decided regarding letters before - only relevant in first row hence here
				if (l_index != 0){
					// acc_width update according to prev letter
					acc_width += letterDivz[w_index][l_index-1].size().width;
				}
				// TODO: should be relyant on fontsize, not logowidth
				// TODO: how to do smarter?
				minw = logowidth * 0.05 ;
				maxw = (logowidth + acc_width) * 0.3;
				// maxw = max((logowidth - acc_width) * 0.4, logowidth * 0.1);
				// maxmax makes sure no one is too narrow, we dont want logowidth - acc_width to be smaller than min
				// 1. why not random enough?
				// 2. why not streached?
				// 3. define logowidth....


				lw = int(random(minw, maxw));

				// last letter width fills to the end of logosize:
				if(l_index == wordLenght-1){
					lw = (logowidth - acc_width);
				}
				// console.log(int(minw), int(maxw), lw); // Test

				// TODO is there a letter that is too narow to stretch?
				// exclude it
			}

			if (w_index >= 1){ // ammend params for later rows
				// y, lw update according to prev row
				upperSize = letterDivz[w_index-1][l_index].size();
				y += upperSize.height;
				lw = upperSize.width;
				upperw = letterDivz[w_index-1][l_index].style("font-variation-settings");

				// update acc_width or init it for new row
				if (l_index == 0){ acc_width = 0; }
				else {
					acc_width += letterDivz[w_index-1][l_index-1].size().width;
				}
			}
			x = margins + acc_width;
			console.log(divL.html(), acc_width , lw);

			let l = new Letter(int(x), int(y), int(lw), int(lh), color(testcolors[div_index]), divL, upperw);
			l.display();
		});
	});

	// noLoop();

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
		// this.div.style('width', this.w +'px'); // TODO - decide if we want this.
		this.div.style('height', this.h +'px'); // TODO - make font size and h not same thing
		this.div.position(this.x, this.y);

		// div font settings
		this.div.style('line-height', this.h +'px');
		this.div.style('font-size', this.h +'px');
		// this.div.style('color', this.c);
		this.div.style('color', 'white'); // test
		this.div.style('background', this.c); // test

		if (this.varwdth == null){
			// map w to variable width in the first row

			let wmap = map(this.w,int(minDivWidth),int(maxDivWidth),fontMinWidth,fontMaxWidth,true);
			// console.log("in", this.w , "map", int(wmap)); // Test
			wmap = "'wdth'"+' '+ int(wmap).toString();
			this.div.style('font-variation-settings', wmap);
		} else if (this.varwdth) {
			// in following rows- use upper variable width
			this.div.style('font-variation-settings', this.varwdth);
			this.div.style('width', this.w +'px'); // fill up rest of upper width
		}
	}
// end of Letter class
}



	// NOTES:
	// keeping here for maybe later:
	// bounds = font.textBounds(select('#'+(i.toString())).html(), 0, 0, fontsize);
	// console.log(bounds, bounds.w , bounds.h);
