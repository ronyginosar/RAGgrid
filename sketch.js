//****
// Open Issues:
// define logowidth with fontwidth
// animate transitions
// strech last line
// position 3rd line
// yod make height like neighboor
// last letter width: make neighboor letter take some as well if too wide
// make pixels for w, h according to fontsize since it's pt....
// ----
// NTH - make input text
// NTH - interactive with mouse
//****//


let displayText = "מערכות משטחים"
// let displayText = "מטבחים מערכות מבטחים"
// let displayText = "מטבחים מערכות מבטחים"
// let displayText = "abcief ghdjkl";
// let displayText = "abcief ghdjkl".toUpperCase();
let excludeindex = 1;

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
	'rgb(200,100,0)' , 'rgb(0,0,255)', 'rgb(0,200,255)', 'rgb(100,200,100)',
		'rgb(255,200,100)', 'rgb(100,0,100)', 'rgb(255,200,0)'] ;


function setup() {
	createCanvas(windowWidth, windowHeight);
	// logoheight = windowHeight - margins*2 ; //test
	logoheight = 300; //test


	// TODO decide on how to do this with fontwidth...:
	maxlogowidth = windowWidth - margins*2 ;
	// logowidth = int(maxlogowidth);
	logowidth = 500; // Test
	// logowidth = (fontMaxWidth * 6) ;
	// console.log(windowWidth , logowidth);

	// calculate div extreme values for variable mapping later
	minDivWidth = logowidth * 0.1;
	maxDivWidth = logowidth * 0.3;
	minDivHeight = logoheight/2 * 0.7;
	maxDivHeight = logoheight/2;

	// bg = color('rgb(0,0,0)');
	bg = color('rgb(255,255,255)'); // Test
	frameRate(1);
	playloop = true;

	// 1. input text to array, word per row via space char
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
			uppervars = null;

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


				let m = max((logowidth - acc_width) * 0.3, minDivWidth);
				// makes sure no one is too narrow - we dont want logowidth - acc_width to be smaller than min
				lw = int(random(minDivWidth, m));

				// last letter width fills to the end of logosize:
				if(l_index == wordLenght-1){
					lw = (logowidth - acc_width);
				}

				// exclude letters that are too narow to stretch
				if(l_index == excludeindex){
					lw = minDivWidth - 10;
				}

			} else if (w_index >= 1){ // ammend params for later rows
				// y, lw update according to prev row
				upperSize = letterDivz[w_index-1][l_index].size();
				y += upperSize.height;
				lw = upperSize.width;
				uppervars = letterDivz[w_index-1][l_index].style("font-variation-settings");

				// update acc_width or init it for new row
				if (l_index == 0){ acc_width = 0;
				} else {
					acc_width += letterDivz[w_index-1][l_index-1].size().width;
				}

				// last row height stretch
				if (w_index == (w.length - 1)){
					// let acc_height = letterDivz[w_index-1][l_index].size().height +
					// 								 letterDivz[w_index-1][l_index].position().y;
					// lh = logoheight - acc_height;
					lh = logoheight - y;

					// TODO update this correct + update y
				}
			}

			x = margins + acc_width;

			// mapping font settings and line height
			let vars = varmapping(int(lw), int(lh), uppervars);
			let lineheight = map(int(lh),int(minDivHeight),int(maxDivHeight),100,fontsize,true); // TODO strech last line
			// let lineheight = map(int(lh),100,500,100,fontsize,true); // TODO strech last line

			let l = new Letter(int(x), int(y), int(lw), int(lh), color(testcolors[div_index]), divL, vars, int(lineheight));
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

function varmapping(lw, lh, uppervars){
	let varsettings = "";
	if (uppervars){
		// if not first row - use upper variable width
		let upperwidth = uppervars.split(",")[1].trimLeft();
		varsettings += upperwidth;
		// this.div.style('width', this.w +'px'); // todo: fill up rest of upper width
	} else {
		// map w to variable width in the first row
		let wmap = map(lw, minDivWidth, maxDivWidth, fontMinWidth, fontMaxWidth, true);
		varsettings += '"wdth"'+' '+ int(wmap).toString();
	}
	varsettings += ", ";
	// map h to variable height
	let hmap = map(lh,int(minDivHeight),int(maxDivHeight),fontMinHeight,fontMaxHeight,true);
	varsettings += '"hght"'+' '+ int(hmap).toString();
	return varsettings;
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
	constructor(ix, iy, iw, ih, ic, d, vars, lineheight){
		this.x = ix; // div location
		this.y = iy;
		this.w = iw; // div size
		this.h = ih;
		this.c = ic; // color
		this.div = d; // div container
		this.vars = vars; // variable font values
		this.lineheight = lineheight;
	}

	display(){ // control DOM letters
		// div size and location
		this.div.style('width', this.w +'px'); // todo
		this.div.style('height', this.h +'px'); // todo
		this.div.position(this.x, this.y);

		// div font settings
		this.div.style('line-height', this.lineheight +'px');
		this.div.style('font-size', fontsize +'px');
		this.div.style('font-variation-settings', this.vars);

		// div color settings
		this.div.style('color', 'black');
		// this.div.style('color', this.c);
		// this.div.style('color', 'white'); // test
		this.div.style('background', this.c); // test
	}

	animate(){
		// TODO:
	}
}
