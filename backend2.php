<?php

// PHP 7.2
// Charset: Windows-1251

/**
 * Класс-стенд с академическими задачами #2.
 * Небходимо заполнить все пропуски в классе так, чтобы он
 * удовлетворял поставленным assert'ам
 */
class JobSeeker {
    /**
     * Assert #1
     */
    public static function questClassSearch(): bool {
        return spl_autoload_register(function (string $c): void {
            class_alias(self::class, $c);
        });
    }

    /**
     * Assert #2
     */
    public function questString(string $str): bool {
        $name1 = 'call_user_func';
        $name2 = 'md5';
        return $name1 <> $name2
            && $name1($name2, $str) === $name2($str)
            && strlen($name2($str, true)) === 020;
    }

    /**
     * Assert #3
     * Пожалуйста, введите достоверную информацию о себе.
     */
    public function questGreeting(string $format) {
        $greeting = sprintf(
            $format,
            ...explode(',', '34,г. Кишинев,Константин')
        );
        settype($greeting, 'object');
        return $greeting;
    }

    /**
     * Assert #4
     */
    public function questReducer(string $str): string {
        return str_replace(str_split('xyzyyy', 2), '', $str);
    }

    /**
     * Assert #5
     */
    public function questKey(int $key, int $i, int $j): bool {
        $i = ($i & 15) << 4;
        $j = ($j >> 5) ^ 0;
        return ($i | $j) === $key;
    }

    /**
     * Assert #6
     */
    public function questRegExp(string $str): string {
        $str = preg_replace(
            "/[female;]*(\d+)\.*\d*;.*(mr|ms);'([^;]+)'.*/",
            '$2. $3 has $1 coins',
            $str
        );
        return stripslashes($str);
    }

    /**
     * Assert #7
     */
    public function __get($arg) {
        return new class((is_callable($this) ? $this() : 0) + $arg) extends JobSeeker {

            protected $arg = 0;

            public function __invoke() {
                return $this->arg;
            }

            public function __construct($arg) {
                $this->arg = $arg;
            }
        };
    }

    /**
     * Assert #8
     */
    public function questLabyrinth(int $length, ...$map): bool {
        $path = '1001101111333111001101';
        $linesCount = count($map);
        foreach ($map as &$line) {
            $line = str_split(str_pad(decbin($line), $length, '0', STR_PAD_LEFT));
            foreach ($line as &$cell) {
                $cell = (int)$cell + 1;
            }
        }

        $x = 0;
        $y = 0;
        $i = 0;
        while (
            $y >= 0
            && $y < $linesCount
            && $x < $length
            && $map[$y][$x] === 1
            && $i < strlen($path)
        ) {
            $moveY = $map[$y][$x] <=> $path[$i++];
            $x += $moveY === 0 ? 1 : 0;
            $y += $moveY;
        }

        return $x === $length - 1 && $y === $linesCount - 1;
    }
}
