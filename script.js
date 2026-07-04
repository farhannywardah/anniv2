// --- 1. COUNTDOWN WAKTU JADIAN ---
// Ganti dengan tanggal jadian kalian (Format: YYYY-MM-DDTHH:mm:ss)
const startDate = new Date("2024-07-04T20:00:00");

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("counter").innerHTML = 
        `${days} Hari <br> ${hours} Jam <br> ${minutes} Menit <br> ${seconds} Detik`;
}
setInterval(updateCounter, 1000);
updateCounter(); // Panggil sekali agar tidak delay 1 detik saat awal load

// --- 2. BUKA SURAT & PLAY MUSIK ---
const openBtn = document.getElementById('open-btn');
const coverSection = document.getElementById('cover');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

openBtn.addEventListener('click', () => {
    // Sembunyikan cover, tampilkan isi
    coverSection.classList.add('hidden');
    mainContent.classList.remove('hidden');
    musicBtn.classList.remove('hidden');

    // Mulai lagu
    bgMusic.play();

    // Ledakan Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffb3c1', '#ffffff']
    });

    // Mulai animasi mengetik
    typeLetter();

    // Mulai hujan hati sesekali
    setInterval(createHeart, 2000);
});

// Toggle Pause/Play Musik
musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerText = '🎵 Pause';
    } else {
        bgMusic.pause();
        musicBtn.innerText = '🎵 Play';
    }
});

// --- 3. ANIMASI MENGETIK (TYPING EFFECT) ---
// Gunakan <br> untuk garis baru (enter)
const letterText = "Sayang...<br><br>Terima kasih sudah menemani aku selama dua tahun ini. Terima kasih untuk semua tawa, cerita, dan kesabaran meski kita terhalang jarak.<br><br>Semoga kita bisa terus bersama sampai impian kita satu per satu terwujud.<br><br>I Love You ❤️";

let index = 0;
const typingElement = document.getElementById('typing-text');

function typeLetter() {
    // Tambahkan cursor
    typingElement.innerHTML = '<span class="cursor"></span>';
    
    let isTag = false;
    let textHTML = "";

    function type() {
        if (index < letterText.length) {
            // Jika mendeteksi tag HTML (seperti <br>), langsung cetak tag tersebut
            if (letterText.charAt(index) === '<') {
                isTag = true;
            }
            
            textHTML += letterText.charAt(index);
            typingElement.innerHTML = textHTML + '<span class="cursor"></span>';
            index++;

            if (letterText.charAt(index - 1) === '>') {
                isTag = false;
            }

            // Atur kecepatan ketik (lebih cepat untuk tag HTML, normal untuk teks)
            setTimeout(type, isTag ? 0 : 50);
        } else {
            // Hapus cursor setelah selesai
            typingElement.innerHTML = textHTML;
        }
    }
    // Delay sedikit sebelum mulai mengetik
    setTimeout(type, 1000);
}

// --- 4. SLIDESHOW FOTO ---
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].classList.add('active');
    setTimeout(showSlides, 3000); // Ganti gambar setiap 3 detik
}
showSlides();

// --- 5. ANIMASI HATI MELAYANG ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    
    // Posisi acak dari kiri ke kanan
    heart.style.left = Math.random() * 100 + 'vw';
    // Ukuran acak
    heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
    // Durasi acak agar terlihat natural
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';

    document.getElementById('floating-hearts').appendChild(heart);

    // Hapus dari memori setelah animasi selesai
    setTimeout(() => {
        heart.remove();
    }, 6000);
}