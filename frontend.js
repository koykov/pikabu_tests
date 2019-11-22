// JavaScript ES6+
// последний Google Chrome, FireFox

/**
 * JavaScript класс-стенд с академическими задачами.
 * Небходимо заполнить все пропуски в классе так, чтобы он
 * удовлетворял поставленным assert'ам.
 */
class JobSeeker {
    /**
     * Assert #1
     */
    constructor() {
        let a = 0;
        this['valueOf'] = () => a +++ a;
    }

    /**
     * Assert #2
     */
    calc(arg) {
        let args = [arg];
        const fn = (arg) => typeof arg === 'function'
            ? args.reduce(arg)
            : args.push(arg) && fn;
        return fn;
    }

    /**
     * Assert #3
     */
    get data() {
        return '{"0":null}';
    }

    /**
     * Assert #4
     * Возвращает HTML инфо-карточки соискателя.
     * Пожалуйста, заполните карточку достоверной информацией о вас.
     */
    get seekerCard() {
        return `
            <seeker-card>
                <my-info>
                    <my-name>Войков К.</my-name>
                    <my-age>34</my-age>
                </my-info>
                <loc-info>
                    (<loc-city>г. Кишинев</loc-city>)
                </loc-info>
                <prof-info>
                    (<prof-skills>backend, php, go, c++, frontend, vue.js, 11 year exp</prof-skills>)
                </prof-info>
            </seeker-card>
        `;
    }

    /**
     * Assert #4
     * Возвращает информацию о соискателе
     */
    async getSeekerInfo() {
        const repo = self['customElements'];
        const listen = name => new Promise(resolve => {
            repo.define(
                name,
                class extends HTMLElement {
                    constructor() {
                        super();
                        resolve([
                            name.replace(/^.+-/, ''),
                            this.innerText
                        ]);
                    }
                }
            );
        });
        let queue = Promise.all('my-name,my-age,loc-city,prof-skills'.split(',').map(listen));
        repo.upgrade(document.body);
        return new Map(await queue);
    }

    /**
     * Assert #5
     * Трансформирует числа в массиве по модулю 256
     */
    *getMod256(numbers) {
        return yield* new Uint8Array(numbers);
    }

    /**
     * Assert #6
     * Корректирует полученный HTML путем DOM преобразований
     */
    correctHtml(html) {
        let f = document.createElement('div');
        f.innerHTML = html;

        f.querySelectorAll('div:nth-last-child(3)')
            .forEach(el => el.remove());

        let el = f.querySelector('div>div>span');
        el.parentNode.insertBefore(el.nextSibling, el);

        el = f.getElementsByTagName('div')[2]
            .childNodes[3]['firstElementChild'];

        el.textContent = String(parseInt(el.textContent) + 1);

        return f.innerText.replace(/\s/g, '');
    }

    /**
     * Assert #7
     * Вспомогательный метод с сакральным смыслом :)
     */
    static [Symbol.hasInstance](arg) {
        return arg === new function() {
            return arg;
        };
    }

    /**
     * Assert #8
     * Возвращает стилизованный элемент
     */
    getElement() {
        let el = document.createElement('div');
        el.style.cssText = 'position: absolute; left: 0; opacity: 0';
        let shadow = el.attachShadow({mode: 'closed'});
        let el2 = document.createElement('div');
        let css = `border-left-style:solid;width:200px;border-left-width:5px;transform: scaleX(0.5);display:inline-block;max-width:95px;background-color:#11223300;`;

        // *зловещий смех* https://gph.to/2QaeWey
        css = css.replace(/rgba?/gi, '');

        el2.style.cssText = css;
        shadow.appendChild(el2);
        document.body.appendChild(el);
        return el2;
    }

    /**
     * Assert #9
     * Находит все простые числа до указанного числа.
     * Для поиска используется мощности видеокарты (а-ля GPGPU).
     */
    findPrimeNumbers(max) {
        let size = Math.ceil(Math.sqrt(2 ** Math.log2(max + 2))),
            plane = [-1, -1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1],
            out = new Uint8Array(size ** 2 * 4);

        let c = document.createElement('canvas');
        c.height = c.width = size;
        let gl = c.getContext('webgl');

        const createShader = (type, glslCode) => {
            let shader = gl.createShader(type);
            gl.shaderSource(shader, glslCode);
            gl.compileShader(shader);
            return shader;
        };

        let prg = gl.createProgram();

        gl.attachShader(prg, createShader(gl.VERTEX_SHADER, `
            attribute vec4 aVertices;
            void main(void) {
                gl_Position = aVertices;
            }
        `));

        gl.attachShader(prg, createShader(gl.FRAGMENT_SHADER, `
            precision mediump float;
            uniform int uColumns;
            void main(void) {
                int num = int(gl_FragCoord.y) * uColumns + int(gl_FragCoord.x);
                gl_FragColor.x = 1.0;

                for (int i = 2; i < 1024; i++) {
                    if (i >= num) {
                        break;
                    }

                    if (num - (i * int(floor(float(num / i)))) == 0) {
                        // the number is not prime
                        gl_FragColor.x = 0.0;
                        break;
                    }
                }
            }
        `));

        gl.linkProgram(prg);
        gl.useProgram(prg);

        let location = gl.getAttribLocation(prg, 'aVertices');
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(plane), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, plane.length / 6, gl.FLOAT, false, 0, 0);
        gl.uniform1i(gl.getUniformLocation(prg, 'uColumns'), size);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.readPixels(0, 0, size, size, gl.RGBA, gl.UNSIGNED_BYTE, out);

        return [...out]
            .map((v, i) => i % 4 === 0 && v === 255 ? i >> 0b10 : 0)
            .filter(v => v !== 0 && v <= max)
            .splice(1);
    }
}
