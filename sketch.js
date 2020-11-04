let w = [];

// TODO make input

let displayText = "מערכות משטחים"

let bg;
// let font;
let logowidth = 400;
let logoheight = 350;
let margins = 50;
// Font settings
let fontMinWidth = 100;
let fontMaxWidth = 500;
let fontMinHeight = 100;
let fontMaxHeight = 500;
let widest = 500; // TODO test
let narrowest = 100; // TODO test
var acc_width = 0;
// let widest;
// let narrowest;

// function preload() {
// 	// NOTE: This is only for text bounds calc. the actual font is in css
//   font = loadFont('assets/RAG-Marom-Roni01GX.ttf');
// }

function setup() {
	// createCanvas(windowWidth, windowHeight);
	createCanvas(logowidth + margins * 2,logoheight + margins * 2);
	// bg = color('rgb(0,0,0)');
	bg = color('rgb(255,255,255)');
	frameRate(1);
}

function draw() {
	background(bg);
	// 1. input text to array
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
			// lw = random(logowidth * 0.1,logowidth * 0.4);
			// lh = random(logoheight * 0.1, logoheight * 0.8);
			lw = 50;
			lh = 50;
			acc_width += lw;
			y = margins;
			x = width - margins - acc_width;

			let wU, hU;
			if (w_index == 1){
				if (l_index == 0){
					// console.log(acc_width);
					acc_width = 0;

				}
				console.log(acc_width);
				letter_up = (w_index * wordLenght) - l_index;
				// console.log(letter_up);
				// console.log(l_index);
				// console.log(select('#'+letter_up).size());
				wU, hU = select('#' + letter_up.toString()).size();
				acc_width += wU;
				y += hU;
				x = width - margins - acc_width;
			}

			// l1 = new Letter(width-l1w-margins, margins, l1w, l1h, color('rgb(0,0,255)'), a);
			// l5 = new Letter(width-l1w-margins, margins+l1h, l5w, l5h, color('rgb(100,0,100)'), e);


			// let l = new Letter(50*div_index, 50, 50, 50, color('rgb(255,0,255)'), divName);
			let l = new Letter(x, y, 50, 50, color('rgb(255,0,255)'), divName);
			l.display();
		});
	});

	// keeping here for maybe later:
	// bounds = font.textBounds(select('#'+(i.toString())).html(), 0, 0, fontsize);
	// console.log(bounds, bounds.w , bounds.h);

		//TODO - word per row via space char

		// TODO:
		// Dail back on the random.
		// randomize select one letter to grow (not 2,6)
		// all the rest - stay in place.

	//
	// // first word , LTR!
	// // Math.floor(Math.random ()* max) + min;
	// // TODO: Why is height stupid?
	// l1w = random(logowidth * 0.1,logowidth * 0.4);
	// // l1h = random(logoheight * 0.1, logoheight * 0.8);
	// l1h = logoheight * 0.5;
	// l2w = random(logowidth * 0.05,(logowidth - l1w) * 0.2); // due to intended narrow 2nd
	// // l2h = random(logoheight * 0.1, logoheight * 0.8);
	// l2h = logoheight * 0.5;
	// l3w = random(logowidth * 0.1, min((logowidth - l1w - l2w) * 0.5,logowidth * 0.35));
	// // l3h = random(logoheight * 0.1, logoheight * 0.8);
	// l3h = logoheight * 0.5;
	// l4w = min(abs(logowidth - l1w - l2w - l3w) , logowidth * 0.35) ;
	// // if (l4w < 30){ // making sure 4th is not too narrow
	// // 	l3w -= 30 - l4w;
	// // 	l4w = 30;
	// // }
	// let minwidth = 50;
	// if (l4w < minwidth){ // making sure 4th is not too narrow
	// 	l3w -= minwidth - l4w;
	// 	l4w = minwidth;
	// }
	// // l4h = random(logoheight * 0.1, logoheight * 0.8);
	// l4h = logoheight * 0.5;
	// // console.log("l1", int(l1w), int(l1h), "l2", int(l2w), int(l2h), "l3", int(l3w), int(l3h), "l4", int(l4w), int(l4h));
	// l1 = new Letter(width-l1w-margins, margins, l1w, l1h, color('rgb(0,0,255)'), a);
	// l2 = new Letter(width-l1w-l2w-margins, margins, l2w, l2h, color('rgb(0,200,255)'), b);
	// l3 = new Letter(width-l1w-l2w-l3w-margins, margins, l3w, l3h, color('rgb(100,200,100)'), c);
	// l4 = new Letter(margins, margins, l4w, l4h, color('rgb(255,200,100)'), d);
	//
	// // second word
	// l5w = l1w;
	// // l5h = random(logoheight * 0.1,l1h);
	// // does the lower letter need max of upper or of logosize? -> of logosize. o.w. dosen't reach bottom
	// l5h = logoheight - l1h; // handler for lowest line
	// l6w = l2w;
	// l6h = logoheight - l2h;
	// l7w = l3w;
	// l7h = logoheight - l3h; // handler for lowest line
	// l8w = l4w;
	// l8h = logoheight - l4h;
	// // console.log("l5", int(l5w), int(l5h), "l6", int(l6w), int(l6h), "l7", int(l7w), int(l7h), "l8", int(l8w), int(l8h));
	// l5 = new Letter(width-l1w-margins, margins+l1h, l5w, l5h, color('rgb(100,0,100)'), e);
	// l6 = new Letter(width-l1w-l2w-margins, margins+l2h, l6w, l6h, color('rgb(255,200,0)'), f);
	// l7 = new Letter(width-l1w-l2w-l3w-margins, margins+l3h, l7w, l7h, color('rgb(255,0,100)'), g);
	// l8 = new Letter(margins, margins+l4h, l8w, l8h, color('rgb(255,50,50)'), h);
	//
	// widest = int(max(l1w, l2w, l3w, l4w));
	// narrowest = int(min(l1w, l2w, l3w, l4w));
	//
	// // TODO:make iterator
	// l1.display();
	// l2.display();
	// l3.display();
	// l4.display();
	// l5.display();
	// l6.display();
	// l7.display();
	// l8.display();
	//
	// // TODO: here do animate
	noLoop();

	// ----
	// Export to SVG
	// save("mySVG.svg"); // give file name
	// print("saved svg");
	// noLoop(); // we just want to export once

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
		// fill(this.c);
		// rect(this.x, this.y, this.w, this.h);

		// control DOM letters
		// TODO fit text perfect!
		// this.div.style('height', this.h +'px');
		// this.div.style('line-height', this.h*0.37 +'px');
		this.div.style('line-height', this.h +'px');
		// this.div.style('width', this.w +'px');
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
