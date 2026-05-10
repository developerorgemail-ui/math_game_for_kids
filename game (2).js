class MathGame {
    constructor() {
        this.score = 0;
        this.questionNumber = 0;
        this.currentQuestion = null;
        this.winThreshold = 10;

        this.questionElement = document.getElementById('question');
        this.questionTypeElement = document.getElementById('questionType');
        this.hintElement = document.getElementById('hint');
        this.answerInput = document.getElementById('answerInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.scoreElement = document.getElementById('score');
        this.questionCounter = document.getElementById('questionCounter');
        this.feedbackElement = document.getElementById('feedback');
        this.gameContent = document.getElementById('gameContent');
        this.winScreen = document.getElementById('winScreen');
        this.restartBtn = document.getElementById('restartBtn');

        this.setupEventListeners();
        this.generateQuestion();
    }

    setupEventListeners() {
        this.submitBtn.addEventListener('click', () => this.checkAnswer());
        this.answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });
        this.restartBtn.addEventListener('click', () => this.restart());
    }

    generateQuestion() {
        this.questionNumber++;
        const questionTypes = [
            'arithmetic',
            'fractions',
            'decimals',
            'probability',
            'rounding',
            'square',
            'wordproblem',
            'area'
        ];
        const type = questionTypes[this.randomInt(0, questionTypes.length - 1)];

        switch (type) {
            case 'arithmetic':
                this.generateArithmeticQuestion();
                break;
            case 'fractions':
                this.generateFractionQuestion();
                break;
            case 'decimals':
                this.generateDecimalQuestion();
                break;
            case 'probability':
                this.generateProbabilityQuestion();
                break;
            case 'rounding':
                this.generateRoundingQuestion();
                break;
            case 'square':
                this.generateSquareQuestion();
                break;
            case 'wordproblem':
                this.generateWordProblemQuestion();
                break;
            case 'area':
                this.generateAreaQuestion();
                break;
        }

        this.displayQuestion();
    }

    generateArithmeticQuestion() {
        const grade = this.randomInt(1, 4);
        let num1, num2, operator;

        if (grade === 1) {
            operator = this.randomChoice(['+', '-']);
            num1 = this.randomInt(1, 10);
            num2 = this.randomInt(1, 10);
            if (operator === '-' && num2 > num1) [num1, num2] = [num2, num1];
        } else if (grade === 2) {
            operator = this.randomChoice(['+', '-', '*']);
            if (operator === '*') {
                num1 = this.randomInt(1, 10);
                num2 = this.randomInt(1, 10);
            } else {
                num1 = this.randomInt(1, 50);
                num2 = this.randomInt(1, 50);
                if (operator === '-' && num2 > num1) [num1, num2] = [num2, num1];
            }
        } else if (grade === 3) {
            operator = this.randomChoice(['+', '-', '*', '/']);
            if (operator === '*') {
                num1 = this.randomInt(1, 12);
                num2 = this.randomInt(1, 12);
            } else if (operator === '/') {
                num2 = this.randomInt(1, 12);
                num1 = num2 * this.randomInt(1, 10);
            } else {
                num1 = this.randomInt(1, 100);
                num2 = this.randomInt(1, 100);
                if (operator === '-' && num2 > num1) [num1, num2] = [num2, num1];
            }
        } else {
            operator = this.randomChoice(['+', '-', '*', '/']);
            if (operator === '*') {
                num1 = this.randomInt(1, 20);
                num2 = this.randomInt(1, 15);
            } else if (operator === '/') {
                num2 = this.randomInt(1, 15);
                num1 = num2 * this.randomInt(1, 15);
            } else {
                num1 = this.randomInt(1, 200);
                num2 = this.randomInt(1, 200);
                if (operator === '-' && num2 > num1) [num1, num2] = [num2, num1];
            }
        }

        let question;
        let answer;
        if (operator === '+') {
            answer = num1 + num2;
            question = `${num1} + ${num2} = ?`;
        } else if (operator === '-') {
            answer = num1 - num2;
            question = `${num1} - ${num2} = ?`;
        } else if (operator === '*') {
            answer = num1 * num2;
            question = `${num1} × ${num2} = ?`;
        } else {
            answer = num1 / num2;
            question = `${num1} ÷ ${num2} = ?`;
        }

        this.currentQuestion = {
            type: 'arithmetic',
            question,
            answer,
            display: question
        };
    }

    generateFractionQuestion() {
        const subtype = this.randomChoice(['add', 'subtract', 'multiply', 'divide', 'simplify', 'convert', 'bodmas']);
        let question;
        let answer;

        if (subtype === 'simplify') {
            const numerator = this.randomInt(2, 12);
            const denominator = this.randomInt(2, 12);
            const factor = this.randomInt(2, 5);
            const num = numerator * factor;
            const den = denominator * factor;
            const reduced = this.reduceFraction(num, den);
            question = `Simplify ${num}/${den} to a reduced fraction.`;
            answer = reduced;
        } else if (subtype === 'convert') {
            const conversionType = this.randomChoice(['decimal', 'percent']);
            if (conversionType === 'decimal') {
                const fractions = [{ num: 1, den: 2 }, { num: 1, den: 4 }, { num: 3, den: 4 }, { num: 2, den: 5 }];
                const chosen = this.randomChoice(fractions);
                question = `Convert ${chosen.num}/${chosen.den} to a reduced fraction (same fraction form).`;
                answer = this.reduceFraction(chosen.num, chosen.den);
            } else {
                const options = [{ value: 25, num: 1, den: 4 }, { value: 50, num: 1, den: 2 }, { value: 75, num: 3, den: 4 }];
                const chosen = this.randomChoice(options);
                question = `Convert ${chosen.value}% to a reduced fraction.`;
                answer = this.reduceFraction(chosen.num, chosen.den);
            }
        } else if (subtype === 'bodmas') {
            const a = this.randomInt(1, 5);
            const b = this.randomInt(1, 5);
            const c = this.randomInt(1, 5);
            const d = this.randomInt(2, 6);
            const e = this.randomInt(1, 5);
            const f = this.randomInt(2, 6);
            const left = this.getFraction(a, d);
            const right = this.getFraction(b, e);
            const multiplier = this.getFraction(c, f);
            const sum = this.addFractions(left, right);
            answer = this.multiplyFractions(sum, multiplier);
            question = `Use BODMAS: (${left.num}/${left.den} + ${right.num}/${right.den}) × ${multiplier.num}/${multiplier.den} = ?`;
            answer = this.reduceFraction(answer.num, answer.den);
        } else {
            const fraction1 = this.getFraction(this.randomInt(1, 7), this.randomInt(2, 10));
            const fraction2 = this.getFraction(this.randomInt(1, 7), this.randomInt(2, 10));
            if (subtype === 'add') {
                answer = this.addFractions(fraction1, fraction2);
                question = `What is ${fraction1.num}/${fraction1.den} + ${fraction2.num}/${fraction2.den}?`;
            } else if (subtype === 'subtract') {
                if (this.compareFractions(fraction2, fraction1) > 0) {
                    [fraction1, fraction2] = [fraction2, fraction1];
                }
                answer = this.subtractFractions(fraction1, fraction2);
                question = `What is ${fraction1.num}/${fraction1.den} - ${fraction2.num}/${fraction2.den}?`;
            } else if (subtype === 'multiply') {
                answer = this.multiplyFractions(fraction1, fraction2);
                question = `What is ${fraction1.num}/${fraction1.den} × ${fraction2.num}/${fraction2.den}?`;
            } else {
                answer = this.divideFractions(fraction1, fraction2);
                question = `What is ${fraction1.num}/${fraction1.den} ÷ ${fraction2.num}/${fraction2.den}?`;
            }
        }

        if (answer && typeof answer === 'object') {
            answer = this.reduceFraction(answer.num, answer.den);
        }

        this.currentQuestion = {
            type: 'fractions',
            question: `${question} Answer as a reduced fraction.`,
            answer,
            display: question
        };
    }

    generateDecimalQuestion() {
        const questionType = this.randomChoice(['add', 'subtract', 'multiply', 'round']);
        const dec1 = (Math.random() * 100).toFixed(2);
        const dec2 = (Math.random() * 100).toFixed(2);
        let question;
        let answer;

        if (questionType === 'add') {
            answer = (parseFloat(dec1) + parseFloat(dec2)).toFixed(2);
            question = `${dec1} + ${dec2} = ?`;
        } else if (questionType === 'subtract') {
            answer = (parseFloat(dec1) - parseFloat(dec2)).toFixed(2);
            question = `${dec1} - ${dec2} = ?`;
        } else if (questionType === 'multiply') {
            answer = (parseFloat(dec1) * parseFloat(dec2)).toFixed(2);
            question = `${dec1} × ${dec2} = ?`;
        } else {
            const num = (Math.random() * 100).toFixed(3);
            answer = (Math.round(parseFloat(num) * 10) / 10).toFixed(1);
            question = `Round ${num} to the nearest tenth = ?`;
        }

        this.currentQuestion = {
            type: 'decimals',
            question,
            answer: parseFloat(answer),
            display: question
        };
    }

    generateProbabilityQuestion() {
        const questionType = this.randomChoice(['coin', 'die', 'bag']);
        let question;
        let answer;

        if (questionType === 'coin') {
            const outcome = this.randomChoice(['heads', 'tails']);
            question = `What is the probability of flipping a coin and getting ${outcome}?`;
            answer = { num: 1, den: 2 };
        } else if (questionType === 'die') {
            const face = this.randomInt(1, 6);
            question = `What is the probability of rolling a die and getting a ${face}?`;
            answer = { num: 1, den: 6 };
        } else {
            question = `What is the probability of drawing a red ball from a bag with 2 red balls and 4 blue balls?`;
            answer = { num: 1, den: 3 };
        }

        answer = this.reduceFraction(answer.num, answer.den);
        this.currentQuestion = {
            type: 'probability',
            question: `${question} Answer as a reduced fraction.`,
            answer,
            display: question
        };
    }

    generateRoundingQuestion() {
        const decimals = (Math.random() * 200).toFixed(2);
        const place = this.randomChoice(['whole number', 'tenth', 'hundredth']);
        let answer;
        let question;

        if (place === 'whole number') {
            answer = Math.round(parseFloat(decimals));
        } else if (place === 'tenth') {
            answer = Math.round(parseFloat(decimals) * 10) / 10;
        } else {
            answer = Math.round(parseFloat(decimals) * 100) / 100;
        }

        question = `Round ${decimals} to the nearest ${place} = ?`;
        this.currentQuestion = {
            type: 'rounding',
            question,
            answer,
            display: question
        };
    }

    generateSquareQuestion() {
        const number = this.randomInt(1, 20);
        const questionType = this.randomChoice(['square', 'sqrt']);
        let question;
        let answer;

        if (questionType === 'square') {
            question = `What is ${number} squared?`;
            answer = number * number;
        } else {
            const square = number * number;
            question = `What is the square root of ${square}?`;
            answer = number;
        }

        this.currentQuestion = {
            type: 'square',
            question,
            answer,
            display: question
        };
    }

    generateWordProblemQuestion() {
        const problems = [
            {
                question: 'Sam has 5 boxes with 6 pencils each. How many pencils does he have in total?',
                answer: 30
            },
            {
                question: 'A farm has 4 rows of tomato plants with 7 plants in each row. How many tomato plants are there?',
                answer: 28
            },
            {
                question: 'If 3 children each eat 4 cookies, how many cookies were eaten altogether?',
                answer: 12
            },
            {
                question: 'Lina has 8 bags of apples with 5 apples in each bag. How many apples does she have?',
                answer: 40
            }
        ];

        const chosen = this.randomChoice(problems);
        this.currentQuestion = {
            type: 'wordproblem',
            question: chosen.question,
            answer: chosen.answer,
            display: chosen.question
        };
    }

    generateAreaQuestion() {
        const shape = this.randomChoice(['rectangle', 'circle', 'triangle']);
        let question;
        let answer;

        if (shape === 'rectangle') {
            const length = this.randomInt(2, 12);
            const width = this.randomInt(2, 12);
            question = `What is the area of a rectangle with length ${length} and width ${width}?`;
            answer = length * width;
        } else if (shape === 'circle') {
            const radius = this.randomInt(2, 8);
            question = `What is the area of a circle with radius ${radius}? Use π and round to 2 decimals.`;
            answer = parseFloat((Math.PI * radius * radius).toFixed(2));
        } else {
            const base = this.randomInt(2, 12);
            const height = this.randomInt(2, 12);
            question = `What is the area of a triangle with base ${base} and height ${height}? Round to 2 decimals.`;
            answer = parseFloat(((base * height) / 2).toFixed(2));
        }

        this.currentQuestion = {
            type: 'area',
            question,
            answer,
            display: question
        };
    }

    displayQuestion() {
        this.questionTypeElement.textContent = this.getQuestionTypeLabel(this.currentQuestion.type);
        this.questionElement.textContent = this.currentQuestion.question;
        this.questionCounter.textContent = `Question ${this.questionNumber}`;
        this.answerInput.value = '';
        this.feedbackElement.textContent = '';
        this.feedbackElement.className = 'feedback';
        this.hintElement.textContent = this.currentQuestion.type === 'fractions' || this.currentQuestion.type === 'probability'
            ? 'For fraction-style questions, answer with a reduced fraction, for example 3/4.'
            : 'Enter your answer, then press Submit or Enter.';
        this.answerInput.focus();
    }

    getQuestionTypeLabel(type) {
        const labels = {
            arithmetic: '📐 Basic Arithmetic',
            fractions: '📊 Fractions',
            decimals: '🔢 Decimals',
            probability: '🎲 Probability',
            rounding: '📏 Rounding Numbers',
            square: '✖️ Squares & Square Roots',
            wordproblem: '🧠 Word Problem',
            area: '📏 Area of Shapes'
        };
        return labels[type] || type;
    }

    checkAnswer() {
        const userAnswer = this.answerInput.value.trim();
        if (!userAnswer) {
            this.showFeedback('Please enter an answer!', false);
            return;
        }

        let isCorrect = false;

        if (this.currentQuestion.type === 'fractions' || this.currentQuestion.type === 'probability') {
            isCorrect = this.checkFractionAnswer(userAnswer, this.currentQuestion.answer);
        } else {
            const parsedAnswer = this.parseUserAnswer(userAnswer);
            isCorrect = this.compareAnswers(parsedAnswer, this.currentQuestion.answer);
        }

        if (isCorrect) {
            this.score++;
            this.scoreElement.textContent = this.score;
            this.showFeedback('✓ Correct!', true);
            if (this.score === this.winThreshold) {
                setTimeout(() => this.showWinScreen(), 1200);
            } else {
                setTimeout(() => this.generateQuestion(), 1200);
            }
        } else {
            this.showCorrectAnswer();
        }
    }

    checkFractionAnswer(userAnswer, expectedAnswer) {
        if (typeof expectedAnswer === 'object') {
            const normalized = this.normalizeFractionAnswer(userAnswer);
            if (!normalized) return false;
            const reducedInput = this.reduceFraction(normalized.num, normalized.den);
            return reducedInput.num === expectedAnswer.num && reducedInput.den === expectedAnswer.den;
        }

        const normalized = this.normalizeFractionAnswer(userAnswer);
        if (!normalized) return false;
        const reducedInput = this.reduceFraction(normalized.num, normalized.den);
        const reducedExpected = this.reduceFraction(expectedAnswer.num, expectedAnswer.den);
        return reducedInput.num === reducedExpected.num && reducedInput.den === reducedExpected.den;
    }

    normalizeFractionAnswer(answer) {
        if (answer.includes('/')) {
            const parts = answer.split('/').map(part => part.trim());
            if (parts.length !== 2) return null;
            const num = parseInt(parts[0], 10);
            const den = parseInt(parts[1], 10);
            if (Number.isNaN(num) || Number.isNaN(den) || den === 0) return null;
            return { num, den };
        }

        const decimal = parseFloat(answer);
        if (Number.isNaN(decimal)) return null;

        const maxDen = 100;
        let best = null;
        for (let den = 1; den <= maxDen; den++) {
            const num = Math.round(decimal * den);
            if (Math.abs(decimal - num / den) < 0.0001) {
                const reduced = this.reduceFraction(num, den);
                if (!best || reduced.den < best.den) {
                    best = reduced;
                }
            }
        }
        return best;
    }

    parseUserAnswer(answer) {
        return parseFloat(answer);
    }

    compareAnswers(userAnswer, expectedAnswer) {
        if (Number.isNaN(userAnswer)) return false;
        return Math.abs(userAnswer - expectedAnswer) < 0.0001;
    }

    showCorrectAnswer() {
        let correctAnswerText;
        if (this.currentQuestion.type === 'fractions' || this.currentQuestion.type === 'probability') {
            const expected = this.currentQuestion.answer;
            correctAnswerText = `${expected.num}/${expected.den}`;
        } else if (this.currentQuestion.type === 'area' || this.currentQuestion.type === 'decimals' || this.currentQuestion.type === 'rounding') {
            correctAnswerText = Number.isInteger(this.currentQuestion.answer)
                ? this.currentQuestion.answer.toString()
                : this.currentQuestion.answer.toFixed(2).replace(/\.00$/, '');
        } else {
            correctAnswerText = this.currentQuestion.answer.toString();
        }

        this.showFeedback(`✗ Incorrect. The correct answer is: ${correctAnswerText}`, false);
        setTimeout(() => this.generateQuestion(), 2200);
    }

    showFeedback(message, isCorrect) {
        this.feedbackElement.textContent = message;
        this.feedbackElement.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    }

    showWinScreen() {
        this.gameContent.style.display = 'none';
        this.winScreen.style.display = 'flex';
    }

    restart() {
        this.score = 0;
        this.questionNumber = 0;
        this.scoreElement.textContent = '0';
        this.gameContent.style.display = 'block';
        this.winScreen.style.display = 'none';
        this.generateQuestion();
    }

    getFraction(num, den) {
        return { num, den };
    }

    addFractions(a, b) {
        const num = a.num * b.den + b.num * a.den;
        const den = a.den * b.den;
        return this.reduceFraction(num, den);
    }

    subtractFractions(a, b) {
        const num = a.num * b.den - b.num * a.den;
        const den = a.den * b.den;
        return this.reduceFraction(num, den);
    }

    multiplyFractions(a, b) {
        return this.reduceFraction(a.num * b.num, a.den * b.den);
    }

    divideFractions(a, b) {
        return this.reduceFraction(a.num * b.den, a.den * b.num);
    }

    compareFractions(a, b) {
        return a.num * b.den - b.num * a.den;
    }

    reduceFraction(num, den) {
        const gcd = this.gcd(Math.abs(num), Math.abs(den));
        num /= gcd;
        den /= gcd;
        if (den < 0) {
            num = -num;
            den = -den;
        }
        return { num, den };
    }

    gcd(a, b) {
        return b === 0 ? a : this.gcd(b, a % b);
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomChoice(array) {
        return array[this.randomInt(0, array.length - 1)];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MathGame();
});
