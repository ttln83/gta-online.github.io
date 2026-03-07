// ============================================
// GTA ONLINE GUIDE - SCRIPT COMPLET FONCTIONNEL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ GTA Site - Script chargé');

    // ============================================
    // BURGER MENU
    // ============================================
    const burgerMenu = document.querySelector('.burger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Fermer tous
                faqItems.forEach(function(i) {
                    i.classList.remove('active');
                    const ans = i.querySelector('.faq-answer');
                    const icon = i.querySelector('.faq-icon');
                    if (ans) ans.style.maxHeight = null;
                    if (icon) icon.textContent = '+';
                });
                
                // Ouvrir celui-ci si pas déjà ouvert
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    const icon = item.querySelector('.faq-icon');
                    if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                    if (icon) icon.textContent = '−';
                }
            });
        }
    });

    // ============================================
    // CALCULATEUR SIMPLE - BUSINESS (AVEC BOUTON)
    // ============================================
    const simpleSlider = document.getElementById('simple-slider');
    const simpleHours = document.getElementById('simple-hours');
    const simpleChecks = document.querySelectorAll('.biz-check');
    const simpleTotal = document.getElementById('simple-total');
    const simpleCount = document.getElementById('simple-count');
    const simpleHourly = document.getElementById('simple-hourly');
    const simpleMonthly = document.getElementById('simple-monthly');
    const simpleTips = document.getElementById('simple-tips');
    const calcButton = document.getElementById('calc-button');

    if (simpleSlider && simpleTotal && calcButton) {
        console.log('✅ Calculateur trouvé');
        
        // Mettre à jour l'affichage des heures quand le slider bouge
        simpleSlider.addEventListener('input', function() {
            if (simpleHours) {
                simpleHours.textContent = this.value;
            }
        });
        
        // Fonction de calcul
        function calculateSimple() {
            const hours = parseInt(simpleSlider.value);
            let total = 0;
            let count = 0;
            const tips = [];

            console.log('🔢 Calcul avec', hours, 'heures');

            // Calculer total
            simpleChecks.forEach(function(checkbox) {
                if (checkbox.checked) {
                    const rate = parseInt(checkbox.dataset.rate);
                    total += rate * hours;
                    count++;
                }
            });

            // Mettre à jour affichage
            if (simpleTotal) {
                simpleTotal.textContent = total.toLocaleString('fr-FR');
            }

            if (simpleCount) {
                simpleCount.textContent = count;
            }

            if (simpleHourly) {
                const hourly = count > 0 ? Math.floor(total / hours) : 0;
                simpleHourly.textContent = hourly.toLocaleString('fr-FR') + ' $';
            }

            if (simpleMonthly) {
                const monthly = total * 4;
                simpleMonthly.textContent = monthly.toLocaleString('fr-FR') + ' $';
            }

            // Conseils
            if (simpleTips) {
                if (count === 0) {
                    tips.push('ℹ️ Sélectionnez des business pour calculer');
                } else if (count >= 4) {
                    tips.push('🚀 Excellent setup avec ' + count + ' business !');
                } else {
                    tips.push('✅ ' + count + ' business actif' + (count > 1 ? 's' : ''));
                }
                simpleTips.innerHTML = tips.map(function(t) { 
                    return '<li>' + t + '</li>'; 
                }).join('');
            }

            console.log('💰 Résultat:', total.toLocaleString('fr-FR'), '$');
            
            // Animation du bouton
            calcButton.textContent = '✅ CALCULÉ !';
            setTimeout(function() {
                calcButton.textContent = '💰 CALCULER MES PROFITS';
            }, 2000);
        }

        // Calcul au clic du bouton
        calcButton.addEventListener('click', function() {
            console.log('🔘 Bouton CALCULER cliqué');
            calculateSimple();
        });

        // Calcul initial au chargement
        calculateSimple();
    }

    // ============================================
    // CARROUSEL VÉHICULES
    // ============================================
    const vehicleTrack = document.getElementById('vehicleTrack');
    const prevBtn = document.getElementById('prevVehicle');
    const nextBtn = document.getElementById('nextVehicle');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (vehicleTrack && prevBtn && nextBtn) {
        console.log('✅ Carrousel trouvé');
        
        const cards = vehicleTrack.querySelectorAll('.vehicle-carousel-card');
        let currentIndex = 0;
        const totalCards = cards.length;

        // Créer indicateurs
        if (indicatorsContainer) {
            for (let i = 0; i < totalCards; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('carousel-indicator');
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', function() {
                    currentIndex = i;
                    updateCarousel();
                });
                indicatorsContainer.appendChild(indicator);
            }
        }

        function updateCarousel() {
            vehicleTrack.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
            
            if (indicatorsContainer) {
                const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
                indicators.forEach(function(ind, idx) {
                    if (idx === currentIndex) {
                        ind.classList.add('active');
                    } else {
                        ind.classList.remove('active');
                    }
                });
            }
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        }

        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Auto-play
        let autoplayInterval = setInterval(nextSlide, 5000);

        vehicleTrack.addEventListener('mouseenter', function() {
            clearInterval(autoplayInterval);
        });

        vehicleTrack.addEventListener('mouseleave', function() {
            autoplayInterval = setInterval(nextSlide, 5000);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }

    // ============================================
    // SYSTÈME MODAL - DÉTAILS
    // ============================================
    
    // Base de données
    const modalData = {
        oppressor: {
            name: 'Oppressor Mk II',
            emoji: '🏍️',
            price: '8,000,000 GTA$',
            category: 'Moto volante',
            specs: {
                vitesse: '130 mph',
                armement: 'Missiles (20)',
                vol: 'Complet + boost',
                blindage: 'Moyen'
            },
            pros: ['Mobilité ultime', 'Missiles précis PvE', 'Spawn instantané MC', 'Idéal solo'],
            cons: ['Prix élevé 10.5M total', 'Nerf PvP', 'Cible des joueurs'],
            tips: 'Terrorbyte Workshop requis. Excellent pour missions VIP.',
            required: 'Nightclub + Terrorbyte'
        },
        toreador: {
            name: 'Pegassi Toreador',
            emoji: '🚗',
            price: '3,660,000 GTA$',
            category: 'Voiture amphibie',
            specs: {
                vitesse: '135 mph',
                armement: 'Missiles illimités',
                boost: 'Infini (3s)',
                mode: 'Amphibie'
            },
            pros: ['Boost infini', 'Mode sous-marin', 'Missiles illimités', 'Braquages OK'],
            cons: ['Requiert Kosatka', 'Gros gabarit', 'Conso boost'],
            tips: 'Parfait après Cayo. Idéal Diamond Casino Heist.',
            required: 'Kosatka'
        },
        sparrow: {
            name: 'Sparrow',
            emoji: '🚁',
            price: '1,815,000 GTA$',
            category: 'Hélicoptère',
            specs: {
                vitesse: '168 mph',
                armement: 'Missiles option',
                spawn: 'Kosatka',
                blindage: 'Très faible'
            },
            pros: ['Plus rapide Cayo', 'Spawn gratuit', 'Prix OK', 'Agile'],
            cons: ['Très fragile', 'Requiert Kosatka', 'Pas passagers'],
            tips: 'ESSENTIEL Cayo Perico. Missiles 240K. Gagne 10-15 min/run.',
            required: 'Kosatka'
        },
        kosatka: {
            name: 'Kosatka',
            emoji: '🚢',
            price: '2,200,000 GTA$',
            category: 'Sous-marin',
            specs: {
                type: 'Base mobile',
                heliport: 'Oui',
                missions: 'Cayo Perico',
                blindage: 'Maximum'
            },
            pros: ['Cayo Perico 1.5M+', 'Héliport Sparrow', 'Spawns multiples', 'ROI 2 braquages'],
            cons: ['Lent', 'Prix entrée', 'Options chères'],
            tips: 'ACHAT #1. Sparrow recommandé. Payé en 2 Cayo.',
            required: 'Aucun'
        }
    };

    // Créer HTML modal
    const modalHTML = '<div id="detailsModal" class="modal-overlay">' +
        '<div class="modal-container">' +
        '<button class="modal-close">&times;</button>' +
        '<div class="modal-header">' +
        '<span class="modal-emoji">🏍️</span>' +
        '<h2 class="modal-title">Titre</h2>' +
        '<span class="modal-category">Catégorie</span>' +
        '</div>' +
        '<div class="modal-body">' +
        '<div class="modal-price">Prix</div>' +
        '<div class="modal-section">' +
        '<h3>📊 Caractéristiques</h3>' +
        '<div class="specs-grid" id="modalSpecs"></div>' +
        '</div>' +
        '<div class="modal-section">' +
        '<h3>✅ Avantages</h3>' +
        '<ul id="modalPros" class="modal-list pros"></ul>' +
        '</div>' +
        '<div class="modal-section">' +
        '<h3>❌ Inconvénients</h3>' +
        '<ul id="modalCons" class="modal-list cons"></ul>' +
        '</div>' +
        '<div class="modal-section">' +
        '<h3>💡 Conseils</h3>' +
        '<p id="modalTips" class="modal-tips"></p>' +
        '</div>' +
        '<div class="modal-required" id="modalRequired"></div>' +
        '</div>' +
        '</div>' +
        '</div>';

    // Injecter modal
    if (!document.getElementById('detailsModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        console.log('✅ Modal créé');
    }

    const modal = document.getElementById('detailsModal');
    if (!modal) {
        console.log('❌ Modal non trouvé');
        return;
    }
    
    const modalClose = modal.querySelector('.modal-close');

    // Fonctions modal
    function openModal(dataId) {
        console.log('🔵 Ouverture modal:', dataId);
        
        const data = modalData[dataId];
        if (!data) {
            console.log('❌ Données non trouvées pour:', dataId);
            return;
        }

        // Remplir modal
        modal.querySelector('.modal-emoji').textContent = data.emoji;
        modal.querySelector('.modal-title').textContent = data.name;
        modal.querySelector('.modal-category').textContent = data.category;
        modal.querySelector('.modal-price').textContent = data.price;

        // Specs
        let specsHtml = '';
        for (let key in data.specs) {
            specsHtml += '<div class="spec-item"><strong>' + key + ':</strong> ' + data.specs[key] + '</div>';
        }
        modal.querySelector('#modalSpecs').innerHTML = specsHtml;

        // Pros
        let prosHtml = '';
        data.pros.forEach(function(pro) {
            prosHtml += '<li>' + pro + '</li>';
        });
        modal.querySelector('#modalPros').innerHTML = prosHtml;

        // Cons
        let consHtml = '';
        data.cons.forEach(function(con) {
            consHtml += '<li>' + con + '</li>';
        });
        modal.querySelector('#modalCons').innerHTML = consHtml;

        // Tips
        modal.querySelector('#modalTips').textContent = data.tips;

        // Required
        modal.querySelector('#modalRequired').innerHTML = '<strong>🔒 Prérequis:</strong> ' + data.required;

        // Afficher
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Events modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Attacher aux boutons
    document.querySelectorAll('[data-vehicle], [data-business], [data-heist], .btn-details').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.dataset.vehicle || this.dataset.business || this.dataset.heist;
            console.log('🔘 Bouton cliqué:', id);
            if (id) {
                openModal(id);
            }
        });
    });

    console.log('✅ Tout initialisé');
});
