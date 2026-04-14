// ========== DONNÉES DES PRODUITS ==========
const products = [
    { id: 1, name: "Robe Chic", price: "35 000", description: "Robe élégante pour soirée", category: ["femme", "moderne"], image: "p1.png" },
    { id: 2, name: "Robe Cérémonie", price: "45 000", description: "Robe traditionnelle moderne", category: ["femme", "traditionnel", "moderne"], image: "p2.png" },
    { id: 3, name: "Ensemble Tailleur", price: "55 000", description: "Tailleur femme professionnel", category: ["femme", "moderne"], image: "p3.png" },
    { id: 4, name: "Boubou Femme", price: "40 000", description: "Boubou traditionnel", category: ["femme", "traditionnel"], image: "p4.png" },
    { id: 5, name: "Jupe Top", price: "25 000", description: "Ensemble casual chic", category: ["femme", "moderne"], image: "p5.png" },
    { id: 6, name: "Grand Boubou", price: "60 000", description: "Grand boubou cérémonie", category: ["femme", "traditionnel"], image: "p6.png" },
    { id: 7, name: "Costume Homme", price: "75 000", description: "Costume sur mesure", category: ["homme", "moderne"], image: "p7.png" },
    { id: 8, name: "Boubou Homme", price: "35 000", description: "Boubou élégant", category: ["homme", "traditionnel"], image: "p8.png" },
    { id: 9, name: "Chemise Chic", price: "20 000", description: "Chemise moderne", category: ["homme", "moderne"], image: "p9.png" },
    { id: 10, name: "Grand Boubou Homme", price: "50 000", description: "Grand boubou cérémonie", category: ["homme", "traditionnel"], image: "p10.png" },
    { id: 11, name: "Ensemble Homme", price: "45 000", description: "Ensemble traditionnel", category: ["homme", "traditionnel"], image: "p11.png" },
    { id: 12, name: "Veste Homme", price: "40 000", description: "Veste moderne", category: ["homme", "moderne"], image: "p12.png" },
    { id: 13, name: "Tenue Mariage", price: "85 000", description: "Tenue complète mariage", category: ["femme", "traditionnel"], image: "p13.png" },
    { id: 14, name: "Tenue Baptême", price: "30 000", description: "Tenue enfant", category: ["femme", "moderne"], image: "p14.png" },
    { id: 15, name: "Pagne Tissu", price: "15 000", description: "Pagne wax haut de gamme", category: ["femme", "traditionnel"], image: "p15.png" },
    { id: 16, name: "Ensemble Frère-Soeur", price: "65 000", description: "Tenues assorties", category: ["femme", "homme", "traditionnel"], image: "p16.png" },
    { id: 17, name: "Tenue Soirée", price: "55 000", description: "Robe de soirée luxe", category: ["femme", "moderne"], image: "p17.png" }
];

// ========== NUMÉRO WHATSAPP ==========
const whatsappNumber = "221781353820"; // Remplace par le vrai numéro

// ========== AFFICHER LES PRODUITS ==========
function displayProducts(filter = "all") {
    const container = document.getElementById("productsContainer");
    if (!container) return;
    
    container.innerHTML = "";
    
    const filteredProducts = filter === "all" 
        ? products 
        : products.filter(product => product.category.includes(filter));
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                <p class="lead">Aucun modèle trouvé dans cette catégorie</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4";
        col.innerHTML = `
            <div class="product-card">
                <div class="position-relative">
                    <img src="images/${product.image}" 
                         alt="${product.name}" 
                         class="product-image"
                         onerror="this.src='https://placehold.co/400x500?text=Image+non+trouvée'">
                    <span class="badge-custom">Disponible</span>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${product.price} FCFA</div>
                    <a href="https://wa.me/${whatsappNumber}?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20${encodeURIComponent(product.name)}%20%C3%A0%20${product.price}%20FCFA" 
                       class="btn-wa-small" target="_blank">
                        <i class="fab fa-whatsapp me-2"></i>Commander
                    </a>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// ========== GESTION DES FILTRES ==========
function setupFilters() {
    const filterButtons = document.querySelectorAll(".btn-filter");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filterValue = button.getAttribute("data-filter");
            displayProducts(filterValue);
        });
    });
}

// ========== ANIMATION AU SCROLL ==========
function setupScrollAnimation() {
    const cards = document.querySelectorAll(".product-card, .testimonial-card");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.5s ease";
        observer.observe(card);
    });
}

// ========== NEWSLETTER ==========
function setupNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = document.getElementById('phoneInput').value;
            if (phone && phone.length >= 9) {
                window.open(`https://wa.me/${whatsappNumber}?text=Bonjour%2C%20je%20souhaite%20recevoir%20vos%20offres%20et%20nouveaut%C3%A9s.%20Mon%20num%C3%A9ro%20est%20${phone}`, '_blank');
                document.getElementById('phoneInput').value = '';
            } else {
                alert("Veuillez entrer un numéro valide");
            }
        });
    }
}

// ========== INITIALISATION ==========
document.addEventListener("DOMContentLoaded", () => {
    displayProducts("all");
    setupFilters();
    setupScrollAnimation();
    setupNewsletter();
});