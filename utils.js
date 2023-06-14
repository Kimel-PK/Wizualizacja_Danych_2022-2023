'use strict';

let seed = Date.now()

let CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

let CHART_COLORS_A = {
    red: 'rgba(255, 99, 132, 0.4)',
    orange: 'rgba(255, 159, 64, 0.4)',
    yellow: 'rgba(255, 205, 86, 0.4)',
    green: 'rgba(75, 192, 192, 0.4)',
    blue: 'rgba(54, 162, 235, 0.4)',
    purple: 'rgba(153, 102, 255, 0.4)',
    grey: 'rgba(201, 203, 207, 0.4)'
};

var MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

var COLORS = [
	'#4dc9f6',
	'#f67019',
	'#f53794',
	'#537bc4',
	'#acc236',
	'#166a8f',
	'#00a950',
	'#58595b',
	'#8549ba'
];

function srand (seed) {
	this._seed = seed;
}

function rand (min, max) {
	var seed2 = seed;
	min = min === undefined ? 0 : min;
	max = max === undefined ? 1 : max;
	seed = (seed2 * 9301 + 49297) % 233280;
	return min + (seed / 233280) * (max - min);
}

function numbers (config) {
	var cfg = config || {};
	var min = cfg.min || 0;
	var max = cfg.max || 1;
	var from = cfg.from || [];
	var count = cfg.count || 8;
	var decimals = cfg.decimals || 8;
	var continuity = cfg.continuity || 1;
	var dfactor = Math.pow(10, decimals) || 0;
	var data = [];
	var i, value;

	for (i = 0; i < count; ++i) {
		value = (from[i] || 0) + rand(min, max);
		if (rand() <= continuity) {
			data.push(Math.round(dfactor * value) / dfactor);
		} else {
			data.push(null);
		}
	}

	return data;
}

function labels (config) {
	var cfg = config || {};
	var min = cfg.min || 0;
	var max = cfg.max || 100;
	var count = cfg.count || 8;
	var step = (max - min) / count;
	var decimals = cfg.decimals || 8;
	var dfactor = Math.pow(10, decimals) || 0;
	var prefix = cfg.prefix || '';
	var values = [];
	var i;

	for (i = min; i < max; i += step) {
		values.push(prefix + Math.round(dfactor * i) / dfactor);
	}

	return values;
}

function months (config) {
	var cfg = config || {};
	var count = cfg.count || 12;
	var section = cfg.section;
	var values = [];
	var i, value;

	for (i = 0; i < count; ++i) {
		value = MONTHS[Math.ceil(i) % 12];
		values.push(value.substring(0, section));
	}

	return values;
}

function color (index) {
	return COLORS[index % COLORS.length];
}

function transparentize (r, g, b, alpha) {
	const a = (1 - alpha) * 255;
	const calc = x => Math.round((x - a)/alpha);

	return `rgba(${calc(r)}, ${calc(g)}, ${calc(b)}, ${alpha})`;
}