// Assert 1/8
console.assert(
	new JobSeeker().buildArray(1)(2)(3)(4)(function () {
		return this.filter(x => x & 1 === 1);
	}).join(",") === "1,3"
);

// Assert 2/8
let inst = new JobSeeker();
let f = String.fromCharCode(0b110);
console.assert(
	inst[f]++ === ++inst[f]
	&& inst[f] - 1 === inst[f] / 15
);

// Assert 3/8
let el = new JobSeeker().getCardElement();
console.assert(
	/^[А-Я][-а-я]+\s[А-Я]\.$/.test(
		el.querySelector('*:only-child > span:empty + my-name').textContent
	)
	&& /^[гдп]\.\s[А-Яа-я]+$/.test(
		el.querySelectorAll('.my-city')[1].dataset.cityName
	)
	&& parseInt(el.querySelector('[data-my-age]:out-of-range').value) > 18
);

// Assert 4/8
let str1 = "Hello\xA0World";
let str2 = "Hello\x20World";
console.assert(
	str1 !== str2
	&& (new JobSeeker()).isEqualStrings(str1, str2)
);

// Assert 5/8
let inst = new JobSeeker();
console.assert(
	inst.formatNumbers(1, 233, 3, 22) === "4550652"
	&& inst.formatNumbers(332, 12, 2) === "1210532"
	&& inst.formatNumbers(44, 232, 342, 1) === "3227250735"
);

// Assert 6/8
let i;
console.assert(
	(i = new JobSeeker()) instanceof JobSeeker
	&& new new new new new JobSeeker(i--)(i--)(i--)(i--)(i--) instanceof JobSeeker
);

// Assert 7/8
let mix = "<div><p>X</p><p>Y</p></div>".repeat(~~(Math.random() * 10));
console.assert(
	new JobSeeker().modifyHtmlFragment(
		"#556611ff",
		`${mix}<div><p>1</p></div>${mix}
		<div><p>2</p>,<p>3</p>,<p>4</p></div>${mix}<div><p>5</p></div>${mix}`
	).textContent.replace(/[\s,]/g, "") === "12436"
);

// Assert 8/8
let labyrinth = "./img/frontend-2/jW139sS3a2.png";
new JobSeeker().findExit(labyrinth).then(
	res => console.assert(res),
	() => console.assert(false)
);
