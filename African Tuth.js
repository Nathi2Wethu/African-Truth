document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.classList.remove('active');
            burger.classList.remove('active');
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Leaders data and filtering
    const leadersContainer = document.querySelector('.leaders-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Sample leaders data - in a real app, this would come from an API or JSON file
    const leaders = [
        {
            name: "Mansa Musa",
            period: "1312–1337",
            category: "ancient",
            image: "assets/images/mansa-musa.jpg",
            summary: "The tenth Mansa of the Mali Empire, considered the richest person in history. His pilgrimage to Mecca put Mali on world maps.",
            fullText: "Mansa Musa, ruler of the Mali Empire in the 14th century, is regarded as one of the wealthiest individuals in history. His famous pilgrimage to Mecca in 1324 included so much gold that it caused inflation in the regions he passed through. He established Timbuktu as a center of learning and Islamic culture, building the Djinguereber Mosque and attracting scholars from across Africa and the Middle East."
        },
        // More leaders would be added here
    ];
    
    function displayLeaders(filter = 'all') {
        leadersContainer.innerHTML = '';
        
        const filteredLeaders = filter === 'all' 
            ? leaders 
            : leaders.filter(leader => leader.category === filter);
        
        filteredLeaders.forEach(leader => {
            const leaderCard = document.createElement('div');
            leaderCard.className = 'leader-card';
            leaderCard.innerHTML = `
                <div class="leader-img">
                    <img src="${leader.image}" alt="${leader.name}">
                </div>
                <div class="leader-info">
                    <h3>${leader.name}</h3>
                    <span class="period">${leader.period}</span>
                    <p>${leader.summary}</p>
                    <button class="read-more" data-target="${leader.name.toLowerCase().replace(' ', '-')}-details">
                        Read More <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
            leadersContainer.appendChild(leaderCard);
        });
        
        // Set up modal openers
        document.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', openModal);
        });
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayLeaders(button.dataset.filter);
        });
    });
    
    // Initialize leaders display
    displayLeaders();
    
    // Timeline and tab content would be similarly populated with data
    
    // Carousel functionality
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        carouselSlides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Set up auto-advancing carousel
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseover', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseout', () => slideInterval = setInterval(nextSlide, 5000));
    
    // Quiz functionality
    const quizQuestions = [
        {
            question: "Which African empire was Mansa Musa the ruler of?",
            options: ["Songhai Empire", "Mali Empire", "Ghana Empire", "Kanem-Bornu Empire"],
            answer: 1
        },
        // More questions would be added here
    ];
    
    const questionText = document.getElementById('question-text');
    const quizOptions = document.querySelector('.quiz-options');
    const nextButton = document.getElementById('quiz-next');
    const scoreDisplay = document.querySelector('.quiz-score span');
    
    let currentQuestion = 0;
    let score = 0;
    let quizEnded = false;
    
    function displayQuestion() {
        const question = quizQuestions[currentQuestion];
        questionText.textContent = question.question;
        quizOptions.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => checkAnswer(index));
            quizOptions.appendChild(optionElement);
        });
    }
    
    function checkAnswer(selectedIndex) {
        const correctIndex = quizQuestions[currentQuestion].answer;
        const options = document.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
                        if (index === correctIndex) {
                            option.classList.add('correct');
                        }
                    });
            
                    // Disable further clicks after answering
                    options.forEach(option => {
                        option.style.pointerEvents = 'none';
                    });
            
                    if (selectedIndex === correctIndex) {
                        score++;
                    }
            
                    scoreDisplay.textContent = score;
            
                    // Show next button if there are more questions
                    if (currentQuestion < quizQuestions.length - 1) {
                        nextButton.style.display = 'block';
                    } else {
                        quizEnded = true;
                        nextButton.textContent = 'Finish';
                        nextButton.style.display = 'block';
                    }
                }
                
                nextButton.addEventListener('click', () => {
                    if (!quizEnded) {
                        currentQuestion++;
                        displayQuestion();
                        nextButton.style.display = 'none';
                    } else {
                        // Quiz finished
                        questionText.textContent = 'Quiz Completed!';
                        quizOptions.innerHTML = '';
                        nextButton.style.display = 'none';
                    }
                });
            
                // Initialize quiz
                displayQuestion();
            });
