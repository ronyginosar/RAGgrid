let w = [];

// TODO make input

// let displayText = "מערכות משטחים"
let displayText = "abcief ghdjkl";
// let displayText = "abcief ghdjkl".toUpperCase();

let bg;
// let font;
let logowidth;
let logoheight;
// let logowidth = 400;
// let logoheight = 350;
let margins = 10;
// Font settings
let fontMinWidth = 100;
let fontMaxWidth = 500;
let fontMinHeight = 100;
let fontMaxHeight = 500;
let widest = 500; // TODO test
let narrowest = 100; // TODO test
var acc_width = 0;
let minwidth = 50;
// let widest;
// let narrowest;

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
	logoheight = windowHeight - margins*2;
	logowidth = windowWidth - margins*2;
	// createCanvas(logowidth + margins * 2,logoheight + margins * 2);
	bg = color('rgb(0,0,0)');
	// bg = color('rgb(255,255,255)');
	frameRate(1);
}

function draw() {
	background(bg);
	// 1. input text to array, word per row via space char
	w = displayText.split(' ').slice();//.reverse() // for latin - remove ".slice().reverse()"
	wordLenght = w[0].length;

	// 2. turn into array of arrays, create divs for each letter
	// for latin - remove .reverse()*2
	// TODO make an array of divz?
	w.reverse().forEach((word, w_index) => {
		w[w_index] = word.split('');
		w[w_index].reverse().forEach((letter, l_index) => {
			div_index = (w_index * wordLenght) + l_index
			divName = div_index.toString();
			var divName = createDiv(letter).id(divName);
			// 3. create Letter object for each letter
			
			// lh = random(logoheight * 0.1, logoheight * 0.4);
			lh = 50;
			y = margins; // 1st row height

			if (w_index == 0){ //} && l_index != 0){

				if (l_index != 0){
					// acc_width update according to prev letter
					acc_width += select('#' + (l_index-1).toString()).size().width;
				}

				// TODO: for HEBREW ??
				// remove curr letter width
				// lw -= divName.size().width;

				// update lw regarding other letters before
				// only relevant in first row hence here

				// TODO : sort this logic!
				// TODO: should be relyant on fontsize, not logowidth
				minw = logowidth * 0.05 ;
				maxw = max((logowidth - acc_width) * 0.4, logowidth * 0.1);
				// maxmax makes sure no one is too narrow, we dont want logowidth - acc_width to be smaller than min

				lw = int(random(minw, maxw));
				// console.log(int(minw) , int(maxw), lw);

				// last letter width fills to the end of logosize:
				if(l_index == wordLenght-1){
					lw = (logowidth - acc_width);
				}
			}

			if (w_index >= 1){ // ammend params for later rows
				// y, lw update according to prev row
				letter_up = abs(((w_index-1) * wordLenght) - l_index); // first part is just in case we want more words latter
				upperSize = select('#' + letter_up.toString()).size();
				// console.log("UP", upperSize.width , upperSize.height); // TEST PRINTS
				y += upperSize.height;
				lw = upperSize.width;
				// update acc_width or init it for new row
				if (l_index == 0){ acc_width = 0; }
				else {
					acc_width += select('#' + (l_index-1).toString()).size().width;
				}
			}
			x = margins + acc_width;
			// TODO: was x = width - margins - acc_width; is this needed for heb?

			let l = new Letter(int(x), int(y), int(lw), int(lh), color(testcolors[div_index]), divName);
			l.display();

			// TEST PRINTS
			// console.log(divName.html() , "w" , lw, "h", lh);
			// console.log(divName.html() , "x " , x, "y ", y);
		});
	});

	// NOTES:
	// keeping here for maybe later:
	// bounds = font.textBounds(select('#'+(i.toString())).html(), 0, 0, fontsize);
	// console.log(bounds, bounds.w , bounds.h);

	// TODO:
	// Dail back on the random.
	// randomize select one letter to grow (not 2,6)
	// all the rest - stay in place.
	// widest = int(max(l1w, l2w, l3w, l4w));
	// narrowest = int(min(l1w, l2w, l3w, l4w));
	//
	// TODO: here do animate
	// noLoop();

	// ----
	// Export to SVG
	// save("mySVG.svg"); // give file name
	// print("saved svg");
	noLoop(); // we just want to export once

}

class Letter {
	constructor(ix, iy, iw, ih, ic, d){
		this.x = ix; // location
		this.y = iy;
		this.w = iw; // size
		this.h = ih;
		this.c = ic; // color
		this.div = d; // div container
	}

	animate(){
		// TODO:
	}

	display(){
		// test:
		// noStroke();
		// fill(this.c);
		// rect(this.x, this.y, this.w, this.h);


		// control DOM letters
		// TODO fit text perfect!
		// this.div.style('height', this.h +'px');
		// this.div.style('line-height', this.h*0.37 +'px');
		this.div.style('line-height', this.h +'px');
		this.div.style('width', this.w +'px');
		this.div.style('font-size', this.h +'px'); //this.h * 0.75;
		// this.div.style('font-size', this.h*1.35 +'px'); //this.h * 0.75;


		let wmap = map(this.w,narrowest,widest,fontMinWidth,fontMaxWidth,true);
		wmap = "'wdth'"+' '+ int(wmap).toString();
		// console.log(wmap);
		this.div.style('font-variation-settings', wmap);
		// this.div.style('vertical-align','top');
		this.div.style('color', 'white');
		this.div.style('background', this.c);
		// this.div.style('color', "white");
		// this.div.style('background', 'black');
		this.div.position(this.x, this.y);
	}
// end of Letter class
}
