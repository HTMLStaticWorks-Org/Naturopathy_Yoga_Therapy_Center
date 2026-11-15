/**
 * VERDANT LIFE NATUROPATHY & YOGA THERAPY CENTER
 * Interactive Engine: Discovery Selector, Modals, Accordions, Tabs, Receipt Generator, Theme & RTL
 */

// Immediate Theme & Direction Initialization to prevent flash
(function() {
  const savedTheme = localStorage.getItem('verdant-theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  const savedDir = localStorage.getItem('verdant-direction');
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  initBackToTop();
  initMobileNav();
  initThemeToggle();
  initRtlToggle();
  initDiscoveryExperience();
  initFaqAccordions();
  initModals();
  initDashboard();
  initToast();
  initCoverflow();
  initFannedDeckCarousels();
  initPortalMobileNav();
  initReflectionSlider();
});

/* Mobile Navigation & Dropdowns */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-menu');
  if (toggle && nav) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Toggle dropdown submenu on mobile & tablet (768px, 1024px and below) when clicking down arrow or Home
    const dropdownToggles = nav.querySelectorAll('.nav-item.dropdown .dropdown-toggle');
    dropdownToggles.forEach(dropToggle => {
      dropToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1200) {
          e.preventDefault();
          e.stopPropagation();
          const parent = dropToggle.closest('.nav-item.dropdown');
          if (parent) {
            const isOpen = parent.classList.toggle('open');
            dropToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          }
        }
      });
    });

    // Close mobile menu when clicking nav links (except dropdown toggle)
    nav.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-link, .mobile-login-cta').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '☰';
      }
    });
  }
}

/* Professional Theme Toggle (Icon Only, No Text) */
function initThemeToggle() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  updateThemeIcons(isDark ? 'dark' : 'light');

  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const targetTheme = currentDark ? 'light' : 'dark';
      if (targetTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.setItem('verdant-theme', targetTheme);
      updateThemeIcons(targetTheme);
    });
  });
}

function updateThemeIcons(theme) {
  document.querySelectorAll('.theme-icon-sun').forEach(el => {
    el.style.display = theme === 'dark' ? 'none' : 'block';
  });
  document.querySelectorAll('.theme-icon-moon').forEach(el => {
    el.style.display = theme === 'dark' ? 'block' : 'none';
  });
}

/* Professional RTL Toggle (Icon Only, No Text) */
function initRtlToggle() {
  const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('verdant-direction', newDir);
    });
  });
}

/* Interactive Discovery Experience */
const discoveryData = {
  'movement': {
    title: 'Mindful Movement & Postural Balance',
    lead: 'Targeted physical alignment, therapeutic yoga postures, and joint mobility to foster daily vitality.',
    areas: ['Hatha Yoga Postures', 'Restorative Assisted Stretching', 'Postural Alignment Assessments'],
    therapies: ['Therapeutic Hatha Yoga', 'Restorative Spine Therapy', 'Mindful Movement'],
    image: 'images/image-8.png',
    ctaText: 'Enquire About Movement Sessions',
    category: 'Therapeutic Yoga'
  },
  'relaxation': {
    title: 'Nervous System Recovery & Deep Relaxation',
    lead: 'Gentle restorative practices, sound immersions, and tension-release therapies designed to reset autonomic tone.',
    areas: ['Guided Yoga Nidra', 'Sound Immersion & Singing Bowls', 'Supported Supta Baddha Konasana'],
    therapies: ['Guided Relaxation', 'Ayurvedic Shirodhara', 'Relaxation Therapy'],
    image: 'images/image-10.png',
    ctaText: 'Enquire About Relaxation Protocols',
    category: 'Mind & Body Wellness'
  },
  'lifestyle': {
    title: 'Holistic Lifestyle Consultation & Daily Cadence',
    lead: 'Cultivating sustainable daily habits, circadian alignment, restorative sleep hygiene, and stress-buffering routines.',
    areas: ['Circadian Sleep Alignment', 'Daily Dinacharya Routines', 'Stress Management Frameworks'],
    therapies: ['Lifestyle Consultation', 'Daily Wellness Routines', 'Forest Bathing & Nature Cure'],
    image: 'images/image-20.png',
    ctaText: 'Explore Lifestyle Consultations',
    category: 'Nutrition & Lifestyle'
  },
  'nutrition': {
    title: 'Personalized Whole-Food Nutrition Guidance',
    lead: 'Naturopathic nutritional counseling emphasizing wholesome seasonal produce, digestive wellness, and mindful eating.',
    areas: ['Anti-Inflammatory Plant Nutrition', 'Mindful Meal Cadence', 'Gut-Friendly Botanical Support'],
    therapies: ['Personalized Nutrition Guidance', 'Healthy Eating Education', 'Mindful Eating Practices'],
    image: 'images/image-93.png',
    ctaText: 'Consult Our Nutrition Specialists',
    category: 'Nutrition & Lifestyle'
  },
  'therapies': {
    title: 'Nature-Based Therapeutics & Hydro-Pelotherapy',
    lead: 'Traditional naturopathic elements including targeted thermal hydrotherapy, therapeutic clay packs, and herbal baths.',
    areas: ['Therapeutic Mud Therapy (Pelotherapy)', 'Specialized Hydrotherapy Baths', 'Herbal Steam Applications'],
    therapies: ['Hydrotherapy', 'Mud Therapy', 'Natural Body Treatments'],
    image: 'images/image-54.png',
    ctaText: 'Enquire on Naturopathic Treatments',
    category: 'Naturopathy Treatments'
  },
  'consultation': {
    title: 'Comprehensive Naturopathic Physician Consultation',
    lead: 'One-on-one professional evaluation mapping your lifestyle patterns, movement goals, and holistic wellness objectives.',
    areas: ['In-Depth Health History Review', 'Integrative Wellness Roadmap', 'Coordinated Multi-Modality Planning'],
    therapies: ['Doctor Intake & Evaluation', 'Integrative Follow-Up', 'Personalized Wellness Journey'],
    image: 'images/image-5.png',
    ctaText: 'Book An Initial Consultation',
    category: 'Specialist Guidance'
  }
};

function initDiscoveryExperience() {
  const filterBtns = document.querySelectorAll('.discovery-filter-bar .filter-btn');
  const resultCard = document.getElementById('discovery-result');
  if (!filterBtns.length || !resultCard) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterKey = btn.getAttribute('data-filter');
      const data = discoveryData[filterKey];
      if (data) {
        updateDiscoveryUI(data);
      }
    });
  });
}

