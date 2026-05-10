class MathGame {
    constructor() {
        this.score = 0;
        this.questionNumber = 0;
        this.currentQuestion = null;
        this.winThreshold = 10;
        
        this.questionElement = document.getElementById('question');
        this.questionTypeElement = document.getElementById('questionType');
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
            'area',
            'probability',
            'placevalue',
            'rounding'
        ];
        
        const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        switch(type) {
            case 'arithmetic':
                this.generateArithmeticQuestion();
                break;
            case 'fractions':
                this.generateFractionQuestion();
                break;
            case 'decimals':
                this.generateDecimalQuestion();
                break;
            case 'area':
                this.generateAreaQuestion();
                break;
            case 'probability':
                this.generateProbabilityQuestion();
                break;
            case 'placevalue':
                this.generatePlaceValueQuestion();
                break;
            case 'rounding':
                this.generateRoundingQuestion();
                break;
        }
        
        this.displayQuestion();
    }
    
    generateArithmeticQuestion() {
        // Grade-appropriate arithmetic: 1-4
        const grade = Math.floor(Math.random() * 4) + 1;
        let num1, num2, operator, answer, question;
        
        if (grade === 1) {
            // Simple addition/subtraction up to 20
            operator = Math.random() < 0.5 ? '+' : '-';
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            if (operator === '-' && num2 > num1) [num1, num2] = [num2, num1];
        } else if (grade === 2) {
            // Addition/subtraction up to 100, simple multiplication
            const ops = ['+', '-', '*'];
            operator = ops[Math.floor(Math.random() * ops.length)];
            if (operator === '*') {
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
            } else {
                num1 = Math.floor(Math.random() * 50) + 1;
                num2 = Math.floor(Math.random() * 50) + 1;
                if (operator === '-' && num2 > num1) [num1, num2] = [num2, num1];
            }
        } else if (grade === 3) {
            // Multiplication tables, division
            const ops = ['+', '-', '*', '/'];
            operator = ops[Math.floor(Math.random() * ops.length)];
            if (operator === '*') {
                num1 = Math.floor(Math.random() * 12) + 1;
                num2 = Math.floor(Math.random() * 12) + 1;
            } else if (operator === '/') {
                num2 = Math.floor(Math.random() * 12) + 1;
                num1 = num2 * (Math.floor(Math.random() * 10) + 1);
            } else {
                num1 = Math.floor(Math.random() * 100) + 1;
                num2 = Math.floor(Math.random() * 100) + 1;
                if (operator === '-' && num2 > num1) [num1, num2] = [num2, num1];
            }
        } else {
            // Grade 4: larger numbers, all operations
            const ops = ['+', '-', '*', '/'];
            operator = ops[Math.floor(Math.random() * ops.length)];
            if (operator === '*') {
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
            } else if (operator === '/') {
                num2 = Math.floor(Math.random() * 20) + 1;
                num1 = num2 * (Math.floor(Math.random() * 15) + 1);
            } else {
                num1 = Math.floor(Math.random() * 200) + 1;
                num2 = Math.floor(Math.random() * 200) + 1;
                if (operator === '-' && num2 > num1) [num1, num2] = [num2, num1];
            }
        }
        
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
            question: question,
            answer: answer,
            display: operator === '/' ? `${num1} ÷ ${num2}` : question.replace(' = ?', '')
        };
    }
    
    generateFractionQuestion() {
        const questionSubtypes = ['add', 'subtract', 'multiply', 'simplify'];
        const subtype = questionSubtypes[Math.floor(Math.random() * questionSubtypes.length)];
        
        const num1 = Math.floor(Math.random() * 9) + 1;
        const den1 = Math.floor(Math.random() * 9) + 2;
        
        const num2 = Math.floor(Math.random() * 9) + 1;
        const den2 = Math.floor(Math.random() * 9) + 2;
        
        let answerNum, answerDen, question;
        
        if (subtype === 'add') {
            answerNum = (num1 * den2) + (num2 * den1);
            answerDen = den1 * den2;
            question = `${num1}/${den1} + ${num2}/${den2} = ?`;
        } else if (subtype === 'subtract') {
            answerNum = (num1 * den2) - (num2 * den1);
            answerDen = den1 * den2;
            question = `${num1}/${den1} - ${num2}/${den2} = ?`;
        } else if (subtype === 'multiply') {
            answerNum = num1 * num2;
            answerDen = den1 * den2;
            question = `${num1}/${den1} × ${num2}/${den2} = ?`;
        } else {
            // Simplify
            answerNum = num1;
            answerDen = den1;
            const gcd = this.findGCD(num1, den1);
            question = `Simplify: ${num1 * gcd}/${den1 * gcd} = ?`;
        }
        
        const gcd = this.findGCD(Math.abs(answerNum), answerDen);
        const simplifiedNum = answerNum / gcd;
        const simplifiedDen = answerDen / gcd;
        
        this.currentQuestion = {
            type: 'fractions',
            question: question,
            answer: { num: simplifiedNum, den: simplifiedDen },
            display: question.replace(' = ?', '')
        };
    }
    
    generateDecimalQuestion() {
        const decimalQuestionTypes = ['add', 'subtract', 'multiply'];
        const questionType = decimalQuestionTypes[Math.floor(Math.random() * decimalQuestionTypes.length)];
        
        const dec1 = (Math.random() * 100).toFixed(2);
        const dec2 = (Math.random() * 100).toFixed(2);
        
        let answer, question;
        
        if (questionType === 'add') {
            answer = (parseFloat(dec1) + parseFloat(dec2)).toFixed(2);
            question = `${dec1} + ${dec2} = ?`;
        } else if (questionType === 'subtract') {
            answer = (parseFloat(dec1) - parseFloat(dec2)).toFixed(2);
            question = `${dec1} - ${dec2} = ?`;
        } else {
            answer = (parseFloat(dec1) * parseFloat(dec2)).toFixed(2);
            question = `${dec1} × ${dec2} = ?`;
        }
        
        this.currentQuestion = {
            type: 'decimals',
            question: question,
            answer: parseFloat(answer),
            display: question.replace(' = ?', '')
        };
    }
    
    generateAreaQuestion() {
        const shapes = ['rectangle', 'circle', 'triangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        let answer, question;
        
        if (shape === 'rectangle') {
            const length = Math.floor(Math.random() * 15) + 2;
            const width = Math.floor(Math.random() * 15) + 2;
            answer = length * width;
            question = `What is the area of a rectangle with length ${length} and width ${width}? (in square units)`;
        } else if (shape === 'circle') {
            const radius = Math.floor(Math.random() * 8) + 2;
            answer = (Math.PI * radius * radius).toFixed(2);
            question = `What is the area of a circle with radius ${radius}? (use π, round to 2 decimals)`;
        } else {
            const base = Math.floor(Math.random() * 15) + 2;
            const height = Math.floor(Math.random() * 15) + 2;
            answer = (base * height / 2).toFixed(2);
            question = `What is the area of a triangle with base ${base} and height ${height}? (round to 2 decimals)`;
        }
        
        this.currentQuestion = {
            type: 'area',
            question: question,
            answer: parseFloat(answer),
            display: question.replace('?', '')
        };
    }
    
    generateProbabilityQuestion() {
        const probTypes = ['coin', 'die', 'cards'];
        const type = probTypes[Math.floor(Math.random() * probTypes.length)];
        
        let answer, question;
        
        if (type === 'coin') {
            const outcomes = ['heads', 'tails'];
            const target = outcomes[Math.floor(Math.random() * outcomes.length)];
            answer = '1/2';
            question = `What is the probability of flipping a coin and getting ${target}?`;
        } else if (type === 'die') {
            const target = Math.floor(Math.random() * 6) + 1;
            answer = '1/6';
            question = `What is the probability of rolling a die and getting a ${target}?`;
        } else {
            const colors = ['red', 'black'];
            const target = colors[Math.floor(Math.random() * colors.length)];
            answer = '1/2';
            question = `What is the probability of drawing a ${target} card from a standard deck? (simplified fraction)`;
        }
        
        this.currentQuestion = {
            type: 'probability',
            question: question,
            answer: answer,
            display: question.replace('?', '')
        };
    }
    
    generatePlaceValueQuestion() {
        const numbers = [Math.floor(Math.random() * 900) + 100]; // 3-digit numbers
        const num = numbers[0];
        const digits = num.toString().split('');
        const positions = ['hundreds', 'tens', 'ones'];
        const posIndex = Math.floor(Math.random() * 3);
        const digit = parseInt(digits[posIndex]);
        
        const question = `What is the place value of ${digit} in ${num}?`;
        const answer = positions[posIndex];
        
        this.currentQuestion = {
            type: 'placevalue',
            question: question,
            answer: answer,
            display: question.replace('?', '')
        };
    }
    
    generateRoundingQuestion() {
        const num = (Math.random() * 1000).toFixed(2);
        const places = ['nearest whole number', 'nearest tenth', 'nearest hundredth'];
        const place = places[Math.floor(Math.random() * places.length)];
        
        let answer;
        if (place === 'nearest whole number') {
            answer = Math.round(parseFloat(num));
        } else if (place === 'nearest tenth') {
            answer = Math.round(parseFloat(num) * 10) / 10;
        } else {
            answer = Math.round(parseFloat(num) * 100) / 100;
        }
        
        const question = `Round ${num} to the ${place} = ?`;
        
        this.currentQuestion = {
            type: 'rounding',
            question: question,
            answer: answer,
            display: question.replace(' = ?', '')
        };
    }
    
    displayQuestion() {
        this.questionTypeElement.textContent = this.getQuestionTypeLabel(this.currentQuestion.type);
        this.questionElement.textContent = this.currentQuestion.question;
        this.questionCounter.textContent = `Question ${this.questionNumber}`;
        this.answerInput.value = '';
        this.feedbackElement.textContent = '';
        this.feedbackElement.className = 'feedback';
        this.answerInput.focus();
    }
    
    getQuestionTypeLabel(type) {
        const labels = {
            'arithmetic': '📐 Basic Arithmetic',
            'fractions': '📊 Fractions',
            'decimals': '🔢 Decimals',
            'area': '📏 Area of Shapes',
            'probability': '🎲 Probability',
            'placevalue': '🔢 Place Value',
            'rounding': '📏 Rounding Numbers'
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
        
        if (this.currentQuestion.type === 'fractions') {
            isCorrect = this.checkFractionAnswer(userAnswer, this.currentQuestion.answer);
        } else if (this.currentQuestion.type === 'probability') {
            isCorrect = userAnswer.toLowerCase() === this.currentQuestion.answer.toLowerCase();
        } else if (this.currentQuestion.type === 'placevalue') {
            isCorrect = userAnswer.toLowerCase() === this.currentQuestion.answer.toLowerCase();
        } else {
            const parsedAnswer = this.parseUserAnswer(userAnswer);
            const expectedAnswer = this.currentQuestion.answer;
            isCorrect = this.compareAnswers(parsedAnswer, expectedAnswer);
        }
        
        if (isCorrect) {
            this.score++;
            this.scoreElement.textContent = this.score;
            this.showFeedback('✓ Correct!', true);
            
            if (this.score === this.winThreshold) {
                setTimeout(() => this.showWinScreen(), 1500);
            } else {
                setTimeout(() => this.generateQuestion(), 1500);
            }
        } else {
            this.showCorrectAnswer();
        }
    }
    
    checkFractionAnswer(userAnswer, expectedAnswer) {
        // Possible formats: "1/2", "0.5", etc.
        let userNum, userDen;
        
        if (userAnswer.includes('/')) {
            const parts = userAnswer.split('/');
            if (parts.length === 2) {
                userNum = parseInt(parts[0]);
                userDen = parseInt(parts[1]);
                
                if (isNaN(userNum) || isNaN(userDen) || userDen === 0) {
                    return false;
                }
                
                // Simplify user fraction
                const gcd = this.findGCD(Math.abs(userNum), userDen);
                userNum = userNum / gcd;
                userDen = userDen / gcd;
                
                return userNum === expectedAnswer.num && userDen === expectedAnswer.den;
            }
        } else {
            // User entered decimal, convert to compare
            const userDecimal = parseFloat(userAnswer);
            const expectedDecimal = expectedAnswer.num / expectedAnswer.den;
            return Math.abs(userDecimal - expectedDecimal) < 0.0001;
        }
        
        return false;
    }
    
    parseUserAnswer(answer) {
        return parseFloat(answer);
    }
    
    compareAnswers(userAnswer, expectedAnswer) {
        return Math.abs(userAnswer - expectedAnswer) < 0.0001;
    }
    
    showCorrectAnswer() {
        let correctAnswerText;
        
        if (this.currentQuestion.type === 'fractions') {
            const ans = this.currentQuestion.answer;
            correctAnswerText = `${ans.num}/${ans.den}`;
        } else {
            correctAnswerText = this.currentQuestion.answer.toString();
        }
        
        this.showFeedback(`✗ Incorrect. The answer is: ${correctAnswerText}`, false);
        setTimeout(() => this.generateQuestion(), 2500);
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
    
    findGCD(a, b) {
        return b === 0 ? a : this.findGCD(b, a % b);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MathGame();
});
