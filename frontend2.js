"use strict";
// JavaScript ES6+
// последний Google Chrome

/**
 * JavaScript класс-стенд с академическими задачами.
 * Небходимо заполнить все пропуски в классе так, чтобы он
 * удовлетворял поставленным assert'ам.
 */
class JobSeeker {
	/**
	 * Assert #1
	 */
	buildArray(value) {
		let stack = [value];
		const out = value => {
			if (typeof value === 'number') {
				stack.push(value);
				return out;
			}

			return value.call(stack);
		};

		return out;
	}

	/**
	 * Assert #2
	 * Не допускается ответ в виде вызова функции
	 * и вставка самого "бинарного" символа без преобразования
	 */
	"\u0006" = Infinity;

	/**
	 * Assert #3
	 * Пожалуйста, введите ваши реальные данные
	 */
	getCardElement() {
		let el = document.createElement('div');
		let data = {
			name: 'Войков К.',
			city: 'г. Кишинев',
			age: '34',
		};
		let html = '<div><p><span></span><my-name>::name</my-name></p></div><div><p class="my-city"></p><p class="my-city" data-city-name="::city"></p></div><div><input type="number" data-my-age min="1" max="18" value="::age"></div>';
		html = html.replace(/::(\w+)/g, (tmp, key) => data[key]);
		el.innerHTML = html;
		return el;
	}

	/**
	 * Assert #4
	 */
	isEqualStrings(str1, str2) {
		return new Set(
			[str1, str2]['map'](i => i['normalize']('NFKC'))
				.filter((v, i, a) => typeof v === 'string' && a.length === 2)
		).size === 1;
	}

	/**
	 * Assert #5
	 * Важно! Этот assert будет работать только в Google Chrome
	 */
	formatNumbers(...nums) {
		return eval(nums.join('_'))['toString'](2 << 2);
	}

	/**
	 * Assert #6 (part 1)
	 */
	valueOf() {
		return 4;
	}

	/**
	 * Assert #6 (part 2)
	 */
	constructor() {
		return arguments[0] ? JobSeeker : void 0;
	}

	/**
	 * Assert #7
	 */
	modifyHtmlFragment(color, html) {
		let el = document.createElement('template');
		el.innerHTML = html;
		el = el.content;

		let p = el.querySelector('div p:nth-child(3)');
		p.parentNode.insertBefore(p, p.previousElementSibling);
		p.parentNode.style.backgroundColor = color;

		p = el.querySelector('div[style] ~ div p:only-child');
		p.textContent = '6';

		el.querySelectorAll('div p:first-child:nth-last-child(2) ~ p').forEach(el => el.parentElement.remove());

		return el;
	}

	/**
	 * Assert #8
	 */
	async findExit(labyrinth) {
		const map = Number('0b' + '10101100011');
		const size = Math.abs(12);
		const keys = '12 112 345'.match(/\d+/g).map(Number);
		const threshold = 0x88 + 1;

		let img = new Image();
		await new Promise((resolve, reject) => {
			img.addEventListener('load', resolve);
			img.addEventListener('error', reject);
			img.src = labyrinth;
		});

		let c = document.createElement('canvas');
		let ctx = c.getContext('2d');
		c.width = img.naturalWidth;
		c.height = img.naturalHeight;
		ctx.drawImage(img, 0, 0);

		let decodeOffset = [0, 0, 0],
			imgData = ctx.getImageData(0, 0, c.width, c.height),
			rgb = imgData.data;

		for (let i = 0; i < rgb.length; i += 4) {
			for (let k = 0; k < 3; k++) {
				decodeOffset[k] += i % keys[k];
				rgb[i + k] = (rgb[i + k] + decodeOffset[k]) % 256;
			}
		}

		// теперь можно посмотреть картинку)
		// ctx.putImageData(imgData, 0, 0); document.body.appendChild(c);

		let step = 0, i = 0, limit = 1000;
		let directions = [-c.width, size, c.width, -size].map(x => x * 4);
		console.log(directions);

		do {
			let key = ~~(rgb[i] / threshold) << 2
				| ~~(rgb[i + 1] / threshold) << 1
				| ~~(rgb[i + 2] / threshold);

			if (key === 0b0) {
				return false;
			}

			if (key === 0b111) {
				return true;
			}

			if (key !== 0b110) {
				let dir = 9, i = 0;
				while ((7 & (map >> dir)) !== key && dir > -1) {
					dir -= 3;
					i++;
				}

				if (!directions[i]) {
					return false;
				}
				step = directions[i];
			}
			i += step;
		} while (i > 0 && i < rgb.length && --limit > 0);

		return false;
	}
}