function updateDiscoveryUI(data) {
  const container = document.getElementById('discovery-result');
  if (!container) return;

  container.innerHTML = `
    <div class="grid-2" style="align-items: center; gap: 2rem;">
      <div class="card-media" style="border-radius: var(--radius-md); overflow: hidden; height: 320px;">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div>
        <span class="section-tag">${data.category}</span>
        <h3 style="margin-bottom: 0.75rem;">${data.title}</h3>
        <p style="color: var(--text-muted); margin-bottom: 1.25rem;">${data.lead}</p>
        
        <h5 style="font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-walnut); margin-bottom: 0.5rem;">Recommended Focus Areas:</h5>
        <ul style="list-style: none; margin-bottom: 1.25rem;">
          ${data.areas.map(a => `<li style="font-size: 0.9rem; padding: 0.25rem 0; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--accent-terracotta);">✓</span> ${a}</li>`).join('')}
        </ul>

        <h5 style="font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--primary-walnut); margin-bottom: 0.5rem;">Associated Center Therapies:</h5>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
          ${data.therapies.map(t => `<span style="font-size: 0.78rem; background: var(--bg-surface); padding: 0.35rem 0.8rem; border: 1px solid var(--border-medium); border-radius: var(--radius-full); font-weight: 600;">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <a href="contact.html?interest=${encodeURIComponent(data.title)}" class="btn btn-primary">${data.ctaText}</a>
          <a href="services.html" class="btn btn-secondary">View Therapy Catalog</a>
        </div>
      </div>
    </div>
    <div class="discovery-disclaimer" style="margin-top: 1.75rem;">
      <strong>Important Informational Note:</strong> The above suggestions represent general educational and lifestyle recommendations based on your stated wellness interests. These are not medical diagnoses, individualized clinical assessments, or curative medical prescriptions.
    </div>
  `;
}

/* Accordion FAQ */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
      });
    }
  });
}

/* Modals & Dialogs */
function initModals() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close, [data-modal-dismiss]');

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(title, contentHtml) {
  const overlay = document.getElementById('modal-overlay');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body-content');

  if (overlay && titleEl && bodyEl) {
    titleEl.textContent = title;
    bodyEl.innerHTML = contentHtml;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* Dedicated Detailed Therapy Presentation (10 Required Items) */
function viewTherapyDetails(therapyKey) {
  const t = therapyLibrary[therapyKey];
  if (!t) return;

  const html = `
    <div style="margin-bottom: 1.5rem;">
      <img src="${t.image}" alt="${t.title}" style="width: 100%; height: 280px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
      
      <!-- 1. Therapy Introduction -->
      <div style="margin-bottom: 1.5rem;">
        <span class="section-tag">${t.category}</span>
        <h3 style="margin-top: 0.5rem; margin-bottom: 0.5rem;">1. Therapy Introduction</h3>
        <p style="color: var(--text-body); line-height: 1.7;">${t.introduction}</p>
      </div>

      <!-- 2. What the Session Involves -->
      <div style="margin-bottom: 1.5rem; background: var(--bg-cream); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
        <h4 style="margin-bottom: 0.5rem; color: var(--primary-walnut);">2. What the Session Involves</h4>
        <p style="font-size: 0.92rem; color: var(--text-muted);">${t.whatInvolves}</p>
      </div>

      <!-- 3. How the Experience is Structured -->
      <div style="margin-bottom: 1.5rem;">
        <h4 style="margin-bottom: 0.5rem; color: var(--primary-walnut);">3. Experience Structure</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">
          ${t.structure.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>

      <!-- 4. Available Session Formats -->
      <div style="margin-bottom: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px; background: var(--bg-almond); padding: 1rem; border-radius: var(--radius-sm);">
          <strong style="font-size: 0.85rem; text-transform: uppercase; color: var(--primary-walnut);">4. Available Formats:</strong>
          <p style="font-size: 0.88rem; margin-top: 0.25rem;">${t.formats}</p>
        </div>
        <div style="flex: 1; min-width: 200px; background: var(--bg-almond); padding: 1rem; border-radius: var(--radius-sm);">
          <strong style="font-size: 0.85rem; text-transform: uppercase; color: var(--primary-walnut);">5. Preparation Guidance:</strong>
          <p style="font-size: 0.88rem; margin-top: 0.25rem;">${t.preparation}</p>
        </div>
      </div>

      <!-- 6. What Patients Can Expect -->
      <div style="margin-bottom: 1.5rem;">
        <h4 style="margin-bottom: 0.5rem; color: var(--primary-walnut);">6. What Patients Can Expect</h4>
        <p style="font-size: 0.92rem; color: var(--text-body);">${t.expectations}</p>
      </div>

      <!-- 7. Suitable Consultation Information -->
      <div style="margin-bottom: 1.5rem; padding: 1rem; border-left: 3px solid var(--accent-terracotta); background: var(--bg-cream);">
        <h4 style="margin-bottom: 0.25rem; color: var(--primary-walnut);">7. Professional Consultation Information</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted);">${t.consultationInfo}</p>
      </div>

      <!-- 8. Related Therapies -->
      <div style="margin-bottom: 1.5rem;">
        <h4 style="margin-bottom: 0.5rem; color: var(--primary-walnut);">8. Related Complementary Therapies</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${t.related.map(r => `<span style="font-size: 0.8rem; background: var(--bg-sand); padding: 0.3rem 0.75rem; border-radius: var(--radius-full); font-weight: 500;">${r}</span>`).join('')}
        </div>
      </div>

      <!-- 9. Frequently Asked Questions -->
      <div style="margin-bottom: 1.75rem;">
        <h4 style="margin-bottom: 0.5rem; color: var(--primary-walnut);">9. Frequent Question</h4>
        <p style="font-size: 0.9rem; font-weight: 600; color: var(--primary-deep); margin-bottom: 0.25rem;">Q: ${t.faqQ}</p>
        <p style="font-size: 0.88rem; color: var(--text-muted);">${t.faqA}</p>
      </div>

      <!-- 10. Enquiry CTA -->
      <div style="background: var(--bg-dark); color: #ffffff; padding: 1.5rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h4 style="color: #ffffff; margin-bottom: 0.25rem;">10. Enquire for Consultation</h4>
          <p style="font-size: 0.82rem; color: rgba(255,255,255,0.7); margin-bottom: 0;">Speak with our practitioners to explore this therapy within your holistic plan.</p>
        </div>
        <a href="contact.html?therapy=${encodeURIComponent(t.title)}" class="btn btn-terracotta btn-sm">Request Consultation</a>
      </div>

      <div style="font-size: 0.76rem; color: var(--text-light); text-align: center; margin-top: 1rem;">
        * Note: Verdant Life therapies support holistic wellbeing and relaxation. We do not claim to diagnose, cure, or guarantee clinical outcomes.
      </div>
    </div>
  `;

  openModal(t.title, html);
}

/* Comprehensive Therapy Library Database */
const therapyLibrary = {
  'hatha-yoga': {
    title: 'Therapeutic Hatha Yoga',
    category: 'Therapeutic Yoga',
    image: 'images/image-34.png',
    introduction: 'A foundational, mindfulness-anchored yoga practice that harmonizes classical physical postures (asanas) with purposeful breath control to gently cultivate balance, stability, and somatic presence.',
    whatInvolves: 'Slow-paced deliberate postures held with steady focus, gentle counter-stretches, joint freeing exercises, and grounding centering sequences guided by certified yoga therapists.',
    structure: [
      'Initial 10-minute breath awareness & joint warm-up',
      '30-minute sequence of standing and seated aligned postures',
      '10-minute floor counter-stretches & gentle inversions',
      '10-minute guided resting integration (Savasana)'
    ],
    formats: 'Individual 1-on-1 therapeutic session (60 min) or small curated group (max 8 practitioners).',
    preparation: 'Wear breathable non-restrictive attire. Avoid heavy meals 2 hours prior to the practice. Hydrate mindfully.',
    expectations: 'A calm, unhurried atmosphere without competitive strain. Practitioners experience gentle elongation, centered calm, and postural ease.',
    consultationInfo: 'Suitable for individuals of all flexibility levels. An initial discussion helps customize modifications for spinal or joint comfort.',
    related: ['Restorative Yoga', 'Breathing Practices (Pranayama)', 'Mindful Movement'],
    faqQ: 'Is this suitable if I have stiff joints or limited flexibility?',
    faqA: 'Yes. Our therapeutic instructors customize each posture with props such as blocks, straps, and bolsters to accommodate your comfortable range of motion.'
  },
  'restorative-yoga': {
    title: 'Restorative Yoga Therapy',
    category: 'Therapeutic Yoga',
    image: 'images/image-33.png',
    introduction: 'A deeply soothing, supportive practice designed to facilitate nervous system recovery through fully supported restful postures held for extended intervals.',
    whatInvolves: 'Gentle passive poses supported entirely by bolsters, folded wool blankets, eye pillows, and blocks, allowing muscle fibers to soften without effort.',
    structure: [
      'Gentle arrival & grounding breathwork (5 min)',
      '4 to 5 supported restorative postures held for 8–12 minutes each',
      'Deep somatic stillness & nervous system down-regulation',
      'Gentle guided re-awakening and seated reflection'
    ],
    formats: 'Private individualized session (60/75 min) or quiet candlelit evening group.',
    preparation: 'Wear warm, comfortable layers (body temperature often drops slightly during profound relaxation).',
    expectations: 'Complete release of muscular bracing, profound mental quietude, and a state of deep physiological rest.',
    consultationInfo: 'Highly recommended for individuals experiencing lifestyle fatigue, chronic stress, or recovering from busy work cycles.',
    related: ['Guided Relaxation (Yoga Nidra)', 'Hatha Yoga', 'Sound Healing'],
    faqQ: 'Do I have to perform any strenuous physical exercise?',
    faqA: 'None at all. In restorative yoga, props completely support your body so there is zero active physical exertion.'
  },
  'hydrotherapy': {
    title: 'Clinical Hydrotherapy & Balneotherapy',
    category: 'Naturopathy Treatments',
    image: 'images/image-55.png',
    introduction: 'The therapeutic application of water at varying temperatures, hydro-pressures, and botanical infusions to stimulate systemic circulation, soothe muscles, and support natural metabolic vigor.',
    whatInvolves: 'Immersion in specialized hydrotherapy baths equipped with therapeutic underwater jets, alternating warm and cool compresses, and mineral salt soaks.',
    structure: [
      'Baseline vital sign check and thermal readiness review',
      'Relaxing mineral or herbal water immersion bath',
      'Targeted underwater gentle pressure massage on key muscular zones',
      'Restorative dry-pack repose in a quiet thermal relaxation lounger'
    ],
    formats: 'Private therapeutic hydro-suite sessions (45 min) directed by naturopathic therapists.',
    preparation: 'Bring comfortable swimwear. Ensure light hydration. Avoid consuming heavy food immediately before the bath.',
    expectations: 'Gentle buoyant warmth, enhanced cutaneous blood circulation, release of muscular tension, and full-body lightness.',
    consultationInfo: 'Requires brief naturopathic screening to determine appropriate thermal parameters, especially for blood pressure sensitivity.',
    related: ['Mud Therapy (Pelotherapy)', 'Relaxation Therapy (Swedana)', 'Natural Body Treatments'],
    faqQ: 'How does water temperature play a role in the treatment?',
    faqA: 'Controlled warm water relaxes tense muscular tissues, while gentle cool finishes stimulate peripheral microcirculation and invigoration.'
  },
  'mud-therapy': {
    title: 'Therapeutic Mud Therapy (Pelotherapy)',
    category: 'Naturopathy Treatments',
    image: 'images/image-58.png',
    introduction: 'An ancient, earth-grounded naturopathic modality utilizing purified mineral-rich medicinal clay packs applied to specific body regions to absorb local heat and support tissue comfort.',
    whatInvolves: 'Even application of clean, sun-energized therapeutic mud to the abdomen, spine, or joints, followed by quiet relaxation and gentle rinsing.',
    structure: [
      'Skin preparation and thermal evaluation',
      'Application of mineralized therapeutic clay pack (approx. 20–25 min)',
      'Rest in a tranquil shaded environment while the pack cools the tissues',
      'Warm water cleanse followed by a restful towel wrap'
    ],
    formats: 'Specialized localized application or comprehensive systemic treatment in dedicated naturopathy rooms.',
    preparation: 'Wear comfortable spa attire provided by the center. Arrive well-hydrated.',
    expectations: 'A refreshing cooling sensation across the skin, diminished visceral heat, and deep somatic grounding.',
    consultationInfo: 'Recommended as a natural soothing modality for digestive heaviness, joint warmth, and general skin vitality.',
    related: ['Hydrotherapy', 'Ayurvedic Abhyanga', 'Nature-Based Wellness'],
    faqQ: 'Is the therapeutic mud hygienic and tested?',
    faqA: 'Yes. All pelotherapy clay is ethically sourced from unpolluted deep earth strata, sun-sterilized, and laboratory-screened for purity.'
  },
  'nutrition-guidance': {
    title: 'Personalized Nutrition Guidance',
    category: 'Nutrition & Lifestyle',
    image: 'images/image-22.png',
    introduction: 'An integrative, whole-food dietary consultation focusing on vital plant-forward nutrition, gut health balance, and sustainable nourishment strategies tailored to your lifestyle.',
    whatInvolves: 'One-on-one dialogue with our naturopathic nutrition specialists reviewing meal timings, hydration habits, nutrient density, and mindful eating practices.',
    structure: [
      'Comprehensive dietary journal and lifestyle cadence analysis',
      'Review of nutritional goals, digestive comfort, and daily schedules',
      'Co-creation of a sustainable whole-food wellness meal roadmap',
      'Education on seasonal produce, herbal infusions, and mindful eating'
    ],
    formats: 'Initial comprehensive consultation (60 min) with follow-up review sessions (30 min).',
    preparation: 'Keep a simple 3-day log of your daily meals, snack patterns, and fluid intake before attending.',
    expectations: 'Clear, actionable, compassionate dietary guidance without extreme deprivation, fad fasting, or unrealistic restrictions.',
    consultationInfo: 'Ideal for those seeking sustainable nourishment, steady daily energy, and improved digestive ease.',
    related: ['Healthy Eating Education', 'Mindful Eating Practices', 'Daily Wellness Routines'],
    faqQ: 'Do you prescribe synthetic diet supplements?',
    faqA: 'Our primary focus is always wholesome natural food, vibrant seasonal produce, and gentle botanical teas.'
  },
  'guided-relaxation': {
    title: 'Guided Relaxation & Yoga Nidra',
    category: 'Mind & Body Wellness',
    image: 'images/image-112.png',
    introduction: 'A structured, verbalized meditation method practiced lying comfortably in Savasana, guiding brainwave states into deep regenerative psychic rest.',
    whatInvolves: 'Systematic rotation of bodily awareness, gentle breath observation, visualization of tranquil archetypes, and conscious somatic surrender.',
    structure: [
      'Comfort setup with plush mats, neck bolsters, and soothing eye pillows',
      'Intention setting (Sankalpa) and progressive bodily scan (20 min)',
      'Breath rhythm harmonization and archetype visualization (20 min)',
      'Gentle integration, grounding, and peaceful orientation to wakefulness'
    ],
    formats: 'Private restorative guidance (50 min) or intimate group relaxation sanctuary sessions.',
    preparation: 'Dress in loose, warm clothing. Empty bladder before the session begins.',
    expectations: 'Rejuvenating mental clarity, deep tranquility akin to several hours of refreshing sleep, and muscular lightness.',
    consultationInfo: 'Open to everyone; especially beneficial for individuals coping with mental fatigue, sleep disruption, or sensory overload.',
    related: ['Mindfulness Sessions', 'Breathing Awareness', 'Restorative Yoga'],
    faqQ: 'What happens if I fall asleep during the session?',
    faqA: 'Falling asleep is completely normal and simply indicates your body needed physical rest. With practice, you will learn to hover in conscious stillness.'
  }
};

/* Program Enquiry & Details Modal */
function viewProgramDetails(title, duration, image, description) {
  const html = `
    <div>
      <img src="${image}" alt="${title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
      <span class="section-tag">Signature Experience</span>
      <h3 style="margin: 0.5rem 0 1rem 0;">${title}</h3>
      <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 1.25rem;">${description}</p>
      
      <div style="background: var(--bg-cream); padding: 1.25rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; border: 1px solid var(--border-light);">
        <h5 style="color: var(--primary-walnut); margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.82rem;">Experience Inclusions</h5>
        <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-body); line-height: 1.6;">
          <li>Individualized consultation with our naturopathic specialist</li>
          <li>Guided experiential movement and therapeutic alignment sessions</li>
          <li>Targeted natural wellness treatments and thermal recovery therapies</li>
          <li>Nutritional education and mindful eating guidance</li>
          <li>Access to the meditation sanctuary and botanical gardens</li>
        </ul>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Program Duration</span>
          <div style="font-weight: 700; color: var(--primary-walnut);">${duration}</div>
        </div>
        <a href="contact.html?program=${encodeURIComponent(title)}" class="btn btn-primary">Enquire For This Program</a>
      </div>
    </div>
  `;
  openModal(title, html);
}

/* Doctor Consultation Booking Modal */
function bookDoctorConsultation(doctorName, specialty) {
  const html = `
    <div>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Schedule an initial consultation with <strong>${doctorName}</strong> (${specialty}). Please share your wellness goals and convenient days.</p>
      
      <form id="consultation-form" onsubmit="handleConsultationSubmit(event, '${doctorName}')">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-control" required placeholder="Your full name">
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control" required placeholder="name@example.com">
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" class="form-control" required placeholder="+1 (555) 000-0000">
          </div>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Preferred Date</label>
            <input type="date" class="form-control" required>
          </div>
          <div class="form-group">
            <label class="form-label">Preferred Time Window</label>
            <select class="form-control">
              <option>Morning (08:30 AM - 11:30 AM)</option>
              <option>Afternoon (01:00 PM - 04:00 PM)</option>
              <option>Evening (04:30 PM - 06:30 PM)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Primary Wellness Interests or General Inquiries</label>
          <textarea class="form-control" placeholder="E.g., interest in restorative yoga for back mobility, lifestyle routine planning, or naturopathy hydrotherapy..."></textarea>
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          * Note: Consultations provide guidance on natural lifestyle practices and yoga therapy. They do not constitute emergency medical care or pharmaceutical prescriptions.
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 1rem;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Consultation Request</button>
        </div>
      </form>
    </div>
  `;
  openModal(`Consultation Enquiry: ${doctorName}`, html);
}

function handleConsultationSubmit(event, doctorName) {
  event.preventDefault();
  closeModal();
  showToast(`Thank you! Your consultation enquiry for ${doctorName} has been received. Our team will contact you within 24 hours.`);
}

/* Facility Lightbox */
function openFacilityLightbox(title, image, caption) {
  const html = `
    <div>
      <img src="${image}" alt="${title}" style="width: 100%; height: 420px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1rem;">
      <h3 style="margin-bottom: 0.5rem;">${title}</h3>
      <p style="color: var(--text-muted); line-height: 1.6;">${caption}</p>
    </div>
  `;
  openModal(title, html);
}

/* Sanctuary Video Tour Modal */
function openSanctuaryVideoModal() {
  const html = `
    <div class="video-modal-preview">
      <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-lg); background: #000;">
        <img src="images/image-1.png" alt="Sanctuary grounds overview" style="width: 100%; height: 320px; object-fit: cover; opacity: 0.85; display: block;">
        <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%);">
          <div style="width: 66px; height: 66px; border-radius: 50%; background: linear-gradient(135deg, #a65830, #c4824e); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 25px rgba(166, 88, 48, 0.7); margin-bottom: 0.85rem; cursor: pointer;" onclick="showToast('Playing cinematic sanctuary walkthrough preview (Demo simulation).')">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
          </div>
          <span style="color: #ffffff; font-weight: 700; font-size: 1.15rem; letter-spacing: 0.04em;">Verdant Life Sanctuary Experience</span>
          <span style="color: rgba(255,255,255,0.8); font-size: 0.85rem; margin-top: 0.35rem;">HD Cinematic Tour • Duration 2:45</span>
        </div>
      </div>
      <div style="margin-top: 1.25rem;">
        <h4 style="margin-bottom: 0.5rem; color: var(--text-main);">A Sensory Journey into Tranquility & Natural Health</h4>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          Take a guided virtual journey through our biophilic reception lounge, botanical meditation gardens, natural pelotherapy springs, and tranquil therapeutic yoga shalas. Designed from natural stone, teak, and living flora to ground your nervous system from the moment you arrive.
        </p>
        <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem; justify-content: flex-end; flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Close Tour</button>
          <a href="contact.html" class="btn btn-primary" onclick="closeModal()">Schedule An In-Person Visit</a>
        </div>
      </div>
    </div>
  `;
  openModal('Verdant Life — Sanctuary Video Tour', html);
}

/* Signature Experience Horizontal Slider Controller */
let currentExperienceIndex = 0;

function showExperienceSlide(index) {
  const slides = document.querySelectorAll('.sig-horizontal-card');
  const dots = document.querySelectorAll('.sig-dot');
  if (!slides.length) return;

  if (index >= slides.length) {
    currentExperienceIndex = 0;
  } else if (index < 0) {
    currentExperienceIndex = slides.length - 1;
  } else {
    currentExperienceIndex = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentExperienceIndex);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentExperienceIndex);
  });
}

function nextExperienceSlide() {
  showExperienceSlide(currentExperienceIndex + 1);
}

function prevExperienceSlide() {
  showExperienceSlide(currentExperienceIndex - 1);
}

function goToExperienceSlide(index) {
  showExperienceSlide(index);
}

/* 3D Coverflow Slider Controller for Home 2 Pathways */
let currentCoverflowIndex = 0;

function initCoverflow() {
  const cards = document.querySelectorAll('.coverflow-card');
  if (!cards.length) return;
  updateCoverflow();
  window.addEventListener('resize', updateCoverflow);
}

function updateCoverflow() {
  const cards = document.querySelectorAll('.coverflow-card');
  const dots = document.querySelectorAll('.coverflow-dot');
  if (!cards.length) return;

  const total = cards.length;
  const isMobile = window.innerWidth <= 768;
  const spacing = isMobile ? 180 : 270;

  cards.forEach((card, i) => {
    let diff = (i - currentCoverflowIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      card.style.transform = 'translateX(0px) scale(1)';
      card.style.zIndex = '10';
      card.style.opacity = '1';
      card.style.pointerEvents = 'auto';
      card.style.filter = 'none';
      card.classList.add('active');
    } else if (diff === 1) {
      card.style.transform = `translateX(${spacing}px) scale(0.82)`;
      card.style.zIndex = '5';
      card.style.opacity = '0.75';
      card.style.pointerEvents = 'auto';
      card.style.filter = 'brightness(0.92)';
      card.classList.remove('active');
    } else if (diff === -1) {
      card.style.transform = `translateX(-${spacing}px) scale(0.82)`;
      card.style.zIndex = '5';
      card.style.opacity = '0.75';
      card.style.pointerEvents = 'auto';
      card.style.filter = 'brightness(0.92)';
      card.classList.remove('active');
    } else {
      card.style.transform = `translateX(${diff > 0 ? spacing * 1.5 : -spacing * 1.5}px) scale(0.65)`;
      card.style.zIndex = '1';
      card.style.opacity = '0';
      card.style.pointerEvents = 'none';
      card.classList.remove('active');
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentCoverflowIndex);
  });
}

function nextCoverflow() {
  const cards = document.querySelectorAll('.coverflow-card');
  if (!cards.length) return;
  currentCoverflowIndex = (currentCoverflowIndex + 1) % cards.length;
  updateCoverflow();
}

function prevCoverflow() {
  const cards = document.querySelectorAll('.coverflow-card');
  if (!cards.length) return;
  currentCoverflowIndex = (currentCoverflowIndex - 1 + cards.length) % cards.length;
  updateCoverflow();
}

function goToCoverflow(index) {
  currentCoverflowIndex = index;
  updateCoverflow();
}

/* Sanctuary Architecture Interactive Showcase Controller */
const archSuitesData = [
  {
    badge: 'Suite 01 • Spinal Biomechanics',
    category: 'Spinal Biomechanics',
    title: 'The Iyengar Rope Shala',
    desc: 'Custom hardwood wall ropes for safe, gravity-assisted spinal traction and supported restorative inversions. Designed with acoustically damped timber floors and soft diffused natural daylight.',
    benefit: '<strong>Clinical Benefit:</strong> Enables pain-free traction for sensitive lumbar discs.',
    image: 'images/image-88.png',
    alt: 'Iyengar yoga rope studio with arched ceilings and forest window',
    link: '#intake'
  },
  {
    badge: 'Suite 02 • Hydro-Thermal',
    category: 'Hydro-Thermal Medicine',
    title: 'The Balneotherapy Chamber',
    desc: 'Specialized immersion tubs with hydro-massage jet nozzles and mineral infusion controls for circulatory toning. Maintained at calibrated physiological temperatures for deep microvascular relaxation.',
    benefit: '<strong>Clinical Benefit:</strong> Gently accelerates systemic microvascular perfusion.',
    image: 'images/image-25.png',
    alt: 'Holistic medical spa room with hydro apparatus and recliner',
    link: '#intake'
  },
  {
    badge: 'Suite 03 • Neuro-Sensory',
    category: 'Neuro-Sensory Reset',
    title: 'The Shirodhara Suite',
    desc: 'Authentic carved wooden droni tables with overhead brass vessels dispensing rhythmic streams of warm medicated herbal oil. Acoustically insulated to sub-30dB for profound mental silence.',
    benefit: '<strong>Clinical Benefit:</strong> Induces alpha and theta brainwave tranquility.',
    image: 'images/image-17.png',
    alt: 'Shirodhara room with suspended brass vessel and wooden table',
    link: '#intake'
  },
  {
    badge: 'Suite 04 • Biophilic Space',
    category: 'Biophilic Meditation',
    title: 'The Bamboo Forest Shala',
    desc: 'Naturally ventilated open-air bamboo structure framing panoramic tropical greenery for group meditation. Engineered to invite forest breezes and the soothing sound of natural mountain springs.',
    benefit: '<strong>Clinical Benefit:</strong> Immerses practitioners in fresh mountain forest air.',
    image: 'images/image-87.png',
    alt: 'Bamboo yoga shala with woven ceiling and tropical forest view',
    link: '#intake'
  }
];

let activeArchIndex = 0;

function setArchSuite(index) {
  if (index < 0) index = archSuitesData.length - 1;
  if (index >= archSuitesData.length) index = 0;
  activeArchIndex = index;

  const data = archSuitesData[index];
  const imgEl = document.getElementById('arch-main-img');
  const badgeEl = document.getElementById('arch-badge-text');
  const catEl = document.getElementById('arch-category');
  const titleEl = document.getElementById('arch-title');
  const descEl = document.getElementById('arch-desc');
  const benefitEl = document.getElementById('arch-benefit');
  const thumbs = document.querySelectorAll('.arch-thumb-card');

  if (imgEl) {
    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = data.image;
      imgEl.alt = data.alt;
      imgEl.style.opacity = '1';
    }, 150);
  }
  if (badgeEl) badgeEl.textContent = data.badge;
  if (catEl) catEl.textContent = data.category;
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (benefitEl) benefitEl.innerHTML = data.benefit;

  thumbs.forEach((th, i) => {
    th.classList.toggle('active', i === index);
  });
}

function nextArchSuite(e) {
  if (e) e.stopPropagation();
  setArchSuite(activeArchIndex + 1);
}

function prevArchSuite(e) {
  if (e) e.stopPropagation();
  setArchSuite(activeArchIndex - 1);
}

function openActiveArchLightbox() {
  const data = archSuitesData[activeArchIndex];
  if (data) {
    openFacilityLightbox(data.title, data.image, data.desc);
  }
}

function resetOrToggleArch() {
  openActiveArchLightbox();
}

/* Category 02 Naturopathy Slider Controller */
let currentNatSlideIndex = 0;

function showNatSlide(index) {
  const slides = document.querySelectorAll('.naturopathy-slide-card');
  const dots = document.querySelectorAll('.nat-dot');
  const chips = document.querySelectorAll('.nat-chip-card');
  if (!slides.length) return;

  if (index >= slides.length) {
    currentNatSlideIndex = 0;
  } else if (index < 0) {
    currentNatSlideIndex = slides.length - 1;
  } else {
    currentNatSlideIndex = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentNatSlideIndex);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentNatSlideIndex);
  });
  chips.forEach((chip, i) => {
    chip.classList.toggle('active', i === currentNatSlideIndex);
  });
}

function nextNatSlide() {
  showNatSlide(currentNatSlideIndex + 1);
}

function prevNatSlide() {
  showNatSlide(currentNatSlideIndex - 1);
}

function goToNatSlide(index) {
  showNatSlide(index);
}

// ==========================================================================
// COMMUNITY REFLECTIONS SHOWCASE SLIDER (index.html)
// ==========================================================================
let currentReflectionIndex = 0;
let reflectionAutoPlayTimer = null;

function showReflectionSlide(index) {
  const slides = document.querySelectorAll('.reflection-slide-card');
  const dots = document.querySelectorAll('.reflection-dot');
  if (!slides.length) return;

  if (index >= slides.length) {
    currentReflectionIndex = 0;
  } else if (index < 0) {
    currentReflectionIndex = slides.length - 1;
  } else {
    currentReflectionIndex = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentReflectionIndex);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentReflectionIndex);
  });
}

function nextReflectionSlide() {
  showReflectionSlide(currentReflectionIndex + 1);
}

function prevReflectionSlide() {
  showReflectionSlide(currentReflectionIndex - 1);
}

function goToReflectionSlide(index) {
  showReflectionSlide(index);
}

function initReflectionSlider() {
  const track = document.getElementById('reflectionSliderTrack');
  if (!track) return;

  showReflectionSlide(0);

  // Autoplay flow
  function startAutoplay() {
    if (reflectionAutoPlayTimer) clearInterval(reflectionAutoPlayTimer);
    reflectionAutoPlayTimer = setInterval(nextReflectionSlide, 5500);
  }

  function pauseAutoplay() {
    if (reflectionAutoPlayTimer) {
      clearInterval(reflectionAutoPlayTimer);
      reflectionAutoPlayTimer = null;
    }
  }

  startAutoplay();

  const wrapper = track.closest('.reflection-slider-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', pauseAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);

    // Touch gesture swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseAutoplay();
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40) {
        nextReflectionSlide();
      } else if (touchEndX > touchStartX + 40) {
        prevReflectionSlide();
      }
      startAutoplay();
    }, { passive: true });
  }
}

/* Dashboard Functionality */
function initDashboard() {
  const navBtns = document.querySelectorAll('.dashboard-nav-btn');
  const panels = document.querySelectorAll('.dashboard-panel');
  if (!navBtns.length) return;

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const panel = document.getElementById(targetId);
      if (panel) panel.classList.add('active');
    });
  });
}

function viewDemoReceipt(receiptId, date, amount, therapyName) {
  const html = `
    <div style="padding: 1rem; border: 1px dashed var(--border-medium); border-radius: var(--radius-md); background: var(--bg-cream);">
      <div style="display: flex; justify-content: space-between; border-bottom: 2px solid var(--primary-walnut); padding-bottom: 1rem; margin-bottom: 1rem;">
        <div>
          <h4 style="margin: 0; color: var(--primary-deep);">VERDANT LIFE NATUROPATHY</h4>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--accent-terracotta);">Official Patient Service Receipt (Sample Demo Record)</span>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 700; color: var(--primary-walnut);">${receiptId}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${date}</div>
        </div>
      </div>

      <div style="margin-bottom: 1.25rem; font-size: 0.88rem;">
        <strong>Patient Name:</strong> Eleanor Vance (Demo ID: VL-7742)<br>
        <strong>Care Plan:</strong> Integrative Wellness Cadence<br>
        <strong>Center Branch:</strong> Tranquility Hills Sanctuary
      </div>

      <table class="table-custom" style="margin-bottom: 1.5rem; background: #ffffff;">
        <thead>
          <tr>
            <th>Description</th>
            <th>Specialist</th>
            <th>Status</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${therapyName}</td>
            <td>Dr. Ananya Sharma</td>
            <td><span class="badge-status badge-confirmed">Settled (Demo)</span></td>
            <td style="text-align: right;">$${amount}.00</td>
          </tr>
        </tbody>
      </table>

      <div style="text-align: right; font-size: 1.1rem; font-weight: 700; color: var(--primary-deep); margin-bottom: 1.5rem;">
        Total: $${amount}.00
      </div>

      <div style="background: rgba(166, 88, 48, 0.08); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.76rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        * Notice: This is an illustrative sample demonstration receipt for interface testing and preview purposes. It does not represent an actual financial transaction or clinical billing record.
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button class="btn btn-secondary btn-sm" onclick="window.print()">Print Demo Copy</button>
        <button class="btn btn-primary btn-sm" onclick="showToast('Demo receipt PDF simulated download complete.'); closeModal();">Download PDF</button>
      </div>
    </div>
  `;

  openModal(`Receipt Details: ${receiptId}`, html);
}

/* Toast Notifications */
function initToast() {
  if (!document.querySelector('.toast-container')) {
    const toastBox = document.createElement('div');
    toastBox.className = 'toast-container';
    document.body.appendChild(toastBox);
  }
}

function showToast(message) {
  const container = document.querySelector('.toast-container') || document.body;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🌿</span> <div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* Read Full Article in Journal */
function readArticleModal(title, category, date, image, content) {
  const html = `
    <div>
      <img src="${image}" alt="${title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
      <span class="section-tag">${category}</span>
      <h2 style="font-size: 1.7rem; margin: 0.5rem 0 0.5rem 0;">${title}</h2>
      <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1.5rem;">Published: ${date} • Editorial Review by Verdant Life Board</div>
      
      <div style="font-size: 0.95rem; line-height: 1.8; color: var(--text-body);">
        ${content}
      </div>

      <div style="margin-top: 2rem; padding: 1.25rem; background: var(--bg-cream); border-radius: var(--radius-sm); border: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <strong style="color: var(--primary-walnut);">Interested in this topic?</strong>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Explore related therapies and specialist consultations.</p>
        </div>
        <a href="services.html" class="btn btn-terracotta btn-sm">Explore Therapies</a>
      </div>
    </div>
  `;
  openModal(title, html);
}

/* Auth Page Role Switcher (Patient vs Specialist Demo fill) */
function setAuthRole(role) {
  const tabs = document.querySelectorAll('.auth-role-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  const activeTab = document.querySelector(`[data-role="${role}"]`);
  if (activeTab) activeTab.classList.add('active');

  const emailInput = document.getElementById('auth-email');
  const pwdInput = document.getElementById('auth-password');
  if (emailInput && pwdInput) {
    if (role === 'patient') {
      emailInput.value = 'eleanor.vance@demo.verdantlife.org';
      pwdInput.value = '••••••••••••';
    } else {
      emailInput.value = 'dr.ananya.sharma@demo.verdantlife.org';
      pwdInput.value = '••••••••••••';
    }
  }
}

function handleLoginSubmit(event) {
  event.preventDefault();
  showToast('Authentication successful. Redirecting to Patient Portal...');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 900);
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  showToast('Registration complete! Welcome to Verdant Life Sanctuary.');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1000);
}


// ==========================================================================
// 3D FANNED DECK SPOTLIGHTS CONTROLLER (education.html - Clinical Explorations)
// ==========================================================================
let currentFannedIndex = 0;
let fannedAutoPlayTimer = null;
let isFannedAutoPlaying = true;
const totalFannedSlides = 5;

const fannedSpotlightsData = [
  {
    key: 'botanical-infusions',
    badge: 'Botanical Alchemy',
    meta: 'Herbal Formulations • 01 / 05',
    title: 'The Science of Botanical Infusions',
    subtitle: 'Bioactive Phytochemicals & Extraction',
    image: 'images/image-64.png',
    desc: 'Understanding bioactive phytochemicals in chamomile, calendula, and nettle infusions that gently support mucosal health and tissue calm.',
    benefit: 'Insight: How traditional water-extracted decoctions retain fragile aromatic terpenes.',
    mechanism: 'Kinetic water extractions under controlled temperatures preserve fragile monoterpenes and antioxidant bioflavonoids (apigenin, quercetin, luteolin) that normally degrade under harsh chemical distillation.',
    clinicalFocus: 'Mucosal Barrier Soothing & Systemic Inflammation Modulation',
    recommendedExperience: 'Apothecary Tea Bar & Herbal Steam Therapy',
    evidenceNote: 'Empirical studies demonstrate water-extracted decoctions retain up to 3.8x higher volatile monoterpene bioavailability.'
  },
  {
    key: 'circadian-alignment',
    badge: 'Circadian Rhythms',
    meta: 'Dawn Exposure • 02 / 05',
    title: 'Natural Circadian Alignment',
    subtitle: 'Morning Lux & Endocrine Balance',
    image: 'images/image-45.png',
    desc: 'How gazing at dawn ambient photons triggers retinal ganglion cells to regulate metabolic clocks, hormonal release, and evening sleepiness.',
    benefit: 'Insight: The simplest zero-cost daily protocol for regulating sleep architecture.',
    mechanism: 'Intrinsically photosensitive retinal ganglion cells (ipRGCs) expressing melanopsin transmit ambient lux cues to the suprachiasmatic nucleus (SCN), resetting central clock transcription factors (CLOCK/BMAL1).',
    clinicalFocus: 'Cortisol Awakening Curve & Nighttime Melatonin Synthesis',
    recommendedExperience: 'Sunrise Pranayama & Mountain Meadow Meditation',
    evidenceNote: 'Morning lux exposure (1,000–10,000 lux) within 45 minutes of dawn correlates with deeper slow-wave restorative sleep.'
  },
  {
    key: 'ethical-herbology',
    badge: 'Sanctuary Garden',
    meta: 'Ethical Sourcing • 03 / 05',
    title: 'Ethical Herb Harvesting',
    subtitle: 'Dew-Point Potency & Vitality',
    image: 'images/image-66.png',
    desc: 'Why freshly hand-picked medicinal herbs harvested at peak morning dew retain higher essential oil potency than commercial mass crops.',
    benefit: 'Insight: The difference between live herbal vitality and oxidized retail supplements.',
    mechanism: 'Diurnal cellular turgor peaks at early morning dew point before solar radiation triggers evaporation of volatile trichomes. Hand-harvesting ensures intact cellular matrices and pristine enzyme active sites.',
    clinicalFocus: 'Phytochemical Potency & Toxin-Free Botanical Purity',
    recommendedExperience: 'Botanical Sanctuary Garden Walk & Herbology Workshops',
    evidenceNote: 'Gas chromatography testing reveals up to 42% higher essential oil retention in dew-harvested botanicals versus mechanized crops.'
  },
  {
    key: 'forest-bathing',
    badge: 'Shinrin-Yoku',
    meta: 'Sensory Immersion • 04 / 05',
    title: 'Forest Bathing & Sensory Reset',
    subtitle: 'Phytoncide Inhalation & Vagal Calm',
    image: 'images/image-24.png',
    desc: 'Inhaling beneficial plant-emitted phytoncides during slow meditative walking lowers salivary cortisol and fosters immune resilience.',
    benefit: 'Insight: Scientific validation of Japanese Shinrin-yoku within our sanctuary trails.',
    mechanism: 'Volatile antimicrobial terpenes (alpha-pinene, beta-pinene, camphene) emitted by coniferous and evergreen trees enter pulmonary microcirculation, down-regulating sympathetic hyperactivity and modulating autonomic tone.',
    clinicalFocus: 'Autonomic Nervous Stabilization & Salivary Cortisol Reduction',
    recommendedExperience: 'Guided Sanctuary Forest Trails & Sensory Walking',
    evidenceNote: 'Clinical trials show a 2-hour sensory forest immersion increases natural killer (NK) immune cell activity by up to 50% for 7 days.'
  },
  {
    key: 'hydrothermal-physics',
    badge: 'Thermal Balneology',
    meta: 'Hydrothermal Physics • 05 / 05',
    title: 'Hydrothermal Microcirculation',
    subtitle: 'Contrast Balneology & Lymphatic Flow',
    image: 'images/image-55.png',
    desc: 'The physiological dynamics of temperature gradients and hydrostatic buoyancy stimulating venous return, cellular oxygenation, and neuromuscular decompression.',
    benefit: 'Insight: Elemental water physics harnessing natural hydrostatic pressure for deep recovery.',
    mechanism: 'Water immersion applies progressive hydrostatic pressure (up to 22 mmHg per foot of depth), assisting venous valve competence and lymphatic displacement toward thoracic circulation without cardiac strain.',
    clinicalFocus: 'Microvascular Elasticity & Deep Myofascial Decompression',
    recommendedExperience: 'Underwater Hydrotherapy Jet Bath & Thermal Contrast Soaks',
    evidenceNote: 'Hydrostatic immersion provides 90% bodyweight buoyancy, reducing compressive joint forces and promoting lymphatic clearance.'
  }
];

function updateFannedDeck() {
  const cards = document.querySelectorAll('.fanned-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const cardIdx = parseInt(card.getAttribute('data-index'), 10);
    let diff = cardIdx - currentFannedIndex;
    if (diff > Math.floor(totalFannedSlides / 2)) diff -= totalFannedSlides;
    if (diff < -Math.floor(totalFannedSlides / 2)) diff += totalFannedSlides;

    card.setAttribute('data-pos', diff.toString());
  });

  // Update Milestone Pill Tabs
  const pills = document.querySelectorAll('.fanned-milestone-pill');
  pills.forEach((pill, idx) => {
    const isActive = idx === currentFannedIndex;
    pill.classList.toggle('active', isActive);
    pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Update Scrubber Points
  const points = document.querySelectorAll('.fanned-point');
  points.forEach((point, idx) => {
    point.classList.toggle('active', idx === currentFannedIndex);
  });

  // Update Scrubber Progress Line
  const progressBar = document.getElementById('fannedProgress');
  if (progressBar) {
    const progressPercent = ((currentFannedIndex) / (totalFannedSlides - 1)) * 100;
    progressBar.style.width = Math.max(10, progressPercent) + '%';
  }

  // Update Counter
  const counterEl = document.getElementById('fannedCounterText');
  if (counterEl) {
    counterEl.innerHTML = 'Spotlight <strong>0' + (currentFannedIndex + 1) + '</strong> of <strong>0' + totalFannedSlides + '</strong>';
  }
}

function goToFannedSlide(index) {
  currentFannedIndex = (index + totalFannedSlides) % totalFannedSlides;
  updateFannedDeck();
}

function nextFannedSlide() {
  goToFannedSlide(currentFannedIndex + 1);
}

function prevFannedSlide() {
  goToFannedSlide(currentFannedIndex - 1);
}

function handleScrubberClick(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  const targetIndex = Math.round(ratio * (totalFannedSlides - 1));
  goToFannedSlide(targetIndex);
}

function toggleFannedAutoPlay() {
  isFannedAutoPlaying = !isFannedAutoPlaying;
  const btn = document.getElementById('fannedPlayBtn');
  if (btn) {
    btn.classList.toggle('paused', !isFannedAutoPlaying);
    const textSpan = btn.querySelector('span');
    if (textSpan) {
      textSpan.textContent = isFannedAutoPlaying ? 'Live Flow' : 'Paused';
    }
  }
  if (!isFannedAutoPlaying && fannedAutoPlayTimer) {
    clearInterval(fannedAutoPlayTimer);
    fannedAutoPlayTimer = null;
  } else if (isFannedAutoPlaying && !fannedAutoPlayTimer) {
    startFannedAutoPlay();
  }
}

function startFannedAutoPlay() {
  if (fannedAutoPlayTimer) clearInterval(fannedAutoPlayTimer);
  fannedAutoPlayTimer = setInterval(() => {
    if (isFannedAutoPlaying) {
      nextFannedSlide();
    }
  }, 5000);
}

function pauseFannedAutoPlay() {
  if (fannedAutoPlayTimer) {
    clearInterval(fannedAutoPlayTimer);
    fannedAutoPlayTimer = null;
  }
}

function resumeFannedAutoPlay() {
  if (isFannedAutoPlaying && !fannedAutoPlayTimer) {
    startFannedAutoPlay();
  }
}

function viewSpotlightDetails(index) {
  const item = fannedSpotlightsData[index];
  if (!item) return;

  const contentHtml = `
    <div class="therapy-modal-container">
      <div class="therapy-modal-hero">
        <img src="${item.image}" alt="${item.title}">
        <span class="therapy-modal-badge">${item.badge}</span>
      </div>

      <div class="therapy-modal-content">
        <div class="therapy-modal-meta">${item.meta}</div>
        <h2 class="therapy-modal-title">${item.title}</h2>
        <p class="therapy-modal-tagline">${item.subtitle}</p>

        <div class="therapy-modal-section">
          <h3>Overview & Core Principle</h3>
          <p>${item.desc}</p>
        </div>

        <div class="therapy-modal-section">
          <h3>Physiological & Biochemical Mechanism</h3>
          <p>${item.mechanism}</p>
        </div>

        <div class="therapy-modal-grid">
          <div class="therapy-modal-card">
            <h4>Primary Clinical Focus</h4>
            <p>${item.clinicalFocus}</p>
          </div>
          <div class="therapy-modal-card">
            <h4>Recommended Sanctuary Modality</h4>
            <p>${item.recommendedExperience}</p>
          </div>
        </div>

        <div class="therapy-modal-section">
          <h3>Clinical Research Insight</h3>
          <div class="card-benefit" style="margin: 0.5rem 0 1.5rem 0;">
            ${item.evidenceNote}
          </div>
        </div>

        <div class="therapy-modal-cta">
          <a href="contact.html?inquiry=${encodeURIComponent(item.title)}" class="btn btn-primary">Book Specialist Consultation →</a>
          <a href="services.html" class="btn btn-secondary">Explore All Therapies</a>
        </div>
      </div>
    </div>
  `;

  openModal(item.title, contentHtml);
}

// Attach listener to initialize fanned deck when DOM loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFannedDeck);
} else {
  initFannedDeck();
}

function initFannedDeck() {
  const deckStage = document.getElementById('fannedDeckStage');
  if (deckStage) {
    updateFannedDeck();
    startFannedAutoPlay();

    // Pause on hover
    deckStage.addEventListener('mouseenter', pauseFannedAutoPlay);
    deckStage.addEventListener('mouseleave', resumeFannedAutoPlay);

    // Touch gesture swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    deckStage.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      pauseFannedAutoPlay();
    }, { passive: true });

    deckStage.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40) {
        nextFannedSlide();
      } else if (touchEndX > touchStartX + 40) {
        prevFannedSlide();
      }
      resumeFannedAutoPlay();
    }, { passive: true });
  }
}


// ==========================================================================
// CIRCADIAN IMMERSION JOURNEY CONTROLLER (programs.html)
// ==========================================================================
const circadianPhasesData = [
  {
    timeBadge: '06:00 AM — Dawn Photic Lux',
    elementBadge: 'Elemental Phase: Prana & Sun',
    meta: 'Phase 01 / 05 • Circadian Reset',
    title: 'Pranic Awakening & Photic Alignment',
    image: 'images/image-16.png',
    desc: 'Welcoming morning photons on our panoramic open-air terrace. Morning outdoor lux (1,000–10,000 lux) activates intrinsically photosensitive retinal ganglion cells, signaling the suprachiasmatic nucleus to reset endocrine timing, calibrate healthy cortisol release, and promote vibrant daytime alertness.',
    activities: ['Sunrise Anulom Vilom', 'Retinal Photic Exposure', 'Warm Copper Water Hydration'],
    benefit: '<strong>Biological Target:</strong> Resets master circadian clock genes (CLOCK/BMAL1) and calibrates morning cortisol awakening response.'
  },
  {
    timeBadge: '08:30 AM — Thermal Stimulation',
    elementBadge: 'Elemental Phase: Mineral Water & Earth',
    meta: 'Phase 02 / 05 • Nature-Cure Therapy',
    title: 'Elemental Balneotherapy & Mud Immersion',
    image: 'images/image-18.png',
    desc: 'Engaging classical nature cure with hydro-thermal water jets and sun-baked mineral mud packs applied along spinal nerve pathways. Contrast water temperatures tone the vascular endothelium and promote lymphatic drainage.',
    activities: ['Contrast Hydrotherapy Jet Soaks', 'Local Spinal Mud Packs', 'Herbal Steam Inhalation'],
    benefit: '<strong>Biological Target:</strong> Stimulates peripheral microcirculation, unloads spinal joint tension, and activates natural detoxification channels.'
  },
  {
    timeBadge: '12:30 PM — Solar Digestive Fire',
    elementBadge: 'Elemental Phase: Living Flora & Fiber',
    meta: 'Phase 03 / 05 • Mindful Nutrition',
    title: 'Botanical Nourishment & Digestive Silence',
    image: 'images/image-20.png',
    desc: 'Honoring natural digestive fire (Agni) when solar radiation is highest. Practitioners dine on raw and gently steamed organic botanicals grown on our grounds, followed by 20 minutes of mindful silence to allow blood flow to concentrate in the visceral enteric organs.',
    activities: ['Cold-Pressed Garden Tonics', 'Bioactive Polyphenol Bowls', 'Post-Meal Mindful Stillness'],
    benefit: '<strong>Biological Target:</strong> Enhances digestive enzyme secretion, optimizes gut microbiome diversity, and prevents postprandial fatigue.'
  },
  {
    timeBadge: '04:00 PM — Parasympathetic Shift',
    elementBadge: 'Elemental Phase: Breath & Movement',
    meta: 'Phase 04 / 05 • Restorative Yoga',
    title: 'Prop-Supported Restorative Yoga Therapeutics',
    image: 'images/image-23.png',
    desc: 'Gentle, prop-supported postures held for extended durations over natural wool bolsters and cotton straps. Designed to release deep myofascial tension and decompress chronic postural strain without muscular exertion.',
    activities: ['Supported Supta Baddhakonasana', 'Gentle Spinal Twists', 'Diaphragmatic Ocean Breathing'],
    benefit: '<strong>Biological Target:</strong> Stimulates mechanoreceptors in deep connective tissue, triggering vagal parasympathetic dominance.'
  },
  {
    timeBadge: '07:30 PM — Twilight Stillness',
    elementBadge: 'Elemental Phase: Ether & Deep Rest',
    meta: 'Phase 05 / 05 • Sleep Preparation',
    title: 'Guided Yoga Nidra & Circadian Wind-Down',
    image: 'images/image-27.png',
    desc: 'As natural twilight falls, all ambient lighting shifts to 2200K warm candlelight spectrums. A physician-guided session of deep psychic sleep (Yoga Nidra) paired with sound vibrations from brass singing bowls guides brainwaves into restorative delta states.',
    activities: ['Candlelit Yoga Nidra', 'Warm Ashwagandha Decoctions', 'Vibrational Sound Bath'],
    benefit: '<strong>Biological Target:</strong> Shields melatonin synthesis, lowers core body temperature, and prepares the brain for regenerative slow-wave sleep.'
  }
];

function setCircadianPhase(index) {
  const data = circadianPhasesData[index];
  if (!data) return;

  // Update button active state
  const btns = document.querySelectorAll('.circadian-phase-btn');
  btns.forEach((btn, i) => {
    const isActive = i === index;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Update biorhythm strip steps
  for (let i = 0; i < 5; i++) {
    const stepEl = document.getElementById('bioStep' + i);
    if (stepEl) {
      stepEl.classList.toggle('active', i === index);
    }
  }

  // Update showcase card elements with subtle fade
  const showcase = document.getElementById('circadianShowcase');
  if (showcase) {
    showcase.style.opacity = '0.4';
    showcase.style.transform = 'translateY(4px)';
    
    setTimeout(() => {
      const img = document.getElementById('circadianImg');
      const timeBadge = document.getElementById('circadianTimeBadge');
      const elementBadge = document.getElementById('circadianElementBadge');
      const meta = document.getElementById('circadianMeta');
      const title = document.getElementById('circadianTitle');
      const desc = document.getElementById('circadianDesc');
      const activities = document.getElementById('circadianActivities');
      const benefit = document.getElementById('circadianBenefit');

      if (img) {
        img.src = data.image;
        img.alt = data.title;
      }
      if (timeBadge) timeBadge.textContent = data.timeBadge;
      if (elementBadge) elementBadge.textContent = data.elementBadge;
      if (meta) meta.textContent = data.meta;
      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc;
      if (benefit) benefit.innerHTML = data.benefit;

      if (activities) {
        activities.innerHTML = data.activities.map(act => `<span class="circadian-act-pill">${act}</span>`).join('');
      }

      showcase.style.opacity = '1';
      showcase.style.transform = 'translateY(0)';
    }, 180);
  }
}

// ==========================================================================
// JOURNAL BENTO RESEARCH CONTROLLER (journal.html)
// ==========================================================================
function filterJournalBento(category) {
  const btns = document.querySelectorAll('.journal-bento-filter-btn');
  btns.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    btn.classList.toggle('active', onclickAttr.includes("'" + category + "'"));
  });

  // Filter hero card
  const heroCard = document.querySelector('.journal-hero-study-card');
  if (heroCard) {
    const heroCat = heroCard.getAttribute('data-cat');
    if (category === 'all' || heroCat === category) {
      heroCard.style.display = 'flex';
      heroCard.style.opacity = '1';
    } else {
      heroCard.style.display = 'none';
      heroCard.style.opacity = '0';
    }
  }

  // Filter 3-column study cards
  const cards = document.querySelectorAll('.journal-study-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-cat');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });
}

const researchStudiesData = {
  'pranayama-hrv': {
    title: 'The Neurobiology of Slow-Paced Respiration: 5.5 Breaths per Minute',
    badge: 'Clinical Neurobiology • Autonomic Resonance',
    journal: 'International Journal of Psychophysiology & Autonomic Neuroscience',
    image: 'images/image-29.png',
    overview: 'This multi-week clinical investigation explored the autonomic consequences of resonant diaphragmatic breathing (0.1 Hz) in individuals experiencing chronic stress-induced autonomic dysregulation.',
    mechanism: 'Slow diaphragmatic breathing at 5.5 breaths per minute stimulates pulmonary stretch receptors and baroreceptors in the carotid sinus, maximizing respiratory sinus arrhythmia (RSA). This triggers efferent vagal nerve activity, releasing acetylcholine onto sinoatrial cardiac receptors.',
    keyMetrics: '+48% Heart Rate Variability (RMSSD), 34% reduction in salivary alpha-amylase, and noticeable amygdala down-regulation on functional neuroimaging.',
    practicalApplication: 'Incorporate 15 minutes of guided 5.5 bpm pranayama (5.5s inhale, 5.5s exhale) each morning and evening without breath retention.'
  },
  'botanical-terpenes': {
    title: 'Volatile Terpene Retention in Steam Decocting vs Industrial Powders',
    badge: 'Phytotherapy Research • Gas Chromatography',
    journal: 'Journal of Natural Products & Chromatography',
    image: 'images/image-33.png',
    overview: 'A quantitative analytical study comparing bioactive volatile monoterpenes and flavonoids in freshly decocted whole-plant infusions versus shelf-stable industrial dry extract powders.',
    mechanism: 'Delicate aromatic monoterpenes such as apigenin, chamazulene, and linalool are highly volatile and thermolabile. Standard industrial freeze-drying and high-heat vacuum concentration vaporize fragile compounds.',
    keyMetrics: '84% of delicate aromatic monoterpenes and antioxidant flavonoids were retained in fresh steam extractions compared to less than 28% in powdered retail supplements.',
    practicalApplication: 'Prepare daily chamomile, peppermint, or holy basil infusions in sealed glass or porcelain vessels, steeping for 10-12 minutes covered.'
  },
  'dawn-lux': {
    title: 'Dawn Lux Exposure & Slow-Wave Sleep Architecture',
    badge: 'Chronobiology • Circadian Endocrine Dynamics',
    journal: 'Journal of Biological Rhythms & Sleep Medicine',
    image: 'images/image-34.png',
    overview: 'Investigating the physiological impact of natural morning sunlight exposure on evening sleep latency and deep slow-wave restorative sleep cycles.',
    mechanism: 'Natural daylight lux (1,000–10,000 lux) entering the pupil stimulates melanopsin-containing ipRGC cells, delivering a photic reset signal to the suprachiasmatic nucleus. This synchronizes evening pineal melatonin onset.',
    keyMetrics: 'Participants receiving 30 minutes of dawn outdoor light experienced an 86-minute advance in dim-light melatonin onset (DLMO) and a 42% increase in stage-3 slow-wave sleep.',
    practicalApplication: 'Step outdoors within 45 minutes of sunrise for 20-30 minutes of natural ambient eye exposure without sunglasses.'
  },
  'hydro-physics': {
    title: 'Hydrostatic Pressure Dynamics in Peripheral Lymphatic Return',
    badge: 'Balneology Science • Vascular Fluid Dynamics',
    journal: 'European Journal of Applied Physiology & Balneology',
    image: 'images/image-40.png',
    overview: 'Investigating the biophysical mechanisms of water immersion and contrast thermal balneotherapy in promoting venous velocity and interstitial lymphatic displacement.',
    mechanism: 'Full-body water immersion applies progressive hydrostatic pressure (up to 22 mmHg per foot of depth), acting as an external compressive stocking that forces venous blood from the lower extremities toward thoracic circulation.',
    keyMetrics: '90% bodyweight buoyancy eliminates joint cartilage compression forces while increasing central blood volume by up to 700 mL without cardiac exertion.',
    practicalApplication: 'Prescribed immersion in 36°C mineral water with underwater gentle jet massage, followed by brief cool water contrast.'
  }
};

function openResearchModal(key) {
  const study = researchStudiesData[key];
  if (!study) return;

  const contentHtml = `
    <div class="therapy-modal-container">
      <div class="therapy-modal-hero">
        <img src="${study.image}" alt="${study.title}">
        <span class="therapy-modal-badge">${study.badge}</span>
      </div>

      <div class="therapy-modal-content">
        <div class="therapy-modal-meta">${study.journal}</div>
        <h2 class="therapy-modal-title">${study.title}</h2>

        <div class="therapy-modal-section">
          <h3>Study Overview & Background</h3>
          <p>${study.overview}</p>
        </div>

        <div class="therapy-modal-section">
          <h3>Biological & Physiological Mechanism</h3>
          <p>${study.mechanism}</p>
        </div>

        <div class="therapy-modal-grid">
          <div class="therapy-modal-card">
            <h4>Key Clinical Outcomes</h4>
            <p>${study.keyMetrics}</p>
          </div>
          <div class="therapy-modal-card">
            <h4>Practical Health Protocol</h4>
            <p>${study.practicalApplication}</p>
          </div>
        </div>

        <div class="therapy-modal-cta">
          <a href="contact.html?inquiry=${encodeURIComponent(study.title)}" class="btn btn-primary">Discuss with Naturopathic Physician →</a>
          <a href="journal.html" class="btn btn-secondary">Back to Journal</a>
        </div>
      </div>
    </div>
  `;

  openModal(study.title, contentHtml);
}


// ==========================================================================
// EXPERIENTIAL MODULES CONTROLLER (programs.html)
// ==========================================================================
function setImmersionPanel(index) {
  const panels = document.querySelectorAll('.immersion-panel');
  panels.forEach((p, i) => {
    p.classList.toggle('active', i === index);
  });

  const tabs = document.querySelectorAll('.immersion-tab-btn');
  tabs.forEach((tab, i) => {
    const isActive = i === index;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

const moduleDossiersData = [
  {
    title: '1-on-1 Posture Refinement',
    badge: 'Alignment & Biomechanics',
    image: 'images/image-108.png',
    overview: 'Personalized private biomechanical screening and assisted yoga therapy. Specialized therapists evaluate spinal curves, pelvic tilt, and thoracic expansion to craft tailored postural sequences.',
    mechanism: 'Gentle traction, reciprocal inhibition, and proprioceptive neuromuscular facilitation (PNF) re-pattern hypertonic muscular groups while strengthening inhibited postural stabilizers.',
    inclusions: ['Kinetic chain spinal mobility screening', 'Individualized prop support strategy', 'Safe home ergonomics and axial alignment regimen'],
    benefit: 'Neutralizes chronic cervical, thoracic, and lumbar strain while protecting vulnerable intervertebral discs.'
  },
  {
    title: 'Deep Jet Hydro-Tone',
    badge: 'Hydrothermal Circulation',
    image: 'images/image-59.png',
    overview: 'Immersion in specialized temperature-controlled mineral hydrotherapy tubs equipped with precision underwater massage jets.',
    mechanism: 'Hydrostatic pressure of water combined with targeted mechanical water jets stimulates cutaneous and muscular mechanoreceptors, accelerating lymphatic clearance and enhancing peripheral venous return.',
    inclusions: ['Pre-immersion thermal mineral salt infusion', 'Customized 8-zone hydro-jet pulsation sequence', 'Post-bath cooling thermal wrap'],
    benefit: 'Rapidly relieves lactic acid accumulation, calms hyperactive muscle spasms, and restores microvascular elasticity.'
  },
  {
    title: 'Pondside Therapy Pavilion',
    badge: 'Nature Healing & Acoustics',
    image: 'images/image-101.png',
    overview: 'Restorative open-air therapeutic bodywork performed within our secluded botanical pavilion overlooking natural freshwater lily ponds.',
    mechanism: 'Biophilic sensory immersion eliminates artificial ambient noise, replacing it with the acoustic resonance of moving water and wind in foliage. This suppresses sympathetic vigilance and induces parasympathetic alpha brainwaves.',
    inclusions: ['Warm herbal botanical oil application', 'Gentle rhythmic myofascial unwinding', 'Sound-resonance chime finish'],
    benefit: 'Profoundly calms mental chatter, lowers salivary cortisol, and restores deep autonomic equilibrium.'
  },
  {
    title: 'Garden Fresh Nourishment',
    badge: 'Farm-to-Table Nutrition',
    image: 'images/image-72.png',
    overview: 'Wholesome culinary medicine prepared with medicinal vegetables and culinary herbs harvested from our organic sanctuary garden beds.',
    mechanism: 'Harvesting botanicals immediately prior to preparation preserves labile antioxidant enzymes, polyphenols, and delicate vitamins that oxidize during retail storage and transport.',
    inclusions: ['Cold-pressed daily medicinal tonics', 'Living enzyme probiotic vegetable medleys', 'Customized herbal tea decoctions'],
    benefit: 'Delivers maximum bioavailable cellular fuel, supports the gut microbiome, and promotes smooth post-meal digestion.'
  }
];

function openModuleModal(index) {
  const item = moduleDossiersData[index];
  if (!item) return;

  const contentHtml = `
    <div class="therapy-modal-container">
      <div class="therapy-modal-hero">
        <img src="${item.image}" alt="${item.title}">
        <span class="therapy-modal-badge">${item.badge}</span>
      </div>

      <div class="therapy-modal-content">
        <h2 class="therapy-modal-title">${item.title}</h2>

        <div class="therapy-modal-section">
          <h3>Module Overview & Clinical Purpose</h3>
          <p>${item.overview}</p>
        </div>

        <div class="therapy-modal-section">
          <h3>Physiological & Biomechanical Mechanism</h3>
          <p>${item.mechanism}</p>
        </div>

        <div class="therapy-modal-section">
          <h3>Core Session Components</h3>
          <ul style="padding-left: 1.25rem; color: var(--text-muted); line-height: 1.8;">
            ${item.inclusions.map(inc => `<li>${inc}</li>`).join('')}
          </ul>
        </div>

        <div class="card-benefit" style="margin: 1.25rem 0;">
          <strong>Target Outcome:</strong> ${item.benefit}
        </div>

        <div class="therapy-modal-cta">
          <a href="contact.html?inquiry=${encodeURIComponent(item.title)}" class="btn btn-primary">Enquire About Retreat Modules →</a>
          <a href="programs.html" class="btn btn-secondary">Back to Programs</a>
        </div>
      </div>
    </div>
  `;

  openModal(item.title, contentHtml);
}


// ==========================================================================
// DUAL-CARD SPECIALIST CONTROLLER (doctors.html)
// ==========================================================================
let currentSpecialistIndex = 0;
const specialistsData = [
  {
    name: 'Dr. Ananya Sharma',
    role: 'Chief Physician',
    designation: 'Chief Naturopathic Physician',
    degrees: 'BNYS, Fellowship in Balneotherapy',
    image: 'images/image-74.png',
    meta: 'Consultation Focus • 01 / 04',
    intro: 'With over 14 years in naturopathic hospital leadership, Dr. Sharma champions non-invasive therapies that work in harmony with the body\'s innate homeostatic rhythms. Her clinical care maps out your lifestyle stressors before formulating gentle thermal and mud protocols.',
    expertise: 'Clinical Hydrotherapy, Pelotherapy (Mud Packs), Circadian Sleep Alignment & Autonomic Regulation.'
  },
  {
    name: 'Dr. Rajeshwar Sen',
    role: 'Yoga Therapy Lead',
    designation: 'Yoga Therapy & Biomechanics Lead',
    degrees: 'MD, C-IAYT, Sports Rehabilitation',
    image: 'images/image-77.png',
    meta: 'Consultation Focus • 02 / 04',
    intro: 'Dr. Sen bridges physical therapy science and classical yoga shala traditions, providing safe, individualized alignment for patients with disc and joint sensitivity through biomechanical movement screens and prop-assisted modifications.',
    expertise: 'Spinal Biomechanics, Restorative Yoga Therapy, Neuromuscular Re-education & Postural Correction.'
  },
  {
    name: 'Dr. Meera Varma',
    role: 'Integrative Medicine',
    designation: 'Integrative Health Specialist',
    degrees: 'BAMS, MS Integrative Health',
    image: 'images/image-27.png',
    meta: 'Consultation Focus • 03 / 04',
    intro: 'Specializing in seasonal lifestyle cadence, Dr. Varma curates restorative herbal treatments that soothe mental tension and restore natural circadian sleepiness through deep listening regarding daily habits and digestive vitality.',
    expertise: 'Traditional Body Treatments (Abhyanga), Swedana Steam Therapy, Herbal Tea Formulations & Dinacharya.'
  },
  {
    name: 'Dr. Shalini Nair',
    role: 'Holistic Nutrition',
    designation: 'Holistic Nutrition Lead',
    degrees: 'BNYS, PGD Clinical Nutrition',
    image: 'images/image-76.png',
    meta: 'Consultation Focus • 04 / 04',
    intro: 'An advocate of wholesome, accessible culinary nutrition, Dr. Nair designs joyful meal plans that foster sustained daytime energy without restrictive dogma, reviewing your culinary realities to build feasible meal cadences.',
    expertise: 'Plant-Forward Whole-Food Nutrition, Gut-Microbiome Care, Mindful Dining Practices & Botanical Teas.'
  }
];

function setSpecialist(index) {
  currentSpecialistIndex = index;
  const doc = specialistsData[index];
  if (!doc) return;

  // Update nav chips
  const chips = document.querySelectorAll('.specialist-nav-chip');
  chips.forEach((chip, i) => {
    const isActive = i === index;
    chip.classList.toggle('active', isActive);
    chip.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Animate pair with subtle cross-fade
  const pair = document.getElementById('specialistDualPair');
  if (pair) {
    pair.style.opacity = '0.35';
    pair.style.transform = 'scale(0.985)';

    setTimeout(() => {
      const photo = document.getElementById('specialistPhoto');
      const badge = document.getElementById('specialistBadge');
      const nameLeft = document.getElementById('specialistNameLeft');
      const degrees = document.getElementById('specialistDegrees');
      const meta = document.getElementById('specialistMeta');
      const nameRight = document.getElementById('specialistNameRight');
      const intro = document.getElementById('specialistIntro');
      const expertise = document.getElementById('specialistExpertise');
      const bookBtn = document.getElementById('specialistBookBtn');

      if (photo) {
        photo.src = doc.image;
        photo.alt = doc.name + ', ' + doc.designation;
      }
      if (badge) badge.textContent = doc.role;
      if (nameLeft) nameLeft.textContent = doc.name;
      if (degrees) degrees.textContent = doc.degrees;
      if (meta) meta.textContent = doc.meta;
      if (nameRight) nameRight.textContent = doc.name;
      if (intro) intro.textContent = doc.intro;
      if (expertise) expertise.innerHTML = '<strong>Areas of Expertise:</strong> ' + doc.expertise;
      if (bookBtn) {
        bookBtn.setAttribute('onclick', `bookDoctorConsultation('${doc.name}', '${doc.designation}')`);
      }

      pair.style.opacity = '1';
      pair.style.transform = 'scale(1)';
    }, 180);
  }
}

function nextSpecialist() {
  const nextIdx = (currentSpecialistIndex + 1) % specialistsData.length;
  setSpecialist(nextIdx);
}


// ==========================================================================
// CONTACT PAGE FAQ TOGGLE CONTROLLER (contact.html)
// ==========================================================================
function toggleContactFaq(index) {
  const item = document.getElementById('contactFaq' + index);
  if (!item) return;
  const isCurrentlyActive = item.classList.contains('active');

  // Toggle active class
  item.classList.toggle('active', !isCurrentlyActive);
}


// ==========================================================================
// CONTACT PAGE INTERACTIVE MAP VIEW CONTROLLER (contact.html)
// ==========================================================================
function switchMapView(mode, buttonElement) {
  const iframe = document.getElementById('sanctuaryMapIframe');
  if (!iframe) return;

  // Update active pill state
  const pills = document.querySelectorAll('.map-view-pill');
  pills.forEach(p => {
    p.classList.remove('active');
    p.setAttribute('aria-selected', 'false');
  });

  if (buttonElement) {
    buttonElement.classList.add('active');
    buttonElement.setAttribute('aria-selected', 'true');
  }

  // Set appropriate map URL based on mode
  if (mode === 'standard') {
    // Standard Bright Google Street Map
    iframe.src = 'https://maps.google.com/maps?q=34.1422,-118.2845&t=m&z=13&hl=en&output=embed';
  } else if (mode === 'satellite') {
    // High-Resolution Satellite View
    iframe.src = 'https://maps.google.com/maps?q=34.1422,-118.2845&t=k&z=14&hl=en&output=embed';
  } else if (mode === 'osm') {
    // OpenStreetMap Terrain & Trail Contours
    iframe.src = 'https://www.openstreetmap.org/export/embed.html?bbox=-118.35%2C34.10%2C-118.20%2C34.18&layer=mapnik&marker=34.1422%2C-118.2845';
  }
}


// ==========================================================================
// PATIENT PORTAL TAB SWITCHER (dashboard.html)
// ==========================================================================
function switchPortalTab(tabName, clickedBtn) {
  // Update sidebar active buttons
  const navBtns = document.querySelectorAll('.portal-nav-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

  if (clickedBtn) {
    clickedBtn.classList.add('active');
  } else {
    // If called programmatically, find matching button
    navBtns.forEach(btn => {
      const onclickAttr = btn.getAttribute('onclick');
      if (onclickAttr && onclickAttr.includes("'" + tabName + "'")) {
        btn.classList.add('active');
      }
    });
  }

  // Update tab panels
  const panels = document.querySelectorAll('.portal-tab-panel');
  panels.forEach(panel => panel.classList.remove('active'));

  const targetPanel = document.getElementById('portal-tab-' + tabName);
  if (targetPanel) {
    targetPanel.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Automatically close mobile/tablet sidebar when tab is switched
  if (typeof window.closePortalSidebar === 'function') {
    window.closePortalSidebar();
  }
}

// ==========================================================================
// PATIENT PORTAL MOBILE & TABLET NAVIGATION DRAWER (dashboard.html)
// ==========================================================================
function initPortalMobileNav() {
  const hamburgerBtn = document.getElementById('portalHamburgerBtn');
  const sidebar = document.getElementById('portalSidebar');
  const backdrop = document.getElementById('portalBackdrop');
  const closeBtn = document.getElementById('portalSidebarCloseBtn');

  if (!hamburgerBtn || !sidebar) return;

  function openSidebar() {
    sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    const icon = hamburgerBtn.querySelector('.portal-hamburger-icon');
    if (icon) icon.textContent = '✕';
    document.body.classList.add('portal-menu-locked');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    const icon = hamburgerBtn.querySelector('.portal-hamburger-icon');
    if (icon) icon.textContent = '☰';
    document.body.classList.remove('portal-menu-locked');
  }

  window.closePortalSidebar = closeSidebar;

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeSidebar();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });
}


// ==========================================================================
// DROP TO TOP CONTROLLER (All Pages)
// ==========================================================================
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggleVisibility = () => {
    const scrolledY = window.scrollY || document.documentElement.scrollTop || 0;
    const portalMain = document.querySelector('.portal-main');
    const portalScrolled = portalMain ? portalMain.scrollTop : 0;

    if (scrolledY > 260 || portalScrolled > 260) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  const portalMain = document.querySelector('.portal-main');
  if (portalMain) {
    portalMain.addEventListener('scroll', toggleVisibility, { passive: true });
  }

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const pMain = document.querySelector('.portal-main');
    if (pMain) {
      pMain.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Run once on load to establish state
  toggleVisibility();
}


// ==========================================================================
// HERO BACKGROUND IMAGE SWITCHER (index.html)
// ==========================================================================
function setHeroBg(imgUrl, badgeElement) {
  const hero1 = document.querySelector('.hero-banner-section');
  if (hero1) {
    hero1.style.backgroundImage = "url('" + imgUrl + "')";
  }
  const hero2 = document.querySelector('.hero-h2-bg-anim');
  if (hero2) {
    hero2.style.backgroundImage = "url('" + imgUrl + "')";
  }
  document.querySelectorAll('.hero-showcase-badge').forEach(b => b.classList.remove('active'));
  if (badgeElement) badgeElement.classList.add('active');
}


/* ==========================================================================
   3D Fanned Stacked Deck Carousel Controller
   ========================================================================== */
const DECK_SCREENS_DATA = [
  {
    screen: "Screen 01 of 05",
    title: "Spinal & Pelvic Screen",
    desc: "Visual analysis of spinal curvature, shoulder leveling, hamstring tension, and pelvic tilt to identify mechanical compensations.",
    benefit: "Guides safe prop adaptation for all yoga therapies and restorative postures."
  },
  {
    screen: "Screen 02 of 05",
    title: "Circadian & Sleep Mapping",
    desc: "Comprehensive review of your screen exposure, waking energy levels, mid-afternoon slumps, and night-time awakenings.",
    benefit: "Pinpoints the biological levers needed for restorative sleep depth and nervous system reset."
  },
  {
    screen: "Screen 03 of 05",
    title: "Autonomic & Thermal Check",
    desc: "Baseline blood pressure, resting pulse, respiration cadence, and cutaneous thermal tolerance to calibrate water baths.",
    benefit: "Guarantees hydrotherapy and mud therapies match individual cardiovascular safety."
  },
  {
    screen: "Screen 04 of 05",
    title: "Nutritional Dialogue",
    desc: "Detailed analysis of your weekly grocery reality, meal speed, hydration fluid balance, and personal digestive sensitivities.",
    benefit: "Produces feasible, satisfying plant-forward dietary shifts without extreme dogma."
  },
  {
    screen: "Screen 05 of 05",
    title: "Integrative Treatment Blueprint",
    desc: "Synthesizing diagnostic baseline markers into an unhurried, personalized daily routine of hydro-packs, restorative movement, and natural therapies.",
    benefit: "Ensures seamless physician follow-through and measurable recovery across your entire stay."
  }
];

function initFannedDeckCarousels() {
  const wrappers = document.querySelectorAll('[data-deck-carousel]');
  wrappers.forEach(wrapper => {
    const cards = wrapper.querySelectorAll('.deck-card');
    const total = cards.length;
    if (total === 0) return;

    const prevBtn = wrapper.querySelector('.deck-prev-btn');
    const nextBtn = wrapper.querySelector('.deck-next-btn');
    const section = wrapper.closest('section');
    const dotsContainer = section ? section.querySelector('.deck-dots') : null;
    const screenNumEl = section ? section.querySelector('.deck-info-screen') : null;
    const screenTitleEl = section ? section.querySelector('.deck-info-title') : null;
    const screenDescEl = section ? section.querySelector('.deck-info-desc') : null;
    const screenBenefitEl = section ? section.querySelector('.deck-info-benefit span') : null;

    let currentIndex = 0;

    // Build dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'deck-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to screen ' + (i + 1));
        dot.addEventListener('click', () => updateDeck(i));
        dotsContainer.appendChild(dot);
      }
    }

    function getFanTransform(diff, isMobile) {
      if (isMobile) {
        // Compact step for mobile screens (centered spread)
        switch (diff) {
          case 0:
            return { x: 0, rot: -2, scale: 1.0, z: 10, op: 1, bright: 1, shadow: '0 20px 40px rgba(24, 15, 10, 0.32)' };
          case 1:
            return { x: 18, rot: 4, scale: 0.95, z: 8, op: 0.95, bright: 0.96, shadow: '0 16px 32px rgba(24, 15, 10, 0.24)' };
          case 2:
            return { x: 36, rot: 8, scale: 0.90, z: 6, op: 0.88, bright: 0.90, shadow: '0 12px 24px rgba(24, 15, 10, 0.18)' };
          case 3:
            return { x: 54, rot: 12, scale: 0.85, z: 4, op: 0.80, bright: 0.82, shadow: '0 8px 18px rgba(24, 15, 10, 0.14)' };
          default:
            return { x: 70, rot: 16, scale: 0.80, z: 2, op: 0.70, bright: 0.75, shadow: '0 6px 14px rgba(24, 15, 10, 0.10)' };
        }
      } else {
        // Desktop / Tablet fanned deck
        switch (diff) {
          case 0:
            return { x: 0, rot: -2, scale: 1.0, z: 10, op: 1, bright: 1, shadow: '0 24px 50px rgba(24, 15, 10, 0.35)' };
          case 1:
            return { x: 50, rot: 4, scale: 0.96, z: 8, op: 0.96, bright: 0.96, shadow: '0 20px 40px rgba(24, 15, 10, 0.26)' };
          case 2:
            return { x: 100, rot: 9.5, scale: 0.91, z: 6, op: 0.90, bright: 0.90, shadow: '0 16px 32px rgba(24, 15, 10, 0.20)' };
          case 3:
            return { x: 145, rot: 15, scale: 0.86, z: 4, op: 0.82, bright: 0.82, shadow: '0 12px 24px rgba(24, 15, 10, 0.16)' };
          default:
            return { x: 185, rot: 20, scale: 0.81, z: 2, op: 0.72, bright: 0.74, shadow: '0 8px 18px rgba(24, 15, 10, 0.12)' };
        }
      }
    }

    function updateDeck(newIndex) {
      currentIndex = (newIndex + total) % total;
      const isMobile = window.innerWidth <= 640;

      cards.forEach((card, i) => {
        const diff = (i - currentIndex + total) % total;
        const conf = getFanTransform(diff, isMobile);

        card.style.transform = `translateX(${conf.x}px) rotate(${conf.rot}deg) scale(${conf.scale})`;
        card.style.zIndex = conf.z;
        card.style.opacity = conf.op;
        card.style.filter = `brightness(${conf.bright})`;
        card.style.boxShadow = conf.shadow;
        card.classList.toggle('active', diff === 0);
      });

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.deck-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
      }

      // Update companion info
      const data = DECK_SCREENS_DATA[currentIndex];
      if (data) {
        if (screenNumEl) screenNumEl.textContent = data.screen;
        if (screenTitleEl) screenTitleEl.textContent = data.title;
        if (screenDescEl) screenDescEl.textContent = data.desc;
        if (screenBenefitEl) screenBenefitEl.textContent = data.benefit;
      }
    }

    // Direct card click
    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        if (i !== currentIndex) {
          updateDeck(i);
        }
      });
    });

    // Nav buttons
    if (prevBtn) prevBtn.addEventListener('click', () => updateDeck(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateDeck(currentIndex + 1));

    // Keyboard navigation
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') updateDeck(currentIndex - 1);
      if (e.key === 'ArrowRight') updateDeck(currentIndex + 1);
    });

    // Touch swipe
    let touchStartX = 0;
    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) updateDeck(currentIndex + 1);
        else updateDeck(currentIndex - 1);
      }
    }, { passive: true });

    // Window resize
    window.addEventListener('resize', () => updateDeck(currentIndex));

    // Initialize layout
    updateDeck(0);
  });
}
