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


// Ex 2
function identityf(x) {
	return function () {
		return x;
	}
}
expect(identityf).withArgs(3).toBeA(Function);
expect(identityf(3)()).toBe(3);


// Ex 3
function addf(x) {
	return function (y) {
		return x + y;
	}
}
expect(addf).withArgs(3).toBeA(Function);
expect(addf(3)(4)).toBe(7);


// Ex 4
function curry(func, x) {
	return function (y) {
		return func(x, y);
	}
}
expect(curry).withArgs(add, 3).toBeA(Function);
expect(curry(add, 3)(4)).toBe(7);
expect(curry).withArgs(sub, 3).toBeA(Function);
expect(curry(sub, 3)(4)).toBe(-1);
expect(curry).withArgs(mul, 3).toBeA(Function);
expect(curry(mul, 3)(4)).toBe(12);


// Ex 5
function curryr(func, y) {
	return function (x) {
		return func(x, y);
	}
}
expect(curryr).withArgs(add, 3).toBeA(Function);
expect(curryr(add, 3)(4)).toBe(7);
expect(curryr).withArgs(sub, 3).toBeA(Function);
expect(curryr(sub, 3)(4)).toBe(1);
expect(curryr).withArgs(mul, 3).toBeA(Function);
expect(curryr(mul, 3)(4)).toBe(12);


// Ex 6
function liftf(func) {
	return function (x) {
		return curry(func, x)
	}
}
expect(liftf).withArgs(add).toBeA(Function);
expect(liftf(add)).withArgs(3).toBeA(Function);
expect(liftf(add)(3)(4)).toBe(7);
expect(liftf).withArgs(sub).toBeA(Function);
expect(liftf(sub)).withArgs(3).toBeA(Function);
expect(liftf(sub)(3)(4)).toBe(-1);
expect(liftf).withArgs(mul).toBeA(Function);
expect(liftf(mul)).withArgs(3).toBeA(Function);
expect(liftf(mul)(3)(4)).toBe(12);


// Ex 7
var inc1 = curry(add, 1),
	inc2 = curryr(add, 1),
	inc3 = liftf(add)(1),
	inc4 = addf(1),
	inc5 = identityf(addf(1))();
expect(inc1(3)).toBe(4);
expect(inc2(3)).toBe(4);
expect(inc3(3)).toBe(4);
expect(inc4(3)).toBe(4);
expect(inc5(3)).toBe(4);
