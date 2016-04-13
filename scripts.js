function testResults(unit, isPassed) {
	var result = document.createElement('p');
	result.innerHTML = 'Ex:' + unit + (isPassed ? ' passed' : 'failed');
	document.body.appendChild(result);
}

// Ex 1
function add(a, b) {
			return a + b;
}
function sub(a, b) {
	return a - b;
}
function mul(a, b) {
	return a * b;
}
var case1 = (expect(add(1,2)).toBe(3) &&
		expect(sub(1,2)).toBe(-1) &&
		expect(mul(2,2)).toBe(4));
testResults('1', case1);


// Ex 2
function identityf(x) {
	return function () {
		return x;
	}
}
var case2 = (expect(identityf).withArgs(3).toBeA(Function) &&
		expect(identityf(3)()).toBe(3));
testResults('2', case2);


// Ex 3
function addf(x) {
	return function (y) {
		return x + y;
	}
}
var case3 = (expect(addf).withArgs(3).toBeA(Function) &&
		expect(addf(3)(4)).toBe(7));
testResults('3', case3);


// Ex 4
function curry(func, x) {
	return function (y) {
		return func(x, y);
	}
}
var case4 = (expect(curry).withArgs(add, 3).toBeA(Function) &&
	expect(curry(add, 3)(4)).toBe(7) &&
	expect(curry).withArgs(sub, 3).toBeA(Function) &&
	expect(curry(sub, 3)(4)).toBe(-1) &&
	expect(curry).withArgs(mul, 3).toBeA(Function) &&
	expect(curry(mul, 3)(4)).toBe(12))
testResults('4', case4);


// Ex 5
function curryr(func, y) {
	return function (x) {
		return func(x, y);
	}
}
var case5 = (expect(curryr).withArgs(add, 3).toBeA(Function) &&
		expect(curryr(add, 3)(4)).toBe(7) &&
		expect(curryr).withArgs(sub, 3).toBeA(Function) &&
		expect(curryr(sub, 3)(4)).toBe(1) &&
		expect(curryr).withArgs(mul, 3).toBeA(Function) &&
		expect(curryr(mul, 3)(4)).toBe(12));
testResults('5', case5);


// Ex 6
function liftf(func) {
	return function (x) {
		return curry(func, x)
	}
}
var case6 = (expect(liftf).withArgs(add).toBeA(Function) &&
		expect(liftf(add)).withArgs(3).toBeA(Function) &&
		expect(liftf(add)(3)(4)).toBe(7) &&
		expect(liftf).withArgs(sub).toBeA(Function) &&
		expect(liftf(sub)).withArgs(3).toBeA(Function) &&
		expect(liftf(sub)(3)(4)).toBe(-1) &&
		expect(liftf).withArgs(mul).toBeA(Function) &&
		expect(liftf(mul)).withArgs(3).toBeA(Function) &&
		expect(liftf(mul)(3)(4)).toBe(12));
testResults('6', case6);


// Ex 7
var inc1 = curry(add, 1),
	inc2 = curryr(add, 1),
	inc3 = liftf(add)(1),
	inc4 = addf(1),
	inc5 = identityf(addf(1))();
var case7 = (expect(inc1(3)).toBe(4) &&
		expect(inc2(3)).toBe(4) &&
		expect(inc3(3)).toBe(4) &&
		expect(inc4(3)).toBe(4) &&
		expect(inc5(3)).toBe(4));
testResults('7', case7);


// Ex 8
function twice(func) {
	return function (x) {
		return func(x, x);
	}
}
var doubl = twice(add),
	square = twice(mul);
var case8 = (expect(doubl).toBeA(Function) &&
		expect(doubl(11)).toBe(22) &&
		expect(square).toBeA(Function) &&
		expect(square(11)).toBe(121));
testResults('8', case8);


// Ex 9
function reverse(func) {
	return function (x, y) {
		return func(y, x);
		// return liftf(func)(y)(x);
		// return curry(func, y)(x);
	}
}
var bus = reverse(sub);
var case9 = (expect(bus).toBeA(Function) &&
		expect(bus(3, 2)).toBe(-1));
testResults('9', case9);



// Ex 10
function composeu(func1, func2) {
	return function(x) {
		return func2(func1(x));
	}
}
var case10 = (expect(composeu(doubl, square)).toBeA(Function) &&
expect(composeu(doubl, square)(5)).toBe(100));
testResults('10', case10);



// Ex 11
function composeb(func1, func2) {
	return function (x, y, z) {
		return func2(func1(x, y), z);
	}
}
var case11 = (expect(composeu(add, mul)).toBeA(Function) &&
		expect(composeb(add, mul)(2, 3, 7)).toBe(35));
testResults('11', case11);



// Ex 12
function limit(func, x) {
	return function(y, z) {
		if (x > 0) {
			x -= 1;
			return func(y, z);
		}
	}
}
var add_ltd = limit(add, 1),
	add_ltd2 = limit(add, 2);
var case12 = (expect(add_ltd(3, 4)).toBe(7) &&
		expect(add_ltd(3, 4)).toBe(undefined) &&
		expect(add_ltd2(3, 4)).toBe(7) &&
		expect(add_ltd2(3, 4)).toBe(7) &&
		expect(add_ltd2(3, 4)).toBe(undefined));
testResults('12', case12);


// Ex 13: generator
function from(x) {
	return function () {
		x += 1;
		return x - 1;
	}
}
var index = from(0);
var case13 = (expect(index()).toBe(0) &&
		expect(index()).toBe(1) &&
		expect(index()).toBe(2) &&
		expect(index()).toBe(3) &&
		expect(index()).toBe(4));
testResults('13', case13);


// Ex 14: limit generator
function to(gen, lim) {
	return function () {
		var newVal = gen();
		if (newVal < lim) {
			return newVal;
		}
	}
}
var index = to(from(3), 5);
var case14 = (expect(index()).toBe(3) &&
		expect(index()).toBe(4) &&
		expect(index()).toBe(undefined));
testResults('14', case14);


// Ex 15
function fromTo(x, y) {
	return to(from(x), y);
}
var index = fromTo(3, 5);
var case15 = (expect(index()).toBe(3) &&
expect(index()).toBe(4) &&
expect(index()).toBe(undefined));
testResults('15', case15);


// Ex 16
function element(arr, gen) {
	return function () {
		var newIdx = gen();
		if (newIdx !== undefined) {
			return arr[newIdx];
		}
	}
}
var ele = element(["a", "b", "c", "d"], fromTo(1, 3));
var case16 = (expect(ele()).toBe('b') && expect(ele()).toBe('c'));
testResults('16', case16);


// Ex 17
function element2(arr, gen) {
	if (gen === undefined) {
		gen = fromTo(0, arr.length);
	}
	return function () {
		var newIdx = gen();
		if (newIdx !== undefined) {
			return arr[newIdx];
		}
	}
}
var ele = element2(["a", "b", "c", "d"]);
var case17 = (expect(ele()).toBe('a') &&
		expect(ele()).toBe('b') &&
		expect(ele()).toBe('c') &&
		expect(ele()).toBe('d'));
testResults('17', case17);


// Ex 18
function collect(gen, arr) {
	return function () {
		var res = gen();
		if (res !== undefined) {
			arr.push(res);
			return res;
		}
	}
}
var array = [],
	col = collect(fromTo(0, 2), array);
var case18 = (expect(col()).toBe(0) &&
	expect(col()).toBe(1) &&
	expect(col()).toBe(undefined) &&
	expect(array).toEqual([0, 1]));
testResults('18', case18);
