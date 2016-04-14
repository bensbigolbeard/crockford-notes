function testResults(unit) {
	var result = document.createElement('p');
	result.innerHTML = 'Ex:' + unit + ' passed';
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
expect(add(1,2)).toBe(3);
expect(sub(1,2)).toBe(-1);
expect(mul(2,2)).toBe(4);
testResults('1');


// Ex 2
function identityf(x) {
	return function () {
		return x;
	}
}
expect(identityf).withArgs(3).toBeA(Function);
expect(identityf(3)()).toBe(3);
testResults('2');


// Ex 3
function addf(x) {
	return function (y) {
		return x + y;
	}
}
expect(addf).withArgs(3).toBeA(Function);
expect(addf(3)(4)).toBe(7);
testResults('3');


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
		}
		return res;
	}
}
var array = [],
	col = collect(fromTo(0, 2), array);
var case18 = (expect(col()).toBe(0) &&
	expect(col()).toBe(1) &&
	expect(col()).toBe(undefined) &&
	expect(array).toEqual([0, 1]));
testResults('18', case18);


// Ex 19
function filter(gen, func) {
	return function recur() {
		var val = gen();
		if (val === undefined || func(val)) {
			return val;
		} else {
			return recur();
		}
	}
}
var fil = filter(fromTo(0, 5), function third(value) {
	return (value % 3) === 0;
});
var case19 = (expect(fil()).toBe(0) &&
		expect(fil()).toBe(3));
testResults('19', case19);


// Ex 20
function concat(gen1, gen2) {
	return function () {
		var val = gen1();
			val = val !== undefined ? val : gen2();

		if (val !== undefined) {
			return val;
		}
	}
}
var con = concat(fromTo(0, 3), fromTo(0, 2));
expect(con()).toBe(0);
expect(con()).toBe(1);
expect(con()).toBe(2);
expect(con()).toBe(0);
expect(con()).toBe(1);
expect(con()).toBe(undefined);
testResults('20');


// Ex 21
function gensymf(series) {
	var val = from(1);
	return function () {
		return series + val();
	}
}
var geng = gensymf("G");
var genh = gensymf("H");
expect(geng()).toBe('G1');
expect(genh()).toBe('H1');
expect(geng()).toBe('G2');
expect(genh()).toBe('H2');
testResults('21');


// Ex 22
function fibonaccif(x, y) {
	var current,
		next,
		temp;
	return function () {
		if (current === undefined) {
			current = x;
			next = y;
		} else {
			temp = current + next;
			current = next;
			next = temp;
		}
		return current
	}
}
var fib = fibonaccif(0, 1);
expect(fib()).toBe(0);
expect(fib()).toBe(1);
expect(fib()).toBe(1);
expect(fib()).toBe(2);
expect(fib()).toBe(3);
expect(fib()).toBe(5);
testResults('22');


// Ex 23
function counter(start) {
	return {
		up: function () {
			return start += 1;
		},
		down: function () {
			return start -= 1;
		}
	}
}
var object = counter(10);
var up = object.up;
var down = object.down;
expect(up()).toBe(11);
expect(down()).toBe(10);
expect(down()).toBe(9);
expect(up()).toBe(10);
testResults('23');


// Ex 24
function revocable(func) {
	var revoked = false;
	return {
		invoke: function (x, y) {
			return !revoked ? func(x, y) : undefined;
		},
		revoke: function () {
			revoked = true;
		}
	}
}
var rev = revocable(add);
var add_rev = rev.invoke;
expect(add_rev(3, 4)).toBe(7);
rev.revoke();
expect(add_rev(5, 7)).toBe(undefined);
testResults('24');


// Ex 25
function m(value, source) {
	return {
		value: value,
		source: (typeof source === 'string') ?
			source :
			String(value)
	}
}


function addm(m1, m2) {
	return m(
		m1.value + m2.value,
		'(' + m1.source + '+' + m2.source + ')'
	)
}
expect(addm(m(3), m(4))).toEqual({value:7,source:'(3+4)'});
expect(addm(m(1), m(Math.PI, 'pi'))).toEqual({value:4.141592653589793,source:'(1+pi)'});
testResults('25');


// Ex 26
function liftm(func, str) {
	return function (x, y) {
		return m(
			func(x.value, y.value),
			'(' + x.source + str + y.source + ')'
		)
	}
}
var addm = liftm(add, "+");
var mulm = liftm(mul, "*");
expect(addm(m(3), m(4))).toEqual({value:7, source:'(3+4)'});
expect(mulm(m(3), m(4))).toEqual({value:12, source:'(3*4)'});
testResults('26');


// Ex 27
function liftm2(func, str) {
	return function (x, y) {
		x = (typeof x === 'number') ? m(x) : x;
		y = (typeof y === 'number') ? m(y) : y;
		return m(
			func(x.value, y.value),
			'(' + x.source + str + y.source + ')'
		)
	}
}
var addm = liftm2(add, '+');
expect(addm(m(3), m(4))).toEqual({value:7, source:'(3+4)'});
expect(addm(3, m(4))).toEqual({value:7, source:'(3+4)'});
expect(addm(m(3), 4)).toEqual({value:7, source:'(3+4)'});
testResults('27');

// Ex 28
function addg(num) {
	var val = num;
	return (num === undefined) ? undefined :
		function helper(nextNum) {
			if (nextNum === undefined) {
				return val;
			}
			val += nextNum;
			return helper;
		};
}
expect(addg()).toBe(undefined);
expect(addg(2)(3)()).toBe(5);
expect(addg(2)(3)(4)()).toBe(9);
testResults('28');


// Ex 29
function liftg(func) {
	var val;
	if (func !== undefined) {
		return function helper(nextNum) {
			if (nextNum === undefined) {
				return val;
			}
			if (val === undefined) {
				val = nextNum;
			} else {
				val = func(val, nextNum);
			}
			return helper;
		};
	}
}
expect(liftg(mul)()).toBe(undefined);
expect(liftg(mul)(3)()).toBe(3);
expect(liftg(mul)(3)(0)(4)()).toBe(0);
expect(liftg(mul)(1)(2)(4)(8)()).toBe(64);
testResults('29');


// Ex 30
function arrayg(num) {
	var val = num !== undefined ? [num] : [];
	if (val.length > 0) {
		return function helper(nextNum) {
			if (nextNum === undefined) {
				return val;
			}
			val = val.concat(nextNum);
			return helper;
		};
	}
	return val;
}
expect(arrayg()).toEqual([]);
expect(arrayg(3)()).toEqual([3]);
expect(arrayg(3)(4)(5)()).toEqual([3, 4, 5]);
testResults('30');


// Ex 31
function continuize(func1) {
	return function (func2, num) {
		return func2(func1(num));
	}
}
var sqrtc = continuize(Math.sqrt);
sqrtc(alert, 81);
