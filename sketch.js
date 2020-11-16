//****
// Open Issues:
// 1. why width not random enough?
// 2. why last letter not streached to end? -----> move mapping to creation. the mapping kills the stretch. also for height.
// 3. define logowidth with fontwidth
// 4. define the random lw = int(random(minw, maxw)) on fontwidth not logowidth
// 5. define the random lw = int(random(minw, maxw)) smarter...
// 6. something is wrong with: last letter width fills to the end of logosize
// 7. exclude letters that are too narow to stretch
// 8. animate transitions
// 9. randomize height
//	// 1. map line-height
		// 2. strech last line
// TAKE ALL LOGIC OUT OF LETTER CLASS
//****//


let displayText = "מערכות משטחים"
// let displayText = "abcief ghdjkl";
// let displayText = "abcief ghdjkl".toUpperCase();

let bg;
let margins = 10;
var logowidth;
var logoheight;
var playloop;

// Font settings
// let fontMinWidth = 1; // Gingham
// let fontMaxWidth = 150; // Gingham
let fontMinWidth = 100; // Marom
let fontMaxWidth = 500; // Marom
let fontMinHeight = 100;
let fontMaxHeight = 500;
let fontsize = 150;

// Font changing global vars
var minDivWidth;
var maxDivWidth;
var minDivHeight;
var maxDivHeight;
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
	// logowidth = int(maxlogowidth);
	logowidth = 500; // Test
	// logowidth = (fontMaxWidth * 6) ;
	// console.log(windowWidth , logowidth);

	// calculate div extreme values for variable mapping later
	minDivWidth = logowidth * 0.05;
	maxDivWidth = logowidth * 0.6;
	minDivHeight = logoheight/2 * 0.1;
	maxDivHeight = logoheight/2;
	// console.log(minDivHeight , maxDivHeight, logoheight/2);

	// bg = color('rgb(0,0,0)');
	bg = color('rgb(255,255,255)'); // Test
	frameRate(1);
	playloop = true;

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
	rect(10,10,logowidth,logoheight); // Test
	widthList = [];
	acc_width = 0;

	// 3. create Letter object for each letter
	w.reverse().forEach((word, w_index) => {
		w[w_index].reverse().forEach((letter, l_index) => {
			div_index = (w_index * wordLenght) + l_index; // test
			divL = letterDivz[w_index][l_index];

			// TODO: lh....
			lh = int(random(minDivHeight, maxDivHeight));
			// lh = 150;
			y = margins; // 1st row height
			upperw = null;

			if (w_index == 0){
				// lw decided regarding letters before - only relevant in first row hence here
				if (l_index != 0){
					// acc_width update according to prev letter
					acc_width += letterDivz[w_index][l_index-1].size().width;
				}

				// to remove?
				// minw = minDivWidth;
				// // maxw = (logowidth + acc_width) * 0.4;  // Note, Think: '+' instead of '-', works better with hebrew?
				// maxw = maxDivWidth - acc_width;  // Try

				// can probably get rid of this:
				// maxw = max((logowidth - acc_width) * 0.4, logowidth * 0.1);
				// ?? maxmax makes sure no one is too narrow, we dont want logowidth - acc_width to be smaller than min
				// lw = int(random(minw, maxw));

				lw = int(random(minDivWidth, maxDivWidth - acc_width));

				// TODO: something here is wrong:
				// last letter width fills to the end of logosize:
				if(l_index == wordLenght-1){
					lw = (logowidth - acc_width);
					// console.log(divL.html(), acc_width , lw); // Test
				}
				// console.log(int(minw), int(maxw), lw); // Test

				// TODO is there a letter that is too narow to stretch?
				// exclude it

			} else if (w_index >= 1){ // ammend params for later rows
				// y, lw update according to prev row
				upperSize = letterDivz[w_index-1][l_index].size();
				y += upperSize.height;
				lw = upperSize.width;
				upperw = letterDivz[w_index-1][l_index].style("font-variation-settings");

				// update acc_width or init it for new row
				if (l_index == 0){ acc_width = 0;
				} else {
					acc_width += letterDivz[w_index-1][l_index-1].size().width;
				}
			}
			x = margins + acc_width;
			// console.log(divL.html(), acc_width , lw);

			let l = new Letter(int(x), int(y), int(lw), int(lh), color(testcolors[div_index]), divL, upperw);
			l.display();
		});
	});

	noLoop(); // Test

	// ----
	// Export to SVG
	// save("mySVG.svg"); // give file name
	// print("saved svg");
	// noLoop(); // we just want to export once

}

// click to play/pause
function mouseClicked() {
	if (playloop){
		noLoop();
		playloop = false;
	}
	else{
		loop();
		playloop = true;
	}
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
		// this.div.style('height', this.h +'px'); // TODO
		this.div.position(this.x, this.y);

		// div font settings
		// this.div.style('line-height', fontsize +'px'); // TODO
		this.div.style('font-size', fontsize +'px');
		// this.div.style('color', this.c);
		this.div.style('color', 'white'); // test
		this.div.style('background', this.c); // test

		var varsettings = "";

		if (this.varwdth == null){
			// map w to variable width in the first row
			let wmap = map(this.w,int(minDivWidth),int(maxDivWidth),fontMinWidth,fontMaxWidth,true);
			// console.log("in", this.w , "map", int(wmap)); // Test
			wmap = "'wdth'"+' '+ int(wmap).toString();
			varsettings += wmap;
			// this.div.style('font-variation-settings', wmap); // remove
		} else if (this.varwdth) {
			// in following rows- use upper variable width
			// note: also copies hght but then we run it over...
			// TODO: fix this...
			varsettings += this.varwdth;
			// this.div.style('font-variation-settings', this.varwdth);  // remove
			this.div.style('width', this.w +'px'); // fill up rest of upper width
		}

		// map h to variable height
		let hmap = map(this.h,int(minDivHeight),int(maxDivHeight),fontMinHeight,fontMaxHeight,true);
		// let lineH = int(hmap).toString();
		// // this.div.style('line-height', lineH +'px'); // TODO
		hmap = ", "+'"hght"'+' '+ int(hmap).toString();
		varsettings += hmap;

		// console.log(varsettings);

		// apply var settings
		this.div.style('font-variation-settings', varsettings);

		// TODO:
		// 1. map line-height
		// 2. strech last line
		let lineH = map(this.h,int(minDivHeight),int(maxDivHeight),100,fontsize,true);
		lineH = int(lineH).toString();
		this.div.style('line-height', lineH +'px'); // TODO
	}

// end of Letter class
}



	// NOTES:
	// keeping here for maybe later:
	// bounds = font.textBounds(select('#'+(i.toString())).html(), 0, 0, fontsize);
	// console.log(bounds, bounds.w , bounds.h);
