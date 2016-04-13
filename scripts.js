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
