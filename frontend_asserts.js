// Assert 1/9
let inst = new JobSeeker();
console.assert(
    inst == 1 && inst == 3 && inst == 5
);

// Assert 2/9
let inst = new JobSeeker();
console.assert(
    inst.calc(2)(2)(3)((x, y) => x + y) === 7
    && inst.calc(1)(5)(2)((x, y) => x * y) === 10
    && inst.calc(16)(8)((x, y) => x / y) === 2
);

// Assert 3/9
let data;
console.assert(
    typeof (data = JSON.parse(new JobSeeker().data)) === "object"
    && data.hasOwnProperty("\u{0030}")
    && typeof Object.values(data)[0] === "object"
    && Boolean(data[+false]) === false
);

// Assert 4/9
let inst = new JobSeeker();
document.querySelector("#some-element").innerHTML = inst.seekerCard;
inst.getSeekerInfo().then(info => {
    console.assert(
        /^[А-Я][-а-я]+\s[А-Я]\.$/.test(info.get("name") || "")
        && parseInt(info.get("age") || "0") >= 18
        && /^[дгп]\.\s[А-Я][-А-Яа-я]+$/.test(info.get("city"))
        && (info.get("skills") || "").split(",").filter(v => !!v).length >= 5
    );
});

// Assert 5/9
let num = [1462, 3552, 4356, 6, 56766, 99];
let res = Array.from(new JobSeeker().getMod256(num));
console.assert(
    res.length === num.length
    && res.every((v, i) => v === num[i] % 256)
);

// Assert 6/9
console.assert(
    "0123456789" === new JobSeeker().correctHtml(`
        <div>0<b><span>1</span>2</b></div>
        <div>0<div><b><span>1</span>2</b><span>4</span>3</div></div>
        <div>5<span><b>6</b>7</span>8<span><b>8</b></span></div>
    `)
);

// Assert 7/9
console.assert(
    String instanceof JobSeeker
    && !("" instanceof JobSeeker)
    && Number instanceof JobSeeker
    && !(5 instanceof JobSeeker)
    && {} instanceof JobSeeker
    && [] instanceof JobSeeker
);

// Assert 8/9
let inst = new JobSeeker();
let el = inst.getElement();
console.assert(
    el.offsetWidth === 100
    && el.style.width === "200px"
    && el.style.borderLeftWidth === "5px"
    && el.offsetLeft === 0
    && el.getBoundingClientRect().left > 20
    && el.style.backgroundColor === "rgba(17, 34, 51, 0)"
);

// Assert 9/9
let inst = new JobSeeker();
console.assert(
    inst.findPrimeNumbers(8) == "2,3,5,7"
    && inst.findPrimeNumbers(31) == "2,3,5,7,11,13,17,19,23,29,31"
    && inst.findPrimeNumbers(1000)[167] === 997
);
